import Image from 'next/image';
import type { ReactElement } from 'react';

const stories = [
  { src: '/assets/generated/wolontariat-cinematic-v1.jpg', alt: 'Wolontariusze wspólnie przygotowują paczki dla potrzebujących', eyebrow: 'Wspólnota', title: 'Dobro nabiera mocy, kiedy robimy je razem.', copy: 'Łączymy ludzi, firmy i wolontariuszy wokół realnych potrzeb dzieci oraz rodzin.', className: 'md:col-span-7 md:row-span-2', sizes: '(min-width: 768px) 58vw, 100vw' },
  { src: '/assets/generated/rodzina-cinematic-v1.jpg', alt: 'Rodzina spędza spokojny wieczór w bezpiecznym domu', eyebrow: 'Bezpieczeństwo', title: 'Pomoc, która zostaje na dłużej.', copy: 'Nie zatrzymujemy się na jednym geście. Budujemy poczucie stabilności i dajemy przestrzeń do nowego początku.', className: 'md:col-span-5 md:row-span-1', sizes: '(min-width: 768px) 42vw, 100vw' },
] as const;

export default function ImageStorytelling(): ReactElement {
  return <section id="historia" className="cinematic-story relative px-6 py-24 sm:px-10 lg:px-16 lg:py-36 xl:px-24" aria-labelledby="story-title"><div className="mx-auto max-w-7xl">
    <div className="mb-14 grid gap-8 lg:grid-cols-12 lg:items-end"><div className="lg:col-span-8"><p className="mb-5 text-xs font-bold uppercase tracking-[.26em] text-gold">Blisko ludzi. Blisko potrzeb.</p><h2 id="story-title" className="font-display text-4xl leading-tight text-cream sm:text-6xl lg:text-7xl">Każda pomoc zaczyna się od zauważenia człowieka.</h2></div><p className="max-w-md text-base leading-8 text-white/60 lg:col-span-4 lg:justify-self-end">Działamy konkretnie, z szacunkiem i pełną odpowiedzialnością za powierzane nam zaufanie.</p></div>
    <div className="grid auto-rows-[minmax(360px,1fr)] gap-5 md:grid-cols-12 md:auto-rows-[310px]">
      {stories.map(story => <article key={story.src} className={`group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[.04] ${story.className}`}><Image src={story.src} alt={story.alt} fill sizes={story.sizes} className="object-cover transition duration-700 ease-out group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-night via-night/20 to-transparent" /><div className="absolute inset-x-0 bottom-0 p-7 sm:p-9"><p className="mb-3 text-[11px] font-bold uppercase tracking-[.24em] text-gold">{story.eyebrow}</p><h3 className="max-w-xl font-display text-3xl leading-tight text-white sm:text-4xl">{story.title}</h3><p className="mt-3 max-w-xl text-sm leading-7 text-white/70 sm:text-base">{story.copy}</p></div></article>)}
      <article className="relative flex min-h-[310px] flex-col justify-between overflow-hidden rounded-[2rem] border border-gold/20 bg-[linear-gradient(145deg,rgba(216,174,99,.18),rgba(18,61,50,.25))] p-8 backdrop-blur-xl md:col-span-5 md:row-span-1 sm:p-10"><div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold/20 blur-3xl" aria-hidden="true" /><p className="relative text-xs font-bold uppercase tracking-[.26em] text-gold">Nasza obietnica</p><p className="relative max-w-lg font-display text-3xl leading-snug text-cream sm:text-4xl">„Pomoc ma sens wtedy, gdy przywraca nadzieję i godność.”</p></article>
    </div>
  </div></section>;
}
