import type { Metadata } from 'next';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { NewsFeatured, type FeaturedNews } from '@/components/news/NewsFeatured';
import { NewsFilter } from '@/components/news/NewsFilter';
import { NewsGrid, type NewsItem } from '@/components/news/NewsGrid';

export const metadata: Metadata = {
  title: 'Aktualności | Fundacja Lepszy Dom Lepsze Jutro',
  description: 'Relacje z działań, zbiórek i współprac Fundacji Lepszy Dom Lepsze Jutro. Zobacz, jak wspólnie przekładamy pomoc na konkretne historie.',
  alternates: { canonical: '/aktualnosci' },
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    url: '/aktualnosci',
    siteName: 'Fundacja Lepszy Dom Lepsze Jutro',
    title: 'Aktualności — historie realnej pomocy',
    description: 'Najświeższe relacje z akcji Fundacji, ważne współprace i historie ludzi, których łączy pomoc.',
    images: [{
      url: '/assets/aktualnosci/zbiorka-polish-airports-academy.webp',
      width: 1250,
      height: 936,
      alt: 'Zbiórka artykułów szkolnych w Polish Airports Academy',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aktualności — Fundacja Lepszy Dom Lepsze Jutro',
    description: 'Relacje z działań, zbiórek i współprac Fundacji.',
    images: ['/assets/aktualnosci/zbiorka-polish-airports-academy.webp'],
  },
};

const featuredNews: FeaturedNews = {
  tags: ['Edukacja', 'Sierpień 2026'],
  title: 'Wyprawka szkolna. Zbiórka w Polish Airports Academy zakończona.',
  excerpt: 'Pracownicy Polish Airports Academy zebrali artykuły szkolne dla dzieci z placówek opiekuńczo-wychowawczych. Wspólnie wyrównujemy szanse na starcie.',
  image: '/assets/aktualnosci/zbiorka-polish-airports-academy.webp',
  imageAlt: 'Pracownicy Polish Airports Academy przy zebranych artykułach szkolnych',
  href: '/aktualnosci/zbiorka-polish-airports-academy',
};

const newsItems: NewsItem[] = [
  {
    id: 'wyprawka-turbaza',
    title: 'Wyprawka na lepsze jutro z Turbaza Studio',
    category: 'Akcje Szkolne',
    filters: ['Akcje Szkolne', 'Współprace'],
    date: 'Sierpień 2026',
    excerpt: 'Plecaki, przybory i szkolne wyposażenie skompletowane z myślą o spokojnym, pewnym początku roku.',
    image: '/assets/generated/wyprawka-v1.webp',
    imageAlt: 'Wolontariusze pakujący plecaki i artykuły szkolne',
    size: 'full',
  },
  {
    id: 'magiczne-swieta-czwarta-edycja',
    title: 'Dzięki Wam 169 dzieci otrzymało wymarzone prezenty',
    category: 'Święta',
    filters: ['Święta', 'Współprace'],
    date: 'Grudzień 2025',
    excerpt: 'Paczki dla 169 dzieci z 18 placówek oraz rodzin zastępczych. Za każdą liczbą stoją twarze, historie i marzenia potraktowane poważnie.',
    image: '/assets/aktualnosci/swieta-2025-169-dzieci.jpg',
    imageAlt: 'Świąteczne podziękowanie za prezenty dla 169 dzieci z 18 placówek oraz rodzin zastępczych',
    href: '/aktualnosci/swieta-2025',
    imageFit: 'contain',
    size: 'full',
  },
];

export default function NewsPage() {
  return <>
    <Header variant="dark" />
    <main id="main" className="relative z-10 overflow-clip bg-night text-cream">
      <NewsFeatured news={featuredNews} />
      <section className="relative px-5 pb-28 pt-24 sm:px-10 lg:px-16 lg:pb-40 lg:pt-36 xl:px-24" aria-labelledby="news-list-heading">
        <div className="page-curtain-noise pointer-events-none absolute inset-0 opacity-[.022]" aria-hidden="true" />
        <div className="relative mx-auto max-w-content">
          <div className="mb-14 grid gap-8 border-b border-white/10 pb-12 lg:mb-20 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="mb-5 text-xs font-bold uppercase tracking-[.25em] text-gold">Z życia Fundacji</p>
              <h2 id="news-list-heading" className="max-w-4xl font-display text-5xl font-medium leading-[.94] tracking-[-.04em] sm:text-6xl lg:text-8xl">Historie, które warto opowiedzieć.</h2>
            </div>
            <p className="max-w-md text-base leading-8 text-white/55 lg:col-span-4 lg:justify-self-end">Dokumentujemy drogę pomocy: od pierwszego pomysłu i wspólnej mobilizacji aż po moment, w którym wsparcie trafia do ludzi.</p>
          </div>

          <NewsFilter>
            <NewsGrid items={newsItems} />
          </NewsFilter>
        </div>
      </section>
    </main>
    <Footer variant="dark" />
  </>;
}
