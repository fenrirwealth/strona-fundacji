'use client';

import { ArrowDown } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;

export function ArchiveHero() {
  const reducedMotion = useReducedMotion();

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

      <motion.div
        className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center"
        initial={reducedMotion ? false : 'hidden'}
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.12, delayChildren: 0.12 } },
        }}
      >
        <motion.p
          className="mb-6 text-[10px] font-bold uppercase tracking-[0.3em] text-amber-500 sm:text-xs"
          variants={{
            hidden: { opacity: 0, y: 18 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
          }}
        >
          Archiwum Fundacji
        </motion.p>

        <motion.h1
          className="max-w-[12ch] font-display text-[clamp(3.8rem,10vw,9rem)] font-medium leading-[0.84] tracking-[-0.055em] text-[#FFF9F0]"
          variants={{
            hidden: { opacity: 0, y: 34, filter: 'blur(12px)' },
            visible: {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              transition: { duration: 1, ease: EASE },
            },
          }}
        >
          Zapisane w czasie.
        </motion.h1>

        <motion.p
          className="mt-8 max-w-xl font-sans text-base leading-8 text-neutral-400 sm:text-lg"
          variants={{
            hidden: { opacity: 0, y: 22 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
          }}
        >
          Każda akcja to setki uśmiechów. Przeżyjmy to jeszcze raz.
        </motion.p>

        <motion.a
          href="#filmstrip"
          aria-label="Przejdź do archiwum działań"
          className="mt-12 grid h-14 w-14 place-items-center rounded-full border border-white/15 text-white/55 transition-colors hover:border-amber-500/50 hover:text-amber-500 lg:mt-16"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 0.7, ease: EASE } },
          }}
        >
          <motion.span
            animate={reducedMotion ? undefined : { y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown className="h-5 w-5" aria-hidden="true" />
          </motion.span>
        </motion.a>
      </motion.div>
    </section>
  );
}
