'use client';

import { AnimatePresence, motion } from 'framer-motion';
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

  return <motion.div layout className="grid grid-cols-1 gap-6 md:grid-cols-12 lg:gap-8" aria-live="polite">
    <AnimatePresence mode="popLayout">
      {visibleItems.map((item, index) => <motion.div
        layout
        key={item.id}
        className={spans[item.size]}
        initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
        transition={{ duration: 0.62, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      >
        <NewsCard item={item} />
      </motion.div>)}
    </AnimatePresence>
  </motion.div>;
}
