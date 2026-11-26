import Link from 'next/link';

const ways = [
  { title: 'Przekaż darowiznę', text: 'Dane rachunku i odbiorcy znajdziesz w sekcji wsparcia. Możesz także sprawdzić zbiórki na profilu Fundacji w Siepomaga.', href: '/#wsparcie', label: 'Zobacz sposoby wpłaty' },
  { title: 'Przekaż potrzebne rzeczy', text: 'Zanim kupisz lub przygotujesz dary, skontaktuj się z nami. Uzgodnimy aktualne potrzeby, rodzaj rzeczy i sposób ich przekazania.', href: '/kontakt?temat=wsparcie-materialne#formularz', label: 'Zapytaj o aktualne potrzeby' },
  { title: 'Podaruj swój czas', text: 'Napisz, w czym chcesz pomóc i kiedy możesz się zaangażować. Zakres wolontariatu ustalimy w odniesieniu do prowadzonych działań.', href: '/kontakt?temat=wolontariat#formularz', label: 'Porozmawiaj o wolontariacie' },
  { title: 'Zaangażuj firmę lub zespół', text: 'Chcesz zorganizować zbiórkę w pracy albo wesprzeć konkretną akcję? Poznaj możliwości współpracy i uzgodnij z nami jej zakres.', href: '/dla-firm', label: 'Poznaj współpracę dla firm' },
];
const questions = [
  { title: 'Jak przekazać darowiznę Fundacji?', answer: <>Przejdź do <Link href="/#wsparcie" className="text-gold underline underline-offset-4">sposobów wsparcia</Link>. Znajdziesz tam dane do przelewu i odnośnik do profilu Fundacji w Siepomaga. Dane rejestrowe i rachunek możesz sprawdzić również na stronie <Link href="/przejrzystosc" className="text-gold underline underline-offset-4">przejrzystości</Link>.</> },
  { title: 'Czy mogę przekazać ubrania, zabawki lub przybory szkolne?', answer: <>Najpierw <Link href="/kontakt?temat=wsparcie-materialne#formularz" className="text-gold underline underline-offset-4">zapytaj o aktualne potrzeby</Link>. Dzięki wcześniejszym ustaleniom można dopasować dary do dzieci i rodzin oraz uzgodnić miejsce i termin przekazania.</> },
  { title: 'Jak spełnić marzenie z listu do Świętego Mikołaja?', answer: <>Poznaj <Link href="/listy-do-swietego-mikolaja" className="text-gold underline underline-offset-4">zasady akcji Listy do Świętego Mikołaja</Link>, a następnie przejdź do portalu Fundacji. Przed przygotowaniem prezentu sprawdź dostępność listu i zasady rezerwacji.</> },
  { title: 'Gdzie zobaczę dotychczasowe działania i dokumenty Fundacji?', answer: <>Relacje z działań publikujemy w <Link href="/aktualnosci" className="text-gold underline underline-offset-4">aktualnościach</Link> i <Link href="/archiwum" className="text-gold underline underline-offset-4">archiwum</Link>. Dane rejestrowe oraz informacje o udostępnianiu dokumentów są na stronie <Link href="/przejrzystosc" className="text-gold underline underline-offset-4">przejrzystości</Link>. O potrzebne dokumenty możesz też zapytać bezpośrednio Fundację.</> },
  { title: 'Czy firma może zorganizować własną zbiórkę?', answer: <>Taką współpracę zaczynamy od rozmowy o potrzebach i możliwościach zespołu. Przejdź do <Link href="/dla-firm" className="text-gold underline underline-offset-4">informacji dla firm</Link> i skontaktuj się z nami przed ogłoszeniem zbiórki.</> },
];

export function SupportGuide() {
  return <section id="jak-wesprzec" aria-labelledby="support-guide-title" className="scroll-mt-24 border-y border-white/10 px-5 py-20 sm:px-10 lg:px-16 lg:py-28 xl:px-24">
    <div className="mx-auto max-w-content">
      <p className="text-xs font-bold uppercase tracking-[.2em] text-gold">Od chęci pomocy do działania</p>
      <h2 id="support-guide-title" className="mt-5 max-w-4xl font-display text-4xl leading-tight text-cream sm:text-6xl">Jak wesprzeć dzieci i rodziny?</h2>
      <p className="mt-6 max-w-3xl leading-8 text-white/70">Wybierz formę wsparcia dopasowaną do swoich możliwości. Przy darach rzeczowych, wolontariacie i zbiórkach zespołowych zacznij od kontaktu — wspólnie ustalimy, co jest teraz potrzebne.</p>
      <div className="mt-10 grid gap-5 md:grid-cols-2">{ways.map((way, i) => <article key={way.title} className="min-w-0 rounded-2xl border border-white/15 bg-white/[.03] p-6 sm:p-8">
        <p className="text-xs font-bold tracking-widest text-gold">0{i + 1}</p><h3 className="mt-4 font-display text-3xl text-cream">{way.title}</h3><p className="mt-4 leading-7 text-white/70">{way.text}</p><Link href={way.href} className="mt-5 inline-flex min-h-11 items-center font-semibold text-gold underline underline-offset-4">{way.label} →</Link>
      </article>)}</div>
      <aside className="mt-8 rounded-2xl border border-gold/30 p-6 sm:p-8"><h3 className="font-display text-3xl text-cream">Chcesz przygotować świąteczny prezent?</h3><p className="mt-4 max-w-3xl leading-7 text-white/70">Poznaj zasady wyboru listu, przygotowania i przekazania prezentu. Aktualne informacje o akcji sprawdzisz przed podjęciem zobowiązania.</p><Link href="/listy-do-swietego-mikolaja" className="mt-5 inline-flex min-h-11 items-center font-semibold text-gold underline underline-offset-4">Sprawdź akcję Listy do Świętego Mikołaja →</Link></aside>
      <div className="mt-16 max-w-4xl"><h2 className="font-display text-4xl text-cream">Pytania przed przekazaniem wsparcia</h2><div className="mt-7 divide-y divide-white/15">{questions.map(question => <details key={question.title} className="py-5"><summary className="cursor-pointer py-2 text-lg font-semibold text-cream">{question.title}</summary><p className="mt-4 leading-8 text-white/70">{question.answer}</p></details>)}</div></div>
    </div>
  </section>;
}
