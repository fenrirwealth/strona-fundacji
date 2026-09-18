'use client';

import { ArrowRight, CheckCircle2, RotateCcw, Send } from 'lucide-react';
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

const fieldClass = 'inline-block min-w-[120px] max-w-full border-0 border-b border-neutral-600 bg-transparent px-2 py-1 text-center font-medium text-amber-500 outline-none transition-colors placeholder:text-neutral-500 focus:border-amber-500 focus:ring-0';

export function InteractiveForm() {
  const reducedMotion = useReducedMotion();
  const [name, setName] = useState('');
  const [representation, setRepresentation] = useState<Representation>('siebie');
  const [topic, setTopic] = useState<Topic>('wsparcie-zbiorki');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const requestedTopic = new URLSearchParams(window.location.search).get('temat');
    if (requestedTopic && topicFromQuery[requestedTopic]) setTopic(topicFromQuery[requestedTopic]);
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

  return <motion.section
    className="relative flex w-full min-w-0 items-center justify-center py-16 lg:min-h-[calc(100svh-8rem)] lg:py-20"
    initial={reducedMotion ? false : { opacity: 0, x: 42 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: reducedMotion ? 0 : 0.9, delay: reducedMotion ? 0 : 0.12, ease: [0.22, 1, 0.36, 1] }}
    aria-labelledby="form-heading"
  >
    <motion.div
      className="pointer-events-none absolute right-[-12rem] top-[8%] h-[34rem] w-[34rem] rounded-full bg-amber-500/[.09] blur-[160px]"
      animate={reducedMotion ? undefined : { x: [0, -55, 0], y: [0, 42, 0], scale: [1, 1.08, 1] }}
      transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      aria-hidden="true"
    />
    <div className="page-curtain-noise absolute inset-0 opacity-[.04]" aria-hidden="true" />

    <motion.div
      id="formularz"
      className="relative z-10 w-full min-w-0 max-w-2xl scroll-mt-32 overflow-hidden rounded-2xl border border-white/10 bg-white/[.05] p-6 shadow-[0_35px_120px_rgba(0,0,0,.48)] backdrop-blur-md lg:p-12"
      initial={reducedMotion ? false : { opacity: 0, y: 40, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: reducedMotion ? 0 : 0.85, delay: reducedMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mb-9 flex min-w-0 max-w-full items-start justify-between gap-6">
        <div className="min-w-0 max-w-full">
          <p className="text-[10px] font-bold uppercase tracking-[.24em] text-gold">Opowiedz nam krótko</p>
          <h2 id="form-heading" className="mt-3 font-display text-4xl font-medium tracking-[-.035em] text-cream sm:text-5xl">Jak możemy pomóc?</h2>
        </div>
        <span className="hidden h-12 w-12 shrink-0 place-items-center rounded-full border border-gold/30 bg-gold/[.08] text-gold sm:grid">
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </span>
      </div>

      <AnimatePresence mode="wait">
        {isSubmitted ? <motion.div
          key="success"
          initial={reducedMotion ? false : { opacity: 0, y: 22, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: reducedMotion ? 0 : 0.55 }}
          className="flex min-h-[22rem] flex-col items-center justify-center text-center"
          role="status"
          aria-live="polite"
        >
          <span className="grid h-16 w-16 place-items-center rounded-full border border-gold/35 bg-gold/[.1] text-gold shadow-[0_0_55px_rgba(216,174,99,.2)]">
            <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
          </span>
          <h3 className="mt-7 max-w-xl font-display text-4xl font-medium leading-tight text-cream sm:text-5xl">Wiadomość wysłana.</h3>
          <p className="mt-5 max-w-lg text-base leading-8 text-white/60">Dziękujemy za Twój krok w stronę lepszego jutra!</p>
          <button
            type="button"
            onClick={resetForm}
            className="mt-9 inline-flex min-h-12 items-center gap-3 rounded-full border border-white/15 bg-white/[.04] px-6 text-xs font-bold uppercase tracking-[.14em] text-white/75 transition hover:border-gold/45 hover:text-gold"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" /> Napisz ponownie
          </button>
        </motion.div> : <motion.form
          key="form"
          onSubmit={submitForm}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -16 }}
          noValidate={false}
        >
          <div className="flex min-w-0 flex-wrap items-baseline gap-x-1.5 gap-y-3 font-display text-2xl leading-loose tracking-[-.02em] text-white/88 sm:text-3xl lg:text-4xl">
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
              onChange={event => setName(event.target.value)}
              placeholder="Imię"
              className={`${fieldClass} w-36 max-w-full`}
            />.
            <span>Piszę w imieniu</span>
            <label className="sr-only" htmlFor="contact-representation">Reprezentuję</label>
            <select
              id="contact-representation"
              name="representation"
              value={representation}
              onChange={event => setRepresentation(event.target.value as Representation)}
              className={`${fieldClass} w-36 cursor-pointer`}
            >
              <option className="bg-[#111]" value="siebie">Siebie</option>
              <option className="bg-[#111]" value="firmy">Firmy</option>
            </select>
            <span>i chciałbym porozmawiać o</span>
            <label className="sr-only" htmlFor="contact-topic">Temat rozmowy</label>
            <select
              id="contact-topic"
              name="topic"
              value={topic}
              onChange={event => setTopic(event.target.value as Topic)}
              className={`${fieldClass} w-full min-w-0 cursor-pointer sm:w-auto sm:min-w-[220px]`}
            >
              <option className="bg-[#111]" value="wsparcie-zbiorki">Wsparciu zbiórki</option>
              <option className="bg-[#111]" value="wolontariat">Wolontariacie</option>
              <option className="bg-[#111]" value="przekazanie-darow">Przekazaniu darów</option>
              <option className="bg-[#111]" value="inne">Innym</option>
            </select>.
            <span>Możecie skontaktować się ze mną pod adresem</span>
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
              onChange={event => setEmail(event.target.value)}
              placeholder="E-mail"
              className={`${fieldClass} w-full min-w-0 max-w-full sm:w-60 sm:min-w-[120px]`}
            />.
          </div>

          <div className="flex justify-center sm:justify-start">
            <motion.button
              type="submit"
              whileHover={reducedMotion ? undefined : { y: -4, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="mt-10 inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-amber-500 px-6 py-4 text-xs font-extrabold uppercase tracking-[.12em] text-black shadow-[0_0_30px_rgba(245,158,11,.4),0_0_110px_rgba(245,158,11,.18)] ring-1 ring-amber-300/60 transition-shadow hover:shadow-[0_0_45px_rgba(245,158,11,.62),0_0_140px_rgba(245,158,11,.28)] sm:w-auto sm:px-8 sm:text-sm sm:tracking-[.14em]"
            >
              Wyślij wiadomość <Send className="h-4 w-4 shrink-0" aria-hidden="true" />
            </motion.button>
          </div>

          <p className="mt-5 max-w-xl text-xs leading-6 text-white/35">
            Klikając „Wyślij wiadomość”, potwierdzasz zapoznanie się z <a href="/polityka-prywatnosci" className="text-white/60 underline decoration-white/20 underline-offset-4 transition hover:text-gold">polityką prywatności</a>.
          </p>
        </motion.form>}
      </AnimatePresence>
    </motion.div>
  </motion.section>;
}
