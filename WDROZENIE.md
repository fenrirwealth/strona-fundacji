# Wdrozenie strony fundacji w Coolify

Repozytorium jest kompletna aplikacja Docker. W Coolify wybierz budowanie
przez `Dockerfile`; kontener nasluchuje na porcie `8080`, a kontrola zdrowia
jest dostepna pod `/healthz`.

Po podpieciu domeny sprawdz:

1. `https://fundacjalepszydomlepszejutro.pl/` odpowiada HTTP 200,
2. wariant `www` przekierowuje na domene glowna,
3. HTTP przekierowuje na HTTPS,
4. `/healthz`, `/robots.txt` i `/sitemap.xml` sa dostepne,
5. odnosnik do portalu prowadzi do poprawnej domeny produkcyjnej.
