import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('strona aktualności ma kompletne dane redakcyjne i SEO', () => {
  const page = read('app/aktualnosci/page.tsx');
  assert.match(page, /alternates: \{ canonical: '\/aktualnosci' \}/);
  assert.match(page, /Wyprawka szkolna\. Zbiórka w Polish Airports Academy zakończona\./);
  assert.match(page, /Wyprawka na lepsze jutro z Turbaza Studio/);
  assert.doesNotMatch(page, /Wielkanocny Zajączek dla dzieci z onkologii/);
  assert.match(page, /Dzięki Wam 169 dzieci otrzymało wymarzone prezenty/);
  assert.match(page, /18 placówek oraz rodzin zastępczych/);
  assert.match(page, /\/aktualnosci\/swieta-2025/);
  assert.match(page, /<NewsFeatured news=\{featuredNews\}/);
  assert.match(page, /<NewsFilter>/);
  assert.match(page, /<NewsGrid items=\{newsItems\}/);
});

test('hero aktualności ma kinowe zdjęcie, natychmiastowa tresc i prawdziwy link', () => {
  const featured = read('components/news/NewsFeatured.tsx');
  assert.match(featured, /min-h-\[80svh\]/);
  assert.doesNotMatch(featured, /staggerChildren|delayChildren|\by\s*:/);
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
  assert.doesNotMatch(grid, /AnimatePresence|\bexit=/);
});

test('karta ma efekt obrazu bez zasłaniającego treść wskaźnika', () => {
  const card = read('components/news/NewsCard.tsx');
  assert.match(card, /group-hover:scale-105/);
  assert.match(card, /group-hover:brightness-\[\.82\]/);
  assert.doesNotMatch(card, /ScrollTrigger|yPercent/);
  assert.doesNotMatch(card, />Odkryj /);
  assert.doesNotMatch(card, /useSpring/);
  assert.match(card, /Czytaj relację/);
  assert.match(card, /<Link href=\{item\.href\}/);
});

test('relacja Święta 2025 zawiera pełne podziękowanie i nową grafikę', () => {
  const article = read('app/aktualnosci/swieta-2025/page.tsx');
  assert.match(article, /169 dzieci/);
  assert.match(article, /18 placówek oraz rodzin zastępczych/);
  assert.match(article, /telefony o późnych porach/);
  assert.match(article, /nerwy ze stali/);
  assert.match(article, /Ta pomoc miała swój blask/);
  assert.match(article, /swieta-2025-169-dzieci\.jpg/);
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
