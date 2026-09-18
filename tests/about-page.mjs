import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = path => fs.readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('podstrona O Fundacji sklada kompletna historie i metadane', () => {
  const page = read('app/o-fundacji/page.tsx');
  for (const component of ['MissionHero', 'FounderQuote', 'InteractiveTimeline', 'ValuesGrid']) {
    assert.match(page, new RegExp(`<${component}\\s*\\/>`));
  }
  assert.match(page, /canonical: '\/o-fundacji'/);
  assert.match(page, /<Header variant="dark"/);
  assert.match(page, /<Footer variant="dark"/);
});

test('hero renderuje kompletna tresc bez pionowej animacji wejscia', () => {
  const hero = read('components/about/MissionHero.tsx');
  assert.match(hero, /Za.*każdą.*pomocą.*stoją.*ludzie\./s);
  assert.doesNotMatch(hero, /\by\s*:|staggerChildren|delayChildren/);
  assert.match(hero, /min-h-\[100svh\]/);
  assert.match(hero, /rodzina-cinematic-v1\.jpg/);
  assert.doesNotMatch(hero, /wolontariat-cinematic-v1\.jpg/);
  for (const area of ['Dzieci i młodzież', 'Rodziny', 'Placówki', 'Pomoc kryzysowa']) assert.match(hero, new RegExp(area));
});

test('cytat Prezesa ma poprawna tresc i podpis', () => {
  const quote = read('components/about/FounderQuote.tsx');
  assert.match(quote, /Nie zmienimy całego świata/);
  assert.match(quote, /Michał Synal/);
  assert.match(quote, /Prezes Zarządu/);
  assert.doesNotMatch(quote, /whileInView|\by\s*:/);
});

test('timeline jest widoczny natychmiast i zawiera wszystkie kamienie milowe', () => {
  const timeline = read('components/about/InteractiveTimeline.tsx');
  assert.doesNotMatch(timeline, /ScrollTrigger|gsap|scaleY|\by\s*:/);
  for (const year of ['2022', '2025', '2026']) assert.match(timeline, new RegExp(year));
  assert.match(timeline, /klęskach żywiołowych/);
});

test('opis misji pokazuje szeroki i potwierdzony zakres pomocy', () => {
  const page = read('app/o-fundacji/page.tsx');
  const values = read('components/about/ValuesGrid.tsx');
  assert.match(page, /dzieci, rodziny i placówki/);
  assert.match(page, /kryzysami i skutkami klęsk żywiołowych/);
  assert.match(values, /reakcję na kryzysy i skutki klęsk żywiołowych/);
});

test('bento wartosci posiada glassmorphism i interaktywny tilt', () => {
  const values = read('components/about/ValuesGrid.tsx');
  for (const value of ['Transparentność', 'Bezpośrednia Pomoc', 'Zaangażowanie']) assert.match(values, new RegExp(value));
  assert.match(values, /useMotionValue/);
  assert.match(values, /rotateX/);
  assert.match(values, /backdrop-blur-glass/);
});

test('eksport nie nadpisuje nowej trasy starszym statycznym HTML', () => {
  const finalize = read('scripts/finalize-export.mjs');
  const preservedFiles = finalize.match(/for \(const file of \[(.*?)\]\)/s);
  assert.ok(preservedFiles);
  assert.doesNotMatch(preservedFiles[1], /o-fundacji\.html/);
});

test('PageTransition traktuje O Fundacji jako trase App Router', () => {
  const transition = read('components/transitions/PageTransition.tsx');
  assert.match(transition, /'\/o-fundacji'/);
});
