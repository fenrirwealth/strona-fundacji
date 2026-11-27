import Image from 'next/image';
import Link from 'next/link';

export function PreschoolPartner() {
  return (
    <section className="relative px-5 py-12 text-cream sm:px-10 lg:px-16 xl:px-24" aria-labelledby="preschool-partner-heading">
      <div className="mx-auto grid max-w-6xl items-center gap-8 overflow-hidden rounded-[2rem] border border-gold/25 bg-[#101b2d]/95 p-6 shadow-glass sm:p-10 lg:grid-cols-2">
        <Image src="/assets/aktualnosci/przedszkole-436-nowy-partner.jpg" alt="Przedszkole nr 436 w Warszawie, ul. Sarmacka 4 na Wilanowie — nowy partner akcji Listy do Świętego Mikołaja" width={1600} height={1000} className="h-auto w-full rounded-xl" />
        <div>
          <p className="text-xs font-bold uppercase tracking-[.2em] text-gold">Nowy partner naszej akcji</p>
          <h2 id="preschool-partner-heading" className="mt-4 font-display text-4xl leading-tight sm:text-5xl">Do naszej akcji dołączyło Przedszkole nr 436 w Warszawie!</h2>
          <p className="mt-5 text-base leading-8 text-white/75">Witamy przedszkolaki, rodziców i kadrę placówki przy ul. Sarmackiej 4 na Wilanowie. Wspólnie przygotujemy świąteczne paczki dla dzieci z rodzinnego domu dziecka na Mazowszu.</p>
          <Link href="/aktualnosci/przedszkole-436-wilanow-dolacza-do-listow-do-mikolaja" className="mt-6 inline-flex min-h-12 items-center font-semibold text-gold underline underline-offset-8">Poznaj naszego partnera →</Link>
        </div>
      </div>
    </section>
  );
}
