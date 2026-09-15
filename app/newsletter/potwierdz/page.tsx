import type { Metadata } from 'next';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { NewsletterConfirm } from '@/components/newsletter-confirm';

export const metadata: Metadata = {
  title: 'Potwierdź newsletter | Fundacja Lepszy Dom Lepsze Jutro',
  description: 'Potwierdzenie zapisu do newslettera Fundacji.',
  robots: { index: false, follow: false },
};

export default function NewsletterConfirmPage() {
  return <><Header /><main id="main" className="newsletter-state-page"><section><div className="shell newsletter-state-shell">
    <div className="newsletter-state-mark" aria-hidden="true">@</div>
    <p className="eyebrow">Newsletter Fundacji</p>
    <h1>Potwierdź,<br /><em>że chcesz zostać.</em></h1>
    <p className="newsletter-state-lead">Jedno kliknięcie i gotowe. To zabezpieczenie sprawia, że do bazy nie trafi żaden adres bez zgody jego właściciela.</p>
    <NewsletterConfirm />
  </div></section></main><Footer /></>;
}
