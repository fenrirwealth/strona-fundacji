'use client';

import Image from 'next/image';
import { ArrowDown } from 'lucide-react';

const lines = ['Pomoc przybiera', 'wiele form.'] as const;
export function HelpHero() {
  return <section className="relative flex min-h-[72svh] items-end overflow-hidden px-5 pb-14 pt-32 sm:px-10 sm:pb-20 lg:px-16 lg:pb-24 xl:px-24" aria-labelledby="help-heading">
    <div className="absolute inset-0" aria-hidden="true">
      <Image
        src="/assets/generated/hero-wolontariusze-v1.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[58%_center] opacity-35"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,8,15,.98)_0%,rgba(5,8,15,.78)_52%,rgba(5,8,15,.38)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,8,15,.48)_0%,rgba(5,8,15,.08)_44%,#05080f_100%)]" />
      <div className="absolute right-[8%] top-[8%] h-80 w-80 rounded-full bg-gold/[.09] blur-[130px]" />
      <div className="page-curtain-noise absolute inset-0 opacity-[.045]" />
    </div>

    <div className="relative z-10 mx-auto w-full max-w-content">
      <p className="mb-6 flex items-center gap-4 text-[11px] font-bold uppercase tracking-[.28em] text-gold sm:text-xs">
        <span className="h-px w-12 bg-gold" />
        Działamy konkretnie
      </p>

      <h1
        id="help-heading"
        className="max-w-6xl font-display text-[clamp(3.7rem,9vw,8.5rem)] font-medium leading-[.84] tracking-[-.055em] text-cream"
      >
        {lines.map(line => <span key={line} className="block overflow-hidden pb-[.08em]">
          <span className="block">{line}</span>
        </span>)}
      </h1>

      <div className="mt-7 flex max-w-5xl flex-col gap-7 border-t border-white/15 pt-6 sm:flex-row sm:items-end sm:justify-between">
        <p className="max-w-2xl text-base leading-8 text-white/70 sm:text-lg">Od wyrównywania szans edukacyjnych po spełnianie świątecznych marzeń. Reagujemy tam, gdzie jesteśmy najbardziej potrzebni.</p>
        <a href="#dzialania" className="group inline-flex shrink-0 items-center gap-3 text-xs font-bold uppercase tracking-[.18em] text-white/65 transition-colors hover:text-gold">
          Poznaj działania
          <span className="grid h-11 w-11 place-items-center rounded-full border border-white/20 transition duration-300 group-hover:border-gold/60 group-hover:bg-gold/10"><ArrowDown className="h-4 w-4" aria-hidden="true" /></span>
        </a>
      </div>
    </div>
  </section>;
}
