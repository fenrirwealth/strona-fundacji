import { cpSync, readFileSync, writeFileSync, readdirSync } from 'node:fs';
// Preserve established static URLs. App Router owns /archiwum and /kontakt, so neither may be overwritten here.
for (const file of ['listy-do-swietego-mikolaja.html', 'przejrzystosc.html', 'polityka-prywatnosci.html', '404.html']) cpSync(file, `out/${file}`);
cpSync('aktualnosci', 'out/aktualnosci', { recursive: true });
cpSync('archiwum', 'out/archiwum', { recursive: true });
function optimize(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = `${dir}/${entry.name}`;
    if (entry.isDirectory()) optimize(path);
    else if (entry.name.endsWith('.html') && path !== 'out/index.html') {
      const html = readFileSync(path, 'utf8').split('\n').filter(line => !/fonts\.(googleapis|gstatic)\.com/.test(line)).join('\n')
        .replace('</head>', '<link rel="stylesheet" href="/assets/performance-v8.css">\n</head>')
        .replaceAll('loading="lazy"', 'loading="lazy" decoding="async"');
      writeFileSync(path, html);
    }
  }
}
// Pusty wpis zastępczy (wymagany przez generateStaticParams, gdy nie ma żadnych wpisów z panelu).
import { rmSync, readdirSync as ls } from 'node:fs';
for (const name of ls('out/aktualnosci')) if (name.startsWith('_brak') || name.includes('._brak')) rmSync(`out/aktualnosci/${name}`, { recursive: true, force: true });
optimize('out');

// Privacy controls on every public HTML page, including the App Router homepage.
function addPrivacy(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = `${dir}/${entry.name}`;
    if (entry.isDirectory() && entry.name !== 'admin') addPrivacy(path);
    else if (entry.isFile() && entry.name.endsWith('.html')) {
      let html = readFileSync(path, 'utf8');
      if (!html.includes('/assets/analytics-consent.js')) {
        html = html.replace('</head>', '<link rel="stylesheet" href="/assets/analytics-consent.css">\n</head>')
          .replace('</body>', '<script src="/assets/analytics-consent.js" defer></script></body>');
        writeFileSync(path, html);
      }
    }
  }
}
addPrivacy('out');
