'use client';

import { CheckCircle2, RotateCcw, Send } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState, type FormEvent } from 'react';

type Representation = 'siebie' | 'firmy';
type Topic = 'wsparcie-zbiorki' | 'wolontariat' | 'przekazanie-darow' | 'inne';

const topicFromQuery: Record<string, Topic> = {
  'chce-pomoc': 'wsparcie-zbiorki',
  'wyprawka-szkolna': 'wsparcie-zbiorki',
  'paczka-swiateczna': 'wsparcie-zbiorki',
  wolontariat: 'wolontariat',
  'biezace-potrzeby': 'przekazanie-darow',
  dokumenty: 'inne',
  inne: 'inne',
};

const fieldClass =
  'inline-block min-w-[120px] max-w-full bg-transparent border-0 border-b border-neutral-600 focus:border-amber-500 outline-none px-2 py-1 mx-1 text-amber-500 text-center font-medium transition-colors placeholder:text-neutral-500 focus:ring-0';

export function InteractiveForm() {
  const reducedMotion = useReducedMotion();
  const [name, setName] = useState('');
  const [representation, setRepresentation] = useState<Representation>('siebie');
  const [topic, setTopic] = useState<Topic>('wsparcie-zbiorki');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const requestedTopic = new URLSearchParams(window.location.search).get('temat');
    if (requestedTopic && topicFromQuery[requestedTopic]) {
      setTopic(topicFromQuery[requestedTopic]);
    }
  }, []);

  function submitForm(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    setIsSubmitted(true);
  }

  function resetForm(): void {
    setName('');
    setRepresentation('siebie');
    setTopic('wsparcie-zbiorki');
    setEmail('');
    setIsSubmitted(false);
  }

  return (
    <motion.section
      className="relative flex w-full min-w-0 max-w-full items-center justify-center pb-20 pt-8 lg:min-h-[calc(100svh-8rem)] lg:py-20"
      initial={reducedMotion ? false : { opacity: 0, y: 34 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reducedMotion ? 0 : 0.85,
        delay: reducedMotion ? 0 : 0.28,
        ease: [0.22, 1, 0.36, 1],
      }}
      aria-labelledby="form-heading"
    >
      <div
        className="pointer-events-none absolute inset-x-8 top-1/2 h-64 -translate-y-1/2 rounded-full bg-amber-500/10 blur-[100px]"
        aria-hidden="true"
      />

      <div
        id="formularz"
        className="w-full max-w-xl backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 lg:p-12 relative z-10 min-w-0 max-w-full scroll-mt-32 overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.5)]"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-300/60 to-transparent" aria-hidden="true" />

        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div
              key="success"
              initial={reducedMotion ? false : { opacity: 0, y: 20, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: reducedMotion ? 0 : 0.55 }}
              className="flex min-h-[28rem] w-full max-w-full flex-col items-center justify-center text-center"
              role="status"
              aria-live="polite"
            >
              <span className="grid h-16 w-16 place-items-center rounded-full border border-amber-500/40 bg-amber-500/10 text-amber-500 shadow-[0_0_55px_rgba(245,158,11,0.2)]">
                <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
              </span>
              <h2 className="mt-7 font-display text-4xl font-medium leading-tight text-[#FFF9F0] sm:text-5xl">
                Wiadomość wysłana.
              </h2>
              <p className="mt-5 max-w-md text-base leading-8 text-white/60">
                Dziękujemy za Twój krok w stronę lepszego jutra!
              </p>
              <button
                type="button"
                onClick={resetForm}
                className="mt-9 inline-flex min-h-12 max-w-full items-center justify-center gap-3 rounded-full border border-white/15 bg-white/5 px-6 text-xs font-bold uppercase tracking-[0.14em] text-white/75 transition hover:border-amber-500/50 hover:text-amber-500"
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                Napisz ponownie
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              className="w-full min-w-0 max-w-full"
              onSubmit={submitForm}
              initial={reducedMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -14 }}
            >
              <header className="mb-8 min-w-0 max-w-full lg:mb-10">
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-amber-500">
                  Opowiedz nam krótko
                </p>
                <h2
                  id="form-heading"
                  className="mt-3 max-w-full font-display text-4xl font-medium leading-none tracking-[-0.035em] text-[#FFF9F0] sm:text-5xl"
                >
                  Jak możemy pomóc?
                </h2>
              </header>

              <div className="flex min-w-0 flex-wrap items-baseline max-w-full gap-x-1 gap-y-3 font-display text-2xl leading-loose tracking-[-0.02em] text-white/85 sm:text-3xl lg:text-4xl">
                <span>Cześć, mam na imię</span>
                <label className="sr-only" htmlFor="contact-name">Imię</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="given-name"
                  required
                  maxLength={80}
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Imię"
                  className={`${fieldClass} w-36 max-w-full`}
                />
                <span>. Piszę w imieniu</span>
                <label className="sr-only" htmlFor="contact-representation">Reprezentuję</label>
                <select
                  id="contact-representation"
                  name="representation"
                  value={representation}
                  onChange={(event) => setRepresentation(event.target.value as Representation)}
                  className={`${fieldClass} w-36 max-w-full cursor-pointer`}
                >
                  <option className="bg-[#111111]" value="siebie">Siebie</option>
                  <option className="bg-[#111111]" value="firmy">Firmy</option>
                </select>
                <span>i chciałbym porozmawiać o</span>
                <label className="sr-only" htmlFor="contact-topic">Temat rozmowy</label>
                <select
                  id="contact-topic"
                  name="topic"
                  value={topic}
                  onChange={(event) => setTopic(event.target.value as Topic)}
                  className={`${fieldClass} w-full min-w-0 max-w-full cursor-pointer sm:w-auto sm:min-w-[220px]`}
                >
                  <option className="bg-[#111111]" value="wsparcie-zbiorki">Wsparciu zbiórki</option>
                  <option className="bg-[#111111]" value="wolontariat">Wolontariacie</option>
                  <option className="bg-[#111111]" value="przekazanie-darow">Przekazaniu darów</option>
                  <option className="bg-[#111111]" value="inne">Innym</option>
                </select>
                <span>. Możecie skontaktować się ze mną pod adresem</span>
                <label className="sr-only" htmlFor="contact-email">Adres e-mail</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  required
                  maxLength={160}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="E-mail"
                  className={`${fieldClass} w-full min-w-0 max-w-full sm:w-60`}
                />
                <span>.</span>
              </div>

              <motion.button
                type="submit"
                whileHover={reducedMotion ? undefined : { y: -3, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="mt-10 inline-flex min-h-14 w-full max-w-full items-center justify-center gap-3 rounded-full bg-amber-500 px-6 py-4 text-xs font-extrabold uppercase tracking-[0.12em] text-black shadow-[0_0_30px_rgba(245,158,11,0.35)] transition hover:bg-amber-400 hover:shadow-[0_0_44px_rgba(245,158,11,0.55)] sm:w-auto sm:px-8 sm:text-sm"
              >
                Wyślij wiadomość
                <Send className="h-4 w-4 shrink-0" aria-hidden="true" />
              </motion.button>

              <p className="mt-5 max-w-full text-xs leading-6 text-white/35">
                Klikając „Wyślij wiadomość”, potwierdzasz zapoznanie się z{' '}
                <a
                  href="/polityka-prywatnosci"
                  className="text-white/60 underline decoration-white/20 underline-offset-4 transition hover:text-amber-500"
                >
                  polityką prywatności
                </a>
                .
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
