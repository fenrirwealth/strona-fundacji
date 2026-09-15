'use client';
import { useAnimationFrame, useInView, useMotionValue, useReducedMotion, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { partners } from '@/lib/content';
/** Infinite loop has an explicit pause, stops on hover/focus, and never duplicates the accessible logos. */
export function Partners() {
  const region = useRef<HTMLDivElement>(null), group = useRef<HTMLUListElement>(null);
  const width = useRef(0);
  const x = useMotionValue(0);
  const reduced = useReducedMotion();
  const inView = useInView(region, { amount: .1 });
  const [paused, setPaused] = useState(false), [hover, setHover] = useState(false), [focused, setFocused] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  useEffect(() => {
    const measure = () => { width.current = group.current?.getBoundingClientRect().width ?? 0; };
    const observer = new ResizeObserver(measure); if (group.current) observer.observe(group.current); measure();
    const visibility = () => setPageVisible(!document.hidden);
    document.addEventListener('visibilitychange', visibility);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', visibility); };
  }, []);
  useEffect(() => { if (reduced) x.set(0); }, [reduced, x]);
  useAnimationFrame((_, delta) => {
    if (reduced || paused || hover || focused || !pageVisible || !inView || !width.current) return;
    const next = x.get() - Math.min(delta, 50) * .023;
    x.set(next <= -width.current ? next + width.current : next);
  });
  return <div className="partners-block" ref={region}><div className="flex flex-wrap items-end justify-between gap-6"><div><p className="eyebrow">Relacje oparte na wspólnych wartościach</p><h3>Zaufali nam</h3></div><button className="marquee-toggle" onClick={() => setPaused(!paused)} aria-pressed={paused} disabled={!!reduced}>{reduced ? 'Animacja wyłączona' : paused ? 'Wznów animację →' : 'Wstrzymaj animację Ⅱ'}</button></div><p className="editorial-note">Logotypy partnerów prezentowanych na wcześniejszej stronie Fundacji. Materiały z archiwum.</p><div className={`partner-window ${reduced ? 'is-static' : ''}`} onPointerEnter={() => setHover(true)} onPointerLeave={() => setHover(false)} onFocusCapture={() => setFocused(true)} onBlurCapture={() => setFocused(false)} tabIndex={0} role="region" aria-label="Logotypy partnerów z archiwum Fundacji"><motion.div className="partner-belt" style={{ x: reduced ? 0 : x }}><ul className="partner-group" ref={group}>{partners.map(partner => <li className="partner-slot" key={partner.name}><img src={partner.logo} alt={partner.name} width="180" height="66" loading="lazy" /></li>)}</ul><ul className="partner-group partner-copy" aria-hidden="true" inert>{partners.map(partner => <li className="partner-slot" key={partner.name}><img src={partner.logo} alt="" width="180" height="66" loading="lazy" /></li>)}</ul></motion.div></div></div>;
}
