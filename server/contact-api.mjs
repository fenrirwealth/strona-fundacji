import { createServer } from 'node:http';
import { pathToFileURL } from 'node:url';

const topicLabels = {
  'wyprawka-szkolna': 'Wyprawka szkolna',
  'paczka-swiateczna': 'Paczka świąteczna',
  'biezace-potrzeby': 'Bieżące potrzeby dzieci i rodzin',
  'wsparcie-materialne': 'Dary i wsparcie materialne',
  'chce-pomoc': 'Chcę pomóc Fundacji',
  wolontariat: 'Wolontariat',
  wspolpraca: 'Współpraca',
  dokumenty: 'Statut i sprawozdania',
  inne: 'Inny temat',
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const requests = new Map();

export function validateContact(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return { ok: false, message: 'Nieprawidłowe dane formularza.' };
  }
  const fields = ['name', 'email', 'phone', 'topic', 'message', 'consent', 'website'];
  if (fields.some(key => input[key] !== undefined && typeof input[key] !== 'string')) {
    return { ok: false, message: 'Nieprawidłowe dane formularza.' };
  }
  const data = Object.fromEntries(fields.map(key => [key, (input[key] || '').trim()]));
  if (data.website) return { ok: true, spam: true, data };
  if (!data.name || data.name.length > 120) return { ok: false, message: 'Podaj imię i nazwisko.' };
  if (!emailPattern.test(data.email || '') || data.email.length > 180) return { ok: false, message: 'Podaj poprawny adres e-mail.' };
  if (data.phone?.length > 40) return { ok: false, message: 'Numer telefonu jest za długi.' };
  if (!Object.hasOwn(topicLabels, data.topic)) return { ok: false, message: 'Wybierz temat wiadomości.' };
  if (!data.message || data.message.length < 10 || data.message.length > 3000) return { ok: false, message: 'Wiadomość powinna mieć od 10 do 3000 znaków.' };
  if (data.consent !== 'on' && data.consent !== 'true') return { ok: false, message: 'Zaznacz zgodę na kontakt.' };
  return { ok: true, spam: false, data };
}

function escapeHtml(value = '') {
  return value.replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
}

function json(response, status, headers = {}) {
  return new Response(JSON.stringify(response), { status, headers: { 'content-type': 'application/json; charset=utf-8', ...headers } });
}

function allowRequest(ip) {
  const now = Date.now();
  for (const [key, times] of requests) {
    if (now - times.at(-1) >= 10 * 60 * 1000) requests.delete(key);
  }
  if (!requests.has(ip) && requests.size >= 10000) return false;
  const recent = (requests.get(ip) || []).filter(time => now - time < 10 * 60 * 1000);
  if (recent.length >= 5) return false;
  recent.push(now); requests.set(ip, recent); return true;
}

async function sendWithResend(apiKey, body) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { authorization: `Bearer ${apiKey}`, 'content-type': 'application/json' },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(5000),
  });
  if (!response.ok) throw new Error(`Resend: ${response.status}`);
}

async function handle(request) {
  const allowedOrigin = process.env.CONTACT_ALLOWED_ORIGIN || 'https://fundacjalepszydomlepszejutro.pl';
  const origin = request.headers.get('origin');
  const cors = { 'access-control-allow-origin': allowedOrigin, vary: 'Origin' };
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: { ...cors, 'access-control-allow-methods': 'POST', 'access-control-allow-headers': 'content-type' } });
  if (request.method !== 'POST') return json({ message: 'Dozwolona jest tylko metoda POST.' }, 405, cors);
  if (origin && origin !== allowedOrigin) return json({ message: 'Nieprawidłowe źródło żądania.' }, 403, cors);
  const ip = (request.headers.get('x-forwarded-for') || 'local').split(',')[0].trim();
  if (!allowRequest(ip)) return json({ message: 'Wysłano zbyt wiele wiadomości. Spróbuj ponownie za kilka minut.' }, 429, cors);
  let input;
  try { input = await request.json(); } catch { return json({ message: 'Nieprawidłowe dane formularza.' }, 400, cors); }
  const result = validateContact(input);
  if (!result.ok) return json({ message: result.message }, 422, cors);
  if (result.spam) return json({ ok: true }, 200, cors);

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) return json({ message: 'Formularz jest chwilowo niedostępny.' }, 503, cors);

  const data = result.data;
  const topic = topicLabels[data.topic];
  const safe = Object.fromEntries(Object.entries(data).map(([key, value]) => [key, escapeHtml(value)]));
  try {
    await sendWithResend(apiKey, {
      from,
      to: [to],
      reply_to: data.email,
      subject: `[Formularz] ${topic}`,
      text: `Imię i nazwisko: ${data.name}\nE-mail: ${data.email}\nTelefon: ${data.phone || 'nie podano'}\nTemat: ${topic}\n\n${data.message}`,
      html: `<h2>Nowa wiadomość ze strony Fundacji</h2><p><b>Imię i nazwisko:</b> ${safe.name}</p><p><b>E-mail:</b> ${safe.email}</p><p><b>Telefon:</b> ${safe.phone || 'nie podano'}</p><p><b>Temat:</b> ${escapeHtml(topic)}</p><p style="white-space:pre-wrap">${safe.message}</p>`,
    });
    await sendWithResend(apiKey, {
      from,
      to: [data.email],
      reply_to: to,
      subject: 'Otrzymaliśmy Twoją wiadomość — Fundacja Lepszy Dom Lepsze Jutro',
      text: `Dzień dobry,\n\ndziękujemy za kontakt. Otrzymaliśmy Twoją wiadomość dotyczącą: ${topic}. Odpowiemy tak szybko, jak to możliwe.\n\nJeśli sprawa jest pilna, zadzwoń: +48 570 747 779.\n\nFundacja Lepszy Dom Lepsze Jutro`,
    }).catch(() => {});
    return json({ ok: true }, 200, cors);
  } catch {
    return json({ message: 'Nie udało się wysłać wiadomości. Spróbuj ponownie lub zadzwoń.' }, 502, cors);
  }
}

const server = createServer(async (incoming, outgoing) => {
  const chunks = [];
  let size = 0;
  for await (const chunk of incoming) {
    size += chunk.length;
    if (size > 16_384) { outgoing.writeHead(413); outgoing.end(); return; }
    chunks.push(chunk);
  }
  const request = new Request(`http://localhost${incoming.url}`, {
    method: incoming.method,
    headers: incoming.headers,
    body: ['GET', 'HEAD'].includes(incoming.method) ? undefined : Buffer.concat(chunks),
  });
  const response = await handle(request);
  outgoing.writeHead(response.status, Object.fromEntries(response.headers));
  outgoing.end(Buffer.from(await response.arrayBuffer()));
});

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  server.listen(Number(process.env.CONTACT_API_PORT || 3001), '127.0.0.1');
}
