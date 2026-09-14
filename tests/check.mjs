import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const html = fs.readFileSync(new URL("../index.html", import.meta.url), "utf8");

test("strona ma podstawowe metadane i jeden naglowek glowny", () => {
  assert.match(html, /<html lang="pl">/);
  assert.match(html, /<meta name="description"/);
  assert.match(html, /<link rel="canonical"/);
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1);
});

test("dane strukturalne organizacji sa poprawnym JSON", () => {
  const blok = html.match(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/);
  assert.ok(blok, "brak danych JSON-LD");
  const dane = JSON.parse(blok[1]);
  assert.equal(dane["@type"], "NGO");
  assert.equal(dane.identifier, "KRS 0000971976");
});

test("linki produkcyjne nie uzywaja niezabezpieczonego HTTP", () => {
  assert.doesNotMatch(html, /(?:href|src)="http:\/\//);
  assert.match(html, /https:\/\/portal\.fundacjalepszydomlepszejutro\.pl/);
});
