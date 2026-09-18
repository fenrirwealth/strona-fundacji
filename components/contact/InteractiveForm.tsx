"use client";

import { ArrowUpRight, CheckCircle2, ChevronDown, RotateCcw } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState, type FormEvent } from 'react';

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
  'w-full max-w-full bg-transparent border-0 border-b border-white/20 py-3 text-white placeholder:text-neutral-500 focus:outline-none focus:border-amber-500 focus:ring-0 transition-colors text-sm lg:text-base';

export function InteractiveForm() {
  const reducedMotion = useReducedMotion();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState<Topic>('wsparcie-zbiorki');
  const [message, setMessage] = useState('');
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
    setEmail('');
    setTopic('wsparcie-zbiorki');
    setMessage('');
    setIsSubmitted(false);
  }

  return (
    <motion.section
      className="relative flex w-full min-w-0 max-w-full items-center justify-center pb-20 pt-8 lg:min-h-[calc(100svh-8rem)] lg:py-20"
      // Keep the form visible in the server-rendered HTML so delayed
      // hydration can never leave visitors looking at an empty black screen.
      initial={reducedMotion ? false : { opacity: 1, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reducedMotion ? 0 : 0.85,
        delay: reducedMotion ? 0 : 0.22,
        ease: [0.22, 1, 0.36, 1],
      }}
      aria-labelledby="form-heading"
    >
      <div
        className="pointer-events-none absolute inset-x-10 top-1/2 h-64 -translate-y-1/2 rounded-full bg-amber-500/[0.08] blur-[110px]"
        aria-hidden="true"
      />

      <div
        id="formularz"
        className="p-8 lg:p-12 backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl w-full max-w-xl relative z-10 min-w-0 max-w-full scroll-mt-32 overflow-hidden shadow-[0_35px_120px_rgba(0,0,0,0.48)]"
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-300/50 to-transparent"
          aria-hidden="true"
        />

        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div
              key="success"
              initial={reducedMotion ? false : { opacity: 0, y: 18, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: reducedMotion ? 0 : 0.5 }}
              className="flex min-h-[30rem] w-full max-w-full flex-col items-center justify-center text-center"
              role="status"
              aria-live="polite"
            >
              <span className="grid h-14 w-14 place-items-center rounded-full border border-amber-500/35 bg-amber-500/[0.08] text-amber-500 shadow-[0_0_45px_rgba(245,158,11,0.15)]">
                <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
              </span>
              <h2 className="mt-7 max-w-full font-display text-4xl font-medium leading-tight text-[#FFF9F0]">
                Wiadomość wysłana.
              </h2>
              <p className="mt-3 max-w-full text-sm leading-7 text-neutral-400">
                Dziękujemy!
              </p>
              <button
                type="button"
                onClick={resetForm}
                className="mt-9 inline-flex min-h-11 max-w-full items-center justify-center gap-2 rounded-full border border-white/15 px-5 text-[11px] font-bold uppercase tracking-[0.16em] text-white/65 transition duration-300 hover:border-amber-500/45 hover:text-amber-500"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                Napisz ponownie
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              className="flex w-full min-w-0 max-w-full flex-col"
              onSubmit={submitForm}
              initial={reducedMotion ? false : { opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -12 }}
            >
              <div className="mb-8 min-w-0 max-w-full">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.26em] text-amber-500">
                  Napisz do nas
                </p>
                <h2
                  id="form-heading"
                  className="mb-8 max-w-full font-display text-3xl font-medium leading-tight tracking-[-0.025em] text-[#FFF9F0]"
                >
                  Jak możemy pomóc?
                </h2>
              </div>

              <div className="flex w-full min-w-0 max-w-full flex-col gap-7">
                <div className="w-full min-w-0 max-w-full">
                  <label
                    htmlFor="contact-name"
                    className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-500"
                  >
                    Imię i nazwisko
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    maxLength={120}
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Jak możemy się do Ciebie zwracać?"
                    className={fieldClass}
                  />
                </div>

                <div className="w-full min-w-0 max-w-full">
                  <label
                    htmlFor="contact-email"
                    className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-500"
                  >
                    Adres e-mail
                  </label>
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
                    placeholder="twoj@email.pl"
                    className={fieldClass}
                  />
                </div>

                <div className="w-full min-w-0 max-w-full">
                  <label
                    htmlFor="contact-topic"
                    className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-500"
                  >
                    Temat
                  </label>
                  <div className="relative w-full min-w-0 max-w-full">
                    <select
                      id="contact-topic"
                      name="topic"
                      value={topic}
                      onChange={(event) => setTopic(event.target.value as Topic)}
                      className={`${fieldClass} appearance-none cursor-pointer pr-9`}
                    >
                      <option className="bg-[#111111]" value="wsparcie-zbiorki">
                        Wsparcie zbiórki
                      </option>
                      <option className="bg-[#111111]" value="wolontariat">
                        Wolontariat
                      </option>
                      <option className="bg-[#111111]" value="przekazanie-darow">
                        Przekazanie darów
                      </option>
                      <option className="bg-[#111111]" value="inne">
                        Inny temat
                      </option>
                    </select>
                    <ChevronDown
                      className="pointer-events-none absolute right-1 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500"
                      aria-hidden="true"
                    />
                  </div>
                </div>

                <div className="w-full min-w-0 max-w-full">
                  <label
                    htmlFor="contact-message"
                    className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-500"
                  >
                    Twoja wiadomość
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    required
                    maxLength={3000}
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder="Napisz, w czym możemy pomóc..."
                    className={`${fieldClass} resize-none`}
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                whileHover={reducedMotion ? undefined : { y: -2 }}
                whileTap={{ scale: 0.985 }}
                className="group mt-10 inline-flex min-h-13 w-full max-w-full items-center justify-center gap-3 rounded-full border border-amber-500/40 bg-amber-500/[0.08] px-7 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-amber-400 shadow-[0_0_0_rgba(245,158,11,0)] transition duration-300 hover:border-amber-400/70 hover:bg-amber-500/[0.12] hover:shadow-[0_0_32px_rgba(245,158,11,0.16)] sm:w-auto"
              >
                Wyślij wiadomość
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </motion.button>

              <small className="mt-4 block max-w-full text-center text-[10px] uppercase tracking-widest text-neutral-500">
                Klikając wyślij, akceptujesz{' '}
                <a
                  href="/polityka-prywatnosci"
                  className="underline decoration-white/20 underline-offset-4 transition hover:text-amber-500"
                >
                  politykę prywatności
                </a>
                .
              </small>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
