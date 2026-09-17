import Image from 'next/image';
import type { ReactElement } from 'react';
import { cn } from '@/lib/cn';

const stories = [
  {
    src: '/assets/generated/wolontariat-cinematic-v2.jpg',
    alt: 'Wolontariusze przygotowują całoroczną pomoc dla dzieci i rodzin',
    label: 'Wolontariat',
    title: 'Dobro rośnie, kiedy działamy razem.',
    copy: 'Łączymy darczyńców, wolontariuszy i firmy wokół prawdziwych potrzeb.',
    className: 'md:col-span-7 md:row-span-2',
    sizes: '(min-width: 768px) 58vw, 100vw',
  },
  {
    src: '/assets/generated/rodzina-cinematic-v1.jpg',
    alt: 'Uśmiechnięta rodzina spędzająca czas w bezpiecznym domu',
    label: 'Bezpieczeństwo',
    title: 'Pomoc, która zostaje na dłużej.',
    copy: 'Każde wsparcie ma prowadzić do większej stabilności i nowego początku.',
    className: 'md:col-span-5',
    sizes: '(min-width: 768px) 42vw, 100vw',
  },
  {
    src: '/assets/generated/hero-cinematic-v1.jpg',
    alt: 'Pełne nadziei dziecko w ciepłym, złotym świetle',
    label: 'Przyszłość',
    title: 'Dziecko zawsze jest najważniejsze.',
    copy: 'Pomagamy uważnie, odpowiedzialnie i z poszanowaniem prywatności.',
    className: 'md:col-span-5',
    sizes: '(min-width: 768px) 42vw, 100vw',
  },
] as const;

const metrics = [
  { value: '470+', label: 'dzieci objętych pomocą' },
  { value: '260 tys. zł', label: 'wartości przekazanego wsparcia' },
  { value: '60+', label: 'placówek i rodzin' },
] as const;

export function StoryGrid(): ReactElement {
  return <section id="historia" className="relative px-5 py-24 sm:px-10 lg:px-16 lg:py-36 xl:px-24" aria-labelledby="story-heading">
    <div className="mx-auto max-w-content">
      <div className="mb-14 grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
        <div className="lg:col-span-8">
          <p className="mb-5 text-xs font-bold uppercase tracking-[.25em] text-gold">Blisko ludzi. Blisko potrzeb.</p>
          <h2 id="story-heading" className="font-display text-5xl font-medium leading-[.96] tracking-[-.035em] text-cream sm:text-6xl lg:text-7xl">Prawdziwa zmiana zaczyna się od zauważenia człowieka.</h2>
        </div>
        <p className="max-w-md text-base leading-8 text-white/60 lg:col-span-4 lg:justify-self-end">Nie opowiadamy o abstrakcyjnej pomocy. Pokazujemy ludzi, konkretne potrzeby i efekty wspólnego działania.</p>
      </div>

      <div className="grid auto-rows-[390px] gap-5 md:grid-cols-12 md:auto-rows-[330px]">
        {stories.map(story => <article key={story.src} className={cn('group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[.04] shadow-glass', story.className)}>
          <Image src={story.src} alt={story.alt} fill sizes={story.sizes} className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-night via-night/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[.24em] text-gold">{story.label}</p>
            <h3 className="max-w-xl font-display text-3xl font-medium leading-tight text-white sm:text-4xl">{story.title}</h3>
            <p className="mt-3 max-w-xl text-sm leading-7 text-white/70 sm:text-base">{story.copy}</p>
          </div>
        </article>)}
      </div>

      <dl className="mt-5 grid overflow-hidden rounded-[2rem] border border-white/10 bg-white/[.045] backdrop-blur-glass md:grid-cols-3">
        {metrics.map(metric => <div key={metric.label} className="border-white/10 p-7 md:border-l md:p-9 md:first:border-l-0">
          <dt className="text-xs uppercase tracking-[.18em] text-white/50">{metric.label}</dt>
          <dd className="mt-2 font-display text-4xl font-semibold text-gold sm:text-5xl">{metric.value}</dd>
        </div>)}
      </dl>
      <p className="mt-4 text-right text-[10px] uppercase tracking-[.16em] text-white/35">Dane Fundacji — stan na 2026 r.</p>
    </div>
  </section>;
}
