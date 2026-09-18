'use client';

import { ArrowDown } from 'lucide-react';

export function ArchiveHero() {
  return (
    <section className="relative flex min-h-[70vh] w-full items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_24%,rgba(216,174,99,0.13),transparent_34%),linear-gradient(180deg,#101723_0%,#080b11_48%,#050505_100%)] px-6 pb-20 pt-32 text-center lg:min-h-screen lg:px-12 lg:pb-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04] page-curtain-noise"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-[#050505]"
        aria-hidden="true"
      />

      <div
        className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center"
      >
        <p
          className="mb-6 text-[10px] font-bold uppercase tracking-[0.3em] text-amber-500 sm:text-xs"
        >
          Archiwum Fundacji
        </p>

        <h1
          className="max-w-[12ch] font-display text-[clamp(3.8rem,10vw,9rem)] font-medium leading-[0.84] tracking-[-0.055em] text-[#FFF9F0]"
        >
          Zapisane w czasie.
        </h1>

        <p
          className="mt-8 max-w-xl font-sans text-base leading-8 text-neutral-400 sm:text-lg"
        >
          Każda akcja to setki uśmiechów. Przeżyjmy to jeszcze raz.
        </p>

        <a
          href="#filmstrip"
          aria-label="Przejdź do archiwum działań"
          className="mt-12 grid h-14 w-14 place-items-center rounded-full border border-white/15 text-white/55 transition-colors hover:border-amber-500/50 hover:text-amber-500 lg:mt-16"
        >
          <span>
            <ArrowDown className="h-5 w-5" aria-hidden="true" />
          </span>
        </a>
      </div>
    </section>
  );
}
