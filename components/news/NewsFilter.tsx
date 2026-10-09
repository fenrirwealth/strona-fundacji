'use client';

import { motion } from 'framer-motion';
import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

export type NewsCategory = 'Wszystkie' | 'Akcje Szkolne' | 'Święta' | 'Współprace';

const categories: NewsCategory[] = ['Wszystkie', 'Akcje Szkolne', 'Święta', 'Współprace'];
const NewsFilterContext = createContext<NewsCategory>('Wszystkie');

export function useNewsFilter(): NewsCategory {
  return useContext(NewsFilterContext);
}

export function NewsFilter({ children }: { children: ReactNode }) {
  const [activeCategory, setActiveCategory] = useState<NewsCategory>('Wszystkie');
  const contextValue = useMemo(() => activeCategory, [activeCategory]);

  return <NewsFilterContext.Provider value={contextValue}>
    <div className="mb-12 overflow-x-auto pb-2 sm:mb-16" aria-label="Filtr aktualności">
      <div className="flex min-w-max items-center gap-1 rounded-full border border-white/10 bg-white/[.035] p-1.5 backdrop-blur-xl">
        {categories.map(category => {
          const isActive = category === activeCategory;
          return <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            className="relative isolate min-h-11 rounded-full px-5 text-xs font-semibold tracking-[.02em] text-white/58 transition-colors duration-300 hover:text-white focus-visible:z-10 sm:px-6"
            aria-pressed={isActive}
          >
            {isActive && <motion.span
              layoutId="active-news-filter"
              className="absolute inset-0 -z-10 rounded-full border border-gold/35 bg-gold text-night shadow-[0_0_28px_rgba(216,174,99,.18)]"
              transition={{ type: 'spring', stiffness: 360, damping: 34, mass: 0.8 }}
            />}
            <span className={isActive ? 'text-night' : undefined}>{category}</span>
          </button>;
        })}
      </div>
    </div>
    {children}
  </NewsFilterContext.Provider>;
}
