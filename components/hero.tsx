'use client';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { MagneticButton } from './magnetic-button';
import { design } from '@/lib/design';

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 32]);
  return <section ref={ref} className="hero shell" aria-labelledby="hero-title">
    <div className="hero-intro"><p className="eyebrow">Pomagamy razem · od 2022</p><span className="edition">WSPÓLNIE OD 2022</span></div>
    <div className="hero-grid">
      <div className="hero-copy"><h1 id="hero-title"><motion.span initial={false} animate={{ y: reduced ? 0 : [14, 0], opacity: reduced ? 1 : [.75, 1] }} transition={{ duration: .8, ease: design.ease.editorial }} className="headline-first">Każdy gest ma siłę.</motion.span><motion.span initial={false} animate={{ y: reduced ? 0 : [20, 0], opacity: reduced ? 1 : [.75, 1] }} transition={{ duration: reduced ? 0 : 1.2 }} className="headline-main">Razem zmieniamy<br /><em>jutro.</em></motion.span></h1>
        <p className="hero-description">Pomagamy dzieciom i rodzinom, które znalazły się w trudnej sytuacji. Możesz wybrać list, przekazać potrzebne rzeczy, wesprzeć akcję albo podarować swój czas.</p>
        <div className="hero-actions"><MagneticButton href="#dzialania">Chcę pomóc</MagneticButton><a href="/o-fundacji" className="text-link">Poznaj Fundację <span aria-hidden="true">↓</span></a></div>
      </div>
      <motion.figure style={{ y: reduced ? 0 : y }} className="hero-visual"><div className="image-frame"><img src="/assets/premium/grupa.webp" width="480" height="360" alt="Osoby przy zebranych darach podczas działań Fundacji" fetchPriority="high" /><span className="image-index">01 / LUDZIE I DZIAŁANIE</span></div><figcaption><span>Za każdą pomocą stoją ludzie.</span><span>Z archiwum Fundacji ↗</span></figcaption><div className="photo-note"><span className="note-rule" /><p>Wspólne wartości.<br /><strong>Konkretny kierunek.</strong></p></div></motion.figure>
    </div>
    <div className="hero-bottom"><span>KAŻDY MOŻE POMÓC</span><a href="#wplyw">Zobacz, jak pomagamy <span aria-hidden="true">↓</span></a><span>RAZEM MOŻEMY WIĘCEJ</span></div>
  </section>;
}
