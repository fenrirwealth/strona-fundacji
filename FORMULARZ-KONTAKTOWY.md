# Formularz kontaktowy

Formularz działa pod `/kontakt#formularz`, a jego serwer pod `/api/kontakt`. Użytkownik pozostaje na stronie — kliknięcie kampanii nie uruchamia programu pocztowego.

## Wymagane ustawienia w Coolify

Ustaw cztery zmienne środowiskowe jako sekrety aplikacji:

- `RESEND_API_KEY` — klucz API utworzony w Resend,
- `CONTACT_TO_EMAIL` — docelowo `kontakt@fundacjalepszydomlepszejutro.pl`,
- `CONTACT_FROM_EMAIL` — np. `Fundacja <formularz@fundacjalepszydomlepszejutro.pl>`, po weryfikacji domeny w Resend,
- `CONTACT_ALLOWED_ORIGIN` — `https://fundacjalepszydomlepszejutro.pl`.

Adres odbiorczy musi najpierw istnieć u dostawcy poczty. Resend odpowiada za bezpieczną wysyłkę wiadomości z formularza i automatycznego potwierdzenia; nie jest skrzynką do codziennego odbierania poczty.

## Zabezpieczenia i automatyzacje

- pole pułapka na proste boty,
- limit pięciu wiadomości z jednego adresu IP na dziesięć minut,
- walidacja po stronie formularza i serwera,
- ograniczenie rozmiaru żądania i treści wiadomości,
- kontrola domeny, z której wysłano formularz,
- `Reply-To` ustawione na adres osoby piszącej,
- automatyczne potwierdzenie z numerem telefonu Fundacji,
- temat wiadomości zależny od klikniętej kampanii.

Po uruchomieniu warto dodać rekordy SPF, DKIM i DMARC wskazane przez Resend oraz wykonać próbę dostarczenia do głównych skrzynek pocztowych.
