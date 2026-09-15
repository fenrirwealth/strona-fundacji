import { createCipheriv, createDecipheriv, createHash, randomBytes } from 'node:crypto';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TOKEN_TTL_MS = 24 * 60 * 60 * 1000;
const CONSENT_VERSION = '2026-09-15';
const signupRequests = new Map();

function json(response, status, headers = {}) {
  return new Response(JSON.stringify(response), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', ...headers },
  });
}

function escapeHtml(value = '') {
  return value.replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
}

function allowSignup(ip) {
  const now = Date.now();
  for (const [key, times] of signupRequests) {
    if (now - times.at(-1) >= 60 * 60 * 1000) signupRequests.delete(key);
  }
  if (!signupRequests.has(ip) && signupRequests.size >= 10000) return false;
  const recent = (signupRequests.get(ip) || []).filter(time => now - time < 60 * 60 * 1000);
  if (recent.length >= 4) return false;
  recent.push(now);
  signupRequests.set(ip, recent);
  return true;
}

function keyFromSecret(secret) {
  if (typeof secret !== 'string' || secret.length < 32) throw new Error('Newsletter signing secret is missing or too short.');
  return createHash('sha256').update(secret).digest();
}

export function validateNewsletter(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return { ok: false, message: 'Nieprawidłowe dane formularza.' };
  }
  const fields = ['firstName', 'email', 'consent', 'website'];
  if (fields.some(key => input[key] !== undefined && typeof input[key] !== 'string')) {
    return { ok: false, message: 'Nieprawidłowe dane formularza.' };
  }
  const data = Object.fromEntries(fields.map(key => [key, (input[key] || '').trim()]));
  data.email = data.email.toLowerCase();
  if (data.website) return { ok: true, spam: true, data };
  if (data.firstName.length > 80) return { ok: false, message: 'Imię jest za długie.' };
  if (!emailPattern.test(data.email) || data.email.length > 180) return { ok: false, message: 'Podaj poprawny adres e-mail.' };
  if (data.consent !== 'on' && data.consent !== 'true') return { ok: false, message: 'Zaznacz zgodę na otrzymywanie newslettera.' };
  return { ok: true, spam: false, data };
}

export function createNewsletterToken(data, secret, now = Date.now()) {
  const iv = randomBytes(12);
  const cipher = createCipheriv('aes-256-gcm', keyFromSecret(secret), iv);
  const payload = Buffer.from(JSON.stringify({
    version: 1,
    email: data.email,
    firstName: data.firstName || '',
    issuedAt: new Date(now).toISOString(),
    expiresAt: now + TOKEN_TTL_MS,
  }));
  const encrypted = Buffer.concat([cipher.update(payload), cipher.final()]);
  return Buffer.concat([iv, cipher.getAuthTag(), encrypted]).toString('base64url');
}

export function readNewsletterToken(token, secret, now = Date.now()) {
  if (typeof token !== 'string' || token.length < 40 || token.length > 1200) throw new Error('Nieprawidłowy link potwierdzający.');
  try {
    const packed = Buffer.from(token, 'base64url');
    if (packed.length < 29) throw new Error('invalid token');
    const iv = packed.subarray(0, 12);
    const tag = packed.subarray(12, 28);
    const decipher = createDecipheriv('aes-256-gcm', keyFromSecret(secret), iv);
    decipher.setAuthTag(tag);
    const data = JSON.parse(Buffer.concat([decipher.update(packed.subarray(28)), decipher.final()]).toString('utf8'));
    if (data.version !== 1 || !emailPattern.test(data.email || '') || typeof data.firstName !== 'string') throw new Error('invalid payload');
    if (!Number.isFinite(data.expiresAt) || data.expiresAt < now) {
      const error = new Error('Link potwierdzający wygasł. Zapisz się ponownie.');
      error.code = 'TOKEN_EXPIRED';
      throw error;
    }
    return data;
  } catch (error) {
    if (error?.code === 'TOKEN_EXPIRED') throw error;
    throw new Error('Nieprawidłowy lub uszkodzony link potwierdzający.');
  }
}

async function resendRequest(apiKey, path, { method = 'GET', body } = {}) {
  const response = await fetch(`https://api.resend.com${path}`, {
    method,
    headers: { authorization: `Bearer ${apiKey}`, ...(body ? { 'content-type': 'application/json' } : {}) },
    body: body ? JSON.stringify(body) : undefined,
    signal: AbortSignal.timeout(7000),
  });
  if (!response.ok) {
    const error = new Error(`Resend: ${response.status}`);
    error.status = response.status;
    throw error;
  }
  return response;
}

