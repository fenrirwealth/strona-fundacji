import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = new URL('../', import.meta.url);
const sourceDirectories = ['app', 'components', 'assets', 'scripts'];
const checkedExtensions = new Set(['.ts', '.tsx', '.js', '.mjs', '.css']);

function collectFiles(directory) {
  const entries = fs.readdirSync(directory, { withFileTypes: true });
  return entries.flatMap(entry => {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) return collectFiles(target);
    return checkedExtensions.has(path.extname(entry.name)) ? [target] : [];
  });
}

test('projekt nie zawiera pionowych animacji ani blokujacych przejsc widokow', () => {
  const forbidden = [
    /translateY\s*\(/,
    /(?:^|[\s"'`])-?translate-y-/,
    /\byPercent\s*:/,
    /\by\s*:/,
    /\.rotation\.y\s*=/,
    /\.position\.y\s*=/,
    /\bscaleY\s*:/,
    /scale-y-/,
    /<AnimatePresence/,
    /\bexit\s*=/,
    /mode=["']wait["']/,
    /delayChildren|staggerChildren/,
    /static-page-curtain|data-page-transition|navigateWithCurtain/,
  ];

  const failures = [];
  for (const directory of sourceDirectories) {
    const absoluteDirectory = new URL(`../${directory}/`, import.meta.url);
    for (const file of collectFiles(absoluteDirectory.pathname)) {
      const source = fs.readFileSync(file, 'utf8');
      for (const pattern of forbidden) {
        if (pattern.test(source)) failures.push(`${path.relative(root.pathname, file)}: ${pattern}`);
      }
    }
  }

  assert.deepEqual(failures, []);
});
