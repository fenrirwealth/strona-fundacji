'use client';

import { motion, useReducedMotion } from 'framer-motion';

const editorialEase = [0.22, 1, 0.36, 1] as const;

export function FounderQuote() {
  const reducedMotion = useReducedMotion();

  return <section className="relative overflow-hidden px-5 py-24 sm:px-10 lg:px-16 lg:py-40 xl:px-24" aria-label="Słowa Prezesa Zarządu">
    <div className="absolute left-1/2 top-1/2 h-[34rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[.045] blur-[140px]" aria-hidden="true" />
    <motion.figure
      initial={{ opacity: 0, y: reducedMotion ? 0 : 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: reducedMotion ? 0 : 1, ease: editorialEase }}
      className="relative mx-auto max-w-content border-y border-white/10 py-12 sm:py-16 lg:py-24"
    >
      <span className="absolute -top-2 left-0 font-display text-[8rem] leading-none text-gold drop-shadow-[0_0_28px_rgba(216,174,99,.35)] sm:text-[11rem]" aria-hidden="true">“</span>
      <blockquote className="relative ml-auto max-w-5xl pt-16 sm:pt-20">
        <p className="font-display text-[clamp(2.2rem,5vw,5rem)] font-medium leading-[1.03] tracking-[-.035em] text-cream">Nie zmienimy całego świata, ale dla tych dzieci i rodzin zmieniamy ich cały świat. <em className="font-inherit not-italic text-gold">To nadaje sens naszej pracy.</em></p>
      </blockquote>
      <figcaption className="mt-10 flex justify-end sm:mt-14">
        <div className="flex items-center gap-4 text-right">
          <span className="h-px w-12 bg-gold/70 sm:w-20" aria-hidden="true" />
          <div>
            <strong className="block text-sm font-semibold tracking-[.03em] text-white">Michał Synal</strong>
            <span className="mt-1 block text-[10px] uppercase tracking-[.2em] text-white/45">Prezes Zarządu</span>
          </div>
        </div>
      </figcaption>
    </motion.figure>
  </section>;
}
