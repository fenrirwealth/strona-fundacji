# Projekt B2B — architektura i decyzje projektowe

## Cel i kierunek

Strona otwiera rozmowę o partnerstwie strategicznym i CSR. Główne CTA prowadzi do kontaktu biznesowego. Portal pozostaje odrębną aplikacją dostępną z menu i stopki. Hero, wskaźniki, projekty i relacje partnerskie tworzą kolejność: cel → sposób oceny wpływu → obszary współpracy → kontakt.

Układ ma duże marginesy, czytelne kontrasty i typografię DM Sans z akcentem Cormorant Garamond. Ograniczona paleta obejmuje jasny papier, grafit i przygaszone złoto. Oryginalne zdjęcia są dokumentacją archiwalną; nie sugerują nowych, niepotwierdzonych realizacji.

## Struktura

| Plik | Odpowiedzialność |
|---|---|
| `app/page.tsx` | Serwerowe składanie sekcji widoku B2B |
| `app/layout.tsx` | Metadane, lokalne fonty, dostępny szkielet i provider |
| `app/globals.css` | Układ, breakpointy, maski i stany interakcji |
| `tailwind.config.ts` | Kolory, fonty, odstępy i nazwane krzywe animacji |
| `lib/design.ts` | Wspólne tokeny ruchu i identyfikacji |
| `lib/content.ts` | Oddzielone treści, partnerzy, wskaźniki i raporty |
| `components/experience-provider.tsx` | Lenis zsynchronizowany z zegarem Framer Motion |
| `components/header.tsx` | Nawigacja mobilna, klawiatura i osobny portal |
| `components/hero.tsx` | Typografia kinetyczna i paralaksa fotografii |
| `components/motion.tsx` | Wejścia kaskadowe i liczniki useInView |
| `components/magnetic-button.tsx` | CTA z ograniczonym przyciąganiem do kursora |
| `components/impact.tsx` | Wskaźniki z opisem statusu i źródła danych |
| `components/campaigns.tsx` | Karty kampanii, maska, rozmycie i link kontaktowy |
| `components/partners.tsx` | Zapętlona karuzela, pauza i dostępna lista logotypów |
| `components/footer.tsx` | Kontakt B2B, KRS i dokumenty |
| `scripts/prepare-public.mjs` | Kopiowanie lokalnych zasobów |
| `scripts/finalize-export.mjs` | Zachowanie dotychczasowych podstron i adresów |
| `scripts/validate-export.mjs` | Sprawdzenie eksportu, linków i plików |
| `Dockerfile`, `nginx.conf` | Wieloetapowy build i statyczne serwowanie w Coolify |

Tailwind 4 korzysta z jawnego `@config` do odczytu wymaganego pliku TypeScript. Podstawowe fonty i kolory są dostępne również jako tokeny CSS.

## Choreografia

1. Hero: kolejne wiersze przemieszczają się o 14–20 px, z łagodnym domknięciem `cubic-bezier(.22,1,.36,1)`. Zdjęcie reaguje na przewijanie maksymalnie o 32 px.
2. Sekcje: wejścia w odstępach 100–120 ms, uruchamiane po wejściu w viewport. Treść istnieje w HTML i nie jest ukrywana przed użytkownikiem bez JavaScriptu.
3. Liczniki: `useInView` uruchamia jednorazową animację 1,6 s. Czytniki ekranu otrzymują wyłącznie końcową wartość, bez kolejnych klatek.
4. CTA: ruch ograniczony do 8 px w poziomie i 5 px w pionie, sprężyna 180/24. Tylko kursor myszy; dotyk i fokus klawiatury nie uruchamiają przyciągania.
5. Projekty: maska przechodzi w obrys o promieniu 12 px, obraz powiększa się nieznacznie i rozmywa, a warstwa tekstowa płynnie wchodzi. Cała karta pozostaje prawdziwym linkiem.
6. Partnerzy: stała prędkość 23 px/s, bez skoku na końcu pętli. Druga kopia listy jest niewidoczna dla technologii asystujących. Pauza działa po kliknięciu, najechaniu, fokusie, wyjściu poza viewport i ukryciu karty.
7. Lenis: jedna pętla czasu współdzielona z Framer Motion; natywne przewijanie na urządzeniach dotykowych. Instancja i obserwatory są sprzątane po odmontowaniu.

`prefers-reduced-motion` wyłącza paralaksę, magnetyzm, płynne przewijanie oraz automatyczną karuzelę. Partnerów można wtedy przejrzeć przewijaniem poziomym.

## Dane i granice wersji

Liczby są demonstracyjne, jawnie opisane. Strona ma `noindex` do czasu wprowadzenia zatwierdzonych danych. Nazwy kampanii pochodzą z briefu użytkownika. Logotypy pochodzą z katalogu partnerzy w archiwum wcześniejszej witryny. Raportów nie otrzymano: zamiast martwych PDF-ów działa link „Zapytaj o raport merytoryczny”.

Techniczne przygotowanie do wdrożenia nie oznacza zatwierdzenia publikacji wyników ani aktualności partnerstw. Nie można uczciwie zagwarantować całkowitego braku błędów; podstawą odbioru są zakończony build, sprawdzenie typów, eksportu i testy w przeglądarce.

## Dokumentacja wykorzystanych rozwiązań

- Next.js static export: https://nextjs.org/docs/app/guides/static-exports
- Tailwind config: https://tailwindcss.com/docs/functions-and-directives
- Framer Motion accessibility: https://motion.dev/docs/react-accessibility
- Lenis: https://github.com/darkroomengineering/lenis