async function sendConfirmation(env, data, token) {
  const siteOrigin = env.CONTACT_ALLOWED_ORIGIN || 'https://fundacjalepszydomlepszejutro.pl';
  const confirmationUrl = `${siteOrigin}/newsletter/potwierdz?token=${encodeURIComponent(token)}`;
  const greeting = data.firstName ? `Cześć ${escapeHtml(data.firstName)},` : 'Dzień dobry,';
  await resendRequest(env.RESEND_API_KEY, '/emails', {
    method: 'POST',
    body: {
      from: env.NEWSLETTER_FROM_EMAIL || env.CONTACT_FROM_EMAIL,
      to: [data.email],
      reply_to: env.CONTACT_TO_EMAIL || 'kontakt@fundacjalepszydomlepszejutro.pl',
      subject: 'Potwierdź zapis do newslettera Fundacji',
      text: `${data.firstName ? `Cześć ${data.firstName},` : 'Dzień dobry,'}\n\nkliknij poniższy link, aby potwierdzić zapis do newslettera Fundacji Lepszy Dom Lepsze Jutro:\n${confirmationUrl}\n\nLink jest ważny przez 24 godziny. Jeśli to nie Ty, zignoruj tę wiadomość.`,
      html: `<!doctype html><html lang="pl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0;background-color:#f8f6f1;color:#20242a;font-family:Arial,Helvetica,sans-serif"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;background-color:#f8f6f1"><tr><td align="center" style="padding-top:36px;padding-right:18px;padding-bottom:36px;padding-left:18px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background-color:#ffffff;border:1px solid #d9dfe5"><tr><td bgcolor="#17263c" style="background-color:#17263c;padding-top:28px;padding-right:34px;padding-bottom:28px;padding-left:34px"><p style="margin:0;font-size:12px;line-height:18px;letter-spacing:1.4px;color:#d7bc86;text-transform:uppercase">Fundacja Lepszy Dom Lepsze Jutro</p></td></tr><tr><td style="padding-top:38px;padding-right:34px;padding-bottom:38px;padding-left:34px"><p style="margin-top:0;margin-right:0;margin-bottom:18px;margin-left:0;font-size:17px;line-height:27px;color:#20242a">${greeting}</p><h1 style="margin-top:0;margin-right:0;margin-bottom:18px;margin-left:0;font-size:32px;line-height:38px;color:#17263c;font-weight:600">Jeszcze jedno kliknięcie.</h1><p style="margin-top:0;margin-right:0;margin-bottom:28px;margin-left:0;font-size:16px;line-height:26px;color:#616873">Potwierdź swój adres e-mail. Dopiero wtedy dodamy Cię do bazy newsletterowej Fundacji.</p><table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td bgcolor="#17263c" style="background-color:#17263c"><a href="${confirmationUrl}" style="display:inline-block;padding-top:15px;padding-right:24px;padding-bottom:15px;padding-left:24px;font-size:15px;line-height:20px;color:#ffffff;text-decoration:none;font-weight:700">Potwierdzam zapis →</a></td></tr></table><p style="margin-top:28px;margin-right:0;margin-bottom:0;margin-left:0;font-size:12px;line-height:20px;color:#7a8089">Link jest ważny przez 24 godziny. Jeżeli to nie Ty, po prostu zignoruj tę wiadomość.</p></td></tr></table></td></tr></table></body></html>`,
    },
  });
}

async function saveConfirmedContact(env, data) {
  const properties = {
    newsletter_consent_at: new Date().toISOString(),
    newsletter_consent_source: 'website_double_opt_in',
    newsletter_consent_version: CONSENT_VERSION,
  };
  const createBody = {
    email: data.email,
    first_name: data.firstName || undefined,
    unsubscribed: false,
    properties,
    segments: [{ id: env.NEWSLETTER_SEGMENT_ID }],
    topics: [{ id: env.NEWSLETTER_TOPIC_ID, subscription: 'opt_in' }],
  };
  try {
    await resendRequest(env.RESEND_API_KEY, '/contacts', { method: 'POST', body: createBody });
    return;
  } catch (error) {
    if (![409, 422].includes(error?.status)) throw error;
  }

  const contact = encodeURIComponent(data.email);
  await resendRequest(env.RESEND_API_KEY, `/contacts/${contact}`, {
    method: 'PATCH',
    body: { first_name: data.firstName || undefined, unsubscribed: false, properties },
  });
  await resendRequest(env.RESEND_API_KEY, `/contacts/${contact}/segments/${encodeURIComponent(env.NEWSLETTER_SEGMENT_ID)}`, { method: 'POST' }).catch(error => {
    if (error?.status !== 409) throw error;
  });
  await resendRequest(env.RESEND_API_KEY, `/contacts/${contact}/topics`, {
    method: 'PATCH',
    body: [{ id: env.NEWSLETTER_TOPIC_ID, subscription: 'opt_in' }],
  });
}

