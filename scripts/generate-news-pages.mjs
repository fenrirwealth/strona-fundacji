import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';

const site = 'https://fundacjalepszydomlepszejutro.pl';
const facebook = 'https://www.facebook.com/LEPSZYDOMLEPSZEJUTRO';
const posts = [
  {
    slug: 'dary-dla-rodzinnego-domu-dziecka',
    date: '26 sierpnia 2026', iso: '2026-08-26', label: 'Przekazanie pomocy',
    title: 'Dary trafiły do rodzinnego domu dziecka',
    description: 'Artykuły szkolne, środki czystości, rzeczy dla najmłodszych, gry i zabawki przekazane do rodzinnego domu dziecka w województwie mazowieckim.',
    image: '/assets/aktualnosci/przekazanie-darow.webp',
    alt: 'Przekazanie darów do rodzinnego domu dziecka w województwie mazowieckim',
    source: `${facebook}/posts/pfbid02sAeVuEESfNtaokQZv7hZ9a12ScsUvrJ2jZWUPMv7Zx8mGsEdTm8sSeJzKeFUCAoAl`,
    body: `<p>Tuż przed rozpoczęciem nowego roku szkolnego przekazaliśmy transport darów do rodzinnego domu dziecka z województwa mazowieckiego.</p>
<h2>Co znalazło się w przekazanej pomocy?</h2>
<ul><li>zeszyty, bloki, piórniki, plecak, kredki, mazaki, plastelina, długopisy, farby i inne przybory plastyczne,</li><li>szampony, żele pod prysznic, mydła, pasty i szczoteczki do zębów, dezodoranty oraz środki do prania,</li><li>pieluszki i chusteczki nawilżające dla najmłodszych,</li><li>gry planszowe, puzzle, kostki logiczne i zabawki.</li></ul>
<p>Duża część darów pochodziła ze zbiórki przeprowadzonej w Polish Airports Academy. Dziękujemy wszystkim osobom, które dołożyły swoją cegiełkę. Każdy zeszyt, każda kredka i każdy artykuł codziennego użytku miały tu konkretne znaczenie.</p>
<p>Wrzesień oznacza dla domów dziecka i rodzin zastępczych wiele dodatkowych wydatków. Cieszymy się, że mogliśmy choć trochę je odciążyć.</p>`,
  },
  {
    slug: 'zbiorka-polish-airports-academy',
    date: '7 sierpnia 2026', iso: '2026-08-07', label: 'Wyprawka szkolna',
    title: 'Zbiórka w Polish Airports Academy zakończona',
    description: 'Artykuły szkolne zebrane przez pracowników Polish Airports Academy trafią do dzieci z placówek opiekuńczo-wychowawczych.',
    image: '/assets/aktualnosci/zbiorka-polish-airports-academy.webp',
    alt: 'Zespół Polish Airports Academy i Fundacji przy zebranych artykułach szkolnych',
    source: `${facebook}/posts/pfbid02QgHAc6czMwtNud84VLJXRZUVz6aSp9AqD2GuDppBEYLm8BJ4G4eNmcBno4NJarG7l`,
    body: `<p>„W lotnictwie nikt nie wzbija się w powietrze sam. Za każdym startem stoi zespół ludzi, którzy czuwają, by lot przebiegł bezpiecznie. Dokładnie tak samo jest z dzieciństwem.”</p>
<p>Zbiórka artykułów szkolnych w Polish Airports Academy dobiegła końca. Dziękujemy Dyrekcji i wszystkim Pracownikom za zaufanie, zaangażowanie oraz każdą przekazaną rzecz.</p>
<p>Zebrane artykuły szkolne zostały przeznaczone dla dzieci z placówek opiekuńczo-wychowawczych. Dla dziecka rozpoczynającego rok szkolny nowy plecak czy piórnik to coś więcej niż wyprawka. To wiadomość: ktoś o mnie pomyślał.</p>
<p>Dziękujemy, że wysłaliście ją razem z nami.</p>`,
  },
  {
    slug: 'wracamy-z-nowa-energia',
    date: '6 sierpnia 2026', iso: '2026-08-06', label: 'O Fundacji',
    title: 'Wracamy z nową energią',
    description: 'Fundacja wspiera osoby i rodziny w trudnej sytuacji, domy dziecka i ośrodki pomocy poprzez wsparcie materialne oraz finansowe.',
    image: '/assets/aktualnosci/wracamy-z-nowa-energia.webp',
    alt: 'Grafika Fundacji informująca o formach pomocy',
    source: `${facebook}/posts/pfbid02FPDd5jFRvgfhEFn2iYXJkUZjtmkfF4em1hXMUq5LyPfVdW5z8rUuJLoPRZVEGnm8l`,
    body: `<p>Fundacja Lepszy Dom Lepsze Jutro od 2022 roku wspiera osoby i rodziny w trudnej sytuacji życiowej, domy dziecka oraz ośrodki pomocy.</p>
<p>Przekazujemy zabawki, wyprawki, środki czystości i wsparcie finansowe. Pomoc kierujemy tam, gdzie w danym momencie jest najbardziej potrzebna.</p>
<h2>Chcesz dołożyć swoją cegiełkę?</h2>
<p>Możesz przekazać darowiznę na rachunek Fundacji: <strong>51 1090 2590 0000 0001 5074 2996</strong> w Erste Bank Polska. W sprawie pomocy rzeczowej napisz do nas — potwierdzimy aktualne potrzeby.</p>`,
  },
  {
    slug: 'dzien-dziecka-dla-ciebie',
    date: '1 czerwca 2026', iso: '2026-06-01', label: 'Dzień Dziecka',
    title: '„Dla Ciebie” — prezenty przygotowane z sercem',
    description: 'Gry, książki, zestawy kreatywne, ubrania i drobiazgi przygotowane przez Fundację z myślą o dzieciach w różnym wieku.',
    image: '/assets/aktualnosci/dzien-dziecka-1.webp',
    alt: 'Prezenty, gry, książki i ubrania przygotowane dla dzieci',
    gallery: [1, 2, 3, 4, 5].map(n => `/assets/aktualnosci/dzien-dziecka-${n}.webp`),
    source: `${facebook}/posts/pfbid0hH5Qt3GGJMLhPf3BpduPCqhk1rJK7nw9qEH1Qfojeg72g5FbLSAVQGW2tyBcjd5gl`,
    body: `<p>„Dla Ciebie.” Dwa słowa, które dla wielu dzieci znaczą więcej niż zawartość pudełka. Mówią, że ktoś pomyślał, pamiętał i uznał konkretne dziecko za ważne.</p>
<p>Przygotowaliśmy puzzle i układanki, kolorowe klocki, książeczki, kredki, zestawy kreatywne, ciepłe ubranka oraz drobiazgi dla najmłodszych — rzeczy dla dzieci w różnym wieku.</p>
<p>Nie zmienią całego świata, ale mogą zmienić jeden dzień. Czasem jeden dobry dzień wystarczy, aby dziecko poczuło, że nie jest samo.</p>
<p>Chcesz pomóc przy kolejnych działaniach? Napisz do nas.</p>`,
  },
];

