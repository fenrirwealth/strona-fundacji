'use client';

import Image from 'next/image';
import { Check, Copy, ExternalLink, HeartHandshake } from 'lucide-react';
import { useEffect, useRef, useState, type ReactElement } from 'react';
import { cn } from '@/lib/cn';
import { foundation } from '@/lib/content';

const BANK_ACCOUNT = '51 1090 2590 0000 0001 5074 2996';

export function DonationCard(): ReactElement {
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<number | null>(null);

  useEffect(() => () => {
    if (resetTimer.current !== null) window.clearTimeout(resetTimer.current);
  }, []);

  async function copyAccount(): Promise<void> {
    const compactAccount = BANK_ACCOUNT.replaceAll(' ', '');
    try {
      await navigator.clipboard.writeText(compactAccount);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = compactAccount;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.append(textarea);
      textarea.select();
      document.execCommand('copy');
      textarea.remove();
    }

    setCopied(true);
    if (resetTimer.current !== null) window.clearTimeout(resetTimer.current);
    resetTimer.current = window.setTimeout(() => setCopied(false), 3_000);
  }

  return <section id="wsparcie" className="relative px-5 py-24 sm:px-10 lg:px-16 lg:py-36 xl:px-24" aria-labelledby="donation-heading">
    <div className="absolute inset-0 m-auto h-[36rem] w-[36rem] rounded-full bg-gold/[.09] blur-[140px]" aria-hidden="true" />
    <div className="relative mx-auto grid max-w-content gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center lg:gap-20">
      <div>
        <div className="mb-7 grid h-14 w-14 place-items-center rounded-full border border-gold/35 bg-gold/10 text-gold">
          <HeartHandshake className="h-6 w-6" aria-hidden="true" />
        </div>
        <p className="mb-5 text-xs font-bold uppercase tracking-[.25em] text-gold">Bezpieczna darowizna</p>
        <h2 id="donation-heading" className="font-display text-5xl font-medium leading-[.96] tracking-[-.035em] text-cream sm:text-6xl lg:text-7xl">Wesprzyj naszą misję</h2>
        <p className="mt-7 max-w-lg text-base leading-8 text-white/60">Każda wpłata zamienia się w konkretne wsparcie dzieci i rodzin. Dziękujemy za zaufanie oraz za każdy gest — niezależnie od jego wysokości.</p>
      </div>

      <div className="overflow-hidden rounded-[2rem] border border-white/15 bg-white/[.055] p-6 shadow-glass backdrop-blur-glass sm:p-9 lg:p-12">
        <div className="flex flex-col justify-between gap-6 border-b border-white/10 pb-8 sm:flex-row sm:items-center">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[.2em] text-white/45">Rachunek Fundacji</p>
            <p className="mt-2 text-sm text-white/70">Erste Bank Polska</p>
          </div>
          <div className="inline-flex w-fit rounded-xl bg-[#2870ed] px-3 py-2">
            <Image src="/assets/banks/erste-bank-polska.svg" alt="Erste Bank Polska" width={148} height={42} className="h-auto w-36" />
          </div>
        </div>

        <p className="mt-8 break-words font-display text-[clamp(2rem,4.2vw,4.3rem)] font-semibold leading-[1.02] tracking-[-.035em] text-cream" aria-label={`Numer konta ${BANK_ACCOUNT}`}>{BANK_ACCOUNT}</p>

        <dl className="mt-8 grid gap-4 text-sm sm:grid-cols-2">
          <div className="border-t border-white/10 pt-4"><dt className="text-white/40">Odbiorca</dt><dd className="mt-1 text-white/80">{foundation.name}</dd></div>
          <div className="border-t border-white/10 pt-4"><dt className="text-white/40">Tytuł przelewu</dt><dd className="mt-1 text-white/80">Darowizna</dd></div>
        </dl>

        <div className="mt-9 flex flex-col gap-4 sm:flex-row">
          <button
            type="button"
            onClick={copyAccount}
            className={cn('inline-flex min-h-14 flex-1 items-center justify-center gap-3 rounded-full px-6 text-sm font-bold transition duration-300', copied ? 'bg-emerald-400 text-night' : 'bg-gold text-night shadow-glow')}
            aria-live="polite"
          >
            {copied ? <Check className="h-5 w-5" aria-hidden="true" /> : <Copy className="h-5 w-5" aria-hidden="true" />}
            {copied ? 'Skopiowano. Dziękujemy!' : 'Kopiuj numer konta'}
          </button>
          <a href={foundation.siepomagaProfile} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-white/15 bg-white/[.06] px-6 text-sm font-semibold text-white transition hover:border-gold/50 hover:bg-white/[.1]">
            Siepomaga <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>

        {/* Idealne miejsce na przyszły komponent <PaymentGateway />. */}
      </div>
    </div>
  </section>;
}
