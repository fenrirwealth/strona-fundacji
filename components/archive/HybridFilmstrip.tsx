'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArchiveCard, type ArchiveItem } from './ArchiveCard';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const archiveItems: ArchiveItem[] = [
  {
    year: '2026',
    eyebrow: 'Edukacja · wspólne działanie',
    title: 'Zbiórka w Polish Airports Academy',
    description:
      'Artykuły szkolne zebrane przez pracowników Polish Airports Academy trafiły do dzieci z placówek opiekuńczo-wychowawczych.',
    image: '/assets/aktualnosci/zbiorka-polish-airports-academy.webp',
    imageAlt: 'Pracownicy Polish Airports Academy przy zebranych artykułach szkolnych',
  },
  {
    year: '2026',
    eyebrow: 'Wielkanoc · pakiety radości',
    title: 'Wielkanocny Zajączek',
    description:
      'Wiosenna akcja pełna drobnych prezentów, kolorów i życzliwości przygotowanych z myślą o dzieciach.',
    image: '/assets/akcja-fundacji-dary.webp',
    imageAlt: 'Dary przygotowane podczas akcji Fundacji Lepszy Dom Lepsze Jutro',
  },
  {
    year: '2025',
    eyebrow: 'Święta · spełnione marzenia',
    title: '4. Edycja Magicznych Świąt',
    description:
      'Dzięki Darczyńcom świąteczne prezenty otrzymało 169 dzieci z 18 placówek oraz rodzin zastępczych.',
    image: '/assets/aktualnosci/swieta-2025-169-dzieci.jpg',
    imageAlt: 'Świąteczne podziękowanie za prezenty dla dzieci i rodzin zastępczych',
  },
];

export function HybridFilmstrip() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const cards = gsap.utils.toArray<HTMLElement>('[data-archive-card]', section);
      const media = gsap.matchMedia();

      media.add(
        {
          desktop: '(min-width: 1024px)',
          reducedMotion: '(prefers-reduced-motion: reduce)',
        },
        (context) => {
          const { desktop, reducedMotion } = context.conditions ?? {};
          if (!desktop) return;

          if (reducedMotion) {
            gsap.set(track, { width: '100%', flexDirection: 'column' });
            gsap.set(cards, { marginInline: 'auto' });
            return () => {
              gsap.set(track, { clearProps: 'width,flexDirection' });
              gsap.set(cards, { clearProps: 'marginInline' });
            };
          }

          const getDistance = () => Math.max(0, track.scrollWidth - window.innerWidth);
          const getXPercent = () => {
            if (!track.scrollWidth) return 0;
            return -100 * (getDistance() / track.scrollWidth);
          };
          const clampSkew = gsap.utils.clamp(-10, 10);
          const skewProxy = { value: 0 };
          const setSkew = gsap.quickSetter(cards, 'skewX', 'deg');

          gsap.set(cards, { transformOrigin: '50% 50%', force3D: true });

          const horizontalTween = gsap.to(track, {
            xPercent: getXPercent,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: () => `+=${Math.max(getDistance(), 1)}`,
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                const nextSkew = clampSkew(self.getVelocity() / -320);
                if (Math.abs(nextSkew) <= Math.abs(skewProxy.value)) return;

                skewProxy.value = nextSkew;
                gsap.to(skewProxy, {
                  value: 0,
                  duration: 0.8,
                  ease: 'power3.out',
                  overwrite: true,
                  onUpdate: () => setSkew(skewProxy.value),
                });
              },
              onScrubComplete: () => {
                skewProxy.value = 0;
                setSkew(0);
              },
            },
          });

          return () => {
            horizontalTween.scrollTrigger?.kill();
            horizontalTween.kill();
            setSkew(0);
            gsap.set(cards, { clearProps: 'transform,transformOrigin' });
            gsap.set(track, { clearProps: 'transform' });
          };
        },
      );

      const refreshOnLoad = () => ScrollTrigger.refresh();
      window.addEventListener('load', refreshOnLoad, { once: true });

      return () => {
        window.removeEventListener('load', refreshOnLoad);
        media.revert();
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="filmstrip"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#050505] py-24 lg:flex lg:h-screen lg:items-center lg:py-0"
      aria-label="Wybrane działania Fundacji"
    >
      <div
        ref={trackRef}
        className="flex w-full flex-col gap-12 px-6 lg:w-max lg:flex-row lg:gap-16 lg:px-[10vw]"
      >
        {archiveItems.map((item, index) => (
          <div
            key={`${item.year}-${item.title}`}
            data-archive-card
            className="w-full max-w-[400px] shrink-0 self-center lg:w-[450px] lg:max-w-none"
          >
            <ArchiveCard item={item} priority={index === 0} />
          </div>
        ))}
      </div>
    </section>
  );
}
