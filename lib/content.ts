/** Editorial content is isolated from UI. Replace demo data only with approved sources. */
export const foundation = {
  name: 'Fundacja Lepszy Dom Lepsze Jutro',
  email: 'kontakt@fundacjalepszydomlepszejutro.pl',
  phone: '+48 570 747 779',
  portal: 'https://portal.fundacjalepszydomlepszejutro.pl',
  address: 'Złota 75A/7, 00-819 Warszawa',
  krs: '0000971976', nip: '5273002294', regon: '522030190',
  bankName: 'Erste Bank Polska',
  bankAccount: '51 1090 2590 0000 0001 5074 2996',
  siepomagaProfile: 'https://www.siepomaga.pl/lepszy-dom-lepsze-jutro',
};
export const partnershipMail = `mailto:${foundation.email}?subject=${encodeURIComponent('Współpraca partnerska z Fundacją')}`;
// Explicitly fictional figures for this requested visual concept; never publish as outcomes.
export const impact = [
  { value: 250, suffix: '', label: 'dzieci objętych wsparciem', note: 'Przykładowy wskaźnik skali pomocy' },
  { value: 12, suffix: '', label: 'wspieranych placówek', note: 'Przykładowy wskaźnik zasięgu' },
  { value: 180, suffix: ' tys. zł', label: 'wartości przekazanej pomocy', note: 'Przykładowy wskaźnik finansowy' },
];
export const campaigns = [
  { id: '01', category: 'Edukacja · równy start', title: 'Wyprawka na lepsze jutro', description: 'Pomóż przygotować dzieci do nowego roku szkolnego. Wspólnie możemy przekazać potrzebne przybory, książki i rzeczy, które ułatwią im dobry start.', image: '/assets/generated/wyprawka-v1.webp', alt: 'Wolontariusze kompletujący wyprawki szkolne — zdjęcie ilustracyjne', detail: 'Pomóż w przygotowaniu wyprawki szkolnej', imageNote: 'Zdjęcie ilustracyjne' },
  { id: '02', category: 'Bliskość · dziecięce marzenia', title: 'Magiczne Święta', description: 'Za każdym listem stoi dziecko i jego marzenie. Wybierz list, przygotuj prezent i spraw, aby te Święta stały się naprawdę wyjątkowe.', image: '/assets/generated/magiczne-swieta-v1.webp', alt: 'Wolontariusze wspólnie pakujący świąteczny prezent — zdjęcie ilustracyjne', detail: 'Poznaj listy dzieci i zasady akcji', imageNote: 'Zdjęcie ilustracyjne' },
  { id: '03', category: 'Codzienna pomoc · aktualne potrzeby', title: 'Wsparcie na co dzień', description: 'Nie każda potrzeba może czekać na kolejną kampanię. Zapytaj nas, czego dzieci i rodziny potrzebują teraz — od ubrań i artykułów codziennych po rzeczy dopasowane do ich aktualnej sytuacji.', image: '/assets/generated/wsparcie-na-co-dzien-v1.webp', alt: 'Wolontariusze pakują ubrania i codzienne artykuły dla dzieci — zdjęcie ilustracyjne', detail: 'Zapytaj o aktualne potrzeby dzieci i rodzin', imageNote: 'Zdjęcie ilustracyjne' },
];
export type NewsItem = {
  date: string;
  label: string;
  title: string;
  excerpt: string;
  image: string;
  alt: string;
  href: string;
};
export const news: NewsItem[] = [
  {
    date: '26 sierpnia 2026',
    label: 'Przekazanie pomocy',
    title: 'Dary trafiły do rodzinnego domu dziecka',
    excerpt: 'Artykuły szkolne, środki czystości, rzeczy dla najmłodszych, gry i zabawki przekazaliśmy placówce z województwa mazowieckiego.',
    image: '/assets/aktualnosci/przekazanie-darow.webp',
    alt: 'Przekazanie darów do rodzinnego domu dziecka w województwie mazowieckim',
    href: '/aktualnosci/dary-dla-rodzinnego-domu-dziecka',
  },
  {
    date: '7 sierpnia 2026',
    label: 'Wyprawka szkolna',
    title: 'Zbiórka w Polish Airports Academy zakończona',
    excerpt: 'Pracownicy Polish Airports Academy zebrali artykuły szkolne dla dzieci z placówek opiekuńczo-wychowawczych.',
    image: '/assets/aktualnosci/zbiorka-polish-airports-academy.webp',
    alt: 'Zespół Polish Airports Academy i Fundacji przy zebranych artykułach szkolnych',
    href: '/aktualnosci/zbiorka-polish-airports-academy',
  },
  {
    date: '6 sierpnia 2026',
    label: 'O Fundacji',
    title: 'Wracamy z nową energią',
    excerpt: 'Pomagamy osobom i rodzinom w trudnej sytuacji, domom dziecka oraz ośrodkom pomocy. Każde wsparcie kierujemy tam, gdzie jest potrzebne.',
    image: '/assets/aktualnosci/wracamy-z-nowa-energia.webp',
    alt: 'Grafika Fundacji informująca o formach pomocy',
    href: '/aktualnosci/wracamy-z-nowa-energia',
  },
  {
    date: '1 czerwca 2026',
    label: 'Dzień Dziecka',
    title: '„Dla Ciebie” — prezenty przygotowane z sercem',
    excerpt: 'Puzzle, książeczki, klocki, kredki, zestawy kreatywne i ubranka zostały przygotowane z myślą o dzieciach w różnym wieku.',
    image: '/assets/aktualnosci/dzien-dziecka-1.webp',
    alt: 'Prezenty, gry, książki i ubrania przygotowane dla dzieci',
    href: '/aktualnosci/dzien-dziecka-dla-ciebie',
  },
];
export type Partner = { name: string; logo?: string; href?: string; placeholder?: boolean };
// Logos from the user-supplied archive: grafiki-fundacja-lepszy-dom.zip, partnerzy/.
export const partners: Partner[] = [
  { name: 'Polish Airports Academy', logo: '/assets/premium/polish-airports-academy.webp' },
  { name: 'Elektro Home', logo: '/assets/premium/elektrohome.webp' },
  { name: 'Foldruk Folion', logo: '/assets/premium/foldruk-folion.webp' },
  { name: 'Miło Kosmetyka', logo: '/assets/premium/milo-kosmetyka.webp' },
  { name: 'Zedra', logo: '/assets/premium/zedra.webp' },
];
export type Report = { title: string; href: string; year: number };
export const reports: Report[] = []; // Add only real documents; no dummy PDF links.
