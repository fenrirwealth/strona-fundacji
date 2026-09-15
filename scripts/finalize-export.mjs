import { cpSync, readFileSync, writeFileSync, readdirSync } from 'node:fs';
// Preserve every established URL and archived article during the home-page migration.
for (const file of ['aktualnosci.html', 'archiwum.html', 'listy-do-swietego-mikolaja.html', 'o-fundacji.html', 'kontakt.html', 'polityka-prywatnosci.html', '404.html']) cpSync(file, `out/${file}`);
cpSync('aktualnosci', 'out/aktualnosci', { recursive: true });
cpSync('archiwum', 'out/archiwum', { recursive: true });
function optimize(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = `${dir}/${entry.name}`;
    if (entry.isDirectory()) optimize(path);
    else if (entry.name.endsWith('.html') && path !== 'out/index.html') {
      const html = readFileSync(path, 'utf8').split('\n').filter(line => !/fonts\.(googleapis|gstatic)\.com/.test(line)).join('\n')
        .replace('</head>', '<link rel="stylesheet" href="/assets/performance-v7.css">\n</head>')
        .replaceAll('loading="lazy"', 'loading="lazy" decoding="async"');
      writeFileSync(path, html);
    }
  }
}
optimize('out');
