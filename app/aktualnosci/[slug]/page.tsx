import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { getPost, getPosts } from '@/lib/news-content.mjs';

// Wpisy dodane w panelu /admin. Starsze, ręcznie przygotowane relacje mają własne strony.
export const dynamicParams = false;

export function generateStaticParams() {
  const posts = getPosts();
  return posts.length ? posts.map(post => ({ slug: post.slug })) : [{ slug: '_brak' }];
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  const url = `/aktualnosci/${post.slug}`;
  const description = post.excerpt || post.title;
  return {
    title: `${post.title} | Fundacja Lepszy Dom Lepsze Jutro`,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      locale: 'pl_PL',
      url,
      siteName: 'Fundacja Lepszy Dom Lepsze Jutro',
      title: post.title,
      description,
      publishedTime: post.date,
      ...(post.image ? { images: [{ url: post.image, alt: post.imageAlt }] } : {}),
    },
    twitter: { card: 'summary_large_image', title: post.title, description, ...(post.image ? { images: [post.image] } : {}) },
  };
}

export default async function NewsPostPage({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  return <>
    <Header variant="dark" />
    <main id="main" className="relative overflow-hidden bg-[#05080f] pb-28 pt-40 text-cream sm:pt-52 lg:pb-40">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-gold/[.08] blur-[170px]" aria-hidden="true" />
      <div className="page-curtain-noise pointer-events-none absolute inset-0 opacity-[.025]" aria-hidden="true" />

      <article className="relative mx-auto max-w-6xl px-5 sm:px-10 lg:px-16">
        <Link href="/aktualnosci" className="mb-14 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[.16em] text-white/55 transition hover:text-gold">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Wszystkie aktualności
        </Link>

        <header className="max-w-5xl">
          <div className="mb-8 flex flex-wrap items-center gap-3 text-[10px] font-bold uppercase tracking-[.2em]">
            <span className="rounded-full border border-gold/30 bg-gold/[.08] px-4 py-2 text-gold">{post.category}</span>
            <time dateTime={post.date} className="text-white/45">{post.dateLong}</time>
          </div>
          <h1 className="text-balance font-display text-[clamp(2.6rem,5.2vw,5rem)] font-medium leading-[1.05] tracking-[-.04em]">{post.title}</h1>
          {post.excerpt && <p className="mt-12 max-w-3xl text-lg leading-9 text-white/70 sm:mt-14 sm:text-xl sm:leading-10">{post.excerpt}</p>}
        </header>

        {post.image && <figure className="mx-auto my-16 max-w-4xl overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[.04] shadow-[0_35px_120px_rgba(0,0,0,.5)] sm:my-24 sm:rounded-[2rem]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.image} alt={post.imageAlt} className="h-auto w-full" decoding="async" />
        </figure>}

        <div className="news-prose mx-auto max-w-3xl" dangerouslySetInnerHTML={{ __html: post.bodyHtml }} />

        {post.gallery.length > 0 && <section className="mx-auto mt-16 grid max-w-4xl gap-4 sm:mt-24 sm:grid-cols-2 sm:gap-6" aria-label="Galeria zdjęć">
          {post.gallery.map(item => <figure key={item.image} className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[.04] shadow-[0_35px_120px_rgba(0,0,0,.5)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.image} alt={item.alt} className="h-auto w-full" loading="lazy" decoding="async" />
          </figure>)}
        </section>}

        <div className="mx-auto mt-16 max-w-3xl">
          <Link href="/#wsparcie" className="group inline-flex min-h-14 items-center gap-8 rounded-full border border-white/24 bg-white/[.075] px-6 text-sm font-semibold text-cream shadow-[0_18px_50px_rgba(0,0,0,.22)] backdrop-blur-xl transition-colors duration-500 hover:border-gold/65 hover:bg-gold/12">
            Jak pomóc
            <ArrowUpRight className="h-4 w-4 text-gold transition-transform duration-500 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </article>
    </main>
    <Footer variant="dark" />
  </>;
}
