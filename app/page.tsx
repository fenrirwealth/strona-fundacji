import { Header } from '@/components/header';
import { Partners } from '@/components/partners';
import { Footer } from '@/components/footer';
import { NewsletterSignup } from '@/components/newsletter-signup';
import { Hero } from '@/components/Hero';
import { StoryGrid } from '@/components/StoryGrid';
import { DonationCard } from '@/components/DonationCard';
import CinematicBackground from '@/components/webgl/CinematicBackground';

export default function Home() {
  return <>
    <CinematicBackground />
    <div className="cinematic-noise" aria-hidden="true" />
    <Header variant="dark" />
    <main id="main" className="cinematic-home relative z-10 overflow-clip">
      <Hero />
      <StoryGrid />
      <DonationCard />
      <NewsletterSignup />
      <section id="partnerstwo" className="cinematic-partners relative px-5 py-24 sm:px-10 lg:px-16 lg:py-32 xl:px-24"><div className="mx-auto max-w-content">
        <div className="max-w-3xl"><p className="mb-5 text-xs font-bold uppercase tracking-[.25em] text-gold">Zaufanie budowane działaniem</p><h2 className="font-display text-5xl font-medium leading-[.96] tracking-[-.035em] text-cream sm:text-6xl">Pomagamy razem z ludźmi, którzy wierzą w konkretną zmianę.</h2><p className="mt-7 max-w-2xl text-base leading-8 text-white/60">Dołącz jako darczyńca, wolontariusz albo partner. Każda współpraca zaczyna się od rozmowy.</p><a href="/kontakt?temat=chce-pomoc#formularz" className="mt-8 inline-flex min-h-14 items-center justify-center rounded-full border border-gold/45 bg-gold/10 px-8 text-sm font-bold uppercase tracking-[.14em] text-gold transition hover:bg-gold hover:text-night">Porozmawiajmy</a></div>
        <Partners />
      </div></section>
    </main>
    <Footer variant="dark" />
  </>;
}
