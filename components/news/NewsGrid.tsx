'use client';

import { NewsCard } from './NewsCard';
import { useNewsFilter, type NewsCategory } from './NewsFilter';

export type NewsItem = {
  id: string;
  title: string;
  category: Exclude<NewsCategory, 'Wszystkie' | 'Współprace'>;
  filters: Array<Exclude<NewsCategory, 'Wszystkie'>>;
  date: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  href?: string;
  imageFit?: 'cover' | 'contain';
  size: 'wide' | 'narrow' | 'full';
};

const spans: Record<NewsItem['size'], string> = {
  wide: 'md:col-span-7 lg:col-span-8',
  narrow: 'md:col-span-5 lg:col-span-4',
  full: 'md:col-span-12',
};

export function NewsGrid({ items }: { items: NewsItem[] }) {
  const activeCategory = useNewsFilter();
  const visibleItems = activeCategory === 'Wszystkie'
    ? items
    : items.filter(item => item.filters.includes(activeCategory));

  return <div className="grid grid-cols-1 gap-6 md:grid-cols-12 lg:gap-8" aria-live="polite">
      {visibleItems.map(item => <div
        key={item.id}
        className={spans[item.size]}
      >
        <NewsCard item={item} />
      </div>)}
  </div>;
}
