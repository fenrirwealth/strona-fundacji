import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { Impact } from '@/components/impact';
import { Campaigns } from '@/components/campaigns';
import { MagneticButton } from '@/components/magnetic-button';
import { Reveal } from '@/components/motion';
import { Partners } from '@/components/partners';
import { Footer } from '@/components/footer';
import { partnershipMail } from '@/lib/content';

// Server-rendered content; only animation, counters and navigation hydrate on the client.
export default function Home() {
  return <>
    <div className="concept-banner">Wersja koncepcyjna <span aria-hidden="true">/</span> Dane w sekcji „Nasz wpływ” są przykładowe.</div>
    <Header />
    <main id="main">
      <Hero />
      <Impact />
      <Campaigns />
      <section id="partnerstwo" className="partnership section-space"><div className="shell"><Reveal className="partnership-heading"><p className="eyebrow">03 / Partnerstwo dla przyszłości</p><h2>Wartości nabierają znaczenia,<br />gdy <em>działamy razem.</em></h2><p>Zacznijmy od rozmowy o tym, co możemy zrobić wspólnie. Określmy potrzeby, zakres zaangażowania i sposób podsumowania efektów.</p><MagneticButton href={partnershipMail} variant="light">Zostań Partnerem</MagneticButton></Reveal><Partners /></div></section>

    </main>
    <Footer />
  </>;
}
