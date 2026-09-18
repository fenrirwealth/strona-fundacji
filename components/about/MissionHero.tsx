'use client';

import Image from 'next/image';
import { ArrowDown } from 'lucide-react';

const headline = ['Za', 'każdą', 'pomocą', 'stoją', 'ludzie.'] as const;
const areas = ['Dzieci i młodzież', 'Rodziny', 'Placówki', 'Pomoc kryzysowa'] as const;
export function MissionHero() {
  return <section className="relative flex min-h-[100svh] items-end overflow-hidden px-5 pb-16 pt-32 sm:px-10 sm:pb-20 lg:px-16 lg:pb-24 xl:px-24" aria-labelledby="mission-heading">
    <div className="absolute inset-0" aria-hidden="true">
      <Image
        src="/assets/generated/rodzina-cinematic-v1.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[58%_center] opacity-45"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,8,15,.97)_0%,rgba(5,8,15,.72)_55%,rgba(5,8,15,.38)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,8,15,.45)_0%,rgba(5,8,15,.12)_38%,#05080f_100%)]" />
      <div className="absolute -right-[15%] top-[10%] h-[34rem] w-[34rem] rounded-full bg-gold/[.09] blur-[150px]" />
      <div className="page-curtain-noise absolute inset-0 opacity-[.045]" />
    </div>

    <div className="relative z-10 mx-auto w-full max-w-content">
      <p className="mb-7 flex items-center gap-4 text-[11px] font-bold uppercase tracking-[.28em] text-gold sm:text-xs">
        <span className="h-px w-12 bg-gold" />
        Poznaj nas bliżej
      </p>

      <h1
        id="mission-heading"
        className="max-w-[11ch] font-display text-[clamp(3.7rem,9vw,8.8rem)] font-medium leading-[.84] tracking-[-.055em] text-cream"
      >
        {headline.map((word, index) => <span
          key={word}
          className="mr-[.2em] inline-block"
        >
          {word}{index === headline.length - 1 ? '' : ' '}
        </span>)}
      </h1>

      <div className="mt-8 flex max-w-4xl flex-col gap-8 border-t border-white/15 pt-7 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="text-base leading-8 text-white/68 sm:text-lg">Dobra pomoc zaczyna się od uważności na człowieka. Wspieramy dzieci, rodziny i placówki, reagujemy w sytuacjach kryzysowych oraz pomagamy osobom dotkniętym skutkami klęsk żywiołowych — zawsze tam, gdzie wspólne działanie może przywrócić bezpieczeństwo i nadzieję.</p>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Główne obszary pomocy">
            {areas.map(area => <li key={area} className="rounded-full border border-white/15 bg-white/[.045] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[.14em] text-white/60 backdrop-blur-md">{area}</li>)}
          </ul>
        </div>
        <a href="#historia" className="group inline-flex shrink-0 items-center gap-3 text-xs font-bold uppercase tracking-[.18em] text-white/72 transition-colors hover:text-gold">
          Nasza historia
          <span className="grid h-11 w-11 place-items-center rounded-full border border-white/20 transition duration-300 group-hover:border-gold/60 group-hover:bg-gold/10"><ArrowDown className="h-4 w-4" aria-hidden="true" /></span>
        </a>
      </div>
    </div>
  </section>;
}
