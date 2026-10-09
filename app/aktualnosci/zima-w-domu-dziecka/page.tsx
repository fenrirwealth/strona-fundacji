import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

const title = 'Tak wyglądała tu ubiegła zima. Chcemy, żeby ta była inna.';
const description = 'Prawdziwe zdjęcia z domu dziecka, zrobione zimą podczas naszej wizyty w placówce. Chcemy, żeby kolejną zimę dzieci spędziły w porządnych łóżkach, z szafą na własne rzeczy.';
const cover = '/assets/aktualnosci/zima-w-domu-dziecka-2.webp';
const coverAlt = 'Metalowe piętrowe łóżko w domu dziecka z ramą sklejoną taśmą i pluszakami ustawionymi pod ścianą';

export const metadata: Metadata = {
  title: `${title} | Fundacja Lepszy Dom Lepsze Jutro`,
  description,
  alternates: { canonical: '/aktualnosci/zima-w-domu-dziecka' },
  openGraph: {
    type: 'article',
    locale: 'pl_PL',
    url: '/aktualnosci/zima-w-domu-dziecka',
    siteName: 'Fundacja Lepszy Dom Lepsze Jutro',
    title,
    description,
    images: [{ url: cover, width: 1600, height: 900, alt: coverAlt }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [cover],
  },
};

type Photo = { src: string; alt: string; width: number; height: number };
const img = (n: number, alt: string, width: number, height: number): Photo => ({ src: `/assets/aktualnosci/zima-w-domu-dziecka-${n}.webp`, alt, width, height });

const scenes: Array<{ text: string; photos: Photo[] }> = [
  {
    text: 'Regał, na którym buty leżą jedne na drugich, bo dla wszystkich nie ma miejsca. Reszta stoi na podłodze.',
    photos: [img(1, 'Regał w przedsionku domu dziecka, na którym buty leżą jedne na drugich; kolejne pary stoją na podłodze', 900, 1600)],
  },
  {
    text: 'Metalowe piętrowe łóżko z ramą sklejoną taśmą. Cienki materac. Kurtki powieszone na poręczy. I pluszaki ustawione równo pod ścianą: jedyny kawałek świata, który jest naprawdę „mój”.',
    photos: [
      img(2, 'Metalowe piętrowe łóżko z ramą sklejoną taśmą, kurtki powieszone na poręczy i pluszaki ustawione pod ścianą', 1600, 900),
      img(3, 'Cienki materac na metalowej ramie piętrowego łóżka', 1600, 900),
    ],
  },
  {
    text: 'Łazienka, w której czas zatrzymał się kilkadziesiąt lat temu. Kubek, w którym ledwo mieszczą się wszystkie szczoteczki.',
    photos: [
      img(4, 'Stara łazienka z zieloną umywalką i kubkiem pełnym szczoteczek do zębów', 900, 1600),
      img(5, 'Łazienka z zieloną armaturą sprzed kilkudziesięciu lat, pralką i suszarką', 900, 1600),
    ],
  },
  {
    text: 'Wąski pokój, który ma być miejscem do zabawy i wyciszenia.',
    photos: [img(6, 'Wąski pokój do zabawy i wyciszenia z podwieszanym hamakiem i kilkoma klockami', 900, 1600)],
  },
];

export default function WinterInChildrensHomeArticle() {
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
            <span className="rounded-full border border-gold/30 bg-gold/[.08] px-4 py-2 text-gold">Domy dziecka</span>
            <time dateTime="2026-10" className="text-white/45">Październik 2026</time>
          </div>
          <h1 className="text-balance font-display text-[clamp(3.25rem,7vw,7rem)] font-medium leading-[.9] tracking-[-.05em]">Tak wyglądała tu ubiegła zima. <span className="text-gold">Chcemy, żeby ta była inna.</span></h1>
          <p className="mt-8 max-w-3xl text-lg leading-9 text-white/58 sm:text-xl">To tylko jeden dom. W Polsce ponad 78 tysięcy dzieci dorasta poza własną rodziną. Ponad 17 tysięcy z nich mieszka w placówkach, takich jak ta.</p>
        </header>

        <div className="mx-auto mt-14 max-w-3xl space-y-8 text-base leading-8 text-white/72 sm:mt-20 sm:text-lg sm:leading-9">
          <p>To prawdziwe zdjęcia z domu dziecka. Zrobiliśmy je sami, zimą, podczas wizyty w placówce. Nie ma na nich twarzy, bo dzieci nie pokazujemy. Ale wystarczy popatrzeć na rzeczy.</p>
        </div>

        <div className="mx-auto my-14 max-w-4xl space-y-14 sm:my-20 sm:space-y-20">
          {scenes.map((scene, index) => {
            const portrait = scene.photos[0].height > scene.photos[0].width;
            const layout = scene.photos.length > 1
              ? (portrait ? 'grid grid-cols-2 gap-4 sm:gap-6' : 'grid gap-4 sm:gap-6')
              : (portrait ? 'mx-auto max-w-md' : '');
            return <figure key={scene.text}>
              <div className={layout}>
                {scene.photos.map(photo => <div key={photo.src} className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[.04] shadow-[0_35px_120px_rgba(0,0,0,.5)] sm:rounded-[2rem]">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    priority={index === 0}
                    className="h-auto w-full"
                  />
                </div>)}
              </div>
              <figcaption className="mx-auto mt-7 max-w-3xl border-l border-gold/40 pl-6 text-base leading-8 text-white/72 sm:pl-9 sm:text-lg sm:leading-9">{scene.text}</figcaption>
            </figure>;
          })}
        </div>

        <div className="mx-auto max-w-3xl space-y-8 text-base leading-8 text-white/72 sm:text-lg sm:leading-9">
          <p>To nie jest niczyja zła wola. Opiekunowie robią, co mogą, z tym, co mają. Tylko że mają za mało.</p>

          <p>A dziecko, które już raz straciło dom, nie powinno dorastać w poczuciu, że należy mu się tylko to, co stare, sklejone i „po kimś”. <strong className="font-semibold text-cream">Warunki, w jakich się dorasta, uczą, ile jest się wartym.</strong></p>

          <p>Idzie kolejna zima. Chcemy, żeby te dzieci spędziły ją w porządnych łóżkach, z szafą na własne rzeczy i w łazience, której nie trzeba się wstydzić. To zwyczajne rzeczy. W każdym domu są oczywiste.</p>

          <p className="font-display text-3xl leading-tight text-cream sm:text-4xl">Dom to nie budynek.<br />To poczucie, że komuś na Tobie zależy.</p>

          <div className="pt-5">
            <Link href="/#wsparcie" className="group inline-flex min-h-14 items-center gap-8 rounded-full border border-white/24 bg-white/[.075] px-6 text-sm font-semibold text-cream shadow-[0_18px_50px_rgba(0,0,0,.22)] backdrop-blur-xl transition-colors duration-500 hover:border-gold/65 hover:bg-gold/12">
              Jak pomóc
              <ArrowUpRight className="h-4 w-4 text-gold transition-transform duration-500 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </article>
    </main>
    <Footer variant="dark" />
  </>;
}