const header = (current = '') => `<a class="skip" href="#main">Przejdź do treści</a><div class="progress" aria-hidden="true"><span></span></div><header><div class="wrap navrow"><a class="brand" href="/"><img class="brand-logo" src="/assets/logo-fundacji.webp" alt="Logo Fundacji Lepszy Dom Lepsze Jutro" width="48" height="48"><span class="brandcopy"><small>Fundacja</small>Lepszy Dom<br>Lepsze Jutro</span></a><button class="menu" aria-label="Otwórz menu" aria-expanded="false" aria-controls="nav"><span></span></button><nav id="nav" aria-label="Główna nawigacja"><a href="/o-fundacji">O Fundacji</a><a href="/#dzialania">Działania</a><a href="/aktualnosci"${current === 'news' ? ' aria-current="page"' : ''}>Aktualności</a><a href="/archiwum">Archiwum</a><a href="/kontakt">Kontakt</a><a href="/#wsparcie">Jak pomóc</a><a class="navcta portal-link" href="https://portal.fundacjalepszydomlepszejutro.pl">Portal <span aria-hidden="true">↗</span></a></nav></div></header>`;
const footer = `<footer><div class="wrap"><div class="footergrid"><div><a class="brand" href="/"><img class="brand-logo" src="/assets/logo-fundacji.webp" alt="Logo Fundacji Lepszy Dom Lepsze Jutro" width="48" height="48"><span class="brandcopy"><small>Fundacja</small>Lepszy Dom<br>Lepsze Jutro</span></a><p>Siedziba Fundacji mieści się w Warszawie. Pomagamy dzieciom, rodzinom i placówkom, które potrzebują wsparcia.</p></div><div><b>Przejdź dalej</b><div class="footerlinks"><a href="/aktualnosci">Aktualności</a><a href="/archiwum">Archiwum działań</a><a href="/kontakt">Kontakt</a><a href="/#wsparcie">Jak pomóc</a></div></div><div><b>Dane rejestrowe</b><p>KRS 0000971976<br>NIP 5273002294<br>REGON 522030190<br>Rejestracja: 17 maja 2022<br>Fundacja nie prowadzi działalności gospodarczej.</p></div></div><div class="legal">© <span data-year>2026</span> Fundacja Lepszy Dom Lepsze Jutro. Wszystkie prawa zastrzeżone.</div></div></footer>`;
const head = ({ title, description, url, image, type = 'website', json }) => `<!DOCTYPE html><html lang="pl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title><meta name="description" content="${description}"><meta name="robots" content="index,follow,max-image-preview:large"><meta name="theme-color" content="#171512"><link rel="canonical" href="${url}"><link rel="icon" type="image/png" sizes="64x64" href="/assets/favicon-64.png"><link rel="apple-touch-icon" sizes="180x180" href="/assets/apple-touch-icon.png"><link rel="manifest" href="/site.webmanifest"><meta property="og:site_name" content="Fundacja Lepszy Dom Lepsze Jutro"><meta property="og:title" content="${title}"><meta property="og:description" content="${description}"><meta property="og:type" content="${type}"><meta property="og:locale" content="pl_PL"><meta property="og:url" content="${url}"><meta property="og:image" content="${site}${image}"><meta property="og:image:alt" content="Fundacja Lepszy Dom Lepsze Jutro"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${title}"><meta name="twitter:description" content="${description}"><meta name="twitter:image" content="${site}${image}"><link rel="stylesheet" href="/assets/site.css?v=facebook-posts-1"><script type="application/ld+json">${JSON.stringify(json)}</script></head><body>`;

