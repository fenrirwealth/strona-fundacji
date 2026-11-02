'use client';
import { useState } from 'react';
import { Pause, Play } from 'lucide-react';

export function ChristmasWorkshop() {
  const [paused, setPaused] = useState(false);
  return <section data-paused={paused} className="christmas-workshop relative isolate overflow-hidden bg-[#130e13] text-cream" aria-labelledby="workshop-heading">
    <div className="relative mx-auto max-w-[1800px]">
      <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[16/8] lg:aspect-[21/9]">
        <img src="/assets/kampanie/pracownia-elfow.webp" width="1672" height="941" loading="lazy" alt="Baśniowa pracownia: elfy w aksamitnych strojach pakują prezenty przy ciepłym świetle lamp i choinki." className="workshop-camera h-full w-full object-cover object-center" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(8,10,18,.12)_35%,rgba(8,10,18,.95)_100%)]" />
        <div className="workshop-glow pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">{Array.from({length:14},(_,i)=><span key={i} className="workshop-mote" style={{left:`${7+i*6.5}%`,top:`${20+(i*17)%65}%`,animationDelay:`-${i*1.7}s`,animationDuration:`${9+i%5}s`,width:i%3===0?5:3,height:i%3===0?5:3}} />)}</div>
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-7 text-center sm:px-10 sm:pb-12 lg:pb-16">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[.25em] text-gold sm:text-xs">Mały gest. Wielka radość.</p>
          <h2 id="workshop-heading" className="font-display text-4xl font-medium leading-tight tracking-[-.025em] sm:text-6xl lg:text-7xl">Magia zaczyna się <span className="text-gold">od Ciebie.</span></h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-white/80 sm:text-base">Dołącz do nas i pomóż zamienić świąteczne marzenia w prezenty.</p>
        </div>
        <button type="button" onClick={()=>setPaused(!paused)} aria-pressed={paused} aria-label={paused?'Włącz animację pracowni':'Wstrzymaj animację pracowni'} className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/70">{paused?<Play size={16} aria-hidden="true"/>:<Pause size={16} aria-hidden="true"/>}</button>
      </div>
    </div>
  </section>;
}
