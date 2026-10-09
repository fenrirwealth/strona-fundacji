import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { handleAuthStart, handleAuthCallback } from '../server/oauth.mjs';
import { parsePost, getPosts, renderMarkdown } from '../lib/news-content.mjs';

const env = { GITHUB_OAUTH_CLIENT_ID: 'id123', GITHUB_OAUTH_CLIENT_SECRET: 'secret456' };
const base = 'https://fundacjalepszydomlepszejutro.pl';

test('start logowania przekierowuje do GitHuba ze stanem w ciasteczku', () => {
  const res = handleAuthStart(new Request(`${base}/api/auth`), env);
  assert.equal(res.status, 302);
  const url = new URL(res.headers.get('location'));
  assert.equal(url.origin + url.pathname, 'https://github.com/login/oauth/authorize');
  assert.equal(url.searchParams.get('client_id'), 'id123');
  const state = url.searchParams.get('state');
  assert.match(res.headers.get('set-cookie'), new RegExp(`oauth_state=${state}`));
  assert.match(res.headers.get('set-cookie'), /HttpOnly/);
});

test('bez konfiguracji logowanie zwraca czytelny błąd', () => {
  const res = handleAuthStart(new Request(`${base}/api/auth`), {});
  assert.match(res.headers.get('location'), /^\/admin\/#error=/);
});

test('callback odrzuca zły stan', async () => {
  const res = await handleAuthCallback(new Request(`${base}/api/auth/callback?code=c&state=zly`, { headers: { cookie: 'oauth_state=inny' } }), env, async () => { throw new Error('nie powinno być wywołane'); });
  assert.match(res.headers.get('location'), /error=/);
});

test('callback wymienia kod na token i nie ujawnia sekretu', async () => {
  let sent;
  const res = await handleAuthCallback(new Request(`${base}/api/auth/callback?code=c&state=abc`, { headers: { cookie: 'oauth_state=abc' } }), env, async (_url, init) => {
    sent = JSON.parse(init.body);
    return new Response(JSON.stringify({ access_token: 'gho_tok' }));
  });
  assert.equal(sent.code, 'c');
  assert.equal(res.headers.get('location'), '/admin/#token=gho_tok');
  assert.ok(!res.headers.get('location').includes('secret456'));
});

test('parsowanie wpisu: szkic pomijany, HTML usunięty, filtry ograniczone', () => {
  assert.equal(parsePost('---\ntitle: A\ndate: 2026-10-01\ndraft: true\n---\nx', 'a'), null);
  const post = parsePost('---\ntitle: Test\ndate: 2026-10-01\nfilters: [Święta, Hack]\nexcerpt: e\nimage: /assets/x.webp\n---\nTekst <script>alert(1)</script> [zły](javascript:alert(1)) [ok](https://a.pl)', 'test');
  assert.deepEqual(post.filters, ['Święta']);
  assert.ok(!post.bodyHtml.includes('<script'));
  assert.ok(!post.bodyHtml.includes('javascript:'));
  assert.ok(post.bodyHtml.includes('rel="noopener noreferrer"'));
});

test('getPosts sortuje od najnowszego i ignoruje nieprawidłowe nazwy plików', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'posts-'));
  fs.writeFileSync(path.join(dir, 'stary.md'), '---\ntitle: Stary\ndate: 2026-01-01\n---\nx');
  fs.writeFileSync(path.join(dir, 'nowy.md'), '---\ntitle: Nowy\ndate: 2026-05-01\n---\nx');
  fs.writeFileSync(path.join(dir, 'Zły Plik.md'), '---\ntitle: Zły\ndate: 2026-06-01\n---\nx');
  assert.deepEqual(getPosts(dir, dir).map(p => p.slug), ['nowy', 'stary']);
  assert.equal(renderMarkdown('**a**').trim(), '<p><strong>a</strong></p>');
});

test('konfiguracja panelu i nginx są spójne', () => {
  const config = fs.readFileSync(new URL('../admin/config.yml', import.meta.url), 'utf8');
  assert.match(config, /name: github/);
  assert.match(config, /repo: fenrirwealth\/strona-fundacji/);
  assert.match(config, /folder: content\/aktualnosci/);
  const nginx = fs.readFileSync(new URL('../nginx.conf', import.meta.url), 'utf8');
  assert.match(nginx, /location = \/api\/auth\/callback/);
  assert.match(nginx, /location \^~ \/admin\//);
  assert.match(nginx, /X-Robots-Tag "noindex/);
});

test('stara domena .com przekierowuje na .pl z zachowaniem ścieżki', () => {
  const nginx = fs.readFileSync(new URL('../nginx.conf', import.meta.url), 'utf8');
  assert.match(nginx, /\(www\\\.\)\?fundacjalepszydomlepszejutro\\\.com\$/);
  assert.match(nginx, /return 301 https:\/\/fundacjalepszydomlepszejutro\.pl\$request_uri;/);
});
