import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = path => fs.readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('kinowa strona glowna sklada wymagane sekcje i zachowuje newsletter', () => {
  const page = read('app/page.tsx');
  for (const component of ['CinematicBackground', 'Hero', 'StoryGrid', 'DonationCard', 'NewsletterSignup', 'Partners']) {
    assert.match(page, new RegExp(`<${component}(?:\\s|\\s*\\/)`));
  }
});

test('tlo WebGL wykorzystuje lokalny system zlotych czasteczek', () => {
  const background = read('components/webgl/CinematicBackground.tsx');
  assert.match(background, /<Canvas/);
  assert.match(background, /THREE\.AdditiveBlending/);
  assert.match(background, /state\.pointer/);
  assert.match(background, /PARTICLE_COUNT = 1_050/);
});

test('karta darowizny publikuje poprawny rachunek i bezpieczne kopiowanie', () => {
  const donation = read('components/DonationCard.tsx');
  assert.match(donation, /51 1090 2590 0000 0001 5074 2996/);
  assert.match(donation, /navigator\.clipboard\.writeText/);
  assert.match(donation, /3_000/);
  assert.match(donation, /Skopiowano\. Dziękujemy!/);
  assert.match(donation, /<PaymentGateway \/>/);
});

test('Lenis jest zsynchronizowany z GSAP i respektuje ograniczenie animacji', () => {
  const smoothScroll = read('components/SmoothScroll.tsx');
  assert.match(smoothScroll, /ScrollTrigger\.update/);
  assert.match(smoothScroll, /gsap\.ticker\.add/);
  assert.match(smoothScroll, /useReducedMotion/);
  assert.match(smoothScroll, /pointer: fine/);
});

test('siatka historii korzysta z lokalnych zdjec i responsywnego bento', () => {
  const grid = read('components/StoryGrid.tsx');
  assert.match(grid, /wolontariat-cinematic-v1\.jpg/);
  assert.match(grid, /rodzina-cinematic-v1\.jpg/);
  assert.match(grid, /md:grid-cols-12/);
  assert.match(grid, /group-hover:scale-105/);
});
