FROM nginxinc/nginx-unprivileged:stable-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html archiwum.html listy-do-swietego-mikolaja.html o-fundacji.html kontakt.html polityka-prywatnosci.html 404.html /usr/share/nginx/html/
COPY archiwum/ /usr/share/nginx/html/archiwum/
COPY robots.txt sitemap.xml site.webmanifest /usr/share/nginx/html/
COPY assets/ /usr/share/nginx/html/assets/

RUN find /usr/share/nginx/html -name '*.html' -type f -exec sed -i \
  -e '/fonts.googleapis.com/d' \
  -e '/fonts.gstatic.com/d' \
  -e 's#</head>#<link rel="stylesheet" href="/assets/performance-v7.css">\n</head>#' \
  -e 's/loading="lazy"/loading="lazy" decoding="async"/g' \
  -e 's/fetchpriority="high"/decoding="async" fetchpriority="high"/g' {} +

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -q -O - http://127.0.0.1:8080/healthz >/dev/null || exit 1
