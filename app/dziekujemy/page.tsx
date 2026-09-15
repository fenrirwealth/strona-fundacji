import type { Metadata } from 'next';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { MagneticButton } from '@/components/magnetic-button';

export const metadata: Metadata = {
  title: 'Dziękujemy za wiadomość | Fundacja Lepszy Dom Lepsze Jutro',
  description: 'Potwierdzenie wysłania wiadomości do Fundacji Lepszy Dom Lepsze Jutro.',
  alternates: { canonical: '/dziekujemy' },
  robots: { index: false, follow: true },
};

export default function ThankYouPage() {
  return <>
    <Header />
    <main id="main" className="thank-you-page">
      <section className="thank-you-hero">
        <div className="shell thank-you-shell">
          <div className="thank-you-mark" aria-hidden="true">
            <svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="29" /><path d="m19 32 8 8 18-19" /></svg>
          </div>
          <p className="eyebrow">Wiadomość wysłana</p>
          <h1>Dziękujemy,<br /><em>że jesteś z nami.</em></h1>
          <p className="thank-you-lead">Twoja wiadomość trafiła do Fundacji. Odpowiemy na adres e-mail podany w formularzu.</p>
          <div className="thank-you-actions">
            <MagneticButton href="/" variant="dark">Wróć na stronę główną</MagneticButton>
            <a className="thank-you-secondary" href="/jak-pomagamy">Zobacz, jak pomagamy <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </section>
      <section className="thank-you-next" aria-labelledby="thank-you-next-title">
        <div className="shell">
          <p className="eyebrow">Co dalej?</p>
          <h2 id="thank-you-next-title">Możesz zostać z nami<br /><em>odrobinę dłużej.</em></h2>
          <div className="thank-you-options">
            <a href="/aktualnosci"><span>01</span><strong>Zobacz ostatnie działania</strong><small>Poznaj historie pomocy i przekazane wsparcie.</small></a>
            <a href="/przejrzystosc"><span>02</span><strong>Sprawdź Fundację</strong><small>Dane rejestrowe, rachunek i dokumenty.</small></a>
            <a href="tel:+48570747779"><span>03</span><strong>Masz pilne pytanie?</strong><small>Zadzwoń: +48 570 747 779.</small></a>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </>;
}
