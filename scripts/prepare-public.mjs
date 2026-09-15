import './generate-news-pages.mjs';
import './normalize-static-pages.mjs';
import { cpSync, mkdirSync } from 'node:fs';
mkdirSync('public', { recursive: true });
cpSync('assets', 'public/assets', { recursive: true });
cpSync(
  'node_modules/@fontsource-variable/dm-sans/files/dm-sans-latin-wght-normal.woff2',
  'public/assets/dm-sans-variable.woff2',
);
for (const file of ['robots.txt', 'sitemap.xml', 'site.webmanifest']) cpSync(file, `public/${file}`);
