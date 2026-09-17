import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('strona aktualności ma kompletne dane redakcyjne i SEO', () => {
  const page = read('app/aktualnosci/page.tsx');
  assert.match(page, /alternates: \{ canonical: '\/aktualnosci' \}/);
  assert.match(page, /Wyprawka szkolna\. Zbiórka w Polish Airports Academy zakończona\./);
  assert.match(page, /Wyprawka na lepsze jutro z Turbaza Studio/);
  assert.match(page, /Wielkanocny Zajączek dla dzieci z onkologii/);
  assert.match(page, /Magiczne Święta: 4\. edycja kampanii/);
  assert.match(page, /<NewsFeatured news=\{featuredNews\}/);
  assert.match(page, /<NewsFilter>/);
  assert.match(page, /<NewsGrid items=\{newsItems\}/);
});

test('hero aktualności ma kinowe zdjęcie, animację i prawdziwy link', () => {
  const featured = read('components/news/NewsFeatured.tsx');
  assert.match(featured, /min-h-\[80svh\]/);
  assert.match(featured, /staggerChildren/);
  assert.match(featured, /filter: 'blur\(10px\)'/);
  assert.match(featured, /Czytaj relację/);
  assert.match(featured, /<Image/);
  assert.match(featured, /<Link href=\{news\.href\}/);
});

test('filtry i magazynowa siatka są interaktywne', () => {
  const filter = read('components/news/NewsFilter.tsx');
  const grid = read('components/news/NewsGrid.tsx');
  assert.match(filter, /'Wszystkie', 'Akcje Szkolne', 'Święta', 'Współprace'/);
  assert.match(filter, /layoutId="active-news-filter"/);
  assert.match(filter, /aria-pressed=\{isActive\}/);
  assert.match(grid, /md:grid-cols-12/);
  assert.match(grid, /md:col-span-7 lg:col-span-8/);
  assert.match(grid, /md:col-span-5 lg:col-span-4/);
  assert.match(grid, /useNewsFilter\(\)/);
  assert.match(grid, /AnimatePresence mode="popLayout"/);
});

test('karta ma efekt obrazu i magnetyczny wskaźnik', () => {
  const card = read('components/news/NewsCard.tsx');
  assert.match(card, /group-hover:scale-105/);
  assert.match(card, /group-hover:brightness-\[\.82\]/);
  assert.match(card, /onPointerMove=\{handlePointerMove\}/);
  assert.match(card, /useSpring/);
  assert.match(card, /ScrollTrigger/);
  assert.match(card, /scrub: 0\.7/);
  assert.match(card, />Odkryj /);
});

test('nowy indeks aktualności zastępuje statyczny, a relacje pozostają kopiowane', () => {
  const finalize = read('scripts/finalize-export.mjs');
  const transitions = read('components/transitions/PageTransition.tsx');
  const workflow = read('.github/workflows/ci.yml');
  assert.doesNotMatch(finalize, /\['aktualnosci\.html'/);
  assert.match(finalize, /cpSync\('aktualnosci', 'out\/aktualnosci'/);
  assert.match(transitions, /'\/aktualnosci'/);
  assert.match(workflow, /Wyprawka szkolna\. Zbiórka w Polish Airports Academy zakończona\./);
});
