import type { Metadata } from 'next';
import { HelpHero } from '@/components/how-we-help/HelpHero';
import { JoinActionCTA } from '@/components/how-we-help/JoinActionCTA';
import { PillarsStack } from '@/components/how-we-help/PillarsStack';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

export const metadata: Metadata = {
  title: 'Jak pomagamy | Fundacja Lepszy Dom Lepsze Jutro',
  description: 'Poznaj działania Fundacji: wyprawki szkolne, Magiczne Święta oraz codzienną pomoc dzieciom, rodzinom i placówkom w kryzysie.',
  alternates: { canonical: '/jak-pomagamy' },
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    url: '/jak-pomagamy',
    siteName: 'Fundacja Lepszy Dom Lepsze Jutro',
    title: 'Pomoc przybiera wiele form.',
    description: 'Od wyrównywania szans edukacyjnych po spełnianie dziecięcych marzeń. Reagujemy tam, gdzie jesteśmy najbardziej potrzebni.',
    images: [{
      url: '/assets/generated/hero-wolontariusze-v1.webp',
      width: 1448,
      height: 1086,
      alt: 'Wolontariusze przygotowujący wsparcie dla dzieci i rodzin',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pomoc przybiera wiele form.',
    description: 'Poznaj najważniejsze działania Fundacji Lepszy Dom Lepsze Jutro.',
    images: ['/assets/generated/hero-wolontariusze-v1.webp'],
  },
};

export default function HowWeHelpPage() {
  return <>
    <Header variant="dark" />
    <main id="main" className="relative z-10 overflow-clip bg-night text-cream">
      <HelpHero />
      <PillarsStack />
      <JoinActionCTA />
    </main>
    <Footer variant="dark" />
  </>;
}
