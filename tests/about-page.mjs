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

test('hero animuje slowa z rozmyciem i przesunieciem', () => {
  const hero = read('components/about/MissionHero.tsx');
  assert.match(hero, /Za.*każdą.*pomocą.*stoją.*ludzie\./s);
  assert.match(hero, /blur\(14px\)/);
  assert.match(hero, /y: reducedMotion \? 0 : 50/);
  assert.match(hero, /min-h-\[100svh\]/);
  assert.match(hero, /rodzina-cinematic-v1\.jpg/);
  assert.doesNotMatch(hero, /wolontariat-cinematic-v1\.jpg/);
});

test('cytat Prezesa ma poprawna tresc i podpis', () => {
  const quote = read('components/about/FounderQuote.tsx');
  assert.match(quote, /Nie zmienimy całego świata/);
  assert.match(quote, /Michał Synal/);
  assert.match(quote, /Prezes Zarządu/);
  assert.match(quote, /whileInView/);
});

test('timeline korzysta z GSAP ScrollTrigger i wszystkich kamieni milowych', () => {
  const timeline = read('components/about/InteractiveTimeline.tsx');
  assert.match(timeline, /ScrollTrigger/);
  assert.match(timeline, /scrub: 0\.6/);
  for (const year of ['2022', '2025', '2026']) assert.match(timeline, new RegExp(year));
  assert.match(timeline, /scaleY: 1/);
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