function newsletterCors(request, env) {
  const allowedOrigin = env.CONTACT_ALLOWED_ORIGIN || 'https://fundacjalepszydomlepszejutro.pl';
  const origin = request.headers.get('origin');
  return { allowedOrigin, origin, headers: { 'access-control-allow-origin': allowedOrigin, vary: 'Origin' } };
}

export async function handleNewsletterSubscription(request, env = process.env) {
  const cors = newsletterCors(request, env);
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: { ...cors.headers, 'access-control-allow-methods': 'POST', 'access-control-allow-headers': 'content-type' } });
  if (request.method !== 'POST') return json({ message: 'Dozwolona jest tylko metoda POST.' }, 405, cors.headers);
  if (cors.origin && cors.origin !== cors.allowedOrigin) return json({ message: 'Nieprawidłowe źródło żądania.' }, 403, cors.headers);
  const ip = (request.headers.get('x-forwarded-for') || 'local').split(',')[0].trim();
  if (!allowSignup(ip)) return json({ message: 'Wysłano zbyt wiele próśb. Spróbuj ponownie później.' }, 429, cors.headers);
  let input;
  try { input = await request.json(); } catch { return json({ message: 'Nieprawidłowe dane formularza.' }, 400, cors.headers); }
  const result = validateNewsletter(input);
  if (!result.ok) return json({ message: result.message }, 422, cors.headers);
  if (result.spam) return json({ ok: true }, 200, cors.headers);
  if (!env.RESEND_API_KEY || !(env.NEWSLETTER_FROM_EMAIL || env.CONTACT_FROM_EMAIL) || !env.NEWSLETTER_SIGNING_SECRET) {
    return json({ message: 'Zapis do newslettera jest chwilowo niedostępny.' }, 503, cors.headers);
  }
  try {
    const token = createNewsletterToken(result.data, env.NEWSLETTER_SIGNING_SECRET);
    await sendConfirmation(env, result.data, token);
    return json({ ok: true }, 200, cors.headers);
  } catch {
    return json({ message: 'Nie udało się wysłać potwierdzenia. Spróbuj ponownie za chwilę.' }, 502, cors.headers);
  }
}

export async function handleNewsletterConfirmation(request, env = process.env) {
  const cors = newsletterCors(request, env);
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: { ...cors.headers, 'access-control-allow-methods': 'POST', 'access-control-allow-headers': 'content-type' } });
  if (request.method !== 'POST') return json({ message: 'Dozwolona jest tylko metoda POST.' }, 405, cors.headers);
  if (cors.origin && cors.origin !== cors.allowedOrigin) return json({ message: 'Nieprawidłowe źródło żądania.' }, 403, cors.headers);
  if (!env.RESEND_API_KEY || !env.NEWSLETTER_SIGNING_SECRET || !env.NEWSLETTER_SEGMENT_ID || !env.NEWSLETTER_TOPIC_ID) {
    return json({ message: 'Potwierdzenie zapisu jest chwilowo niedostępne.' }, 503, cors.headers);
  }
  let input;
  try { input = await request.json(); } catch { return json({ message: 'Nieprawidłowe dane.' }, 400, cors.headers); }
  try {
    const data = readNewsletterToken(input?.token, env.NEWSLETTER_SIGNING_SECRET);
    await saveConfirmedContact(env, data);
    return json({ ok: true }, 200, cors.headers);
  } catch (error) {
    if (error?.code === 'TOKEN_EXPIRED') return json({ message: error.message }, 410, cors.headers);
    if (/link potwierdzający/i.test(error?.message || '')) return json({ message: error.message }, 422, cors.headers);
    return json({ message: 'Nie udało się potwierdzić zapisu. Spróbuj ponownie.' }, 502, cors.headers);
  }
}
