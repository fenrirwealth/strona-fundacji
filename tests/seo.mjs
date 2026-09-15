import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const DOMAIN = "https://fundacjalepszydomlepszejutro.pl";
const read = (path) => fs.readFileSync(new URL(path, import.meta.url), "utf8");

const sitemap = read("../sitemap.xml");
const robots = read("../robots.txt");
const notFound = read("../404.html");

const pages = [
  ["/", "../index.html"],
  ["/o-fundacji", "../o-fundacji.html"],
  ["/kontakt", "../kontakt.html"],
  ["/polityka-prywatnosci", "../polityka-prywatnosci.html"],
  ["/listy-do-swietego-mikolaja", "../listy-do-swietego-mikolaja.html"],
  ["/archiwum", "../archiwum.html"],
  ["/archiwum/swiateczne-paczki", "../archiwum/swiateczne-paczki/index.html"],
  ["/archiwum/plecak-pelen-odwagi", "../archiwum/plecak-pelen-odwagi/index.html"],
  ["/archiwum/pomoc-po-powodzi", "../archiwum/pomoc-po-powodzi/index.html"],
  ["/archiwum/zebrane-dary", "../archiwum/zebrane-dary/index.html"],
  ["/archiwum/za-kulisami-dzialan", "../archiwum/za-kulisami-dzialan/index.html"]
];

const attr = (source, regex, label) => {
  const match = source.match(regex);
  assert.ok(match, `brak ${label}`);
  return match[1];
};

test("każda indeksowana strona ma spójny canonical, OG i podstawowe SEO", () => {
  for (const [route, file] of pages) {
    const source = read(file);
    const expected = `${DOMAIN}${route === "/" ? "/" : route}`;
    const canonical = attr(source, /<link rel="canonical" href="([^"]+)"/, `canonical: ${route}`);
    const ogUrl = attr(source, /<meta property="og:url" content="([^"]+)"/, `og:url: ${route}`);
    const description = attr(source, /<meta name="description" content="([^"]+)"/, `description: ${route}`);

    assert.equal(canonical, expected, `zły canonical dla ${route}`);
    assert.equal(ogUrl, expected, `og:url nie zgadza się z canonical dla ${route}`);
    assert.doesNotMatch(canonical, /\.html(?:$|[?#])/);
    assert.match(source, /<html lang="pl">/);
    assert.match(source, /<meta name="robots" content="index,follow,max-image-preview:large">/);
    assert.match(source, /<meta property="og:title" content="[^"]+">/);
    assert.match(source, /<meta property="og:image" content="https:\/\/fundacjalepszydomlepszejutro\.pl\//);
    assert.match(source, /<meta name="twitter:card" content="(?:summary|summary_large_image)">/);
    assert.equal((source.match(/<h1(?:\s|>)/g) || []).length, 1, `strona ${route} powinna mieć dokładnie jeden h1`);
    assert.ok(description.length >= 50 && description.length <= 170, `opis meta ${route} ma ${description.length} znaków`);
    assert.doesNotMatch(source, /(?:href|src)="http:\/\//);
    assert.doesNotMatch(source, /1[,.]5\s*%/);
    assert.match(sitemap, new RegExp(`<loc>${expected.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}</loc>`), `brak ${route} w sitemap`);
  }
});

test("sitemap zawiera tylko czyste i unikalne adresy", () => {
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  assert.equal(urls.length, new Set(urls).size, "sitemap zawiera duplikaty");
  assert.equal(urls.length, pages.length, "sitemap i lista publicznych stron są niespójne");
  for (const url of urls) {
    assert.ok(url.startsWith(`${DOMAIN}/`));
    assert.doesNotMatch(url, /\.html(?:$|[?#])/);
  }
});

test("robots.txt wskazuje produkcyjną mapę strony", () => {
  assert.match(robots, /^User-agent: \*/m);
  assert.match(robots, /^Allow: \/$/m);
  assert.match(robots, new RegExp(`^Sitemap: ${DOMAIN.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}/sitemap\\.xml$`, "m"));
});

test("strona 404 nie jest przeznaczona do indeksowania", () => {
  assert.match(notFound, /<meta name="robots" content="noindex,follow">/);
  assert.equal((notFound.match(/<h1(?:\s|>)/g) || []).length, 1);
});
