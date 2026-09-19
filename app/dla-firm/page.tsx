import type { Metadata } from 'next';
import {
  ArrowRight,
  Banknote,
  Boxes,
  Building2,
  Check,
  ChevronDown,
  FileCheck2,
  Hammer,
  HeartHandshake,
  PackageCheck,
  ReceiptText,
  Users,
} from 'lucide-react';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Partners } from '@/components/partners';
import { foundation } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Współpraca z firmami | Fundacja Lepszy Dom Lepsze Jutro',
  description:
    'Darowizny, zbiórki i wolontariat pracowniczy. Zobacz, jak Twoja firma może wspierać dzieci i rodziny razem z Fundacją przez cały rok.',
  alternates: { canonical: '/dla-firm' },
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    url: '/dla-firm',
    siteName: 'Fundacja Lepszy Dom Lepsze Jutro',
    title: 'Twoja firma. Realna pomoc. Przez cały rok.',
    description:
      'Wybierz formę współpracy dopasowaną do możliwości Twojej firmy — od darowizny po wolontariat pracowniczy.',
    images: [
      {
        url: '/assets/generated/rodzina-cinematic-v1.jpg',
        width: 1600,
        height: 1067,
        alt: 'Rodzina wspierana przez Fundację Lepszy Dom Lepsze Jutro',
      },
    ],
  },
  twitter: { card: 'summary_large_image' },
};

const cooperation = [
  {
    icon: Banknote,
    title: 'Darowizna pieniężna',
    text: 'Jednorazowa lub cykliczna. Regularne wsparcie pozwala nam planować pomoc z wyprzedzeniem, a nie wyłącznie reagować na zgłoszenia.',
    detail: 'Przelew z tytułem „Darowizna na cele statutowe Fundacji — pomoc społeczna i działalność charytatywna”.',
  },
  {
    icon: Boxes,
    title: 'Darowizna rzeczowa',
    text: 'Przyjmujemy nowe, pełnowartościowe towary: wyposażenie wnętrz, meble, AGD, artykuły szkolne, żywność, środki czystości i materiały budowlane.',
    detail: 'Dysponujemy magazynem, dlatego nadwyżki możemy bezpiecznie przechować i przekazać tam, gdzie są potrzebne.',
  },
  {
    icon: PackageCheck,
    title: 'Zbiórka pracownicza',
    text: 'Wspólnie ustalamy zakres i termin. Zapewniamy materiały informacyjne, koordynację, odbiór darów oraz podsumowanie akcji.',
    detail: 'Gotowe podsumowanie mogą Państwo wykorzystać w komunikacji wewnętrznej firmy.',
  },
  {
    icon: Users,
    title: 'Wolontariat pracowniczy',
    text: 'Wskazujemy konkretne dzieci i rodziny, obejmujemy akcję patronatem i wspieramy pracowników w sprawnej realizacji pomocy.',
    detail: 'Działamy przez cały rok — przed szkołą, przy wyposażaniu mieszkań i w odpowiedzi na bieżące potrzeby placówek.',
  },
  {
    icon: Hammer,
    title: 'Kompetencje i praca',
    text: 'Transport, remonty, wyposażenie wnętrz i usługi specjalistyczne. Dla naszych podopiecznych taka pomoc bywa najcenniejsza.',
    detail: 'Ta forma wsparcia nie podlega odliczeniu podatkowemu, ale może bezpośrednio przyspieszyć przygotowanie domu do zamieszkania.',
  },
];

const steps = [
  ['01', 'Rozmowa', 'Poznajemy możliwości firmy i wspólnie wybieramy najbardziej potrzebną formę pomocy.'],
  ['02', 'Prosty plan', 'Ustalamy zakres, termin, logistykę i osoby odpowiedzialne po obu stronach.'],
  ['03', 'Realizacja', 'Koordynujemy akcję, odbiór darów lub przekazanie wsparcia podopiecznym.'],
  ['04', 'Podsumowanie', 'Przekazujemy dokumenty i materiały, które mogą wesprzeć komunikację w firmie.'],
];

