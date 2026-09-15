import type { Metadata } from 'next';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { MagneticButton } from '@/components/magnetic-button';

export const metadata: Metadata = {
  title: 'Zapis potwierdzony | Fundacja Lepszy Dom Lepsze Jutro',
  description: 'Potwierdzenie zapisu do newslettera Fundacji.',
  robots: { index: false, follow: true },
};

export default function NewsletterConfirmedPage() {
  return <><Header /><main id="main" className="newsletter-state-page"><section><div className="shell newsletter-state-shell">
    <div className="newsletter-state-mark is-success" aria-hidden="true"><svg viewBox="0 0 32 32"><path d="m8 16 5 5 11-12" /></svg></div>
    <p className="eyebrow">Adres potwierdzony</p>
    <h1>Jesteś<br /><em>z nami.</em></h1>
    <p className="newsletter-state-lead">Twój adres został dodany do bazy newsletterowej. Od czasu do czasu napiszemy, co wspólnie udało się zmienić i gdzie pomoc jest potrzebna najbardziej.</p>
    <div className="newsletter-state-actions"><MagneticButton href="/" variant="dark">Wróć na stronę główną</MagneticButton><a href="/aktualnosci">Zobacz aktualności <span aria-hidden="true">→</span></a></div>
  </div></section></main><Footer /></>;
}
