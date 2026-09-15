import { foundation } from '@/lib/content';
import { Reveal } from './motion';
import { CopyAccountButton } from './copy-account-button';

export function Donations() {
  return <section id="wsparcie" className="donation-section"><div className="shell"><Reveal className="donation-panel">
    <div className="donation-copy"><p className="eyebrow">04 / Wsparcie materialne i finansowe</p><h2>Pomóż tak,<br /><em>jak możesz.</em></h2><p>Możesz przekazać potrzebne rzeczy albo wesprzeć działania Fundacji przelewem. W sprawie darów rzeczowych napisz do nas wcześniej — potwierdzimy, czego dzieci i rodziny potrzebują w danym momencie.</p><a className="text-link" href={`mailto:${foundation.email}?subject=${encodeURIComponent('Chcę przekazać wsparcie materialne')}`}>Zapytaj o aktualne potrzeby <span aria-hidden="true">↗</span></a></div>
    <div className="donation-options"><div className="bank-card"><div className="bank-brand"><img src="/assets/banks/erste-bank-polska.svg" alt="Erste Bank Polska" width="174" height="50" /></div><p className="bank-label">Rachunek Fundacji</p><p className="account-number" aria-label={`Numer konta ${foundation.bankAccount}`}><span>51 1090 2590</span><span>0000 0001</span><span>5074 2996</span></p><dl className="transfer-details"><div><dt>Odbiorca</dt><dd>{foundation.name}</dd></div><div><dt>Tytuł</dt><dd>Darowizna</dd></div><div><dt>Bank</dt><dd>{foundation.bankName}</dd></div></dl><CopyAccountButton account={foundation.bankAccount} /></div>
      <div className="siepomaga-card"><div className="siepomaga-heading"><img src="/assets/partners/siepomaga.svg" alt="Siepomaga.pl" width="190" height="44" /><span>Profil Fundacji</span></div><span className="fundraiser-status">Nowe zbiórki wkrótce</span><h3>Profil Fundacji na Siepomaga</h3><p>Obecnie przygotowujemy kolejne zbiórki. Gdy zostaną uruchomione, pokażemy je również na tej stronie.</p><div className="siepomaga-actions"><a className="button button-dark" href={foundation.siepomagaProfile} target="_blank" rel="noopener noreferrer">Zobacz profil <span aria-hidden="true">↗</span></a></div></div>
    </div>
  </Reveal></div></section>;
}
