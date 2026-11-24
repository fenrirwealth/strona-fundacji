import Image from 'next/image';
import Link from 'next/link';

export function ChristmasSupporter() {
  return <section className="relative px-5 py-16 text-cream sm:px-10 lg:px-16 lg:py-24 xl:px-24" aria-labelledby="christmas-supporter-heading">
    <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[2rem] border border-gold/25 bg-[#101b2d]/95 shadow-glass md:grid-cols-2">
      <div className="relative aspect-[4/5]">
        <Image src="/assets/aktualnosci/polski-ken-swiateczna-paczka.webp" alt="Michał Ken Przybyłowicz w białym swetrze przy choince" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
      </div>
      <div className="flex flex-col justify-center px-6 py-10 sm:px-10 lg:p-14">
        <p className="mb-6 text-xs font-bold uppercase tracking-[.2em] text-gold">Nasza świąteczna ekipa</p>
        <h2 id="christmas-supporter-heading" className="font-display text-4xl font-medium leading-[1.08] tracking-[-.03em] sm:text-5xl">Do naszej akcji dołączył Polski Ken!</h2>
        <p className="mt-7 text-base leading-8 text-white/70">Michał Ken Przybyłowicz jest z nami! Dziękujemy za wsparcie świątecznej akcji dla dzieci z domów dziecka i rodzin zastępczych. W naszej ekipie jest miejsce także dla Ciebie.</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a href="https://www.siepomaga.pl/dzieciece-marzenia26" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-14 items-center justify-center rounded-full bg-gold px-7 text-sm font-bold text-night transition hover:bg-cream">Wesprzyj świąteczną zbiórkę ↗</a>
          <Link href="/aktualnosci/polski-ken-dolacza-do-swiatecznej-paczki" className="inline-flex min-h-14 items-center gap-3 px-2 text-sm font-semibold text-cream underline decoration-gold/50 underline-offset-8">Poznaj szczegóły →</Link>
        </div>
        <a href="https://www.instagram.com/polski_ken/" target="_blank" rel="noopener noreferrer" className="mt-8 self-start text-sm text-white/65 underline underline-offset-4 hover:text-gold">Instagram Michała: @polski_ken ↗</a>
      </div>
    </div>
  </section>;
}
