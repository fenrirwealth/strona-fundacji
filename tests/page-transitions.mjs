import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = path => fs.readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('PageTransition renderuje nowy widok natychmiast bez animacji wyjścia', () => {
  const transition = read('components/transitions/PageTransition.tsx');
  assert.match(transition, /router\.push\(nextHref, \{ scroll: true \}\)/);
  assert.match(transition, /\{children\}/);
  assert.doesNotMatch(transition, /AnimatePresence|\bexit=|useAnimationControls|await .*start/);
  assert.doesNotMatch(transition, /\by\s*:/);
  assert.match(transition, /'\/kontakt'/);
});

test('zmiana podstrony zawsze resetuje przewijanie do początku', () => {
  const smoothScroll = read('components/SmoothScroll.tsx');
  const staticScript = read('assets/site.js');
  assert.match(smoothScroll, /usePathname\(\)/);
  assert.match(smoothScroll, /scrollRestoration = 'manual'/);
  assert.match(smoothScroll, /lenisRef\.current\?\.scrollTo\(0, \{ immediate: true, force: true \}\)/);
  assert.match(smoothScroll, /window\.scrollTo\(\{ top: 0, left: 0, behavior: 'auto' \}\)/);
  assert.match(staticScript, /history\.scrollRestoration='manual'/);
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

test('statyczne podstrony nie opozniaja nawigacji kurtyna', () => {
  const script = read('assets/site.js');
  const styles = read('assets/site.css');
  assert.match(script, /navigateImmediately/);
  assert.doesNotMatch(script, /navigateWithCurtain|transitionDestination|pageNavigationPending|setTimeout\([^\n]*(location|navigate)/);
  assert.doesNotMatch(styles, /\.static-page-curtain|data-page-transition/);
});
