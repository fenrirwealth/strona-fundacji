import { news } from '@/lib/content';
import { Reveal } from './motion';

export function News() {
  return <section id="aktualnosci" className="updates-section section-space">
    <div className="shell">
      <Reveal className="section-heading updates-heading">
        <div><p className="eyebrow">03 / Aktualności</p><h2>Pomoc, którą<br /><em>widać w działaniu.</em></h2></div>
        <div className="section-intro"><p>Publikujemy zdjęcia i relacje z zakończonych działań. To tutaj możesz zobaczyć, dokąd trafia wspólne wsparcie.</p><a className="text-link" href="/aktualnosci">Wszystkie aktualności <span aria-hidden="true">↗</span></a></div>
      </Reveal>
      <div className="updates-grid">
        {news.map((item, index) => <Reveal key={item.href} delay={index * .08}>
          <article className="update-card"><a href={item.href}>
            <div className="update-media"><img src={item.image} alt={item.alt} width="720" height="540" loading="lazy" /><span>Materiał Fundacji</span></div>
            <div className="update-copy"><div className="update-meta"><span>{item.label}</span><time>{item.date}</time></div><h3>{item.title}</h3><p>{item.excerpt}</p><span className="text-link">Czytaj relację <span aria-hidden="true">↗</span></span></div>
          </a></article>
        </Reveal>)}
      </div>
    </div>
  </section>;
}
