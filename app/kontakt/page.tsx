import type { Metadata } from 'next';
import { ContactInfo } from '@/components/contact/ContactInfo';
import { InteractiveForm } from '@/components/contact/InteractiveForm';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

export const metadata: Metadata = {
  title: 'Kontakt | Fundacja Lepszy Dom Lepsze Jutro',
  description:
    'Skontaktuj się z Fundacją Lepszy Dom Lepsze Jutro. Napisz, zadzwoń lub odwiedź nas w Warszawie.',
  alternates: { canonical: '/kontakt' },
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    url: '/kontakt',
    siteName: 'Fundacja Lepszy Dom Lepsze Jutro',
    title: 'Zacznijmy działać razem.',
    description:
      'Napisz do nas, zadzwoń lub odwiedź nas w Warszawie. Każdy gest ma znaczenie.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zacznijmy działać razem.',
    description: 'Skontaktuj się z Fundacją Lepszy Dom Lepsze Jutro.',
  },
};

export default function ContactPage() {
  return (
    <>
      <Header variant="dark" />
      <main
        id="main"
        className="min-h-screen bg-[#050505] text-white flex flex-col lg:flex-row overflow-x-hidden w-full relative"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          aria-hidden="true"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 25%, rgba(245,158,11,.35) 0, transparent 32%), radial-gradient(circle at 85% 70%, rgba(216,174,99,.2) 0, transparent 28%)',
          }}
        />

        <div className="w-full lg:w-1/2 flex flex-col justify-center p-6 lg:p-16 min-w-0 max-w-full relative z-10">
          <ContactInfo />
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-16 relative z-10 min-w-0 max-w-full">
          <InteractiveForm />
        </div>
      </main>
      <Footer variant="dark" />
    </>
  );
}
