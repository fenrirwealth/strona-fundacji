import { readFileSync, readdirSync, writeFileSync } from 'node:fs';

const header = `<header><div class="wrap navrow"><a class="brand" href="/" aria-label="Fundacja Lepszy Dom Lepsze Jutro — strona główna"><img class="brand-logo" src="/assets/logo-fundacji-transparent.svg" alt="" width="48" height="48"><span class="brandcopy"><small>Fundacja</small>Lepszy Dom<br>Lepsze Jutro</span></a><button class="menu" aria-label="Otwórz menu" aria-expanded="false" aria-controls="nav"><span></span></button><nav id="nav" aria-label="Główna nawigacja"><a href="/o-fundacji">O Fundacji</a><a href="/jak-pomagamy">Jak pomagamy</a><a href="/aktualnosci">Aktualności</a><a href="/archiwum">Archiwum</a><a href="/kontakt">Kontakt</a><a href="/#wsparcie">Jak pomóc</a><a class="navcta portal-link" href="https://portal.fundacjalepszydomlepszejutro.pl">Portal <span aria-hidden="true">↗</span></a></nav></div></header>`;

const socialLinks = `<div class="social-links" aria-label="Profile Fundacji w mediach społecznościowych"><a href="https://www.facebook.com/LEPSZYDOMLEPSZEJUTRO" target="_blank" rel="noreferrer" aria-label="Facebook Fundacji — otwórz w nowej karcie" title="Facebook"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.2 8.4V6.9c0-.7.5-.9 1-.9h2.6V2.2L14.3 2c-3.5 0-5.2 2.1-5.2 5.5v.9H6v4.3h3.1V22h5.1v-9.3h3.4l.7-4.3h-4.1Z"/></svg></a><a href="https://www.instagram.com/lepszy_dom_lepsze_jutro/" target="_blank" rel="noreferrer" aria-label="Instagram Fundacji — otwórz w nowej karcie" title="Instagram"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.4" cy="6.7" r="1" class="social-dot"/></svg></a></div>`;

const footer = `<footer><div class="wrap"><div class="footergrid"><div><a class="brand" href="/" aria-label="Fundacja Lepszy Dom Lepsze Jutro — strona główna"><img class="brand-logo" src="/assets/logo-fundacji-transparent.svg" alt="" width="48" height="48"><span class="brandcopy"><small>Fundacja</small>Lepszy Dom<br>Lepsze Jutro</span></a><p>Pomagamy dzieciom, rodzinom i placówkom, które potrzebują wsparcia.</p>${socialLinks}</div><div><b>Przejdź dalej</b><div class="footerlinks"><a href="/o-fundacji">O Fundacji</a><a href="/jak-pomagamy">Jak pomagamy</a><a href="/aktualnosci">Aktualności</a><a href="/archiwum">Archiwum działań</a><a href="/kontakt">Kontakt</a><a href="/przejrzystosc">Przejrzystość</a><a href="/polityka-prywatnosci">Polityka prywatności</a></div></div><div><b>Dane rejestrowe</b><p>KRS 0000971976<br>NIP 5273002294<br>REGON 522030190<br>Rejestracja: 17 maja 2022<br>Fundacja nie prowadzi działalności gospodarczej.</p></div></div><div class="legal">© <span data-year>2026</span> Fundacja Lepszy Dom Lepsze Jutro. Wszystkie prawa zastrzeżone.</div></div></footer>`;

const roots = ['404.html', 'index.html', 'archiwum.html', 'aktualnosci.html', 'listy-do-swietego-mikolaja.html', 'o-fundacji.html', 'jak-pomagamy.html', 'kontakt.html', 'przejrzystosc.html', 'polityka-prywatnosci.html'];

function normalize(path) {
  const source = readFileSync(path, 'utf8');
  const updated = source
    .replace(/<header>[\s\S]*?<\/header>/, header)
    .replace(/<footer>[\s\S]*?<\/footer>/, footer)
    .replaceAll('href="/#pomoc"', 'href="/#wsparcie"')
    .replaceAll('href="/#kontakt"', 'href="/kontakt"')
    .replace(/\/assets\/site\.css\?v=[^"']+/g, '/assets/site.css?v=donations-2')
    .replace(/\/assets\/site\.js(?:\?v=[^"']+)?/g, '/assets/site.js?v=contact-1')
    .replace(/\/assets\/pages\.css(?:\?v=[^"']+)?/g, '/assets/pages.css?v=contact-1')
    .replace('<section><h2>Kontakt bez formularza</h2><p>Na stronie nie ma formularza kontaktowego ani kont użytkowników. Jeżeli piszesz do Fundacji przez e-mail albo dzwonisz, przekazujesz dane bezpośrednio w wybranym przez siebie kanale.</p><p>Dane przekazane w wiadomości lub rozmowie są wykorzystywane do obsługi kontaktu i odpowiedzi na Twoją sprawę.</p></section>', '<section><h2>Formularz kontaktowy</h2><p>W formularzu możesz podać imię i nazwisko, adres e-mail, opcjonalny numer telefonu, temat oraz treść wiadomości. Dane wykorzystujemy wyłącznie do obsługi kontaktu i udzielenia odpowiedzi.</p><p>Wiadomości z formularza są dostarczane za pośrednictwem usługi Resend, która pełni funkcję technicznego dostawcy wysyłki e-mail. Formularz zapisuje też ograniczone dane techniczne potrzebne do ochrony przed spamem i nadużyciami.</p><p>Możesz również skontaktować się z Fundacją telefonicznie lub bezpośrednio przez e-mail.</p></section>');
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
