import './generate-news-pages.mjs';
import './normalize-static-pages.mjs';
import { cpSync, mkdirSync } from 'node:fs';
mkdirSync('public', { recursive: true });
cpSync('assets', 'public/assets', { recursive: true });
cpSync(
  'node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2',
  'public/assets/inter-variable.woff2',
);
for (const weight of [400, 500, 600]) cpSync(
  `node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-${weight}-normal.woff2`,
  `public/assets/cormorant-garamond-${weight}.woff2`,
);
for (const file of ['robots.txt', 'sitemap.xml', 'site.webmanifest']) cpSync(file, `public/${file}`);
