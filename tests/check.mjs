import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const html = fs.readFileSync(new URL("../index.html", import.meta.url), "utf8");
const archive = fs.readFileSync(new URL("../archiwum.html", import.meta.url), "utf8");
const sitemap = fs.readFileSync(new URL("../sitemap.xml", import.meta.url), "utf8");
const manifest = JSON.parse(fs.readFileSync(new URL("../site.webmanifest", import.meta.url), "utf8"));

test("strona ma podstawowe metadane i jeden naglowek glowny", () => {
  assert.match(html, /<html lang="pl">/);
  assert.match(html, /<meta name="description"/);
  assert.match(html, /<link rel="canonical"/);
  assert.match(html, /<meta property="og:image"/);
  assert.match(html, /<meta name="twitter:card" content="summary_large_image"/);
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1);
});

test("dane strukturalne organizacji sa poprawnym JSON", () => {
  const blok = html.match(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/);
  assert.ok(blok, "brak danych JSON-LD");
  const dane = JSON.parse(blok[1]);
  assert.equal(dane["@type"], "NGO");
  assert.equal(dane.identifier, "KRS 0000971976");
  assert.match(dane.logo, /logo-fundacji\.webp$/);
});

test("produkcja korzysta z obecnego logo i lokalnych materialow", () => {
  assert.match(html, /\/assets\/logo-fundacji\.webp/);
  assert.match(html, /\/assets\/archiwum\/swiateczne-paczki\.webp/);
  assert.doesNotMatch(html, /horizons-cdn\.hostinger\.com/);
  assert.doesNotMatch(archive, /horizons-cdn\.hostinger\.com/);
});

test("linkowanie archiwum jest kompletne", () => {
  for (const path of [
    "/archiwum/swiateczne-paczki",
    "/archiwum/plecak-pelen-odwagi",
    "/archiwum/pomoc-po-powodzi",
    "/archiwum/zebrane-dary",
    "/archiwum/za-kulisami-dzialan"
  ]) {
    assert.match(archive, new RegExp(path.replaceAll("/", "\\/")));
    assert.match(sitemap, new RegExp(path.replaceAll("/", "\\/")));
  }
});

test("linki produkcyjne nie uzywaja niezabezpieczonego HTTP", () => {
  assert.doesNotMatch(html, /(?:href|src)="http:\/\//);
  assert.match(html, /https:\/\/portal\.fundacjalepszydomlepszejutro\.pl/);
});

test("manifest wskazuje ikony z obecnego logo", () => {
  assert.equal(manifest.icons.length, 2);
  assert.equal(manifest.icons[0].src, "/assets/icon-192.png");
  assert.equal(manifest.icons[1].src, "/assets/icon-512.png");
});
