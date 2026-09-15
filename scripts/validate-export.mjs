import { readFileSync, existsSync } from 'node:fs';
import assert from 'node:assert/strict';
const html = readFileSync('out/index.html', 'utf8');
assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1);
assert.doesNotMatch(html, /Dane demonstracyjne|Przykładowy wskaźnik/);
assert.match(html, /name="robots" content="index, follow/);
assert.match(html, /"@type":"NGO"/);
assert.match(html, /counter-prefix">ok\. <\/span>470/);
assert.match(html, /counter-prefix">ok\. <\/span>260/);
assert.match(html, /Wyprawka na lepsze jutro/);
assert.match(html, /Magiczne Święta/);
assert.match(html, /portal\.fundacjalepszydomlepszejutro\.pl/);
assert.doesNotMatch(html, /fonts\.(googleapis|gstatic)\.com/);
for (const [, url] of html.matchAll(/(?:src|href)="(\/[^"#?]*)"/g)) {
  assert.ok(['out' + url, 'out' + url + '.html', 'out' + url + '/index.html'].some(existsSync), `Missing exported resource: ${url}`);
}
for (const file of ['archiwum.html', 'o-fundacji.html', 'kontakt.html', 'polityka-prywatnosci.html', 'listy-do-swietego-mikolaja.html', 'archiwum/plecak-pelen-odwagi/index.html']) assert.ok(existsSync('out/' + file));
console.log('Export checked: content, preview labels, local assets and existing routes.');
