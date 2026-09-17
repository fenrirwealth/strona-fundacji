'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export type FeaturedNews = {
  tags: [string, string];
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  href: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function NewsFeatured({ news }: { news: FeaturedNews }) {
  const reducedMotion = useReducedMotion();
  const container: Variants = {
    hidden: {},
    visible: { transition: { delayChildren: 0.18, staggerChildren: reducedMotion ? 0 : 0.11 } },
  };
  const item: Variants = {
    hidden: reducedMotion ? { opacity: 0 } : { opacity: 0, y: 34, filter: 'blur(10px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: reducedMotion ? 0 : 0.9, ease } },
  };

  return <section className="relative flex min-h-[80svh] items-end overflow-hidden px-5 pb-14 pt-40 sm:px-10 sm:pb-20 lg:min-h-[88svh] lg:px-16 lg:pb-24 xl:px-24" aria-labelledby="featured-news-title">
    <Image
      src={news.image}
      alt={news.imageAlt}
      fill
      priority
      sizes="100vw"
      className="object-cover object-center"
    />
    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,8,15,.96)_0%,rgba(5,8,15,.76)_48%,rgba(5,8,15,.32)_100%)]" aria-hidden="true" />
    <div className="absolute inset-0 bg-[linear-gradient(0deg,#05080f_0%,rgba(5,8,15,.08)_48%,rgba(5,8,15,.5)_100%)]" aria-hidden="true" />
    <div className="page-curtain-noise absolute inset-0 opacity-[.045]" aria-hidden="true" />

    <motion.div className="relative z-10 mx-auto w-full max-w-content" variants={container} initial="hidden" animate="visible">
      <motion.div variants={item} className="mb-7 flex flex-wrap items-center gap-3">
        {news.tags.map(tag => <span key={tag} className="rounded-full border border-white/16 bg-black/20 px-4 py-2 text-[10px] font-bold uppercase tracking-[.2em] text-white/72 backdrop-blur-md">{tag}</span>)}
      </motion.div>
      <motion.h1 id="featured-news-title" variants={item} className="max-w-5xl text-balance font-display text-[clamp(3.4rem,7vw,7.4rem)] font-medium leading-[.88] tracking-[-.05em] text-cream">
        {news.title}
      </motion.h1>
      <motion.p variants={item} className="mt-7 max-w-2xl text-base leading-8 text-white/68 sm:text-lg">{news.excerpt}</motion.p>
      <motion.div variants={item} className="mt-9">
        <motion.div whileHover={reducedMotion ? undefined : { y: -3 }} whileTap={reducedMotion ? undefined : { scale: 0.98 }}>
          <Link href={news.href} className="group inline-flex min-h-14 items-center gap-8 rounded-full border border-white/24 bg-white/[.075] px-6 text-sm font-semibold text-cream shadow-[0_18px_50px_rgba(0,0,0,.22)] backdrop-blur-xl transition-colors duration-500 hover:border-gold/65 hover:bg-gold/12">
            Czytaj relację
            <ArrowUpRight className="h-4 w-4 text-gold transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  </section>;
}
