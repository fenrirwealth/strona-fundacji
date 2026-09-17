import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { validateContact } from '../server/contact-api.mjs';

const campaigns = fs.readFileSync(new URL('../components/campaigns.tsx', import.meta.url), 'utf8');
const page = fs.readFileSync(new URL('../app/page.tsx', import.meta.url), 'utf8');
const siteJs = fs.readFileSync(new URL('../assets/site.js', import.meta.url), 'utf8');
const social = fs.readFileSync(new URL('../lib/social.ts', import.meta.url), 'utf8');
const nginx = fs.readFileSync(new URL('../nginx.conf', import.meta.url), 'utf8');
const helpPage = fs.readFileSync(new URL('../jak-pomagamy.html', import.meta.url), 'utf8');
const transparencyPage = fs.readFileSync(new URL('../przejrzystosc.html', import.meta.url), 'utf8');
const currentNeeds = fs.readFileSync(new URL('../components/current-needs.tsx', import.meta.url), 'utf8');
const thankYouPage = fs.readFileSync(new URL('../app/dziekujemy/page.tsx', import.meta.url), 'utf8');
const contactPage = fs.readFileSync(new URL('../app/kontakt/page.tsx', import.meta.url), 'utf8');
const contactInfo = fs.readFileSync(new URL('../components/contact/ContactInfo.tsx', import.meta.url), 'utf8');
const interactiveForm = fs.readFileSync(new URL('../components/contact/InteractiveForm.tsx', import.meta.url), 'utf8');
const finalizeExport = fs.readFileSync(new URL('../scripts/finalize-export.mjs', import.meta.url), 'utf8');

test('wezwania do pomocy prowadza do formularza z wybranym tematem', () => {
  assert.doesNotMatch(campaigns, /mailto:/);
  assert.match(campaigns, /\/kontakt\?temat=\$\{topics/);
  assert.match(page, /\/kontakt\?temat=chce-pomoc#formularz/);
  assert.doesNotMatch(helpPage, /mailto:/);
  assert.match(helpPage, /\/kontakt\?temat=wolontariat#formularz/);
  assert.doesNotMatch(transparencyPage, /mailto:/);
  assert.match(transparencyPage, /\/kontakt\?temat=dokumenty#formularz/);
});

test('kontakt jest trasa App Router ze split-screen i pelnymi danymi Fundacji', () => {
  assert.match(contactPage, /canonical: '\/kontakt'/);
  assert.match(contactPage, /min-h-screen bg-\[#050505\] text-white flex flex-col lg:flex-row/);
  assert.match(contactPage, /overflow-x-hidden relative/);
  assert.match(contactPage, /w-full lg:w-1\/2 p-6 lg:p-16 flex flex-col justify-center/);
  assert.match(contactPage, /w-full lg:w-1\/2 p-6 lg:p-16 flex items-center justify-center relative z-10/);
  assert.match(contactPage, /<ContactInfo \/>/);
  assert.match(contactPage, /<InteractiveForm \/>/);
  assert.match(contactInfo, /kontakt@fundacjalepszydomlepszejutro\.pl|foundation\.email/);
  assert.match(contactInfo, /\+48570747779/);
  assert.match(contactInfo, /ul\. \$\{foundation\.address\}/);
  assert.doesNotMatch(finalizeExport, /'kontakt\.html'/);
});

test('formularz konwersacyjny ma wymagane pola, walidacje i stan sukcesu', () => {
  assert.match(interactiveForm, /Cześć, mam na imię/);
  assert.match(interactiveForm, /Wsparciu zbiórki/);
  assert.match(interactiveForm, /Wolontariacie/);
  assert.match(interactiveForm, /Przekazaniu darów/);
  assert.match(interactiveForm, /event\.preventDefault\(\)/);
  assert.match(interactiveForm, /Wiadomość wysłana\./);
  assert.match(interactiveForm, /Dziękujemy za Twój krok w stronę lepszego jutra!/);
  assert.match(interactiveForm, /aria-live="polite"/);
  assert.match(interactiveForm, /polityka-prywatnosci/);
  assert.match(interactiveForm, /topicFromQuery/);
  assert.match(interactiveForm, /flex min-w-0 flex-wrap items-baseline/);
  assert.match(interactiveForm, /inline-block min-w-\[120px\] max-w-full/);
  assert.match(interactiveForm, /backdrop-blur-md/);
  assert.match(contactInfo, /break-all/);
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

test('formularz odrzuca błędne typy oraz odziedziczone nazwy tematów', () => {
  const valid = { name: 'Jan', email: 'jan@example.com', topic: 'inne', message: 'Pytanie o wolontariat.', consent: 'on' };
  for (const input of [null, [], 'tekst', 123, { ...valid, name: {} }, { ...valid, email: ['jan@example.com'] }, { ...valid, topic: 'constructor' }, { ...valid, topic: '__proto__' }]) {
    assert.equal(validateContact(input).ok, false);
  }
  assert.equal(validateContact({ ...valid, message: 'a'.repeat(3001) }).ok, false);
  assert.equal(validateContact({ ...valid, consent: '' }).ok, false);
  assert.equal(validateContact({ ...valid, website: 'spam.example' }).spam, true);
});


test('strona pokazuje bieżące potrzeby i potwierdzenie wysłania', () => {
  assert.match(currentNeeds, /Aktualnie/);
  assert.match(currentNeeds, /Potwierdź przed przekazaniem/);
  assert.match(currentNeeds, /temat=biezace-potrzeby#formularz/);
  assert.match(thankYouPage, /Dziękujemy/);
  assert.match(thankYouPage, /index: false/);
});