export default function BusinessPage() {
  return (
    <>
      <Header variant="dark" />
      <main id="main" className="overflow-hidden bg-[#f7f3eb] text-[#101b2d]">
        <section className="relative isolate min-h-[760px] overflow-hidden bg-[#07101f] px-5 pb-20 pt-40 text-[#fff9f0] sm:px-10 lg:px-16 lg:pb-28 lg:pt-48 xl:px-24">
          <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_82%_38%,rgba(216,174,99,.17),transparent_30%),radial-gradient(circle_at_18%_85%,rgba(21,143,152,.12),transparent_34%)]" />
          <div className="absolute inset-0 -z-10 opacity-[.055] [background-image:linear-gradient(rgba(255,255,255,.9)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.9)_1px,transparent_1px)] [background-size:72px_72px]" />
          <div className="mx-auto grid max-w-content items-center gap-16 lg:grid-cols-[1.1fr_.9fr] lg:gap-10">
            <div>
              <p className="mb-7 text-xs font-bold uppercase tracking-[.28em] text-gold">Współpraca z biznesem</p>
              <h1 className="max-w-4xl font-display text-[clamp(3.8rem,7.2vw,7.6rem)] font-medium leading-[.86] tracking-[-.055em]">
                Twoja firma.<br />
                <span className="text-gold">Realna pomoc.</span>
              </h1>
              <p className="mt-7 font-display text-3xl leading-tight text-white/80 sm:text-4xl">Przez cały rok.</p>
              <p className="mt-8 max-w-2xl text-base leading-8 text-white/62 sm:text-lg">
                Razem możemy zapewnić dzieciom i rodzinom bezpieczny dom, potrzebne wyposażenie i wsparcie wtedy, gdy jest naprawdę pilne — nie tylko w grudniu.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a href="/kontakt?temat=wspolpraca-firmy#formularz" className="inline-flex min-h-14 items-center justify-center gap-4 rounded-full bg-gold px-7 text-sm font-bold text-night transition hover:bg-[#efd49a]">
                  Porozmawiajmy o współpracy <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a href="#formy-wspolpracy" className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/20 px-7 text-sm font-semibold text-white/82 transition hover:border-gold/60 hover:text-gold">
                  Poznaj możliwości
                </a>
              </div>
            </div>

            <div className="relative mx-auto aspect-square w-full max-w-[530px]" aria-hidden="true">
              <div className="absolute inset-[8%] rounded-full border border-gold/25 shadow-[0_0_0_55px_rgba(216,174,99,.025),0_0_0_110px_rgba(255,255,255,.018)]" />
              <div className="absolute inset-x-[12%] bottom-[11%] h-[56%] overflow-hidden drop-shadow-[0_35px_60px_rgba(0,0,0,.42)]">
                <div className="absolute left-0 top-0 h-full w-[56%] bg-[#eee6d8] [clip-path:polygon(50%_0,100%_31%,100%_100%,0_100%,0_31%)]" />
                <div className="absolute right-0 top-0 h-full w-[56%] bg-[#172b49] [clip-path:polygon(50%_0,100%_31%,100%_100%,0_100%,0_31%)]" />
                <div className="absolute inset-x-[28%] bottom-0 h-[62%] bg-[#07101f] [clip-path:polygon(50%_0,100%_28%,100%_100%,0_100%,0_28%)]" />
                <div className="absolute inset-x-[43%] bottom-0 h-[36%] bg-gold/85" />
              </div>
              <div className="absolute right-[3%] top-[8%] rounded-full border border-white/12 bg-white/[.055] px-5 py-3 text-[10px] font-bold uppercase tracking-[.2em] text-white/62 backdrop-blur-xl">Pomoc przez 12 miesięcy</div>
              <div className="absolute bottom-[5%] left-[2%] max-w-[220px] border-l border-gold/55 pl-5 text-xs leading-6 text-white/52">Darowizny · zbiórki · wolontariat · kompetencje</div>
            </div>
          </div>
        </section>

        <section className="border-b border-[#d7d0c3] px-5 py-20 sm:px-10 lg:px-16 lg:py-28 xl:px-24">
          <div className="mx-auto grid max-w-content gap-14 lg:grid-cols-[.82fr_1.18fr] lg:gap-28">
            <div>
              <p className="mb-5 text-xs font-bold uppercase tracking-[.24em] text-[#9a7844]">Pomagamy każdego dnia</p>
              <h2 className="font-display text-5xl font-medium leading-[.98] tracking-[-.04em] sm:text-6xl">Grudzień to tylko jeden z dwunastu miesięcy.</h2>
            </div>
            <div className="space-y-6 text-base leading-8 text-[#525b67] lg:pt-10">
              <p>Remont mieszkania, wyposażenie pokoju dziecka czy zakup artykułów pierwszej potrzeby są tak samo pilne w marcu jak w grudniu.</p>
              <p>Dlatego do każdej formy współpracy można dołączyć w dowolnym momencie. Dopasujemy skalę, termin i sposób działania do możliwości Państwa organizacji.</p>
              <ul className="grid gap-3 pt-2 sm:grid-cols-2">
                {['Konkretny cel pomocy', 'Opieka koordynatora', 'Komplet dokumentów', 'Podsumowanie akcji'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm font-semibold text-[#17263c]"><span className="grid h-6 w-6 place-items-center rounded-full bg-[#17263c] text-[#f7f3eb]"><Check className="h-3.5 w-3.5" /></span>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="formy-wspolpracy" className="scroll-mt-24 bg-[#ebe5da] px-5 py-20 sm:px-10 lg:px-16 lg:py-28 xl:px-24">
          <div className="mx-auto max-w-content">
            <div className="grid items-end gap-8 lg:grid-cols-2">
              <div><p className="mb-5 text-xs font-bold uppercase tracking-[.24em] text-[#9a7844]">Formy współpracy</p><h2 className="font-display text-5xl font-medium leading-[.98] tracking-[-.04em] sm:text-6xl">Wybierzmy model, który ma sens.</h2></div>
              <p className="max-w-xl text-base leading-8 text-[#5c6470] lg:justify-self-end">Każda firma ma inne możliwości. Możemy zacząć od jednorazowej akcji albo zbudować partnerstwo, które będzie rosło z czasem.</p>
            </div>
            <div className="mt-14 grid gap-px overflow-hidden border border-[#cfc6b7] bg-[#cfc6b7] lg:grid-cols-2">
              {cooperation.map(({ icon: Icon, title, text, detail }, index) => (
                <article key={title} className={`group bg-[#f7f3eb] p-7 transition hover:bg-white sm:p-10 ${index === cooperation.length - 1 ? 'lg:col-span-2 lg:grid lg:grid-cols-2 lg:gap-16' : ''}`}>
                  <div>
                    <div className="flex items-center justify-between gap-5"><span className="grid h-12 w-12 place-items-center rounded-full border border-[#c7bda9] text-[#9a7844]"><Icon className="h-5 w-5" aria-hidden="true" /></span><span className="text-[10px] font-bold tracking-[.18em] text-[#9a9389]">0{index + 1}</span></div>
                    <h3 className="mt-9 font-display text-3xl font-medium leading-tight tracking-[-.025em]">{title}</h3>
                    <p className="mt-4 text-sm leading-7 text-[#5c6470]">{text}</p>
                  </div>
                  <p className={`${index === cooperation.length - 1 ? 'lg:self-end' : ''} mt-7 border-t border-[#d8d0c3] pt-5 text-xs leading-6 text-[#747b84]`}>{detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#101b2d] px-5 py-20 text-[#fff9f0] sm:px-10 lg:px-16 lg:py-28 xl:px-24">
          <div className="mx-auto max-w-content">
            <div className="grid gap-8 lg:grid-cols-2"><div><p className="mb-5 text-xs font-bold uppercase tracking-[.24em] text-gold">Jak zaczynamy</p><h2 className="font-display text-5xl font-medium leading-[.98] tracking-[-.04em] sm:text-6xl">Od rozmowy do konkretnego efektu.</h2></div><p className="max-w-xl text-base leading-8 text-white/60 lg:justify-self-end lg:pt-10">Zajmujemy się koordynacją, aby po stronie firmy proces był prosty, przejrzysty i możliwy do sprawnego rozliczenia.</p></div>
            <ol className="mt-16 grid gap-px bg-white/12 md:grid-cols-2 lg:grid-cols-4">
              {steps.map(([number, title, text]) => <li key={number} className="min-h-64 bg-[#101b2d] p-7"><span className="text-xs font-bold tracking-[.2em] text-gold">{number}</span><h3 className="mt-14 font-display text-3xl font-medium">{title}</h3><p className="mt-4 text-sm leading-7 text-white/55">{text}</p></li>)}
            </ol>
          </div>
        </section>

        <section className="px-5 py-20 sm:px-10 lg:px-16 lg:py-28 xl:px-24">
          <div className="mx-auto grid max-w-content gap-16 lg:grid-cols-[.72fr_1.28fr] lg:gap-24">
            <div>
              <span className="grid h-14 w-14 place-items-center rounded-full border border-[#c7bda9] text-[#9a7844]"><ReceiptText className="h-6 w-6" aria-hidden="true" /></span>
              <p className="mb-5 mt-9 text-xs font-bold uppercase tracking-[.24em] text-[#9a7844]">Dokumenty i podatki</p>
              <h2 className="font-display text-5xl font-medium leading-[.98] tracking-[-.04em] sm:text-6xl">Przejrzyście od początku.</h2>
              <p className="mt-6 text-sm leading-7 text-[#626a74]">Przygotowujemy dokumenty potwierdzające otrzymane wsparcie. Najważniejsze zasady zebraliśmy poniżej.</p>
            </div>
            <div className="space-y-3">
              <details className="group border border-[#d4ccbf] bg-white" open>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 p-6 font-semibold"><span className="flex items-center gap-3"><FileCheck2 className="h-5 w-5 text-[#9a7844]" />Limity odliczenia darowizn</span><ChevronDown className="h-4 w-4 transition group-open:rotate-180" /></summary>
                <div className="overflow-x-auto border-t border-[#e2dbd0] p-6">
                  <table className="w-full min-w-[560px] border-collapse text-left text-sm">
                    <thead><tr className="text-[10px] uppercase tracking-[.14em] text-[#787f88]"><th className="pb-4 pr-5">Forma opodatkowania</th><th className="pb-4 pr-5">Limit</th><th className="pb-4">Podstawa prawna</th></tr></thead>
                    <tbody className="divide-y divide-[#e4ddd2]"><tr><td className="py-4 pr-5 font-semibold">CIT — spółki</td><td className="py-4 pr-5">do 10% dochodu</td><td className="py-4">art. 18 ust. 1 pkt 1 ustawy o CIT</td></tr><tr><td className="py-4 pr-5 font-semibold">PIT — skala podatkowa</td><td className="py-4 pr-5">do 6% dochodu</td><td className="py-4">art. 26 ust. 1 pkt 9 ustawy o PIT</td></tr><tr><td className="py-4 pr-5 font-semibold">Ryczałt</td><td className="py-4 pr-5">do 6% przychodu</td><td className="py-4">art. 11 ust. 1 ustawy o ryczałcie</td></tr><tr><td className="py-4 pr-5 font-semibold">Podatek liniowy 19%</td><td className="py-4 pr-5">nie przysługuje</td><td className="py-4">—</td></tr></tbody>
                  </table>
                </div>
              </details>
              <details className="group border border-[#d4ccbf] bg-white">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 p-6 font-semibold"><span className="flex items-center gap-3"><Banknote className="h-5 w-5 text-[#9a7844]" />Darowizna pieniężna</span><ChevronDown className="h-4 w-4 transition group-open:rotate-180" /></summary>
                <div className="border-t border-[#e2dbd0] p-6 text-sm leading-7 text-[#5f6670]"><p>Darowiznę pieniężną dokumentuje dowód wpłaty na rachunek Fundacji. Na życzenie przygotujemy również potwierdzenie jej otrzymania.</p><p className="mb-0">Odlicza się ją od dochodu — przy ryczałcie od przychodu — a nie bezpośrednio od kwoty podatku. Darowizna nie stanowi kosztu uzyskania przychodu.</p></div>
              </details>
              <details className="group border border-[#d4ccbf] bg-white">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 p-6 font-semibold"><span className="flex items-center gap-3"><Boxes className="h-5 w-5 text-[#9a7844]" />Darowizna rzeczowa i usługi</span><ChevronDown className="h-4 w-4 transition group-open:rotate-180" /></summary>
                <div className="border-t border-[#e2dbd0] p-6 text-sm leading-7 text-[#5f6670]"><p>Przygotowujemy protokół zawierający opis darowizny, wartość wskazaną przez darczyńcę i potwierdzenie przyjęcia przez Fundację.</p><p className="mb-0">Nieodpłatne świadczenie usług nie podlega odliczeniu. Przy towarach po stronie darczyńcy może powstać VAT należny, jeśli przy zakupie przysługiwało prawo do odliczenia VAT.</p></div>
              </details>
              <details className="group border border-[#d4ccbf] bg-white">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 p-6 font-semibold"><span className="flex items-center gap-3"><Building2 className="h-5 w-5 text-[#9a7844]" />Status OPP i rozliczenie</span><ChevronDown className="h-4 w-4 transition group-open:rotate-180" /></summary>
                <div className="border-t border-[#e2dbd0] p-6 text-sm leading-7 text-[#5f6670]"><p>Fundacja nie posiada statusu OPP. Nie wyklucza to odliczenia darowizny przekazanej na cele pożytku publicznego — status OPP dotyczy w tym kontekście przede wszystkim mechanizmu 1,5% podatku.</p><p className="mb-0">Darowiznę wykazuje się w zeznaniu rocznym: spółki w CIT-8 wraz z CIT-D, a osoby fizyczne w załączniku PIT/O.</p></div>
              </details>
              <p className="px-2 pt-4 text-xs leading-6 text-[#747b84]">Informacje mają charakter ogólny. Szczegóły rozliczenia warto potwierdzić z księgowością lub doradcą podatkowym.</p>
            </div>
          </div>
        </section>

        <section className="border-y border-[#d7d0c3] bg-white px-5 py-20 sm:px-10 lg:px-16 lg:py-24 xl:px-24">
          <div className="mx-auto max-w-content">
            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end"><div><p className="mb-4 text-xs font-bold uppercase tracking-[.24em] text-[#9a7844]">Zaufali nam</p><h2 className="max-w-3xl font-display text-5xl font-medium leading-[.98] tracking-[-.04em] sm:text-6xl">Firmy, które zamieniają dobre intencje w działanie.</h2></div><HeartHandshake className="hidden h-16 w-16 text-[#b8955a] lg:block" aria-hidden="true" /></div>
            <Partners />
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#123d32] px-5 py-20 text-white sm:px-10 lg:px-16 lg:py-28 xl:px-24">
          <div className="absolute -right-32 -top-44 h-[520px] w-[520px] rounded-full border border-white/12 shadow-[0_0_0_75px_rgba(255,255,255,.025),0_0_0_150px_rgba(255,255,255,.018)]" aria-hidden="true" />
          <div className="relative mx-auto grid max-w-content items-end gap-12 lg:grid-cols-[1fr_auto]">
            <div><p className="mb-5 text-xs font-bold uppercase tracking-[.24em] text-[#efd49a]">Zacznijmy od rozmowy</p><h2 className="max-w-4xl font-display text-5xl font-medium leading-[.95] tracking-[-.04em] sm:text-7xl">Dobierzemy formę współpracy do Państwa możliwości.</h2><p className="mt-7 max-w-2xl text-base leading-8 text-white/72">Napiszą Państwo do nas — po naszej stronie przygotujemy propozycję działania i komplet potrzebnych dokumentów.</p></div>
            <div className="flex flex-col gap-4 lg:items-end"><a href="/kontakt?temat=wspolpraca-firmy#formularz" className="inline-flex min-h-14 items-center justify-center gap-4 rounded-full bg-gold px-8 text-sm font-bold transition hover:bg-[#efd49a]" style={{ color: '#101b2d' }}>Napisz do nas <ArrowRight className="h-4 w-4" /></a><a href={`mailto:${foundation.email}?subject=${encodeURIComponent('Współpraca firmy z Fundacją')}`} className="text-sm text-white/72 underline decoration-white/30 underline-offset-4 hover:text-white">{foundation.email}</a></div>
          </div>
        </section>
      </main>
      <Footer variant="dark" />
    </>
  );
}
