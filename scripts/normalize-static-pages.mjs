import { readFileSync, readdirSync, writeFileSync } from 'node:fs';

const header = `<header><div class="wrap navrow"><a class="brand" href="/" aria-label="Fundacja Lepszy Dom Lepsze Jutro — strona główna"><img class="brand-logo" src="/assets/logo-fundacji-transparent.svg" alt="" width="48" height="48"><span class="brandcopy"><small>Fundacja</small>Lepszy Dom<br>Lepsze Jutro</span></a><button class="menu" aria-label="Otwórz menu" aria-expanded="false" aria-controls="nav"><span></span></button><nav id="nav" aria-label="Główna nawigacja"><a href="/o-fundacji">O Fundacji</a><a href="/jak-pomagamy">Jak pomagamy</a><a href="/aktualnosci">Aktualności</a><a href="/archiwum">Archiwum</a><a href="/kontakt">Kontakt</a><a href="/#wsparcie">Jak pomóc</a><a class="navcta portal-link" href="https://portal.fundacjalepszydomlepszejutro.pl">Portal <span aria-hidden="true">↗</span></a></nav></div></header>`;

const footer = `<footer><div class="wrap"><div class="footergrid"><div><a class="brand" href="/" aria-label="Fundacja Lepszy Dom Lepsze Jutro — strona główna"><img class="brand-logo" src="/assets/logo-fundacji-transparent.svg" alt="" width="48" height="48"><span class="brandcopy"><small>Fundacja</small>Lepszy Dom<br>Lepsze Jutro</span></a><p>Pomagamy dzieciom, rodzinom i placówkom, które potrzebują wsparcia.</p></div><div><b>Przejdź dalej</b><div class="footerlinks"><a href="/o-fundacji">O Fundacji</a><a href="/jak-pomagamy">Jak pomagamy</a><a href="/aktualnosci">Aktualności</a><a href="/archiwum">Archiwum działań</a><a href="/kontakt">Kontakt</a><a href="/przejrzystosc">Przejrzystość</a><a href="/polityka-prywatnosci">Polityka prywatności</a></div></div><div><b>Dane rejestrowe</b><p>KRS 0000971976<br>NIP 5273002294<br>REGON 522030190<br>Rejestracja: 17 maja 2022<br>Fundacja nie prowadzi działalności gospodarczej.</p></div></div><div class="legal">© <span data-year>2026</span> Fundacja Lepszy Dom Lepsze Jutro. Wszystkie prawa zastrzeżone.</div></div></footer>`;

const roots = ['404.html', 'index.html', 'archiwum.html', 'aktualnosci.html', 'listy-do-swietego-mikolaja.html', 'o-fundacji.html', 'jak-pomagamy.html', 'kontakt.html', 'przejrzystosc.html', 'polityka-prywatnosci.html'];

function normalize(path) {
  const source = readFileSync(path, 'utf8');
  const updated = source
    .replace(/<header>[\s\S]*?<\/header>/, header)
    .replace(/<footer>[\s\S]*?<\/footer>/, footer)
    .replaceAll('href="/#pomoc"', 'href="/#wsparcie"')
    .replaceAll('href="/#kontakt"', 'href="/kontakt"')
    .replace(/\/assets\/site\.css\?v=[^"']+/g, '/assets/site.css?v=donations-2')
    .replace(/\/assets\/site\.js(?:\?v=[^"']+)?/g, '/assets/site.js?v=donations-2');
  if (updated !== source) writeFileSync(path, updated);
}

function walk(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = `${directory}/${entry.name}`;
    if (entry.isDirectory()) walk(path);
    else if (entry.name.endsWith('.html')) normalize(path);
  }
}

for (const file of roots) normalize(file);
walk('archiwum');
walk('aktualnosci');
