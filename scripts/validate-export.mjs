import { readFileSync, existsSync } from 'node:fs';
import assert from 'node:assert/strict';
const html = readFileSync('out/index.html', 'utf8');
assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1);
assert.doesNotMatch(html, /Dane demonstracyjne|Przykładowy wskaźnik/);
assert.match(html, /name="robots" content="index, follow/);
assert.match(html, /"@type":"NGO"/);
assert.match(html, />470\+<\/dd>/);
assert.match(html, />260 tys\. zł<\/dd>/);
assert.match(html, /Prawdziwa zmiana zaczyna się od zauważenia człowieka/);
assert.match(html, /Wesprzyj naszą misję/);
assert.match(html, /51 1090 2590 0000 0001 5074 2996/);
assert.match(html, /wolontariat-cinematic-v1\.jpg/);
assert.match(html, /rodzina-cinematic-v1\.jpg/);
assert.match(html, /portal\.fundacjalepszydomlepszejutro\.pl/);
assert.doesNotMatch(html, /fonts\.(googleapis|gstatic)\.com/);
for (const [, url] of html.matchAll(/(?:src|href)="(\/[^"#?]*)"/g)) {
  assert.ok(['out' + url, 'out' + url + '.html', 'out' + url + '/index.html'].some(existsSync), `Missing exported resource: ${url}`);
}
for (const file of [
  'archiwum.html',
  'o-fundacji.html',
  'kontakt.html',
  'polityka-prywatnosci.html',
  'listy-do-swietego-mikolaja.html',
  'archiwum/plecak-pelen-odwagi/index.html',
  'dziekujemy.html',
  'newsletter/potwierdz.html',
  'newsletter/potwierdzono.html',
]) assert.ok(existsSync('out/' + file), `Missing exported page: ${file}`);
console.log('Export checked: content, preview labels, local assets and existing routes.');
