'use client';

import { FormEvent, useState } from 'react';
import { Reveal } from './motion';

type Status = { state: 'idle' | 'sending' | 'success' | 'error'; message: string };

export function NewsletterSignup() {
  const [status, setStatus] = useState<Status>({ state: 'idle', message: '' });

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setStatus({ state: 'sending', message: 'Wysyłamy wiadomość potwierdzającą…' });
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.message || 'Nie udało się rozpocząć zapisu.');
      form.reset();
      setStatus({ state: 'success', message: 'Sprawdź skrzynkę. Wysłaliśmy link potwierdzający zapis.' });
    } catch (error) {
      setStatus({ state: 'error', message: error instanceof Error ? error.message : 'Nie udało się rozpocząć zapisu.' });
    }
  }

  return <section className="newsletter-section section-space" aria-labelledby="newsletter-title">
    <div className="shell">
      <Reveal className="newsletter-panel">
        <div className="newsletter-copy">
          <div className="newsletter-icon" aria-hidden="true">
            <svg viewBox="0 0 28 28"><path d="M3.5 7.5h21v14h-21z" /><path d="m4 8 10 8 10-8" /></svg>
          </div>
          <p className="eyebrow">Newsletter Fundacji</p>
          <h2 id="newsletter-title">Dobre wiadomości.<br /><em>Prosto do Ciebie.</em></h2>
          <p>Raz w miesiącu wyślemy konkretne historie pomocy, aktualne potrzeby i informacje o ważnych akcjach. Bez spamu.</p>
          <ul aria-label="Co znajdzie się w newsletterze">
            <li>Historie pomocy</li><li>Aktualne potrzeby</li><li>Ważne akcje</li>
          </ul>
        </div>
        <form className="newsletter-form" onSubmit={submit} aria-busy={status.state === 'sending'}>
          <div className="newsletter-field">
            <label htmlFor="newsletter-name">Imię <span>(opcjonalnie)</span></label>
            <input id="newsletter-name" name="firstName" type="text" autoComplete="given-name" maxLength={80} placeholder="Jak mamy się do Ciebie zwracać?" />
          </div>
          <div className="newsletter-field">
            <label htmlFor="newsletter-email">Adres e-mail</label>
            <input id="newsletter-email" name="email" type="email" autoComplete="email" maxLength={180} required placeholder="twoj@email.pl" />
          </div>
          <div className="newsletter-trap" aria-hidden="true"><label htmlFor="newsletter-website">Strona internetowa</label><input id="newsletter-website" name="website" type="text" tabIndex={-1} autoComplete="off" /></div>
          <label className="newsletter-consent">
            <input name="consent" type="checkbox" required />
            <span>Chcę otrzymywać newsletter Fundacji Lepszy Dom Lepsze Jutro na podany adres e-mail. Zgodę mogę wycofać w każdej chwili. <a href="/polityka-prywatnosci">Polityka prywatności</a>.</span>
          </label>
          <button className="newsletter-submit" type="submit" disabled={status.state === 'sending'}>
            <span>{status.state === 'sending' ? 'Wysyłamy…' : 'Zapisuję się'}</span><span aria-hidden="true">↗</span>
          </button>
          <p className="newsletter-status" data-state={status.state} aria-live="polite">{status.message}</p>
          <p className="newsletter-note">Po zapisie poprosimy Cię o potwierdzenie adresu. Do bazy trafiają wyłącznie potwierdzone osoby.</p>
        </form>
      </Reveal>
    </div>
  </section>;
}
