import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { validateContact } from '../server/contact-api.mjs';

const campaigns = fs.readFileSync(new URL('../components/campaigns.tsx', import.meta.url), 'utf8');
const page = fs.readFileSync(new URL('../app/page.tsx', import.meta.url), 'utf8');
const siteJs = fs.readFileSync(new URL('../assets/site.js', import.meta.url), 'utf8');
const social = fs.readFileSync(new URL('../lib/social.ts', import.meta.url), 'utf8');
const nginx = fs.readFileSync(new URL('../nginx.conf', import.meta.url), 'utf8');

test('wezwania do pomocy prowadza do formularza z wybranym tematem', () => {
  assert.doesNotMatch(campaigns, /mailto:/);
  assert.match(campaigns, /\/kontakt\?temat=\$\{topics/);
  assert.match(page, /\/kontakt\?temat=chce-pomoc#formularz/);
});

test('formularz zawiera szybki telefon, zgode i komunikaty statusu', () => {
  assert.match(siteJs, /Masz szybkie pytanie\?/);
  assert.match(siteJs, /data-contact-form/);
  assert.match(siteJs, /polityka-prywatnosci/);
  assert.match(siteJs, /aria-live="polite"/);
  assert.match(nginx, /location = \/api\/kontakt/);
});

test('walidacja odrzuca niepelna wiadomosc i akceptuje poprawna', () => {
  assert.equal(validateContact({}).ok, false);
  const valid = validateContact({ name: 'Jan Kowalski', email: 'jan@example.com', topic: 'chce-pomoc', message: 'Chcę pomóc jako wolontariusz.', consent: 'on', website: '' });
  assert.equal(valid.ok, true);
  assert.equal(valid.spam, false);
});

test('publikowane sa tylko zweryfikowane profile spolecznosciowe', () => {
  assert.match(social, /facebook\.com\/LEPSZYDOMLEPSZEJUTRO/);
  assert.match(social, /instagram\.com\/lepszy_dom_lepsze_jutro/);
  assert.doesNotMatch(social, /tiktok\.com/);
});