const cards = posts.map(post => `<article class="news-card"><a href="/aktualnosci/${post.slug}"><div class="news-card-media"><img src="${post.image}" alt="${post.alt}" loading="lazy" decoding="async"><span>Materiał Fundacji</span></div><div class="news-card-body"><div class="news-card-meta"><span>${post.label}</span><time datetime="${post.iso}">${post.date}</time></div><h2>${post.title}</h2><p>${post.description}</p><span class="post-link">Czytaj relację →</span></div></a></article>`).join('');
const indexJson = {'@context':'https://schema.org','@type':'CollectionPage',name:'Aktualności Fundacji Lepszy Dom Lepsze Jutro',url:`${site}/aktualnosci`};
writeFileSync('aktualnosci.html', `${head({title:'Aktualności | Fundacja Lepszy Dom Lepsze Jutro',description:'Potwierdzone relacje i zdjęcia z działań Fundacji Lepszy Dom Lepsze Jutro.',url:`${site}/aktualnosci`,image:posts[0].image,json:indexJson})}${header('news')}<main id="main" class="submain"><div class="wrap"><nav class="breadcrumbs" aria-label="Okruszki"><a href="/">Strona główna</a><span>›</span><strong>Aktualności</strong></nav><section class="archive-hero"><div><p class="eyebrow">Aktualności Fundacji</p><h1>Pomoc widoczna w działaniu.</h1></div><p>Zdjęcia i relacje z potwierdzonych działań Fundacji. Pokazujemy, co udało się zrobić dzięki ludziom, którzy dołączają do pomocy.</p></section><section class="news-index-grid" aria-label="Najnowsze relacje">${cards}</section><section class="current-strip"><div><div class="meta">Chcesz pomóc?</div><h2>Dołącz do kolejnego działania</h2><p>Napisz do nas lub wybierz dogodną formę wsparcia.</p></div><div class="actions"><a class="btn primary" href="/#wsparcie">Jak pomóc →</a><a class="btn secondary" href="${facebook}">Facebook Fundacji ↗</a></div></section></div></main>${footer}<script src="/assets/site.js" defer></script></body></html>`);

