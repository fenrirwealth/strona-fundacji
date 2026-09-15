'use client';
import Lenis from 'lenis';
import { MotionConfig, useAnimationFrame, useReducedMotion, cubicBezier } from 'framer-motion';
import { useEffect, useRef, type ReactNode } from 'react';
import { design } from '@/lib/design';
import 'lenis/dist/lenis.css';

/** Native scrolling is preserved on touch and whenever reduced motion is requested. */
export function ExperienceProvider({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const instance = useRef<Lenis | null>(null);
  useEffect(() => {
    if (reduced || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const lenis = new Lenis({ autoRaf: false, duration: 1.05, easing: cubicBezier(...design.ease.editorial), smoothWheel: true, syncTouch: false, anchors: { offset: -110 } });
    instance.current = lenis;
    return () => { instance.current = null; lenis.destroy(); };
  }, [reduced]);
  // Framer Motion is the shared clock; there is no second requestAnimationFrame loop.
  useAnimationFrame(time => instance.current?.raf(time));
  return <MotionConfig reducedMotion="user" transition={{ ease: design.ease.editorial }}>{children}</MotionConfig>;
}
