import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const html = fs.readFileSync(new URL("../index.html", import.meta.url), "utf8");
const archive = fs.readFileSync(new URL("../archiwum.html", import.meta.url), "utf8");
const campaign = fs.readFileSync(new URL("../listy-do-swietego-mikolaja.html", import.meta.url), "utf8");
const about = fs.readFileSync(new URL("../o-fundacji.html", import.meta.url), "utf8");
const contact = fs.readFileSync(new URL("../kontakt.html", import.meta.url), "utf8");
const privacy = fs.readFileSync(new URL("../polityka-prywatnosci.html", import.meta.url), "utf8");
const sitemap = fs.readFileSync(new URL("../sitemap.xml", import.meta.url), "utf8");
const manifest = JSON.parse(fs.readFileSync(new URL("../site.webmanifest", import.meta.url), "utf8"));

const publicPages = [html, archive, campaign, about, contact, privacy];

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

test("strona akcji Mikolajowej opisuje tylko potwierdzony mechanizm", () => {
  assert.equal((campaign.match(/<h1(?:\s|>)/g) || []).length, 1);
  assert.match(campaign, /placówek opiekuńczo-wychowawczych/);
  assert.match(campaign, /Wybierz list/);
  assert.match(campaign, /Zarezerwuj go/);
  assert.match(campaign, /Przygotuj prezent/);
  assert.match(campaign, /https:\/\/portal\.fundacjalepszydomlepszejutro\.pl/);
  assert.match(campaign, /FAQPage/);
  assert.match(sitemap, /\/listy-do-swietego-mikolaja/);
  assert.doesNotMatch(campaign, /1[,.]5%/);
  assert.doesNotMatch(campaign, /działalno(?:ść|sci) gospodarcza.{0,30}(prowadzimy|prowadzi)/i);
});

test("strona O Fundacji zawiera tylko potwierdzone dane", () => {
  assert.equal((about.match(/<h1(?:\s|>)/g) || []).length, 1);
  assert.match(about, /17 maja 2022/);
  assert.match(about, /Złota 75A\/7/);
  assert.match(about, /KRS<\/dt><dd>0000971976/);
  assert.match(about, /nie wynajmujemy mieszkań, nie budujemy domów i nie prowadzimy remontów/);
  assert.match(about, /Fundacja nie prowadzi działalności gospodarczej/);
});

test("strona kontaktowa zawiera oficjalne dane kontaktowe", () => {
  assert.equal((contact.match(/<h1(?:\s|>)/g) || []).length, 1);
  assert.match(contact, /tel:\+48570747779/);
  assert.match(contact, /fundacjalepszydomlepszejutro@gmail\.com/);
  assert.match(contact, /Złota 75A\/7/);
  assert.doesNotMatch(contact, /<form/);
});

test("strona prywatnosci odpowiada faktycznemu kodowi strony", () => {
  assert.equal((privacy.match(/<h1(?:\s|>)/g) || []).length, 1);
  assert.match(privacy, /nie ma formularza kontaktowego/);
  assert.match(privacy, /nie ma narzędzi reklamowych ani systemu analitycznego/);
  assert.match(privacy, /krojów pisma dostępnych w systemie użytkownika/);
  assert.match(privacy, /Nie pobiera fontów z Google Fonts/);
  assert.match(privacy, /logi techniczne/i);
});

test("mapa strony zawiera strony informacyjne", () => {
  for (const path of ["/o-fundacji", "/kontakt", "/polityka-prywatnosci"]) {
    assert.match(sitemap, new RegExp(path.replaceAll("/", "\\/")));
  }
});

test("na stronach nie ma niepotwierdzonej informacji o 1,5 procent podatku", () => {
  for (const source of publicPages) assert.doesNotMatch(source, /1[,.]5\s*%/);
});

test("linki produkcyjne nie uzywaja niezabezpieczonego HTTP", () => {
  for (const source of publicPages) assert.doesNotMatch(source, /(?:href|src)="http:\/\//);
  assert.match(html, /https:\/\/portal\.fundacjalepszydomlepszejutro\.pl/);
});

test("manifest wskazuje ikony z obecnego logo", () => {
  assert.equal(manifest.icons.length, 2);
  assert.equal(manifest.icons[0].src, "/assets/icon-192.png");
  assert.equal(manifest.icons[1].src, "/assets/icon-512.png");
});
