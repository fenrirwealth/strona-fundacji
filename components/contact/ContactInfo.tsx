'use client';

import { Mail, MapPin, Phone, type LucideIcon } from 'lucide-react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type MotionValue,
} from 'framer-motion';
import { useRef, type PointerEvent } from 'react';
import { foundation } from '@/lib/content';

type ContactItem = {
  label: string;
  value: string;
  href: string;
  icon: LucideIcon;
};

const contactItems: ContactItem[] = [
  { label: 'E-mail', value: foundation.email, href: `mailto:${foundation.email}`, icon: Mail },
  { label: 'Telefon', value: foundation.phone, href: 'tel:+48570747779', icon: Phone },
  { label: 'Adres', value: `ul. ${foundation.address}`, href: 'https://maps.google.com/?q=Z%C5%82ota+75A%2F7%2C+00-819+Warszawa', icon: MapPin },
];

function resetMagnet(x: MotionValue<number>, y: MotionValue<number>): void {
  x.set(0);
  y.set(0);
}

export function ContactInfo() {
  const reducedMotion = useReducedMotion();
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const magneticX = useMotionValue(0);
  const magneticY = useMotionValue(0);
  const x = useSpring(magneticX, { stiffness: 260, damping: 20, mass: 0.45 });
  const y = useSpring(magneticY, { stiffness: 260, damping: 20, mass: 0.45 });

  function moveMagnet(event: PointerEvent<HTMLAnchorElement>): void {
    if (reducedMotion || event.pointerType === 'touch') return;
    const bounds = buttonRef.current?.getBoundingClientRect();
    if (!bounds) return;
    magneticX.set((event.clientX - bounds.left - bounds.width / 2) * 0.18);
    magneticY.set((event.clientY - bounds.top - bounds.height / 2) * 0.18);
  }

  return <motion.section
    className="relative flex w-full min-w-0 flex-col justify-center py-16 pt-24 lg:min-h-[calc(100svh-8rem)] lg:py-20"
    initial={reducedMotion ? false : { opacity: 0, x: -42 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: reducedMotion ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }}
    aria-labelledby="contact-heading"
  >
    <div className="pointer-events-none absolute -left-48 top-1/4 h-[32rem] w-[32rem] rounded-full bg-gold/[.08] blur-[150px]" aria-hidden="true" />
    <div className="absolute inset-y-0 right-0 hidden w-px bg-gradient-to-b from-transparent via-white/15 to-transparent lg:block" aria-hidden="true" />

    <div className="relative z-10 w-full max-w-2xl">
      <motion.p
        className="mb-7 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[.26em] text-gold"
        initial={reducedMotion ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.65, delay: reducedMotion ? 0 : 0.2 }}
      >
        <span className="h-px w-10 bg-gold" aria-hidden="true" /> Kontakt
      </motion.p>

      <motion.h1
        id="contact-heading"
        className="max-w-3xl font-display text-4xl font-medium leading-[.95] tracking-[-.045em] text-cream sm:text-5xl lg:text-6xl"
        initial={reducedMotion ? false : { opacity: 0, y: 36, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: reducedMotion ? 0 : 0.9, delay: reducedMotion ? 0 : 0.08 }}
      >
        Zacznijmy działać razem.
      </motion.h1>

      <motion.p
        className="mt-8 max-w-xl font-sans text-base leading-8 text-neutral-400 sm:text-lg"
        initial={reducedMotion ? false : { opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.75, delay: reducedMotion ? 0 : 0.3 }}
      >
        Napisz do nas, zadzwoń lub odwiedź nas w Warszawie. Każdy gest ma znaczenie.
      </motion.p>

      <div className="mt-10 grid min-w-0 gap-2 lg:mt-12" aria-label="Dane kontaktowe Fundacji">
        {contactItems.map(({ label, value, href, icon: Icon }, index) => <motion.a
          key={label}
          href={href}
          target={label === 'Adres' ? '_blank' : undefined}
          rel={label === 'Adres' ? 'noreferrer' : undefined}
          className="group flex min-w-0 items-center gap-4 rounded-2xl border border-transparent px-2 py-4 transition-colors hover:border-white/[.08] hover:bg-white/[.035] focus-visible:border-gold/40 sm:gap-5 sm:px-3"
          initial={reducedMotion ? false : { opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.6, delay: reducedMotion ? 0 : 0.42 + index * 0.09 }}
          whileHover={reducedMotion ? undefined : { x: 8 }}
        >
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[.04] text-white/55 transition-colors duration-300 group-hover:border-gold/35 group-hover:text-gold">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[10px] font-bold uppercase tracking-[.2em] text-white/35">{label}</span>
            <span className="mt-1 block min-w-0 max-w-full break-words text-sm font-medium text-white/85 sm:text-base">
              {label === 'E-mail' ? <span className="break-all">{value}</span> : value}
            </span>
          </span>
        </motion.a>)}
      </div>

      <motion.a
        ref={buttonRef}
        href={`mailto:${foundation.email}`}
        style={{ x, y }}
        onPointerMove={moveMagnet}
        onPointerLeave={() => resetMagnet(magneticX, magneticY)}
        whileHover={reducedMotion ? undefined : { scale: 1.025 }}
        whileTap={{ scale: 0.98 }}
        className="mt-10 inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-gold px-6 py-4 text-center text-xs font-bold uppercase tracking-[.13em] text-night shadow-[0_0_28px_rgba(216,174,99,.3),0_0_90px_rgba(216,174,99,.12)] ring-1 ring-gold/60 transition-shadow hover:shadow-[0_0_38px_rgba(216,174,99,.5),0_0_120px_rgba(216,174,99,.22)] sm:w-auto sm:px-8 sm:text-sm sm:tracking-[.15em]"
      >
        Napisz e-mail <Mail className="h-4 w-4" aria-hidden="true" />
      </motion.a>
    </div>
  </motion.section>;
}
