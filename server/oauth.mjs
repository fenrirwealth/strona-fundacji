import { randomBytes, timingSafeEqual } from 'node:crypto';

const SCOPE = 'repo';
const COOKIE = 'oauth_state';

function redirect(location, headers = {}) {
  return new Response(null, { status: 302, headers: { Location: location, 'Cache-Control': 'no-store', ...headers } });
}

function cookieValue(request, name) {
  for (const part of (request.headers.get('cookie') || '').split(';')) {
    const [key, ...rest] = part.trim().split('=');
    if (key === name) return rest.join('=');
  }
  return '';
}

function safeEqual(a, b) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && left.length > 0 && timingSafeEqual(left, right);
}

function failure(message) {
  return redirect(`/admin/#error=${encodeURIComponent(message)}`, { 'Set-Cookie': `${COOKIE}=; Path=/api/auth; Max-Age=0; HttpOnly; Secure; SameSite=Lax` });
}

export function handleAuthStart(request, env = process.env) {
  const clientId = env.GITHUB_OAUTH_CLIENT_ID;
  if (!clientId) return failure('Panel nie jest jeszcze skonfigurowany (brak GITHUB_OAUTH_CLIENT_ID).');
  const state = randomBytes(24).toString('hex');
  const url = new URL('https://github.com/login/oauth/authorize');
  url.searchParams.set('client_id', clientId);
  url.searchParams.set('scope', SCOPE);
  url.searchParams.set('state', state);
  return redirect(url.toString(), { 'Set-Cookie': `${COOKIE}=${state}; Path=/api/auth; Max-Age=600; HttpOnly; Secure; SameSite=Lax` });
}

export async function handleAuthCallback(request, env = process.env, fetchImpl = fetch) {
  const clientId = env.GITHUB_OAUTH_CLIENT_ID;
  const clientSecret = env.GITHUB_OAUTH_CLIENT_SECRET;
  if (!clientId || !clientSecret) return failure('Panel nie jest jeszcze skonfigurowany.');
  const params = new URL(request.url).searchParams;
  const code = params.get('code');
  const state = params.get('state') || '';
  if (params.get('error')) return failure('GitHub odrzucił logowanie.');
  if (!code || !safeEqual(state, cookieValue(request, COOKIE))) return failure('Nieprawidłowa sesja logowania. Spróbuj ponownie.');
  try {
    const response = await fetchImpl('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
    });
    const data = await response.json();
    if (!data.access_token) return failure('GitHub nie zwrócił tokenu.');
    return redirect(`/admin/#token=${encodeURIComponent(data.access_token)}`, { 'Set-Cookie': `${COOKIE}=; Path=/api/auth; Max-Age=0; HttpOnly; Secure; SameSite=Lax` });
  } catch {
    return failure('Nie udało się połączyć z GitHubem.');
  }
}
