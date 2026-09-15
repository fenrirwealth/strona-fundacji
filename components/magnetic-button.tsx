'use client';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { useEffect, useRef, type ReactNode, type PointerEvent } from 'react';
import { design } from '@/lib/design';
export function MagneticButton({ href, children, variant = 'dark' }: { href: string; children: ReactNode; variant?: 'dark' | 'light' | 'outline' }) {
  const frame = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const dx = useMotionValue(0), dy = useMotionValue(0);
  const x = useSpring(dx, design.spring), y = useSpring(dy, design.spring);
  const reset = () => { dx.set(0); dy.set(0); };
  useEffect(() => { if (reduced) { dx.set(0); dy.set(0); } }, [reduced, dx, dy]);
  function follow(event: PointerEvent<HTMLSpanElement>) {
    if (reduced || event.pointerType !== 'mouse' || !frame.current) return;
    const rect = frame.current.getBoundingClientRect();
    dx.set(Math.max(-8, Math.min(8, (event.clientX - rect.left - rect.width / 2) * .1)));
    dy.set(Math.max(-5, Math.min(5, (event.clientY - rect.top - rect.height / 2) * .15)));
  }
  return <span ref={frame} className="magnetic-frame" onPointerMove={follow} onPointerLeave={reset}><motion.a style={{ x: reduced ? 0 : x, y: reduced ? 0 : y }} href={href} className={`button button-${variant}`} onFocus={reset} whileTap={reduced ? undefined : { scale: .985 }}>{children}<span aria-hidden="true">↗</span></motion.a></span>;
}
