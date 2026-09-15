import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const impact = fs.readFileSync(new URL('../lib/impact.ts', import.meta.url), 'utf8');
const component = fs.readFileSync(new URL('../components/impact.tsx', import.meta.url), 'utf8');
const layout = fs.readFileSync(new URL('../app/layout.tsx', import.meta.url), 'utf8');

test('strona publikuje zatwierdzone dane szacunkowe', () => {
  assert.match(impact, /value: 470/);
  assert.match(impact, /value: 60/);
  assert.match(impact, /value: 260/);
  assert.match(impact, /prefix: 'ok\. '/);
  assert.match(component, /Dane szacunkowe/);
  assert.doesNotMatch(component, /Dane demonstracyjne/);
});

test('strona może być indeksowana i opisuje Fundację jako NGO', () => {
  assert.match(layout, /robots: \{ index: true, follow: true/);
  assert.match(layout, /'@type': 'NGO'/);
});
