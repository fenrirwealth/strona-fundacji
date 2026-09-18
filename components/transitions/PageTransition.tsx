'use client';

import { useRouter } from 'next/navigation';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  type ReactNode,
} from 'react';

const APP_ROUTES = new Set([
  '/',
  '/o-fundacji',
  '/jak-pomagamy',
  '/aktualnosci',
  '/archiwum',
  '/kontakt',
  '/dziekujemy',
  '/newsletter/potwierdz',
  '/newsletter/potwierdzono',
]);

type TransitionNavigation = {
  navigate: (href: string, replace?: boolean) => Promise<void>;
};

const TransitionContext = createContext<TransitionNavigation | null>(null);

function normalizePathname(pathname: string): string {
  if (pathname === '/') return pathname;
  return pathname.replace(/\/$/, '');
}

function isModifiedClick(event: MouseEvent): boolean {
  return event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
}

function internalDestination(anchor: HTMLAnchorElement, event: MouseEvent): URL | null {
  if (isModifiedClick(event) || anchor.hasAttribute('download') || anchor.dataset.noTransition !== undefined) return null;
  if (anchor.target && anchor.target !== '_self') return null;

  const rawHref = anchor.getAttribute('href');
  if (!rawHref || rawHref.startsWith('#') || rawHref.startsWith('mailto:') || rawHref.startsWith('tel:')) return null;

  const destination = new URL(anchor.href, window.location.href);
  if (destination.origin !== window.location.origin) return null;

  const currentPath = normalizePathname(window.location.pathname);
  const destinationPath = normalizePathname(destination.pathname);
  if (currentPath === destinationPath && destination.search === window.location.search && destination.hash) return null;
  if (destination.href === window.location.href) return null;
  return destination;
}

export function usePageTransitionNavigation(): TransitionNavigation {
  const context = useContext(TransitionContext);
  if (!context) throw new Error('usePageTransitionNavigation must be used inside PageTransition.');
  return context;
}

export function PageTransition({ children }: Readonly<{ children: ReactNode }>) {
  const router = useRouter();

  const navigate = useCallback(async (href: string, replace = false) => {
    const destination = new URL(href, window.location.href);
    const currentPath = normalizePathname(window.location.pathname);
    const destinationPath = normalizePathname(destination.pathname);

    if (destination.origin !== window.location.origin) {
      window.location.assign(destination.href);
      return;
    }

    if (currentPath === destinationPath && destination.search === window.location.search && destination.hash) {
      window.location.assign(destination.href);
      return;
    }

    if (APP_ROUTES.has(destinationPath)) {
      const nextHref = `${destination.pathname}${destination.search}${destination.hash}`;
      if (replace) router.replace(nextHref, { scroll: true });
      else router.push(nextHref, { scroll: true });
      return;
    }

    if (replace) window.location.replace(destination.href);
    else window.location.assign(destination.href);
  }, [router]);

  useEffect(() => {
    const navigateImmediately = (event: MouseEvent) => {
      if (event.defaultPrevented) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest('a');
      if (!(anchor instanceof HTMLAnchorElement)) return;
      const destination = internalDestination(anchor, event);
      if (!destination) return;
      event.preventDefault();
      void navigate(destination.href);
    };

    document.addEventListener('click', navigateImmediately);
    return () => document.removeEventListener('click', navigateImmediately);
  }, [navigate]);

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}
    </TransitionContext.Provider>
  );
}
