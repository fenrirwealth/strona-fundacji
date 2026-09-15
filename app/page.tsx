import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { Impact } from '@/components/impact';
import { Campaigns } from '@/components/campaigns';
import { News } from '@/components/news';
import { Donations } from '@/components/donations';
import { MagneticButton } from '@/components/magnetic-button';
import { Reveal } from '@/components/motion';
import { Partners } from '@/components/partners';
import { Footer } from '@/components/footer';
import { foundation } from '@/lib/content';

// Server-rendered content; only animation, counters and navigation hydrate on the client.
export default function Home() {
  return <>
    <Header />
    <main id="main">
      <Hero />
      <Impact />
      <Campaigns />
      <News />
      <Donations />
      <section id="partnerstwo" className="partnership section-space"><div className="shell">
        <Reveal className="partnership-heading"><p className="eyebrow">05 / Pomagamy razem</p><h2>Razem możemy zrobić<br /><em>więcej dobrego.</em></h2><p>Chcesz przekazać dary, wesprzeć akcję albo pomóc jako wolontariusz? Napisz do nas. Jeśli reprezentujesz firmę, również zapraszamy do wspólnego działania.</p><MagneticButton href={`mailto:${foundation.email}?subject=${encodeURIComponent('Chcę pomóc Fundacji')}`} variant="light">Chcę pomóc</MagneticButton></Reveal>
        <Partners />
      </div></section>
    </main>
    <Footer />
  </>;
}
