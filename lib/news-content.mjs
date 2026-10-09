// Wpisy aktualności zapisane jako pliki Markdown w content/aktualnosci.
// Edytuje je panel /admin (Decap CMS); strona czyta je podczas budowania.
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { Marked } from 'marked';

export const CONTENT_DIR = path.join(process.cwd(), 'content', 'aktualnosci');
export const FILTERS = ['Akcje Szkolne', 'Święta', 'Współprace'];

const SAFE_LINK = /^(https?:\/\/|mailto:|tel:|\/|#)/i;
const escapeHtml = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

// Surowy HTML z treści jest pomijany, a odnośniki ograniczone do bezpiecznych adresów.
const markdown = new Marked({
  gfm: true,
  breaks: false,
  renderer: {
    html: () => '',
    link({ href, title, tokens }) {
      const text = this.parser.parseInline(tokens);
      if (!SAFE_LINK.test(href || '')) return text;
      const external = /^https?:\/\//i.test(href);
      const attrs = `${title ? ` title="${escapeHtml(title)}"` : ''}${external ? ' target="_blank" rel="noopener noreferrer"' : ''}`;
      return `<a href="${escapeHtml(href)}"${attrs}>${text}</a>`;
    },
    image({ href, title, text }) {
      if (!SAFE_LINK.test(href || '')) return '';
      return `<img src="${escapeHtml(href)}" alt="${escapeHtml(text || '')}"${title ? ` title="${escapeHtml(title)}"` : ''} loading="lazy" decoding="async">`;
    },
  },
});

export function renderMarkdown(source) {
  return markdown.parse(String(source || ''), { async: false });
}

const asDate = value => {
  const date = value instanceof Date ? value : new Date(String(value));
  return Number.isNaN(date.getTime()) ? null : date;
};
const capitalize = value => value.charAt(0).toUpperCase() + value.slice(1);
export const formatMonth = date => capitalize(new Intl.DateTimeFormat('pl-PL', { month: 'long', year: 'numeric', timeZone: 'Europe/Warsaw' }).format(date));
export const formatDay = date => new Intl.DateTimeFormat('pl-PL', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Warsaw' }).format(date);

// Zdjęcia wgrane z telefonu (JPG/PNG) są przy budowaniu zamieniane na lżejsze WebP.
export function resolveImage(src, root = process.cwd()) {
  if (typeof src !== 'string' || !src) return '';
  if (/^\/assets\/.+\.(jpe?g|png)$/i.test(src)) {
    const webp = src.replace(/\.(jpe?g|png)$/i, '.webp');
    if (existsSync(path.join(root, 'public', webp)) || existsSync(path.join(root, webp.slice(1)))) return webp;
  }
  return src;
}

export function parsePost(raw, slug, root = process.cwd()) {
  const { data, content } = matter(raw);
  const date = asDate(data.date);
  const title = typeof data.title === 'string' ? data.title.trim() : '';
  if (!title || !date || data.draft === true) return null;
  const filters = (Array.isArray(data.filters) ? data.filters : []).filter(item => FILTERS.includes(item));
  const gallery = (Array.isArray(data.gallery) ? data.gallery : [])
    .map(item => (typeof item === 'string' ? { image: item } : item))
    .filter(item => item && typeof item.image === 'string' && item.image)
    .map(item => ({ image: resolveImage(item.image, root), alt: String(item.alt || '') }));
  return {
    slug,
    title,
    date: date.toISOString(),
    dateLabel: formatMonth(date),
    dateLong: formatDay(date),
    category: typeof data.category === 'string' && data.category.trim() ? data.category.trim() : 'Aktualności',
    filters,
    excerpt: typeof data.excerpt === 'string' ? data.excerpt.trim() : '',
    image: resolveImage(data.image, root),
    imageAlt: typeof data.imageAlt === 'string' && data.imageAlt.trim() ? data.imageAlt.trim() : title,
    gallery,
    bodyHtml: renderMarkdown(content),
  };
}

export function getPosts(dir = CONTENT_DIR, root = process.cwd()) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter(file => /^[a-z0-9][a-z0-9-]*\.md$/.test(file))
    .map(file => parsePost(readFileSync(path.join(dir, file), 'utf8'), file.replace(/\.md$/, ''), root))
    .filter(Boolean)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug, dir = CONTENT_DIR, root = process.cwd()) {
  return getPosts(dir, root).find(post => post.slug === slug) || null;
}

// Zdjęcia użyte we wpisach (do optymalizacji przy budowaniu).
export function listContentImages(dir = CONTENT_DIR) {
  if (!existsSync(dir)) return [];
  const images = new Set();
  for (const file of readdirSync(dir).filter(name => name.endsWith('.md'))) {
    const { data } = matter(readFileSync(path.join(dir, file), 'utf8'));
    for (const value of [data.image, ...(Array.isArray(data.gallery) ? data.gallery.map(item => (typeof item === 'string' ? item : item?.image)) : [])]) {
      if (typeof value === 'string' && value.startsWith('/assets/')) images.add(value);
    }
  }
  return [...images];
}
