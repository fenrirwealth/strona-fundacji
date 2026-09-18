const milestones = [
  {
    year: '2022',
    title: 'Początek drogi',
    description: '17 maja powstała Fundacja Lepszy Dom Lepsze Jutro. Zaczęliśmy od pierwszych rozmów, rozpoznawania realnych potrzeb i pomocy kierowanej dokładnie tam, gdzie była najbardziej potrzebna.',
  },
  {
    year: '2025',
    title: 'Rozwój inicjatyw',
    description: 'Rozwinęliśmy duże akcje pomocowe, w tym „Magiczne Święta”, łączące dzieci, rodziny, placówki, darczyńców i wolontariuszy wokół konkretnych marzeń.',
  },
  {
    year: '2026',
    title: 'Skala działania',
    description: 'Dziś działania Fundacji obejmują wsparcie dzieci, rodzin i placówek, a także pomoc w nagłych kryzysach i po klęskach żywiołowych. Zakres jest szeroki, ale zasada pozostaje ta sama: zawsze widzimy konkretnego człowieka i jego realną potrzebę.',
  },
] as const;

export function InteractiveTimeline() {
  return <section id="historia" className="relative px-5 py-24 sm:px-10 lg:px-16 lg:py-40 xl:px-24" aria-labelledby="timeline-heading">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(16,27,45,.8),transparent_38%)]" aria-hidden="true" />
    <div className="relative mx-auto max-w-content">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <p className="mb-5 text-xs font-bold uppercase tracking-[.25em] text-gold">Droga, którą tworzymy razem</p>
          <h2 id="timeline-heading" className="max-w-4xl font-display text-5xl font-medium leading-[.94] tracking-[-.04em] text-cream sm:text-6xl lg:text-8xl">Od pierwszego gestu do realnej skali pomocy.</h2>
        </div>
        <p className="max-w-md text-base leading-8 text-white/58 lg:col-span-4 lg:justify-self-end">Nie mierzymy historii Fundacji wyłącznie latami. Każdy etap to nowe relacje, odpowiedź na pilne i długofalowe potrzeby oraz zaufanie budowane konkretnym działaniem.</p>
      </div>

      <div className="relative mt-20 sm:mt-28 lg:mt-36">
        <div className="absolute bottom-0 left-[9px] top-0 w-px bg-white/12 lg:left-1/2 lg:-translate-x-1/2" aria-hidden="true">
          <div className="absolute inset-0 bg-gold shadow-[0_0_24px_rgba(216,174,99,.55)]" />
        </div>

        <ol className="space-y-20 sm:space-y-28 lg:space-y-36">
          {milestones.map((milestone, index) => <li key={milestone.year} className="relative grid pl-12 lg:grid-cols-2 lg:gap-24 lg:pl-0">
            <span data-timeline-marker className="absolute left-0 top-9 z-10 h-[19px] w-[19px] rounded-full border-4 border-night bg-gold ring-1 ring-gold/70 lg:left-1/2 lg:-translate-x-1/2" aria-hidden="true" />
            <article className={`rounded-[2rem] border border-white/10 bg-white/[.045] p-7 shadow-glass backdrop-blur-glass sm:p-10 lg:p-12 ${index % 2 === 0 ? 'lg:col-start-1 lg:mr-0' : 'lg:col-start-2'}`}>
              <span className="font-display text-6xl font-medium tracking-[-.04em] text-gold sm:text-7xl">{milestone.year}</span>
              <h3 className="mt-8 font-display text-3xl font-medium text-cream sm:text-4xl">{milestone.title}</h3>
              <p className="mt-5 text-sm leading-7 text-white/60 sm:text-base sm:leading-8">{milestone.description}</p>
            </article>
          </li>)}
        </ol>
      </div>
    </div>
  </section>;
}
