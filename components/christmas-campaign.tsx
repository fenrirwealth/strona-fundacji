import { Gift, Download, ArrowUpRight, Heart } from 'lucide-react';

export function ChristmasCampaign() {
  return <section id="swiateczna-zbiorka" aria-labelledby="christmas-heading" className="relative scroll-mt-24 border-y border-gold/20 bg-[linear-gradient(125deg,#370e18,#151320_65%,#0b1423)] px-5 py-16 text-cream sm:px-10 lg:px-16 lg:py-24 xl:px-24">
    <div className="mx-auto grid grid-cols-1 max-w-content items-center gap-12 lg:grid-cols-[1.2fr_.8fr] lg:gap-20">
      <div className="min-w-0">
        <p className="mb-6 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[.16em] text-gold"><span className="rounded-full border border-gold/40 px-4 py-2">5. edycja</span><span>Dary rzeczowe do 11 grudnia 2026</span></p>
        <h2 id="christmas-heading" className="font-display text-5xl font-medium leading-[1.02] tracking-[-.03em] sm:text-6xl lg:text-7xl">Podaruj magię Świąt <span className="text-gold">prosto z serca.</span></h2>
        <p className="mt-7 text-lg leading-8 text-white/85">Po raz piąty łączymy siły, by przygotować prezenty dla dzieci z domów dziecka, placówek opiekuńczych i rodzin zastępczych. Dołącz do Świątecznej Zbiórki Pełnej Miłości.</p>
        <h3 className="mb-4 mt-8 flex items-center gap-3 text-xl font-semibold"><Gift className="h-6 w-6 text-gold" aria-hidden="true" /> Co zbieramy?</h3>
        <ul className="grid gap-3 text-base leading-7 text-white/85 sm:grid-cols-2">
          {['Klocki LEGO, gry planszowe i puzzle', 'Książki i zestawy kreatywne', 'Zabawki dla dzieci', 'Kosmetyki i upominki dla młodzieży'].map(item => <li key={item} className="border-l-2 border-gold/50 pl-4">{item}</li>)}
        </ul>
        <div className="mt-8 rounded-2xl border border-white/15 bg-white/5 p-5 text-sm leading-7 text-white/80"><p className="font-semibold text-cream">Chcesz przekazać prezenty lub zorganizować zbiórkę?</p><p>Napisz lub zadzwoń: <a className="font-bold text-gold underline underline-offset-4" href="tel:+48570747779">570 747 779</a>. Wspólnie ustalimy potrzeby i sposób przekazania darów.</p><p className="mt-2">Paczkomat: <strong className="text-cream">WAW552M</strong>. Przed wysyłką skontaktuj się z nami, aby otrzymać dane odbiorcy.</p></div>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
          <a href="/kontakt?temat=chce-pomoc#formularz" className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-gold px-7 py-4 text-sm font-bold text-night transition hover:bg-cream">Chcę przekazać prezenty <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>
          <a href="/assets/kampanie/plakat-swieta-2026.png" download className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-gold/50 px-7 py-4 text-sm font-semibold text-gold transition hover:bg-white/10"><Download className="h-4 w-4" aria-hidden="true" /> Pobierz plakat</a>
        </div>
        <p className="mt-5 text-sm leading-6 text-white/65">Powieś plakat w sklepie, biurze lub miejscu spotkań. Pomóż nam dotrzeć do kolejnych darczyńców.</p>
      </div>
      <aside className="mx-auto min-w-0 w-full max-w-[440px]">
        <figure>
        <a href="/assets/kampanie/plakat-swieta-2026.png" target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-2xl border border-gold/30 shadow-2xl transition hover:border-gold" aria-label="Otwórz plakat 5. Świątecznej Zbiórki w pełnym rozmiarze">
          <img src="/assets/kampanie/plakat-swieta-2026.webp" width="930" height="1311" loading="lazy" alt="Plakat 5. Świątecznej Zbiórki Pełnej Miłości. Prezenty dla dzieci zbieramy do 11 grudnia 2026. Szczegóły akcji opisano obok." className="h-auto w-full" />
        </a>
        <figcaption className="mt-4 text-center text-sm text-white/65">Kliknij plakat, aby zobaczyć go w pełnym rozmiarze.</figcaption>
        </figure>
        <div className="mt-7 rounded-2xl border border-gold/40 bg-[linear-gradient(135deg,rgba(216,174,99,.14),rgba(255,255,255,.03))] p-6 sm:p-7" aria-labelledby="siepomaga-heading">
          <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.14em] text-gold"><Heart className="h-4 w-4 shrink-0" aria-hidden="true" /> Zbiórka na Siepomaga.pl</p>
          <h3 id="siepomaga-heading" className="mt-4 font-display text-3xl font-medium leading-tight text-cream">Zamień marzenia w prezenty.</h3>
          <p className="mt-4 text-base leading-7 text-white/85">Możesz pomóc także wpłatą. Za zebrane środki kupimy świąteczne prezenty dla dzieci i młodzieży: klocki, gry, książki, zabawki oraz upominki dopasowane do ich wieku i zainteresowań.</p>
          <a href="https://www.siepomaga.pl/dzieciece-marzenia26" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-gold px-5 py-4 text-center text-sm font-bold text-night transition hover:bg-cream">Wesprzyj na Siepomaga.pl <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" /></a>
          <p className="mt-3 text-center text-xs leading-5 text-white/65">Wpłać dowolną kwotę lub udostępnij zbiórkę.</p>
        </div>
      </aside>
    </div>
  </section>;
}
