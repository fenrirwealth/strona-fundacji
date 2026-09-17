'use client';

import Image from 'next/image';
import { ArrowDown } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

const headline = ['Za', 'każdą', 'pomocą', 'stoją', 'ludzie.'] as const;
const editorialEase = [0.22, 1, 0.36, 1] as const;

export function MissionHero() {
  const reducedMotion = useReducedMotion();

  return <section className="relative flex min-h-[100svh] items-end overflow-hidden px-5 pb-16 pt-32 sm:px-10 sm:pb-20 lg:px-16 lg:pb-24 xl:px-24" aria-labelledby="mission-heading">
    <div className="absolute inset-0" aria-hidden="true">
      <Image
        src="/assets/generated/wolontariat-cinematic-v1.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-40"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,8,15,.97)_0%,rgba(5,8,15,.72)_55%,rgba(5,8,15,.38)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,8,15,.45)_0%,rgba(5,8,15,.12)_38%,#05080f_100%)]" />
      <div className="absolute -right-[15%] top-[10%] h-[34rem] w-[34rem] rounded-full bg-gold/[.09] blur-[150px]" />
      <div className="page-curtain-noise absolute inset-0 opacity-[.045]" />
    </div>

    <div className="relative z-10 mx-auto w-full max-w-content">
      <motion.p
        initial={{ opacity: 0, y: reducedMotion ? 0 : 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.7, ease: editorialEase }}
        className="mb-7 flex items-center gap-4 text-[11px] font-bold uppercase tracking-[.28em] text-gold sm:text-xs"
      >
        <span className="h-px w-12 bg-gold" />
        Poznaj nas bliżej
      </motion.p>

      <motion.h1
        id="mission-heading"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { delayChildren: reducedMotion ? 0 : 0.12, staggerChildren: reducedMotion ? 0 : 0.1 } },
        }}
        className="max-w-[11ch] font-display text-[clamp(3.7rem,9vw,8.8rem)] font-medium leading-[.84] tracking-[-.055em] text-cream"
      >
        {headline.map((word, index) => <motion.span
          key={word}
          className="mr-[.2em] inline-block"
          variants={{
            hidden: { opacity: 0, y: reducedMotion ? 0 : 50, filter: reducedMotion ? 'blur(0px)' : 'blur(14px)' },
            visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: reducedMotion ? 0 : 0.9, ease: editorialEase } },
          }}
        >
          {word}{index === headline.length - 1 ? '' : ' '}
        </motion.span>)}
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: reducedMotion ? 0 : 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.85, delay: reducedMotion ? 0 : 0.82, ease: editorialEase }}
        className="mt-8 flex max-w-4xl flex-col gap-8 border-t border-white/15 pt-7 sm:flex-row sm:items-end sm:justify-between"
      >
        <p className="max-w-2xl text-base leading-8 text-white/68 sm:text-lg">Fundacja powstała z prostego przekonania: uważność, odpowiedzialność i wspólne działanie mogą przywrócić dziecku poczucie bezpieczeństwa oraz nadzieję na dobre jutro.</p>
        <a href="#historia" className="group inline-flex shrink-0 items-center gap-3 text-xs font-bold uppercase tracking-[.18em] text-white/72 transition-colors hover:text-gold">
          Nasza historia
          <span className="grid h-11 w-11 place-items-center rounded-full border border-white/20 transition duration-300 group-hover:border-gold/60 group-hover:bg-gold/10"><ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" aria-hidden="true" /></span>
        </a>
      </motion.div>
    </div>
  </section>;
}
