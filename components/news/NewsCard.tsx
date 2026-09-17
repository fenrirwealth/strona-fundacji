'use client';

import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useEffect, useRef, useState, type PointerEvent } from 'react';
import type { NewsItem } from './NewsGrid';

export function NewsCard({ item }: { item: NewsItem }) {
  const [isHovered, setIsHovered] = useState(false);
  const reducedMotion = useReducedMotion();
  const articleRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const cursorX = useMotionValue(-120);
  const cursorY = useMotionValue(-120);
  const springX = useSpring(cursorX, { stiffness: 500, damping: 38, mass: 0.35 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 38, mass: 0.35 });

  useEffect(() => {
    const article = articleRef.current;
    const media = mediaRef.current;
    if (!article || !media || reducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.fromTo(media, { yPercent: -3 }, {
        yPercent: 3,
        ease: 'none',
        scrollTrigger: {
          trigger: article,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.7,
        },
      });
    }, article);
    return () => context.revert();
  }, [reducedMotion]);

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse' || reducedMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    cursorX.set(event.clientX - bounds.left);
    cursorY.set(event.clientY - bounds.top);
  };

  const handlePointerEnter = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === 'mouse' && !reducedMotion) setIsHovered(true);
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    cursorX.set(-120);
    cursorY.set(-120);
  };

  return <article
    ref={articleRef}
    className="group relative h-full min-h-[560px] overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[.045] shadow-[0_32px_100px_rgba(0,0,0,.28)] backdrop-blur-md sm:min-h-[620px]"
    onPointerMove={handlePointerMove}
    onPointerEnter={handlePointerEnter}
    onPointerLeave={handlePointerLeave}
  >
    <div ref={mediaRef} className="absolute -inset-8 overflow-hidden">
      <Image
        src={item.image}
        alt={item.imageAlt}
        fill
        sizes={item.size === 'narrow' ? '(min-width: 1024px) 34vw, 100vw' : '(min-width: 1024px) 70vw, 100vw'}
        className="object-cover brightness-[.68] saturate-[.82] transition-[transform,filter] duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105 group-hover:brightness-[.82] group-hover:saturate-100"
      />
    </div>
    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,8,15,.08)_10%,rgba(5,8,15,.35)_48%,rgba(5,8,15,.96)_100%)]" aria-hidden="true" />
    <div className="page-curtain-noise absolute inset-0 opacity-[.04]" aria-hidden="true" />

    <div className="relative z-10 flex h-full min-h-[560px] flex-col justify-between p-6 sm:min-h-[620px] sm:p-9 lg:p-10">
      <div className="flex items-center justify-between gap-4">
        <span className="rounded-full border border-white/18 bg-black/20 px-4 py-2 text-[10px] font-bold uppercase tracking-[.2em] text-white/78 backdrop-blur-md">{item.category}</span>
        <span className="text-[10px] font-semibold uppercase tracking-[.18em] text-white/56">{item.date}</span>
      </div>
      <div>
        <span className="mb-6 block h-px w-14 bg-gold/80 transition-all duration-700 group-hover:w-24" aria-hidden="true" />
        <h3 className="max-w-4xl text-balance font-display text-[clamp(2.5rem,5vw,5.4rem)] font-medium leading-[.92] tracking-[-.045em] text-cream">{item.title}</h3>
        <p className="mt-6 max-w-2xl text-sm leading-7 text-white/62 sm:text-base">{item.excerpt}</p>
      </div>
    </div>

    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0 z-20 hidden h-24 w-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-gold/45 bg-gold text-night shadow-[0_0_45px_rgba(216,174,99,.32)] backdrop-blur-md lg:grid"
      style={{ x: springX, y: springY }}
      animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.68 }}
      transition={{ opacity: { duration: 0.22 }, scale: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}
    >
      <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-[.14em]">Odkryj <ArrowUpRight className="h-3.5 w-3.5" /></span>
    </motion.div>
  </article>;
}
