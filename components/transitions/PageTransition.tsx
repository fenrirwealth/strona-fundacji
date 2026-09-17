'use client';

import { AnimatePresence, motion, useAnimationControls, useReducedMotion } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from 'react';

const CURTAIN_EASE = [0.22, 1, 0.36, 1] as const;
const COVER_DURATION_MS = 620;
const APP_ROUTES = new Set(['/', '/o-fundacji', '/jak-pomagamy', '/dziekujemy', '/newsletter/potwierdz', '/newsletter/potwierdzono']);

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

function shouldAnimateNavigation(anchor: HTMLAnchorElement, event: MouseEvent): URL | null {
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
  const pathname = usePathname();
  const router = useRouter();
  const reducedMotion = useReducedMotion();
  const curtainControls = useAnimationControls();
  const navigationPending = useRef(false);

  const revealPage = useCallback(async () => {
    if (reducedMotion) {
      curtainControls.set({ y: '-100%' });
      return;
    }
    curtainControls.set({ y: '0%' });
    await curtainControls.start({
      y: '-100%',
      transition: { duration: 0.78, ease: CURTAIN_EASE },
    });
    curtainControls.set({ y: '100%' });
  }, [curtainControls, reducedMotion]);

  useEffect(() => {
    navigationPending.current = false;
    document.documentElement.removeAttribute('data-page-transition');
    void revealPage();
  }, [pathname, revealPage]);

  const navigate = useCallback(async (href: string, replace = false) => {
    if (navigationPending.current) return;
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

    navigationPending.current = true;
    document.documentElement.setAttribute('data-page-transition', 'covering');

    if (!reducedMotion) {
      await curtainControls.start({
        y: '0%',
        transition: { duration: COVER_DURATION_MS / 1000, ease: CURTAIN_EASE },
      });
    }

    if (APP_ROUTES.has(destinationPath)) {
      const nextHref = `${destination.pathname}${destination.search}${destination.hash}`;
      if (replace) router.replace(nextHref);
      else router.push(nextHref);
      return;
    }

    if (replace) window.location.replace(destination.href);
    else window.location.assign(destination.href);
  }, [curtainControls, reducedMotion, router]);

  useEffect(() => {
    const interceptInternalLink = (event: MouseEvent) => {
      if (event.defaultPrevented) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest('a');
      if (!(anchor instanceof HTMLAnchorElement)) return;
      const destination = shouldAnimateNavigation(anchor, event);
      if (!destination) return;
      event.preventDefault();
      void navigate(destination.href);
    };

    document.addEventListener('click', interceptInternalLink);
    return () => document.removeEventListener('click', interceptInternalLink);
  }, [navigate]);

  return <TransitionContext.Provider value={{ navigate }}>
    <AnimatePresence mode="wait">
      <motion.div key={pathname} className="relative min-h-screen">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 12, scale: 0.995 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reducedMotion ? undefined : { opacity: 0.96, y: -6, scale: 0.998 }}
          transition={{ duration: reducedMotion ? 0 : 0.5, ease: CURTAIN_EASE }}
        >
          {children}
        </motion.div>
        <motion.div
          className="pointer-events-none fixed inset-0 z-[9999] bg-[linear-gradient(160deg,#05080f_0%,#0b1019_55%,#101b2d_100%)]"
          initial={{ y: '0%' }}
          animate={curtainControls}
          exit={{ y: '0%', transition: { duration: reducedMotion ? 0 : 0.62, ease: CURTAIN_EASE } }}
          aria-hidden="true"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gold/70 shadow-[0_0_30px_rgba(216,174,99,.55)]" />
          <div className="page-curtain-noise absolute inset-0 opacity-[.035]" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  </TransitionContext.Provider>;
}
