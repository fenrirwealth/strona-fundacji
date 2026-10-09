# Panel aktualności (/admin)

Panel do samodzielnego dodawania aktualności: https://fundacjalepszydomlepszejutro.pl/admin/

## Jak dodać aktualność
1. Wejdź na `/admin/` i kliknij „Zaloguj przez GitHub” (konto z dostępem do repozytorium `fenrirwealth/strona-fundacji`).
2. „Nowa Aktualność” → wpisz tytuł, datę, krótki opis, dodaj zdjęcie główne i opis zdjęcia, napisz treść.
3. Kliknij **Opublikuj → Opublikuj teraz**. Panel zapisuje wpis do repozytorium (commit na `main`).
4. Coolify buduje stronę i po kilku minutach wpis jest widoczny. Najnowszy wpis trafia na górę listy (duży baner).

Szkic: zaznacz „Szkic”, wpis nie pojawi się na stronie.

## Jednorazowa konfiguracja
1. GitHub → Settings → Developer settings → OAuth Apps → New OAuth App:
   - Homepage URL: `https://fundacjalepszydomlepszejutro.pl`
   - Authorization callback URL: `https://fundacjalepszydomlepszejutro.pl/api/auth/callback`
2. W Coolify (zmienne środowiskowe aplikacji, runtime) dodaj `GITHUB_OAUTH_CLIENT_ID` i `GITHUB_OAUTH_CLIENT_SECRET`, potem Redeploy.
3. Automatyczne wdrożenie po zapisie wpisu wymaga działającego webhooka GitHub → Coolify (Coolify → aplikacja → Webhooks). Bez niego trzeba kliknąć Redeploy ręcznie.

## Bezpieczeństwo
- Token logowania zostaje tylko w przeglądarce; sekret OAuth jest tylko na serwerze.
- Zapisać wpis może wyłącznie osoba z prawem zapisu do repozytorium.
- Treść wpisów jest oczyszczana: surowy HTML jest usuwany, dozwolone są tylko bezpieczne linki.
