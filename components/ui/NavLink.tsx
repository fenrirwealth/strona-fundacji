'use client';

import {
  forwardRef,
  type AnchorHTMLAttributes,
  type MouseEvent,
} from 'react';
import { usePageTransitionNavigation } from '@/components/transitions/PageTransition';

type NavLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  replace?: boolean;
};

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(function NavLink(
  { href, replace = false, onClick, target, children, ...props },
  ref,
) {
  const { navigate } = usePageTransitionNavigation();

  function handleClick(event: MouseEvent<HTMLAnchorElement>): void {
    onClick?.(event);
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (target && target !== '_self') return;
    if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;

    const destination = new URL(href, window.location.href);
    if (destination.origin !== window.location.origin) return;
    if (destination.pathname === window.location.pathname && destination.search === window.location.search && destination.hash) return;

    event.preventDefault();
    void navigate(destination.href, replace);
  }

  return <a ref={ref} href={href} target={target} onClick={handleClick} {...props}>{children}</a>;
});
