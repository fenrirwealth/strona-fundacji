import type { Metadata } from 'next';
import { HelpHero } from '@/components/how-we-help/HelpHero';
import { JoinActionCTA } from '@/components/how-we-help/JoinActionCTA';
import { PillarsStack } from '@/components/how-we-help/PillarsStack';
import { SupportGuide } from '@/components/how-we-help/SupportGuide';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

export const metadata: Metadata = {
  title: 'Jak pomagamy i jak wesprzeć Fundację | Lepszy Dom Lepsze Jutro',
  description: 'Pomoc dzieciom i rodzinom: darowizny, dary rzeczowe, wolontariat i współpraca firm. Sprawdź działania Fundacji oraz odpowiedzi na pytania darczyńców.',
  alternates: { canonical: '/jak-pomagamy' },
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    url: '/jak-pomagamy',
    siteName: 'Fundacja Lepszy Dom Lepsze Jutro',
    title: 'Jak pomagamy i jak wesprzeć Fundację | Lepszy Dom Lepsze Jutro',
    description: 'Pomoc dzieciom i rodzinom: darowizny, dary rzeczowe, wolontariat i współpraca firm. Sprawdź działania Fundacji oraz odpowiedzi na pytania darczyńców.',
    images: [{
      url: '/assets/generated/hero-wolontariusze-v1.webp',
      width: 1448,
      height: 1086,
      alt: 'Wolontariusze przygotowujący wsparcie dla dzieci i rodzin',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jak pomagamy i jak wesprzeć Fundację | Lepszy Dom Lepsze Jutro',
    description: 'Pomoc dzieciom i rodzinom: darowizny, dary rzeczowe, wolontariat i współpraca firm. Sprawdź działania Fundacji oraz odpowiedzi na pytania darczyńców.',
    images: ['/assets/generated/hero-wolontariusze-v1.webp'],
  },
};

export default function HowWeHelpPage() {
  return <>
    <Header variant="dark" />
    <main id="main" className="relative z-10 overflow-clip bg-night text-cream">
      <HelpHero />
      <PillarsStack />
      <SupportGuide />
      <JoinActionCTA />
    </main>
    <Footer variant="dark" />
  </>;
}
