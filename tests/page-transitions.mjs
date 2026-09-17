import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = path => fs.readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('PageTransition korzysta z pathname i sekwencyjnego AnimatePresence', () => {
  const transition = read('components/transitions/PageTransition.tsx');
  assert.match(transition, /usePathname/);
  assert.match(transition, /<AnimatePresence mode="wait">/);
  assert.match(transition, /key=\{pathname\}/);
  assert.match(transition, /fixed inset-0 z-\[9999\]/);
  assert.match(transition, /y: '100%'/);
  assert.match(transition, /y: '0%'/);
  assert.match(transition, /y: '-100%'/);
  assert.match(transition, /0\.22, 1, 0\.36, 1/);
  assert.match(transition, /'\/kontakt'/);
});

test('globalny provider zachowuje Lenis i owija zawartosc w PageTransition', () => {
  const provider = read('components/experience-provider.tsx');
  assert.match(provider, /<SmoothScroll><PageTransition>\{children\}<\/PageTransition><\/SmoothScroll>/);
  assert.match(provider, /MotionConfig reducedMotion="user"/);
});

test('NavLink odroznia kotwice, linki zewnetrzne i zmodyfikowane klikniecia', () => {
  const navLink = read('components/ui/NavLink.tsx');
  assert.match(navLink, /usePageTransitionNavigation/);
  assert.match(navLink, /event\.metaKey/);
  assert.match(navLink, /href\.startsWith\('#'\)/);
  assert.match(navLink, /destination\.origin !== window\.location\.origin/);
  assert.match(navLink, /event\.preventDefault\(\)/);
});

test('statyczne podstrony otrzymuja zgodna kurtyne i obsluge bfcache', () => {
  const script = read('assets/site.js');
  const styles = read('assets/site.css');
  assert.match(script, /navigateWithCurtain/);
  assert.match(script, /transitionDestination/);
  assert.match(script, /event\.persisted/);
  assert.match(script, /prefers-reduced-motion: reduce/);
  assert.match(styles, /\.static-page-curtain/);
  assert.match(styles, /\.is-ready\.is-covering/);
  assert.match(styles, /cubic-bezier\(\.22,1,\.36,1\)/);
});
