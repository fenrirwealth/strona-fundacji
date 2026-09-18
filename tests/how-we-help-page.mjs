import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = path => fs.readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('strona Jak pomagamy sklada kompletna trase App Router', () => {
  const page = read('app/jak-pomagamy/page.tsx');
  for (const component of ['HelpHero', 'PillarsStack', 'JoinActionCTA']) assert.match(page, new RegExp(`<${component}\\s*\\/>`));
  assert.match(page, /canonical: '\/jak-pomagamy'/);
  assert.match(page, /<Header variant="dark"/);
  assert.match(page, /<Footer variant="dark"/);
});

test('hero pokazuje wymagany komunikat bez pionowej animacji wejscia', () => {
  const hero = read('components/how-we-help/HelpHero.tsx');
  assert.match(hero, /Pomoc przybiera.*wiele form\./s);
  assert.match(hero, /overflow-hidden/);
  assert.doesNotMatch(hero, /\by\s*:|staggerChildren|delayChildren/);
  assert.match(hero, /min-h-\[72svh\]/);
});

test('stacking cards korzystaja z GSAP ScrollTrigger i sticky layout', () => {
  const stack = read('components/how-we-help/PillarsStack.tsx');
  assert.match(stack, /ScrollTrigger/);
  assert.match(stack, /scrub: 0\.6/);
  assert.match(stack, /sticky top-\[12svh\]/);
  assert.match(stack, /filter: 'brightness\(\.62\)'/);
  for (const title of ['Wyprawka na lepsze jutro', 'Magiczne Święta', 'Wsparcie na co dzień']) assert.match(stack, new RegExp(title));
  for (const image of ['wyprawka-v1.webp', 'magiczne-swieta-v1.webp', 'wsparcie-na-co-dzien-v1.webp']) assert.match(stack, new RegExp(image.replace('.', '\\.')));
});

test('CTA prowadzi do darowizny i formularza wolontariatu', () => {
  const cta = read('components/how-we-help/JoinActionCTA.tsx');
  assert.match(cta, /Twoje wsparcie napędza te działania\./);
  assert.match(cta, /href="\/#wsparcie"/);
  assert.match(cta, /href="\/kontakt\?temat=wolontariat#formularz"/);
  assert.match(cta, /useReducedMotion/);
});

test('eksport i PageTransition traktują Jak pomagamy jako trase Next', () => {
  const finalize = read('scripts/finalize-export.mjs');
  const preservedFiles = finalize.match(/for \(const file of \[(.*?)\]\)/s);
  assert.ok(preservedFiles);
  assert.doesNotMatch(preservedFiles[1], /jak-pomagamy\.html/);
  assert.match(read('components/transitions/PageTransition.tsx'), /'\/jak-pomagamy'/);
  const workflow = read('.github/workflows/ci.yml');
  assert.match(workflow, /Pomoc przybiera wiele form/);
  assert.doesNotMatch(workflow, /Pomoc zaczyna się od konkretnej potrzeby/);
});
