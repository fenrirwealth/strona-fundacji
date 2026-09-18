import type { Metadata } from 'next';
import { ArchiveHero } from '@/components/archive/ArchiveHero';
import { HybridFilmstrip } from '@/components/archive/HybridFilmstrip';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

export const metadata: Metadata = {
  title: 'Archiwum działań | Fundacja Lepszy Dom Lepsze Jutro',
  description:
    'Poznaj archiwalne akcje Fundacji Lepszy Dom Lepsze Jutro i wróć do historii pomocy, które powstały dzięki wspólnemu zaangażowaniu.',
  alternates: { canonical: '/archiwum' },
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    url: '/archiwum',
    siteName: 'Fundacja Lepszy Dom Lepsze Jutro',
    title: 'Zapisane w czasie.',
    description: 'Każda akcja to setki uśmiechów. Przeżyjmy to jeszcze raz.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zapisane w czasie.',
    description: 'Archiwum działań Fundacji Lepszy Dom Lepsze Jutro.',
  },
};

export default function ArchivePage() {
  return (
    <>
      <Header variant="dark" />
      <main className="bg-[#050505] min-h-screen text-white overflow-hidden">
        <ArchiveHero />
        <HybridFilmstrip />
      </main>
      <Footer variant="dark" />
    </>
  );
}
