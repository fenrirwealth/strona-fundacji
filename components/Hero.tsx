'use client';

import Image from 'next/image';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import type { ReactElement } from 'react';

const lines = ['Razem zmieniamy', 'jutro.'] as const;

export function Hero(): ReactElement {
  return <section className="relative flex min-h-[100svh] items-center overflow-hidden px-5 pb-16 pt-28 sm:px-10 lg:px-16 xl:px-24" aria-labelledby="hero-heading">
    <div className="absolute inset-0 z-0">
      <Image
        src="/assets/generated/hero-cinematic-v1.jpg"
        alt="Uśmiechnięte dziecko patrzące z nadzieją w ciepłym świetle"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[64%_center] opacity-55"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,8,15,.98)_2%,rgba(5,8,15,.88)_38%,rgba(5,8,15,.24)_76%,rgba(5,8,15,.64)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,8,15,.18),rgba(5,8,15,.04)_52%,#05080f_100%)]" />
    </div>

    <div className="relative z-10 mx-auto w-full max-w-content">
      <motion.p
        initial={false}
        className="mb-7 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[.26em] text-gold sm:text-xs"
      >
        <span className="h-px w-10 bg-gold sm:w-14" aria-hidden="true" />
        Każdy gest ma siłę
      </motion.p>

      <motion.h1
        id="hero-heading"
        initial={false}
        className="max-w-6xl font-display text-[clamp(3.6rem,9.5vw,9rem)] font-medium leading-[.82] tracking-[-.055em] text-cream"
      >
        {lines.map(line => <span key={line} className="block overflow-hidden pb-[.08em]">
          <span className="block">
            {line}
          </span>
        </span>)}
      </motion.h1>

      <motion.div
        initial={false}
        className="mt-8 max-w-xl sm:mt-10"
      >
        <p className="text-base leading-8 text-white/72 sm:text-lg">Pomagamy dzieciom i rodzinom odzyskać bezpieczeństwo, sprawczość i wiarę, że dobra przyszłość naprawdę jest możliwa.</p>
        <div className="mt-9 flex flex-col gap-4 sm:flex-row">
          <motion.a
            href="#wsparcie"
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.98 }}
            className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-gold px-8 py-4 text-sm font-bold uppercase tracking-[.15em] text-night shadow-glow ring-1 ring-gold/60 transition-shadow hover:shadow-[0_0_34px_rgba(216,174,99,.5),0_0_100px_rgba(216,174,99,.22)]"
          >
            Chcę pomóc <ArrowDown className="h-4 w-4" aria-hidden="true" />
          </motion.a>
          <a href="https://portal.fundacjalepszydomlepszejutro.pl" className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-white/20 bg-white/[.06] px-8 py-4 text-sm font-semibold uppercase tracking-[.13em] text-white backdrop-blur-glass transition duration-300 hover:border-gold/60 hover:bg-white/[.1]">
            Portal listów <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </a>
        </div>
      </motion.div>
    </div>
  </section>;
}