for (const post of posts) {
  mkdirSync(`aktualnosci/${post.slug}`, { recursive: true });
  const gallery = post.gallery ? `<section class="article-gallery" aria-label="Galeria zdjęć z działania">${post.gallery.map((src, i) => `<figure><img src="${src}" alt="${post.alt} — zdjęcie ${i + 1}" loading="lazy" decoding="async"></figure>`).join('')}</section>` : '';
  const json = {'@context':'https://schema.org','@type':'NewsArticle',headline:post.title,datePublished:post.iso,dateModified:'2026-09-15',image:`${site}${post.image}`,mainEntityOfPage:`${site}/aktualnosci/${post.slug}`,author:{'@type':'Organization',name:'Fundacja Lepszy Dom Lepsze Jutro'}};
  const html = `${head({title:`${post.title} | Fundacja Lepszy Dom Lepsze Jutro`,description:post.description,url:`${site}/aktualnosci/${post.slug}`,image:post.image,type:'article',json})}${header('news')}<main id="main" class="submain"><article class="article"><nav class="breadcrumbs" aria-label="Okruszki"><a href="/">Strona główna</a><span>›</span><a href="/aktualnosci">Aktualności</a><span>›</span><strong>${post.title}</strong></nav><p class="eyebrow">${post.label} · <time datetime="${post.iso}">${post.date}</time></p><h1>${post.title}</h1><p class="intro">${post.description}</p><figure><img src="${post.image}" alt="${post.alt}" width="1363" height="936"></figure><div class="article-content">${post.body}<p class="source-note">Treść opracowana na podstawie oficjalnej publikacji Fundacji na Facebooku.</p><div class="article-nav"><a class="btn secondary" href="/aktualnosci">← Wszystkie aktualności</a><a class="btn primary" href="${post.source}" target="_blank" rel="noopener noreferrer">Oryginalny post ↗</a></div></div>${gallery}</article></main>${footer}<script src="/assets/site.js" defer></script></body></html>`;
  writeFileSync(`aktualnosci/${post.slug}/index.html`, html);
}

function refreshStaticLinks(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = `${directory}/${entry.name}`;
    if (entry.isDirectory()) refreshStaticLinks(path);
    else if (entry.name.endsWith('.html')) {
      const source = readFileSync(path, 'utf8');
      const updated = source
        .replaceAll('href="/#aktualnosci"', 'href="/aktualnosci"')
        .replace(/\/assets\/site\.css\?v=[^"']+/g, '/assets/site.css?v=facebook-posts-1');
      if (updated !== source) writeFileSync(path, updated);
    }
  }
}
for (const file of ['index.html', 'archiwum.html', 'listy-do-swietego-mikolaja.html', 'o-fundacji.html', 'kontakt.html', 'polityka-prywatnosci.html', '404.html']) {
  const source = readFileSync(file, 'utf8');
  const updated = source
    .replaceAll('href="/#aktualnosci"', 'href="/aktualnosci"')
    .replace(/\/assets\/site\.css\?v=[^"']+/g, '/assets/site.css?v=facebook-posts-1');
  if (updated !== source) writeFileSync(file, updated);
}
refreshStaticLinks('archiwum');
