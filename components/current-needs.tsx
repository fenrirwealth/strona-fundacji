import { MagneticButton } from './magnetic-button';
import { Reveal } from './motion';

const needs = [
  {
    number: '01',
    title: 'Higiena i codzienność',
    description: 'Środki higieniczne, kosmetyki oraz produkty potrzebne dzieciom i rodzinom każdego dnia.',
    icon: <><path d="M12 3c2.9 3.5 5 5.4 5 7.6A5 5 0 0 1 7 10.6C7 8.4 9.1 5.8 12 3Z" /><path d="M9.5 11.2c.3 1.4 1.2 2.2 2.7 2.5" /></>,
  },
  {
    number: '02',
    title: 'Szkoła i rozwój',
    description: 'Przybory szkolne, książki, materiały plastyczne oraz rzeczy wspierające naukę i rozwój.',
    icon: <><path d="m4 7 8-4 8 4-8 4-8-4Z" /><path d="M7 9.2V14c2.8 2.1 7.2 2.1 10 0V9.2" /><path d="M20 7v6" /></>,
  },
  {
    number: '03',
    title: 'Rzeczy dla najmłodszych',
    description: 'Pieluchy, chusteczki, ubranka oraz bezpieczne akcesoria dopasowane do wieku dziecka.',
    icon: <><path d="M8 4h8l2 4-2 12H8L6 8l2-4Z" /><path d="M9 4c.4 2 1.4 3 3 3s2.6-1 3-3" /><path d="M9 13h6" /></>,
  },
] as const;

export function CurrentNeeds() {
  return <section className="current-needs section-space" aria-labelledby="current-needs-title">
    <div className="shell">
      <Reveal className="current-needs-heading">
        <div>
          <p className="eyebrow">Bieżące potrzeby</p>
          <h2 id="current-needs-title">Aktualnie<br /><em>potrzebujemy.</em></h2>
        </div>
        <div className="current-needs-intro">
          <p>Potrzeby dzieci, rodzin i placówek zmieniają się z tygodnia na tydzień. Poniżej pokazujemy najczęstsze kategorie wsparcia.</p>
          <p className="current-needs-caution"><span aria-hidden="true">i</span> Zanim kupisz lub przekażesz rzeczy, napisz do nas — potwierdzimy aktualne zapotrzebowanie.</p>
        </div>
      </Reveal>
      <div className="current-needs-grid">
        {needs.map((need, index) => <Reveal key={need.number} delay={index * .1}>
          <article className="current-need-card">
            <div className="current-need-top">
              <span className="current-need-number">{need.number}</span>
              <span className="current-need-icon" aria-hidden="true"><svg viewBox="0 0 24 24">{need.icon}</svg></span>
            </div>
            <h3>{need.title}</h3>
            <p>{need.description}</p>
            <span className="current-need-status">Potwierdź przed przekazaniem</span>
          </article>
        </Reveal>)}
      </div>
      <Reveal className="current-needs-action">
        <p>Powiedz nam, w jaki sposób chcesz pomóc. Odpowiemy, czego potrzeba w danym momencie.</p>
        <MagneticButton href="/kontakt?temat=biezace-potrzeby#formularz" variant="light">Zapytaj o potrzeby</MagneticButton>
      </Reveal>
    </div>
  </section>;
}
