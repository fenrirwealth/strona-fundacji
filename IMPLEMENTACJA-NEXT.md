# Strona Fundacji — wersja dla darczyńców

Next.js App Router, Tailwind CSS 4, Framer Motion. Punkt wejścia: `app/page.tsx`; treści: `lib/content.ts`; komponenty: `components/`. Fonty są dostarczane lokalnie w pakiecie aplikacji.

## Uruchomienie

Wymagany Node 22. `npm ci`, następnie `npm run dev` (port 3000). `npm run build` tworzy statyczny katalog `out/`. Docker buduje aplikację, a następnie udostępnia pliki przez dotychczasowy nginx na porcie 8080. Host i subdomena portalu nie są zmieniane.

## Materiały redakcyjne

To **wersja koncepcyjna**, zgodna z prośbą o placeholdery. Liczby 250, 12 i 180 tys. zł są demonstracyjne i NIE są wynikami Fundacji. Są oznaczone na stronie, a strona ma `noindex`. Logotypy partnerów pochodzą z katalogu partnerzy w przekazanej przez użytkownika paczce grafiki-fundacja-lepszy-dom.zip. Na stronie są opisane jako materiały z wcześniejszej witryny; nie deklarujemy aktualnego zakresu współpracy. Nazwy „Wyprawka na lepsze jutro” i „Magiczne Święta” pochodzą z briefu; opisy są propozycją copywritingu. Zdjęcia są opisane jako archiwalne i nie dowodzą realizacji tych kampanii.

Przed publikacją zastąp liczniki potwierdzonymi wynikami z okresem i źródłem, potwierdź aktualność partnerstw i uzupełnij prawdziwe pliki raportów w `lib/content.ts`. Dopiero wtedy usuń oznaczenia wersji koncepcyjnej i zmień `robots` w `app/layout.tsx` na indeksowanie. Pusta lista raportów pokazuje działające zapytanie e-mail, nie fikcyjny PDF.

Archiwum i informacyjne podstrony HTML zachowują adresy oraz dotychczasową treść. `scripts/finalize-export.mjs` kopiuje je do eksportu. W tej iteracji projektowane jest nowe wejście główne, nie pełna migracja każdej podstrony do React.

Animacje nie blokują odczytu treści bez JavaScriptu. `prefers-reduced-motion` wyłącza paralaksę, przewijanie i animację liczników. Karuzela ma zapętlony ruch i przycisk pauzy. Zatrzymuje się na hover/fokusie i poza widokiem; przy ograniczonym ruchu działa jako lista przewijana ręcznie. Lenis wygładza przewijanie na komputerze, a CTA reagują magnetycznie na kursor. CSP wymaga inline styles dla Framer Motion; pochodzenie fontów i zasobów pozostaje ograniczone do własnej domeny.

Publikacja wymaga odrębnej zgody na scalenie PR. Poprzednia próba scalenia PR #14 została zablokowana przez automatyczną kontrolę uprawnień; ten projekt jej nie omija.

Przywrócono działającą fotografię z galeria/galeria-16.jpg w miejsce uszkodzonego assets/akcja-fundacji-grupa.webp. Nowe pliki w assets/premium są lokalnymi kopiami materiałów z paczki użytkownika, przygotowanymi w formacie WebP.

## Zatwierdzone materiały graficzne

Użytkownik wyraźnie zatwierdził dodanie zdjęć i logotypów ze swojej paczki do publicznego repozytorium fenrirwealth/strona-fundacji. Zasoby znajdują się w assets/premium; projekt można zbudować po npm ci bez ponownego importowania paczki. Zgoda dotyczy publikacji plików w repozytorium. Scalenie i wdrożenie strony oraz zastąpienie demonstracyjnych danych wymagają osobnego zakończenia prac redakcyjnych i akceptacji.

Opcjonalne odtworzenie zasobów z oryginałów: zainstaluj Pillow, uruchom `python scripts/import-assets.py /ścieżka/grafiki-fundacja-lepszy-dom.zip`, następnie `npm ci` i `npm run build`. Importer nie pobiera ani nie wysyła danych; czyta wyłącznie archiwum użytkownika.
