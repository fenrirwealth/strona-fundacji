import { foundation, reports } from '@/lib/content';
import { SocialLinks } from './social-links';

export function Footer({ variant = 'light' }: { variant?: 'light' | 'dark' }) {
  return <footer id="kontakt" className={`footer${variant === 'dark' ? ' footer-dark' : ''}`}><div className="shell">
    <div className="footer-main">
      <div><p className="eyebrow">Fundacja</p><h2>Lepszy Dom.<br /><em>Lepsze Jutro.</em></h2><p className="footer-mission">Dobro zaczyna się od gestu.<br />Razem możemy zmieniać jutro.</p><SocialLinks /></div>
      <div><h3>Skontaktuj się</h3><a className="footer-email" href={`mailto:${foundation.email}`}>{foundation.email}</a><a href="tel:+48570747779">{foundation.phone}</a><p>{foundation.address}</p></div>
      <div><h3>Dowiedz się więcej</h3><a href="/o-fundacji">O Fundacji</a><a href="/jak-pomagamy">Jak pomagamy</a><a href="/dla-firm">Dla firm</a><a href="/aktualnosci">Aktualności</a><a href="/archiwum">Archiwum działań</a><a href="/przejrzystosc">Przejrzystość</a>{reports.map(report => <a key={report.href} href={report.href}>{report.title} {report.year}</a>)}<a href="/polityka-prywatnosci">Polityka prywatności</a><a href={foundation.portal}>Portal Fundacji ↗</a></div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} {foundation.name}</span><span>KRS {foundation.krs} · NIP {foundation.nip} · REGON {foundation.regon}</span></div>
  </div></footer>;
}
