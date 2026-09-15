'use client';
import { animate, motion, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState, type ReactNode } from 'react';

/** Content is visible in SSR and without JS; motion only enhances it. */
export function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: .12 });
  const reduce = useReducedMotion();
  return <motion.div ref={ref} className={className} initial={false} animate={{ y: inView || reduce ? 0 : 20, opacity: inView || reduce ? 1 : .72 }} transition={{ duration: reduce ? 0 : .7, delay, ease: [.22, 1, .36, 1] }}>{children}</motion.div>;
}

/** Screen readers receive the final number, never every animation frame. */
export function Counter({ value, prefix = '', suffix = '' }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const visible = useInView(ref, { once: true, amount: .6 });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(value);
  useEffect(() => {
    if (!visible || reduce) { setDisplay(value); return; }
    const controls = animate(0, value, { duration: 1.6, ease: [.22, 1, .36, 1], onUpdate: v => setDisplay(Math.round(v)) });
    return () => controls.stop();
  }, [visible, value, reduce]);
  return <span ref={ref}><span className="sr-only">{prefix}{value.toLocaleString('pl-PL')}{suffix}</span><span aria-hidden="true"><span className="counter-prefix">{prefix}</span>{display.toLocaleString('pl-PL')}<span className="counter-suffix">{suffix}</span></span></span>;
}
