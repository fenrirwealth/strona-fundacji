'use client';

import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from 'framer-motion';
import { useEffect, useRef } from 'react';

type Pillar = {
  number: string;
  category: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  surface: string;
  imagePosition: string;
};

const pillars: Pillar[] = [
  {
    number: '01',
    category: 'Edukacja',
    title: 'Wyprawka na lepsze jutro',
    description: 'Wyrównujemy szanse na starcie. Wyposażamy dzieci z placówek opiekuńczych i rodzin w kryzysie w niezbędne przybory, ułatwiając im dobry początek roku szkolnego.',
    image: '/assets/generated/wyprawka-v1.webp',
    alt: 'Plecak, książki i przybory przygotowane dla ucznia',
    surface: 'bg-[#0b1019]',
    imagePosition: 'lg:order-2',
  },
  {
    number: '02',
    category: 'Dziecięce Marzenia',
    title: 'Magiczne Święta',
    description: 'Za każdym listem stoi konkretne dziecko. Zbieramy marzenia i zamieniamy je w prezenty, przywracając radość i magię w domach dziecka oraz rodzinach zastępczych.',
    image: '/assets/generated/magiczne-swieta-v1.webp',
    alt: 'Świąteczne paczki przygotowane dla dzieci',
    surface: 'bg-[#101b2d]',
    imagePosition: 'lg:order-1',
  },
  {
    number: '03',
    category: 'Pomoc doraźna',
    title: 'Wsparcie na co dzień',
    description: 'Reagujemy na bieżąco. Przekazujemy odzież, artykuły codziennego użytku i środki higieniczne dla rodzin w najtrudniejszych sytuacjach.',
    image: '/assets/generated/wsparcie-na-co-dzien-v1.webp',
    alt: 'Wolontariusze kompletujący odzież i artykuły codziennego użytku',
    surface: 'bg-[#030509]',
    imagePosition: 'lg:order-2',
  },
];

export function PillarsStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRefs = useRef<Array<HTMLLIElement | null>>([]);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      cardRefs.current.forEach((card, index) => {
        const wrapper = wrapperRefs.current[index];
        if (!card || !wrapper) return;

        const nextWrapper = wrapperRefs.current[index + 1];
        if (!nextWrapper) return;
        const dimmer = card.querySelector('[data-card-dimmer]');
        gsap.to(card, {
          scale: 0.945,
          filter: 'brightness(.62)',
          ease: 'none',
          scrollTrigger: { trigger: nextWrapper, start: 'top 82%', end: 'top 18%', scrub: 0.6 },
        });
        if (dimmer) gsap.to(dimmer, {
          opacity: 0.38,
          ease: 'none',
          scrollTrigger: { trigger: nextWrapper, start: 'top 82%', end: 'top 18%', scrub: 0.6 },
        });
      });
    }, section);

    const refresh = () => ScrollTrigger.refresh();
    const refreshFrame = requestAnimationFrame(refresh);
    window.addEventListener('load', refresh, { once: true });
    return () => {
      cancelAnimationFrame(refreshFrame);
      window.removeEventListener('load', refresh);
      context.revert();
    };
  }, [reducedMotion]);

  return <section ref={sectionRef} id="dzialania" className="relative px-5 pb-16 pt-24 sm:px-10 lg:px-16 lg:pb-24 lg:pt-36 xl:px-24" aria-labelledby="pillars-heading">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(216,174,99,.07),transparent_30%),radial-gradient(circle_at_88%_70%,rgba(16,27,45,.75),transparent_38%)]" aria-hidden="true" />
    <div className="relative mx-auto max-w-content">
      <div className="mb-16 grid gap-8 lg:mb-24 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <p className="mb-5 text-xs font-bold uppercase tracking-[.25em] text-gold">Trzy filary działania</p>
          <h2 id="pillars-heading" className="font-display text-5xl font-medium leading-[.94] tracking-[-.04em] text-cream sm:text-6xl lg:text-8xl">Pomoc, która odpowiada na prawdziwe potrzeby.</h2>
        </div>
        <p className="max-w-md text-base leading-8 text-white/58 lg:col-span-4 lg:justify-self-end">Każde działanie zaczynamy od rozmowy i rozpoznania sytuacji. Dzięki temu wsparcie trafia tam, gdzie może przynieść konkretną zmianę.</p>
      </div>

      <ol className="relative">
        {pillars.map((pillar, index) => <li
          key={pillar.number}
          ref={element => { wrapperRefs.current[index] = element; }}
          className="relative min-h-[100svh] last:min-h-[82svh]"
          style={{ zIndex: index + 1 }}
        >
          <article
            ref={element => { cardRefs.current[index] = element; }}
            className={`sticky top-[12svh] min-h-[72svh] origin-top overflow-hidden rounded-[2rem] border border-white/12 shadow-[0_40px_120px_rgba(0,0,0,.55)] backdrop-blur-glass ${pillar.surface}`}
          >
            <div className="page-curtain-noise pointer-events-none absolute inset-0 opacity-[.035]" aria-hidden="true" />
            <div data-card-dimmer className="pointer-events-none absolute inset-0 z-20 bg-black opacity-0" aria-hidden="true" />
            <div className="relative z-10 grid min-h-[72svh] gap-0 lg:grid-cols-12">
              <div className={`relative min-h-[300px] overflow-hidden lg:col-span-5 lg:min-h-full ${pillar.imagePosition}`}>
                <Image src={pillar.image} alt={pillar.alt} fill sizes="(min-width: 1024px) 42vw, 100vw" className="object-cover transition-transform duration-1000 ease-editorial hover:scale-[1.025]" />
                <div className="absolute inset-0 bg-gradient-to-t from-night/55 via-transparent to-black/15 lg:bg-gradient-to-r lg:from-night/25 lg:to-transparent" />
                <span className="absolute bottom-5 left-5 rounded-full border border-white/20 bg-black/25 px-4 py-2 text-[10px] font-semibold uppercase tracking-[.18em] text-white/75 backdrop-blur-md sm:bottom-7 sm:left-7">Działanie Fundacji</span>
              </div>

              <div className={`flex flex-col p-7 sm:p-10 lg:col-span-7 lg:p-14 xl:p-16 ${index === 1 ? 'lg:order-2' : 'lg:order-1'}`}>
                <div className="flex items-start justify-between gap-6 border-b border-white/10 pb-7">
                  <p className="text-[10px] font-bold uppercase tracking-[.25em] text-gold sm:text-xs">{pillar.category}</p>
                  <span className="font-sans text-3xl font-extralight tracking-[-.04em] text-white/25 sm:text-4xl">{pillar.number}</span>
                </div>
                <div className="my-auto py-12 sm:py-16">
                  <h3 className="max-w-3xl font-display text-[clamp(2.8rem,5.5vw,5.5rem)] font-medium leading-[.92] tracking-[-.045em] text-cream">{pillar.title}</h3>
                  <p className="mt-7 max-w-2xl text-base leading-8 text-white/62 sm:text-lg">{pillar.description}</p>
                </div>
                <div className="flex items-center gap-4 border-t border-white/10 pt-7 text-[10px] font-semibold uppercase tracking-[.2em] text-white/35">
                  <span className="h-px w-10 bg-gold/60" aria-hidden="true" />
                  Lepszy Dom · Lepsze Jutro
                </div>
              </div>
            </div>
          </article>
        </li>)}
      </ol>
    </div>
  </section>;
}
