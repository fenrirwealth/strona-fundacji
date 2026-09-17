'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import type { ReactElement } from 'react';

const words = ['Razem', 'zmieniamy', 'jutro.'] as const;

export default function HeroOverlay(): ReactElement {
  const reduced = useReducedMotion();
  return <section className="cinematic-hero relative flex min-h-[calc(100vh-91px)] items-center overflow-hidden px-6 py-24 sm:px-10 lg:px-16 xl:px-24" aria-labelledby="hero-title">
    <div className="absolute inset-0 z-0"><Image src="/assets/generated/hero-cinematic-v1.jpg" alt="Uśmiechnięte dziecko patrzące z nadzieją w ciepłym świetle" fill priority sizes="100vw" className="object-cover object-[68%_center] opacity-55" /><div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,10,20,.98)_4%,rgba(5,10,20,.9)_35%,rgba(5,10,20,.3)_72%,rgba(5,10,20,.55)_100%)]" /><div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,10,20,.12),rgba(5,10,20,.08)_58%,#050A14_100%)]" /></div>
    <div className="relative z-10 mx-auto w-full max-w-7xl">
      <motion.p initial={{ opacity: 0, y: reduced ? 0 : 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }} className="mb-7 flex items-center gap-3 text-xs font-semibold uppercase tracking-[.28em] text-gold sm:text-sm"><span className="h-px w-12 bg-gold" aria-hidden="true" />Każdy gest ma siłę · Fundacja Lepszy Dom Lepsze Jutro</motion.p>
      <motion.h1 id="hero-title" initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: reduced ? 0 : .16, delayChildren: .12 } } }} className="max-w-5xl font-display text-[clamp(3.5rem,9vw,8.7rem)] font-normal leading-[.86] tracking-[-.055em] text-cream">
        {words.map(word => <motion.span key={word} variants={{ hidden: { opacity: 0, y: reduced ? 0 : 70, filter: reduced ? 'none' : 'blur(12px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: .9, ease: [0.22, 1, 0.36, 1] } } }} className="mr-[.22em] inline-block last:mr-0">{word}</motion.span>)}
      </motion.h1>
      <motion.p initial={{ opacity: 0, y: reduced ? 0 : 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: reduced ? 0 : .72 }} className="mt-8 max-w-xl text-base leading-8 text-white/75 sm:text-lg">Pomagamy dzieciom i rodzinom odzyskać bezpieczeństwo, sprawczość i wiarę, że dobra przyszłość naprawdę jest możliwa.</motion.p>
      <motion.div initial={{ opacity: 0, y: reduced ? 0 : 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: reduced ? 0 : .95 }} className="mt-10 flex flex-col gap-4 sm:flex-row">
        <a href="#wsparcie" className="cinematic-cta group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-gold px-8 py-4 text-sm font-bold uppercase tracking-[.16em] text-night transition duration-300 hover:-translate-y-1">Chcę pomóc <span className="text-xl transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span></a>
        <a href="https://portal.fundacjalepszydomlepszejutro.pl" className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/25 bg-white/[.07] px-8 py-4 text-sm font-semibold uppercase tracking-[.14em] text-white backdrop-blur-md transition hover:border-gold/65 hover:bg-white/[.12]">Portal listów dzieci</a>
      </motion.div>
    </div>
  </section>;
}
