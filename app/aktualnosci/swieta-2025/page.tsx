import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

const title = 'Dzięki Wam 169 dzieci otrzymało wymarzone prezenty';
const description = 'Podziękowanie dla Darczyńców, Koordynatorów i Przyjaciół Fundacji za paczki przygotowane dla 169 dzieci z 18 placówek oraz rodzin zastępczych.';

export const metadata: Metadata = {
  title: `${title} | Fundacja Lepszy Dom Lepsze Jutro`,
  description,
  alternates: { canonical: '/aktualnosci/swieta-2025' },
  openGraph: {
    type: 'article',
    locale: 'pl_PL',
    url: '/aktualnosci/swieta-2025',
    siteName: 'Fundacja Lepszy Dom Lepsze Jutro',
    title,
    description,
    images: [{
      url: '/assets/aktualnosci/swieta-2025-169-dzieci.jpg',
      width: 1365,
      height: 2048,
      alt: 'Świąteczne podziękowanie za prezenty dla 169 dzieci z 18 placówek oraz rodzin zastępczych',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/assets/aktualnosci/swieta-2025-169-dzieci.jpg'],
  },
};

export default function Christmas2025Article() {
  return <>
    <Header variant="dark" />
    <main id="main" className="relative overflow-hidden bg-[#05080f] pb-28 pt-36 text-cream sm:pt-44 lg:pb-40">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-gold/[.08] blur-[170px]" aria-hidden="true" />
      <div className="page-curtain-noise pointer-events-none absolute inset-0 opacity-[.025]" aria-hidden="true" />

      <article className="relative mx-auto max-w-6xl px-5 sm:px-10 lg:px-16">
        <Link href="/aktualnosci" className="mb-12 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[.16em] text-white/55 transition hover:text-gold">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Wszystkie aktualności
        </Link>

        <header className="max-w-5xl">
          <div className="mb-7 flex flex-wrap items-center gap-3 text-[10px] font-bold uppercase tracking-[.2em]">
            <span className="rounded-full border border-gold/30 bg-gold/[.08] px-4 py-2 text-gold">Święta</span>
            <time dateTime="2025-12" className="text-white/45">Grudzień 2025</time>
          </div>
          <h1 className="text-balance font-display text-[clamp(3.25rem,7vw,7rem)] font-medium leading-[.9] tracking-[-.05em]">Dzięki Wam. <span className="text-gold">169 dzieci</span> otrzymało wymarzone prezenty.</h1>
          <p className="mt-8 max-w-3xl text-lg leading-9 text-white/58 sm:text-xl">Za tą liczbą nie stoi „akcja” — stoją twarze, historie i marzenia, które ktoś zauważył i potraktował poważnie.</p>
        </header>

        <figure className="mx-auto my-14 max-w-2xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/[.04] shadow-[0_35px_120px_rgba(0,0,0,.5)] sm:my-20">
          <Image
            src="/assets/aktualnosci/swieta-2025-169-dzieci.jpg"
            alt="Świąteczne podziękowanie za prezenty dla 169 dzieci z 18 placówek oraz rodzin zastępczych"
            width={1365}
            height={2048}
            priority
            className="h-auto w-full"
          />
        </figure>

        <div className="mx-auto max-w-3xl space-y-8 text-base leading-8 text-white/72 sm:text-lg sm:leading-9">
          <p className="font-display text-3xl leading-tight text-cream sm:text-4xl">Drodzy Darczyńcy, Przyjaciele Fundacji 🤍✨</p>

          <p>Są takie chwile, kiedy w magazynie robi się ciszej niż zwykle. Kiedy ktoś na moment przestaje biegać, odkłada taśmę, patrzy na rząd gotowych paczek… i po prostu ma mokre oczy. Bo dopiero wtedy naprawdę dociera, co się wydarzyło.</p>

          <p>Dzięki Wam przygotowaliśmy paczki dla <strong className="font-semibold text-cream">169 dzieci z 18 placówek oraz rodzin zastępczych</strong>. A za tą liczbą nie stoi „akcja” — stoją twarze, historie i marzenia, które ktoś musiał zauważyć i potraktować poważnie.</p>

          <section className="rounded-[1.75rem] border border-white/10 bg-white/[.045] p-6 backdrop-blur-xl sm:p-9" aria-labelledby="niewidoczna-magia">
            <h2 id="niewidoczna-magia" className="font-display text-3xl text-cream sm:text-4xl">Była też ta cała niewidoczna magia, której nie widać na zdjęciach:</h2>
            <ul className="mt-7 space-y-4 text-white/68">
              <li>— telefony o późnych porach, „czy zdążymy?”, „czy wszystko się zgadza?”</li>
              <li>— stres koordynatorów zbiórek, którzy trzymali to w ryzach, choć serce biło szybciej niż zwykle</li>
              <li>— listy, notatki, poprawki, przepakowywanie, brakujące drobiazgi szukane „na już”</li>
              <li>— i ta cudowna presja czasu, kiedy człowiek działa na emocjach, a jednocześnie chce, żeby wszystko było idealnie</li>
            </ul>
          </section>

          <p>Były momenty wzruszenia, kiedy ktoś mówił: „To dla dziecka, które nigdy nic nie miało…”<br />Były chwile radości, gdy paczka nagle „stawała się kompletna” — jakby ktoś ją domknął dobrym słowem i sercem.<br />I była ogromna wdzięczność za to, że w tym świecie wciąż można liczyć na ludzi.</p>

          <div className="space-y-5 border-l border-gold/40 pl-6 sm:pl-9">
            <p><strong className="font-semibold text-cream">Dziękujemy wszystkim Darczyńcom</strong> — za zaufanie, hojność i piękną uważność.</p>
            <p><strong className="font-semibold text-cream">Dziękujemy Koordynatorom zbiórek</strong> — za odpowiedzialność, nerwy ze stali i serca miękkie jak śnieg.</p>
            <p><strong className="font-semibold text-cream">Dziękujemy każdemu, kto dołożył choć mały element</strong> — bo właśnie z takich elementów powstaje coś, co dzieci czują najmocniej: że są ważne.</p>
          </div>

          <p className="font-display text-3xl leading-tight text-cream sm:text-4xl">Ta pomoc miała swój blask. I miała swój ciężar.<br />Ale przede wszystkim miała sens. 🎁✨</p>

          <div className="pt-5">
            <p>Z całego serca — dziękujemy.</p>
            <p className="mt-2 font-semibold text-gold">Fundacja Lepszy Dom Lepsze Jutro 🤍</p>
          </div>
        </div>
      </article>
    </main>
    <Footer variant="dark" />
  </>;
}
