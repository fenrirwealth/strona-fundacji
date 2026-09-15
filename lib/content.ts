/** Editorial content is isolated from UI. Replace demo data only with approved sources. */
export const foundation = {
  name: 'Fundacja Lepszy Dom Lepsze Jutro',
  email: 'fundacjalepszydomlepszejutro@gmail.com',
  phone: '+48 570 747 779',
  portal: 'https://portal.fundacjalepszydomlepszejutro.pl',
  address: 'Złota 75A/7, 00-819 Warszawa',
  krs: '0000971976', nip: '5273002294', regon: '522030190',
};
export const partnershipMail = `mailto:${foundation.email}?subject=${encodeURIComponent('Współpraca partnerska z Fundacją')}`;
// Explicitly fictional figures for this requested visual concept; never publish as outcomes.
export const impact = [
  { value: 250, suffix: '', label: 'dzieci objętych wsparciem', note: 'Przykładowy wskaźnik skali pomocy' },
  { value: 12, suffix: '', label: 'wspieranych placówek', note: 'Przykładowy wskaźnik zasięgu' },
  { value: 180, suffix: ' tys. zł', label: 'wartości przekazanej pomocy', note: 'Przykładowy wskaźnik finansowy' },
];
export const campaigns = [
  { id: '01', category: 'Edukacja · równy start', title: 'Wyprawka na lepsze jutro', description: 'Dobry początek roku szkolnego to coś więcej niż zeszyty. Zapraszamy firmy do rozmowy o wsparciu, które odpowiada na konkretne potrzeby dzieci.', image: '/assets/premium/edukacja.webp', alt: 'Książki na półkach — zdjęcie z archiwum Fundacji', detail: 'Porozmawiajmy o wsparciu edukacji', imageNote: 'Zdjęcie archiwalne Fundacji' },
  { id: '02', category: 'Bliskość · dziecięce marzenia', title: 'Magiczne Święta', description: 'Za każdym listem stoi dziecko i jego marzenie. Wspólna akcja świąteczna może połączyć zaangażowanie pracowników z konkretną pomocą.', image: '/assets/premium/listy.webp', alt: 'Ręcznie napisane listy — zdjęcie z archiwum Fundacji', detail: 'Porozmawiajmy o akcji świątecznej', imageNote: 'Materiał z archiwum Fundacji' },
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
