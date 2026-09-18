import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (path) => fs.readFileSync(new URL(path, import.meta.url), 'utf8');
const page = read('../app/archiwum/page.tsx');
const hero = read('../components/archive/ArchiveHero.tsx');
const filmstrip = read('../components/archive/HybridFilmstrip.tsx');
const card = read('../components/archive/ArchiveCard.tsx');
const finalizeExport = read('../scripts/finalize-export.mjs');
const transition = read('../components/transitions/PageTransition.tsx');

test('Archiwum jest kompletna trasa App Router', () => {
  assert.match(page, /canonical: '\/archiwum'/);
  assert.match(page, /bg-\[#050505\] min-h-screen text-white overflow-hidden/);
  assert.match(page, /<ArchiveHero \/>/);
  assert.match(page, /<HybridFilmstrip \/>/);
  assert.doesNotMatch(finalizeExport, /\['archiwum\.html'/);
  assert.match(transition, /'\/archiwum'/);
});

test('hero Archiwum ma kinowa typografie i wskaznik przewijania', () => {
  assert.match(hero, /min-h-\[70vh\]/);
  assert.match(hero, /lg:min-h-screen/);
  assert.match(hero, /Zapisane w czasie\./);
  assert.match(hero, /Każda akcja to setki uśmiechów\. Przeżyjmy to jeszcze raz\./);
  assert.match(hero, /ArrowDown/);
  assert.match(hero, /to-\[#050505\]/);
});

test('filmstrip przelacza animacje przez useGSAP i matchMedia', () => {
  assert.match(filmstrip, /from '@gsap\/react'/);
  assert.match(filmstrip, /useGSAP\(/);
  assert.match(filmstrip, /gsap\.matchMedia\(\)/);
  assert.match(filmstrip, /max-width: 1023px/);
  assert.match(filmstrip, /min-width: 1024px/);
  assert.match(filmstrip, /pin: true/);
  assert.match(filmstrip, /xPercent: getXPercent/);
  assert.match(filmstrip, /gsap\.quickSetter/);
  assert.match(filmstrip, /gsap\.utils\.clamp\(-10, 10\)/);
  assert.match(filmstrip, /y: 50, opacity: 0/);
});

test('filmstrip publikuje wskazane trzy akcje', () => {
  assert.match(filmstrip, /Zbiórka w Polish Airports Academy/);
  assert.match(filmstrip, /Wielkanocny Zajączek/);
  assert.match(filmstrip, /4\. Edycja Magicznych Świąt/);
  assert.equal((filmstrip.match(/year: '/g) || []).length, 3);
});

test('karta ma responsywne wymiary i bezpieczne warstwy', () => {
  assert.match(card, /h-\[500px\].*w-full max-w-\[400px\]/);
  assert.match(card, /lg:h-\[650px\] lg:w-\[450px\]/);
  assert.match(card, /object-cover grayscale brightness-\[0\.4\]/);
  assert.match(card, /duration-700/);
  assert.match(card, /lg:group-hover:scale-105/);
  assert.match(card, /z-30/);
});
