"use client";

import { Mail, MapPin, Phone, type LucideIcon } from 'lucide-react';
import { foundation } from '@/lib/content';

type ContactItem = {
  label: string;
  value: string;
  href: string;
  icon: LucideIcon;
  external?: boolean;
};

const contactItems: ContactItem[] = [
  {
    label: 'E-mail',
    value: foundation.email,
    href: `mailto:${foundation.email}`,
    icon: Mail,
  },
  {
    label: 'Telefon',
    value: foundation.phone,
    href: 'tel:+48570747779',
    icon: Phone,
  },
  {
    label: 'Adres',
    value: `ul. ${foundation.address}`,
    href: 'https://maps.google.com/?q=Z%C5%82ota+75A%2F7%2C+00-819+Warszawa',
    icon: MapPin,
    external: true,
  },
];

export function ContactInfo() {
  return (
    <section
      className="relative flex w-full min-w-0 max-w-full flex-col justify-center pb-10 pt-28 lg:min-h-[calc(100svh-8rem)] lg:py-20"
      aria-labelledby="contact-heading"
    >
      <div className="mb-7 flex min-w-0 items-center gap-4">
        <span className="h-px w-12 shrink-0 bg-amber-500" aria-hidden="true" />
        <p className="m-0 text-[11px] font-bold uppercase tracking-[0.28em] text-amber-500">
          Kontakt
        </p>
      </div>

      <h1
        id="contact-heading"
        className="max-w-[11ch] font-display text-4xl font-medium leading-[0.98] tracking-[-0.04em] text-[#FFF9F0] sm:text-5xl lg:text-6xl"
      >
        Zacznijmy działać razem.
      </h1>

      <p className="mt-7 max-w-xl font-sans text-base leading-8 text-neutral-400 lg:mt-8 lg:text-lg">
        Napisz do nas, zadzwoń lub odwiedź nas w Warszawie. Każdy gest ma znaczenie.
      </p>

      <div
        className="mt-9 grid w-full min-w-0 max-w-xl gap-2 lg:mt-12"
        aria-label="Dane kontaktowe Fundacji"
      >
        {contactItems.map(({ label, value, href, icon: Icon, external }) => (
          <a
            key={label}
            href={href}
            target={external ? '_blank' : undefined}
            rel={external ? 'noreferrer' : undefined}
            className="group flex w-full min-w-0 max-w-full items-center gap-4 rounded-2xl border border-transparent px-2 py-4 transition duration-300 hover:border-white/10 hover:bg-white/[0.035] focus-visible:border-amber-500/60 sm:gap-5 sm:px-3"
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white/55 transition duration-300 group-hover:border-amber-500/40 group-hover:text-amber-500">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>

            <span className="min-w-0 max-w-full flex-1">
              <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/35">
                {label}
              </span>
              {label === 'E-mail' ? (
                <span className="mt-1 block max-w-full break-all text-sm font-medium text-amber-500 sm:text-base">
                  {value}
                </span>
              ) : (
                <span className="mt-1 block max-w-full break-words text-sm font-medium text-white/85 sm:text-base">
                  {value}
                </span>
              )}
            </span>
          </a>
        ))}
      </div>

      <section
        className="mt-10 w-full max-w-xl rounded-2xl border border-amber-500/40 bg-amber-500/[0.06] px-5 py-6 sm:px-7 sm:py-7"
        aria-labelledby="contact-registry-heading"
      >
        <p id="contact-registry-heading" className="m-0 text-[11px] font-bold uppercase tracking-[0.24em] text-amber-500">
          Dane rejestrowe
        </p>
        <p className="mb-0 mt-3 text-lg font-semibold tracking-[0.04em] text-[#FFF9F0] sm:text-xl">{foundation.legalName}</p>
        <dl className="mb-0 mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {([['KRS', foundation.krs], ['NIP', foundation.nip], ['REGON', foundation.regon]] as const).map(([term, value]) => (
            <div key={term} className="min-w-0 border-t border-white/10 pt-3">
              <dt className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-500/80">{term}</dt>
              <dd className="m-0 mt-1 text-lg font-semibold tabular-nums tracking-[0.02em] text-[#FFF9F0] sm:text-xl">{value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-5 border-t border-white/10 pt-3">
          <p className="m-0 text-[11px] font-bold uppercase tracking-[0.2em] text-amber-500/80">Adres siedziby</p>
          <p className="mb-0 mt-1 text-base font-medium text-[#FFF9F0] sm:text-lg">{foundation.registeredAddress}</p>
        </div>
      </section>

      <p className="mt-8 max-w-lg border-l border-amber-500/50 pl-4 text-xs leading-6 text-white/40">
        Odpowiadamy tak szybko, jak to możliwe. W sprawach wymagających pilnego kontaktu zadzwoń do nas bezpośrednio.
      </p>
    </section>
  );
}
