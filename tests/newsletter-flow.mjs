import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createNewsletterToken, handleNewsletterConfirmation, readNewsletterToken, validateNewsletter } from '../server/newsletter.mjs';

const secret = 'test-secret-that-is-long-enough-for-aes-gcm-123456';

test('newsletter wymaga poprawnego e-maila i osobnej zgody', () => {
  assert.equal(validateNewsletter({}).ok, false);
  assert.equal(validateNewsletter({ email: 'jan@example.com', consent: '' }).ok, false);
  assert.equal(validateNewsletter({ email: 'NIE-EMAIL', consent: 'on' }).ok, false);
  const valid = validateNewsletter({ firstName: 'Anna', email: 'ANNA@EXAMPLE.COM', consent: 'on', website: '' });
  assert.equal(valid.ok, true);
  assert.equal(valid.data.email, 'anna@example.com');
  assert.equal(validateNewsletter({ email: 'spam@example.com', consent: 'on', website: 'bot' }).spam, true);
});

test('token double opt-in jest szyfrowany, wygasa i wykrywa modyfikacje', () => {
  const now = Date.UTC(2026, 8, 15, 12, 0, 0);
  const token = createNewsletterToken({ email: 'anna@example.com', firstName: 'Anna' }, secret, now);
  assert.doesNotMatch(token, /anna|example/i);
  const decoded = readNewsletterToken(token, secret, now + 1000);
  assert.equal(decoded.email, 'anna@example.com');
  assert.equal(decoded.firstName, 'Anna');
  assert.throws(() => readNewsletterToken(token, secret, now + 25 * 60 * 60 * 1000), /wygasł/);
  const index = Math.floor(token.length / 2);
  const tampered = token.slice(0, index) + (token[index] === 'A' ? 'B' : 'A') + token.slice(index + 1);
  assert.throws(() => readNewsletterToken(tampered, secret, now + 1000), /uszkodzony/);
});

test('potwierdzenie zapisuje istniejący kontakt w segmencie i temacie Resend', async () => {
  const token = createNewsletterToken({ email: 'anna@example.com', firstName: 'Anna' }, secret);
  const calls = [];
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url, init = {}) => {
    calls.push({ url: String(url), init });
    return new Response(null, { status: calls.length === 1 ? 409 : 200 });
  };
  try {
    const response = await handleNewsletterConfirmation(new Request('https://fundacjalepszydomlepszejutro.pl/api/newsletter/potwierdz', {
      method: 'POST',
      headers: { origin: 'https://fundacjalepszydomlepszejutro.pl', 'content-type': 'application/json' },
      body: JSON.stringify({ token }),
    }), {
      RESEND_API_KEY: 'test-key',
      NEWSLETTER_SIGNING_SECRET: secret,
      NEWSLETTER_SEGMENT_ID: 'segment-123',
      NEWSLETTER_TOPIC_ID: 'topic-123',
      CONTACT_ALLOWED_ORIGIN: 'https://fundacjalepszydomlepszejutro.pl',
    });
    assert.equal(response.status, 200);
    assert.equal(calls.length, 4);
    assert.match(calls[1].url, /\/contacts\/anna%40example\.com$/);
    assert.match(calls[2].url, /\/segments\/segment-123$/);
    assert.deepEqual(JSON.parse(calls[3].init.body), [{ id: 'topic-123', subscription: 'opt_in' }]);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('strona publikuje formularz i bezpieczne trasy newslettera', () => {
  const page = fs.readFileSync(new URL('../app/page.tsx', import.meta.url), 'utf8');
  const signup = fs.readFileSync(new URL('../components/newsletter-signup.tsx', import.meta.url), 'utf8');
  const confirm = fs.readFileSync(new URL('../components/newsletter-confirm.tsx', import.meta.url), 'utf8');
  const nginx = fs.readFileSync(new URL('../nginx.conf', import.meta.url), 'utf8');
  const privacy = fs.readFileSync(new URL('../polityka-prywatnosci.html', import.meta.url), 'utf8');
  assert.match(page, /<NewsletterSignup \/>/);
  assert.match(signup, /name="consent" type="checkbox" required/);
  assert.match(signup, /\/api\/newsletter/);
  assert.match(confirm, /\/api\/newsletter\/potwierdz/);
  assert.match(nginx, /location = \/api\/newsletter/);
  assert.match(nginx, /location = \/newsletter\/potwierdzono/);
  assert.match(nginx, /try_files \/dziekujemy\.html =404/);
  assert.match(nginx, /try_files \/newsletter\/potwierdz\.html =404/);
  assert.match(nginx, /try_files \/newsletter\/potwierdzono\.html =404/);
  assert.match(nginx, /port_in_redirect off/);
  assert.match(privacy, /<h2>Newsletter<\/h2>/);
  assert.match(privacy, /linkiem potwierdzającym/);
});

test('eksport sprawdza wszystkie strony procesu zapisu', () => {
  const validation = fs.readFileSync(new URL('../scripts/validate-export.mjs', import.meta.url), 'utf8');
  for (const path of ['dziekujemy.html', 'newsletter/potwierdz.html', 'newsletter/potwierdzono.html']) {
    assert.match(validation, new RegExp(path.replaceAll('/', '\\/').replaceAll('.', '\\.')));
  }
});
