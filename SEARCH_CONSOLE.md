# Google Search Console — konfiguracja produkcji

Domena: `fundacjalepszydomlepszejutro.pl`

## Stan techniczny

Strona jest przygotowana do zgłoszenia w Google Search Console:

- wszystkie publiczne strony mają canonical bez `.html`,
- działa `robots.txt`,
- działa `sitemap.xml`,
- sitemap zawiera stronę główną, strony informacyjne, akcję oraz archiwum,
- strona 404 zwraca kod 404 i ma `noindex,follow`,
- warianty `.html` i adresy ze zbędnym ukośnikiem są przekierowywane 301,
- każda indeksowana strona ma tytuł, opis meta, Open Graph i jeden nagłówek H1,
- testy CI automatycznie pilnują spójności canonicali i mapy strony.

## Weryfikacja własności

Najlepszy wariant to właściwość typu **Domena** w Google Search Console. Obejmuje ona domenę główną, `www` oraz subdomeny. Google wyświetli rekord TXT do dodania w DNS.

Nie zapisujemy rekordu weryfikacyjnego w repozytorium. Po otrzymaniu wartości TXT z Google należy dodać ją u operatora DNS domeny i następnie kliknąć „Zweryfikuj” w Search Console.

## Mapa strony

Po weryfikacji dodaj w Search Console:

`https://fundacjalepszydomlepszejutro.pl/sitemap.xml`

## Pierwsze adresy do sprawdzenia

W narzędziu „Sprawdzenie adresu URL” warto kolejno sprawdzić i poprosić o indeksowanie:

1. `https://fundacjalepszydomlepszejutro.pl/`
2. `https://fundacjalepszydomlepszejutro.pl/o-fundacji`
3. `https://fundacjalepszydomlepszejutro.pl/listy-do-swietego-mikolaja`
4. `https://fundacjalepszydomlepszejutro.pl/archiwum`
5. `https://fundacjalepszydomlepszejutro.pl/kontakt`

Nie ma potrzeby ręcznie zgłaszać każdego wpisu archiwalnego, jeśli Google poprawnie pobiera sitemapę.

## Po uruchomieniu

Po kilku dniach sprawdzamy w Search Console:

- czy sitemap została odczytana bez błędów,
- liczbę zaindeksowanych stron,
- ewentualne błędy indeksowania,
- Core Web Vitals,
- zapytania i strony pojawiające się w wynikach wyszukiwania.

Samo podłączenie Search Console nie zmienia treści strony i nie wpływa na działanie portalu Fundacji.
