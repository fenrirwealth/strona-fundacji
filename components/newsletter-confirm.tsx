'use client';

import { useEffect, useState } from 'react';

export function NewsletterConfirm() {
  const [token, setToken] = useState('');
  const [state, setState] = useState<'ready' | 'sending' | 'error'>('ready');
  const [message, setMessage] = useState('');

  useEffect(() => {
    setToken(new URLSearchParams(window.location.search).get('token') || '');
  }, []);

  async function confirm() {
    if (!token) {
      setState('error');
      setMessage('Link potwierdzający jest niepełny. Zapisz się ponownie na stronie głównej.');
      return;
    }
    setState('sending');
    setMessage('Potwierdzamy Twój zapis…');
    try {
      const response = await fetch('/api/newsletter/potwierdz', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ token }),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.message || 'Nie udało się potwierdzić zapisu.');
      window.location.assign('/newsletter/potwierdzono');
    } catch (error) {
      setState('error');
      setMessage(error instanceof Error ? error.message : 'Nie udało się potwierdzić zapisu.');
    }
  }

  return <div className="newsletter-confirm-box">
    <button className="newsletter-submit" type="button" onClick={confirm} disabled={state === 'sending'}>
      <span>{state === 'sending' ? 'Potwierdzamy…' : 'Potwierdzam zapis'}</span><span aria-hidden="true">→</span>
    </button>
    <p className="newsletter-status" data-state={state} aria-live="polite">{message}</p>
  </div>;
}
