import { Header } from '@/components/header';
import { Impact } from '@/components/impact';
import { Campaigns } from '@/components/campaigns';
import { News } from '@/components/news';
import { CurrentNeeds } from '@/components/current-needs';
import { Donations } from '@/components/donations';
import { MagneticButton } from '@/components/magnetic-button';
import { Reveal } from '@/components/motion';
import { Partners } from '@/components/partners';
import { Footer } from '@/components/footer';
import { NewsletterSignup } from '@/components/newsletter-signup';
import HeroOverlay from '@/components/dom/HeroOverlay';
import ImageStorytelling from '@/components/dom/ImageStorytelling';
import SceneLoader from '@/components/webgl/SceneLoader';
// Server-rendered content; only animation, counters and navigation hydrate on the client.
export default function Home() {
  return <>
    <div className="webgl-background" aria-hidden="true"><SceneLoader /></div>
    <div className="cinematic-noise" aria-hidden="true" />
    <Header variant="dark" />
    <main id="main" className="cinematic-home">
      <HeroOverlay />
      <Impact />
      <ImageStorytelling />
      <Campaigns />
      <News />
      <CurrentNeeds />
      <Donations />
      <NewsletterSignup />
      <section id="partnerstwo" className="partnership section-space"><div className="shell">
        <Reveal className="partnership-heading"><p className="eyebrow">05 / Pomagamy razem</p><h2>Razem możemy zrobić<br /><em>więcej dobrego.</em></h2><p>Chcesz przekazać dary, wesprzeć akcję albo pomóc jako wolontariusz? Napisz do nas. Jeśli reprezentujesz firmę, również zapraszamy do wspólnego działania.</p><MagneticButton href="/kontakt?temat=chce-pomoc#formularz" variant="light">Chcę pomóc</MagneticButton></Reveal>
        <Partners />
      </div></section>
    </main>
    <Footer />
  </>;
}
