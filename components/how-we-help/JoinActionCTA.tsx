'use client';

import { ArrowUpRight, HandHeart } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

export function JoinActionCTA() {
  const reducedMotion = useReducedMotion();

  return <section className="relative overflow-hidden px-5 py-28 sm:px-10 lg:px-16 lg:py-40 xl:px-24" aria-labelledby="join-heading">
    <div className="absolute inset-0 bg-[linear-gradient(145deg,#05080f_0%,#0b1019_45%,#101b2d_100%)]" aria-hidden="true" />
    <motion.div
      className="absolute -left-36 top-1/2 h-[30rem] w-[30rem] -translate-y-1/2 rounded-full bg-gold/[.11] blur-[150px]"
      animate={reducedMotion ? undefined : { x: [0, 90, 0], y: [0, -35, 0], scale: [1, 1.12, 1] }}
      transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      aria-hidden="true"
    />
    <motion.div
      className="absolute -right-32 top-8 h-[26rem] w-[26rem] rounded-full bg-forest/20 blur-[140px]"
      animate={reducedMotion ? undefined : { x: [0, -70, 0], y: [0, 55, 0], scale: [1.08, 0.96, 1.08] }}
      transition={{ duration: 17, repeat: Infinity, ease: 'easeInOut' }}
      aria-hidden="true"
    />
    <div className="page-curtain-noise absolute inset-0 opacity-[.045]" aria-hidden="true" />

    <motion.div
      initial={{ opacity: 0, y: reducedMotion ? 0 : 42 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: reducedMotion ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto max-w-content rounded-[2rem] border border-white/10 bg-white/[.045] px-6 py-14 text-center shadow-glass backdrop-blur-glass sm:px-12 sm:py-20 lg:px-20 lg:py-24"
    >
      <span className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-gold/35 bg-gold/[.08] text-gold shadow-[0_0_45px_rgba(216,174,99,.15)]">
        <HandHeart className="h-7 w-7" aria-hidden="true" />
      </span>
      <p className="mt-7 text-xs font-bold uppercase tracking-[.25em] text-gold">Dołącz do działania</p>
      <h2 id="join-heading" className="mx-auto mt-5 max-w-5xl font-display text-5xl font-medium leading-[.94] tracking-[-.04em] text-cream sm:text-6xl lg:text-8xl">Twoje wsparcie napędza te działania.</h2>
      <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-white/58">Każda darowizna, godzina wolontariatu i udostępniona informacja pomaga nam docierać dalej i odpowiadać na kolejne potrzeby.</p>
      <div className="mt-10 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
        <motion.a
          href="/#wsparcie"
          whileHover={reducedMotion ? undefined : { y: -4, scale: 1.015 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-gold px-8 py-4 text-sm font-bold uppercase tracking-[.14em] text-night shadow-glow ring-1 ring-gold/60 transition-shadow hover:shadow-[0_0_36px_rgba(216,174,99,.52),0_0_100px_rgba(216,174,99,.22)]"
        >
          Wpłać darowiznę <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </motion.a>
        <motion.a
          href="/kontakt?temat=wolontariat#formularz"
          whileHover={reducedMotion ? undefined : { y: -4 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-white/20 bg-white/[.05] px-8 py-4 text-sm font-semibold uppercase tracking-[.13em] text-white backdrop-blur-md transition duration-300 hover:border-gold/55 hover:bg-white/[.09] hover:text-gold"
        >
          Zostań wolontariuszem <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </motion.a>
      </div>
    </motion.div>
  </section>;
}
