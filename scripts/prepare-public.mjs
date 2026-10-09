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

// --- Panel /admin (Decap CMS) ---
import { readdirSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { getPosts } from '../lib/news-content.mjs';

mkdirSync('public/admin', { recursive: true });
for (const file of ['index.html', 'cms.html', 'config.yml', 'login.js']) cpSync(`admin/${file}`, `public/admin/${file}`);
const decapDist = 'node_modules/decap-cms/dist';
for (const file of readdirSync(decapDist)) {
  if (file.endsWith('.map') || file.endsWith('.LICENSE.txt') || /(^|\.)cms\.js/.test(file) || file === 'cms.css') continue;
  cpSync(`${decapDist}/${file}`, `public/admin/${file}`);
}

// Zdjęcia dodane z panelu -> webp (max 2000 px szerokości).
const mediaDir = 'content/aktualnosci/zdjecia';
if (existsSync(mediaDir)) {
  mkdirSync('public/assets/aktualnosci/cms', { recursive: true });
  for (const file of readdirSync(mediaDir)) {
    if (!/\.(jpe?g|png|webp)$/i.test(file)) continue;
    const base = file.replace(/\.[^.]+$/, '');
    await sharp(path.join(mediaDir, file)).rotate().resize({ width: 2000, withoutEnlargement: true }).webp({ quality: 82 }).toFile(`public/assets/aktualnosci/cms/${base}.webp`);
  }
}

// Sitemap z wpisami z panelu.
const posts = getPosts();
if (posts.length) {
  const entries = posts.map(post => `  <url><loc>https://fundacjalepszydomlepszejutro.pl/aktualnosci/${post.slug}</loc><lastmod>${post.date.slice(0, 10)}</lastmod></url>`).join('\n');
  const sitemap = readFileSync('public/sitemap.xml', 'utf8');
  if (!sitemap.includes('</urlset>')) throw new Error('sitemap.xml: brak </urlset>');
  writeFileSync('public/sitemap.xml', sitemap.replace('</urlset>', `${entries}\n</urlset>`));
}
