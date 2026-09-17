'use client';

import { Eye, HandHeart, HeartHandshake, type LucideIcon } from 'lucide-react';
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import type { PointerEvent, ReactNode } from 'react';

type Value = {
  title: string;
  description: string;
  eyebrow: string;
  icon: LucideIcon;
  className: string;
  accent: ReactNode;
};

const values: Value[] = [
  {
    title: 'Transparentność',
    description: 'Mówimy jasno, jak działamy, komu pomagamy i jakie są efekty wspólnego zaangażowania. Zaufanie budujemy faktami, nie obietnicami.',
    eyebrow: 'Odpowiedzialność',
    icon: Eye,
    className: 'md:col-span-7 md:row-span-2',
    accent: <span className="font-display text-[clamp(5rem,12vw,10rem)] font-medium leading-none text-gold/15">01</span>,
  },
  {
    title: 'Bezpośrednia Pomoc',
    description: 'Każde wsparcie wynika z realnej, wcześniej rozpoznanej potrzeby — od codziennej pomocy dzieciom i rodzinom po reakcję na kryzysy i skutki klęsk żywiołowych.',
    eyebrow: 'Blisko potrzeb',
    icon: HandHeart,
    className: 'md:col-span-5',
    accent: <span className="h-20 w-20 rounded-full border border-gold/20 shadow-[0_0_70px_rgba(216,174,99,.12)]" />,
  },
  {
    title: 'Zaangażowanie',
    description: 'Łączymy darczyńców, wolontariuszy, firmy i instytucje, które chcą działać mądrze i odpowiedzialnie. Każdy wnosi coś ważnego do wspólnej zmiany.',
    eyebrow: 'Siła relacji',
    icon: HeartHandshake,
    className: 'md:col-span-5',
    accent: <span className="font-display text-8xl leading-none text-white/[.035]">∞</span>,
  },
];

function TiltCard({ value, index }: Readonly<{ value: Value; index: number }>) {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 180, damping: 24, mass: 0.35 });
  const springY = useSpring(pointerY, { stiffness: 180, damping: 24, mass: 0.35 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-6, 6]);
  const glowX = useTransform(springX, [-0.5, 0.5], ['15%', '85%']);
  const glowY = useTransform(springY, [-0.5, 0.5], ['15%', '85%']);
  const glow = useMotionTemplate`radial-gradient(360px circle at ${glowX} ${glowY}, rgba(216,174,99,.14), transparent 62%)`;
  const reducedMotion = useReducedMotion();
  const Icon = value.icon;

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    if (reducedMotion || event.pointerType !== 'mouse') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
    pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
  }

  function resetTilt() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return <motion.article
    initial={{ opacity: 0, y: reducedMotion ? 0 : 38 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.25 }}
    transition={{ duration: reducedMotion ? 0 : 0.75, delay: reducedMotion ? 0 : index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    onPointerMove={handlePointerMove}
    onPointerLeave={resetTilt}
    onPointerCancel={resetTilt}
    style={reducedMotion ? undefined : { rotateX, rotateY, transformPerspective: 1_000 }}
    className={`group relative flex min-h-[330px] transform-gpu flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white/[.05] p-7 shadow-glass backdrop-blur-glass transition-colors duration-500 hover:border-gold/35 hover:bg-white/[.075] sm:p-10 ${value.className}`}
  >
    {!reducedMotion && <motion.div className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: glow }} aria-hidden="true" />}
    <div className="pointer-events-none absolute right-6 top-6" aria-hidden="true">{value.accent}</div>
    <div className="relative z-10 flex items-start justify-between gap-6">
      <span className="grid h-14 w-14 place-items-center rounded-full border border-white/15 bg-white/[.045] text-gold transition duration-500 group-hover:border-gold/40 group-hover:shadow-[0_0_34px_rgba(216,174,99,.18)]">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </span>
      <span className="text-[10px] font-bold uppercase tracking-[.22em] text-white/38">0{index + 1}</span>
    </div>
    <div className="relative z-10 mt-auto pt-20">
      <p className="mb-4 text-[10px] font-bold uppercase tracking-[.24em] text-gold">{value.eyebrow}</p>
      <h3 className="font-display text-4xl font-medium leading-none tracking-[-.025em] text-cream sm:text-5xl">{value.title}</h3>
      <p className="mt-5 max-w-xl text-sm leading-7 text-white/58 sm:text-base sm:leading-8">{value.description}</p>
    </div>
  </motion.article>;
}

export function ValuesGrid() {
  return <section className="relative px-5 pb-28 pt-24 sm:px-10 lg:px-16 lg:pb-40 lg:pt-36 xl:px-24" aria-labelledby="values-heading">
    <div className="absolute inset-x-0 bottom-0 h-[38rem] bg-[radial-gradient(ellipse_at_bottom,rgba(18,61,50,.2),transparent_65%)]" aria-hidden="true" />
    <div className="relative mx-auto max-w-content">
      <div className="mb-14 max-w-4xl sm:mb-20">
        <p className="mb-5 text-xs font-bold uppercase tracking-[.25em] text-gold">Wartości w praktyce</p>
        <h2 id="values-heading" className="font-display text-5xl font-medium leading-[.95] tracking-[-.04em] text-cream sm:text-6xl lg:text-8xl">Tak rozumiemy odpowiedzialną pomoc.</h2>
      </div>
      <div className="grid auto-rows-fr gap-5 md:grid-cols-12">
        {values.map((value, index) => <TiltCard key={value.title} value={value} index={index} />)}
      </div>
      <div className="mt-14 flex flex-col gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-2xl text-sm leading-7 text-white/52">Chcesz poznać dokumenty Fundacji, dane rejestrowe i zasady naszej działalności?</p>
        <a href="/przejrzystosc" className="inline-flex min-h-12 items-center justify-center rounded-full border border-gold/40 bg-gold/[.08] px-7 text-xs font-bold uppercase tracking-[.16em] text-gold transition duration-300 hover:-translate-y-1 hover:bg-gold hover:text-night">Zobacz przejrzystość</a>
      </div>
    </div>
  </section>;
}
