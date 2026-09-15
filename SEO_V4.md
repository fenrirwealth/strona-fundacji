SEO v4 porządkuje kanoniczne adresy URL aplikacji Nginx.

- /index.html -> /
- /archiwum.html oraz /archiwum/ -> /archiwum
- /listy-do-swietego-mikolaja.html oraz wariant ze slash -> adres kanoniczny
- /archiwum/<slug>/index.html oraz wariant ze slash -> czysty adres
- /favicon.ico korzysta z ikony opartej na oficjalnym logo Fundacji
- CI sprawdza przekierowania, favicon i dotychczasowy routing
