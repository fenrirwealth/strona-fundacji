import type { Metadata } from 'next';
import { FounderQuote } from '@/components/about/FounderQuote';
import { InteractiveTimeline } from '@/components/about/InteractiveTimeline';
import { MissionHero } from '@/components/about/MissionHero';
import { ValuesGrid } from '@/components/about/ValuesGrid';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

export const metadata: Metadata = {
  title: 'O Fundacji | Lepszy Dom Lepsze Jutro',
  description: 'Poznaj Fundację Lepszy Dom Lepsze Jutro. Wspieramy dzieci, rodziny i placówki oraz pomagamy osobom dotkniętym kryzysami i skutkami klęsk żywiołowych.',
  alternates: { canonical: '/o-fundacji' },
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    url: '/o-fundacji',
    siteName: 'Fundacja Lepszy Dom Lepsze Jutro',
    title: 'Za każdą pomocą stoją ludzie.',
    description: 'Pomagamy dzieciom, rodzinom i placówkom oraz reagujemy w sytuacjach kryzysowych i po klęskach żywiołowych.',
    images: [{
      url: '/assets/generated/rodzina-cinematic-v1.jpg',
      width: 1536,
      height: 1024,
      alt: 'Rodzina spędzająca wspólnie spokojny wieczór w bezpiecznym domu',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Za każdą pomocą stoją ludzie.',
    description: 'Pomagamy dzieciom, rodzinom i placówkom oraz reagujemy w sytuacjach kryzysowych i po klęskach żywiołowych.',
    images: ['/assets/generated/rodzina-cinematic-v1.jpg'],
  },
};

export default function AboutPage() {
  return <>
    <Header variant="dark" />
    <main id="main" className="relative z-10 overflow-clip bg-night text-cream">
      <MissionHero />
      <FounderQuote />
      <InteractiveTimeline />
      <ValuesGrid />
    </main>
    <Footer variant="dark" />
  </>;
}
