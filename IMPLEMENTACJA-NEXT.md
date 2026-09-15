# Strona Fundacji — wersja dla darczyńców

Next.js App Router, Tailwind CSS 4, Framer Motion. Punkt wejścia: `app/page.tsx`; treści: `lib/content.ts`; dane o skali pomocy: `lib/impact.ts`; komponenty: `components/`. Fonty są dostarczane lokalnie w pakiecie aplikacji.

## Uruchomienie

Wymagany Node 22. `npm ci`, następnie `npm run dev` (port 3000). `npm run build` tworzy statyczny katalog `out/`. Docker buduje aplikację, a następnie udostępnia pliki przez dotychczasowy nginx na porcie 8080. Host i subdomena portalu nie są zmieniane.

## Materiały redakcyjne

Sekcja „Nasza pomoc” pokazuje zatwierdzone wartości szacunkowe od początku działalności Fundacji: około 470 dzieci, około 60 placówek i rodzin oraz około 260 tys. zł wartości udzielonej pomocy. Wartości są jawnie oznaczone jako szacunkowe. Logotypy partnerów pochodzą z katalogu partnerzy w przekazanej przez użytkownika paczce grafiki-fundacja-lepszy-dom.zip. Nie deklarujemy aktualnego zakresu współpracy bez dodatkowego potwierdzenia. Zdjęcia ilustracyjne są wyraźnie oznaczone.

Po otrzymaniu statutu i sprawozdań należy opublikować prawdziwe pliki dokumentów i doprecyzować dane liczbowe, jeżeli dokumenty pozwolą ustalić wartości dokładne. Strona główna jest indeksowana, ponieważ nie zawiera fikcyjnych wyników.

Archiwum i informacyjne podstrony HTML zachowują adresy oraz dotychczasową treść. `scripts/finalize-export.mjs` kopiuje je do eksportu. W tej iteracji projektowane jest nowe wejście główne, nie pełna migracja każdej podstrony do React.

Animacje nie blokują odczytu treści bez JavaScriptu. `prefers-reduced-motion` wyłącza paralaksę, przewijanie i animację liczników. Karuzela ma zapętlony ruch i przycisk pauzy. Zatrzymuje się na hover/fokusie i poza widokiem; przy ograniczonym ruchu działa jako lista przewijana ręcznie. Lenis wygładza przewijanie na komputerze, a CTA reagują magnetycznie na kursor. CSP wymaga inline styles dla Framer Motion; pochodzenie fontów i zasobów pozostaje ograniczone do własnej domeny.

Publikacja wymaga odrębnej zgody na scalenie PR. Poprzednia próba scalenia PR #14 została zablokowana przez automatyczną kontrolę uprawnień; ten projekt jej nie omija.

Przywrócono działającą fotografię z galeria/galeria-16.jpg w miejsce uszkodzonego assets/akcja-fundacji-grupa.webp. Nowe pliki w assets/premium są lokalnymi kopiami materiałów z paczki użytkownika, przygotowanymi w formacie WebP.

## Zatwierdzone materiały graficzne

Użytkownik wyraźnie zatwierdził dodanie zdjęć i logotypów ze swojej paczki do publicznego repozytorium fenrirwealth/strona-fundacji. Zasoby znajdują się w assets/premium; projekt można zbudować po npm ci bez ponownego importowania paczki. Zgoda dotyczy publikacji plików w repozytorium. Scalenie i wdrożenie strony oraz zastąpienie demonstracyjnych danych wymagają osobnego zakończenia prac redakcyjnych i akceptacji.

Opcjonalne odtworzenie zasobów z oryginałów: zainstaluj Pillow, uruchom `python scripts/import-assets.py /ścieżka/grafiki-fundacja-lepszy-dom.zip`, następnie `npm ci` i `npm run build`. Importer nie pobiera ani nie wysyła danych; czyta wyłącznie archiwum użytkownika.
