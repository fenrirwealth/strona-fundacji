import { cpSync, mkdirSync } from 'node:fs';
mkdirSync('public', { recursive: true });
cpSync('assets', 'public/assets', { recursive: true });
for (const file of ['robots.txt', 'sitemap.xml', 'site.webmanifest']) cpSync(file, `public/${file}`);
