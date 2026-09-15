'use client';
import { useEffect, useRef, useState } from 'react';
import { foundation } from '@/lib/content';
const links = [['O Fundacji', '/o-fundacji'], ['Jak pomagamy', '#dzialania'], ['Aktualności', '#aktualnosci'], ['Nasza pomoc', '#wplyw'], ['Dla firm', '#partnerstwo']];
export function Header() {
  const [open, setOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    function close(e: KeyboardEvent) { if (e.key === 'Escape') { setOpen(false); toggle.current?.focus(); } }
    function outside(e: PointerEvent) { if (!header.current?.contains(e.target as Node)) setOpen(false); }
    document.addEventListener('keydown', close); document.addEventListener('pointerdown', outside);
    return () => { document.removeEventListener('keydown', close); document.removeEventListener('pointerdown', outside); };
  }, []);
  return <header ref={header} className="site-header"><div className="shell flex items-center justify-between gap-6">
    <a className="brand flex items-center gap-3" href="/" aria-label="Fundacja Lepszy Dom Lepsze Jutro — strona główna"><img src="/assets/logo-fundacji.webp" width="46" height="46" alt="" /><span>LEPSZY DOM<span>LEPSZE JUTRO</span><small>F U N D A C J A</small></span></a>
    <button ref={toggle} className="menu-toggle" aria-expanded={open} aria-controls="main-navigation" aria-label={open ? 'Zamknij menu' : 'Otwórz menu'} onClick={() => setOpen(!open)}><span>{open ? 'Zamknij' : 'Menu'}</span><span aria-hidden="true">{open ? '×' : '+'}</span></button>
    <nav id="main-navigation" aria-label="Główna nawigacja" className={open ? 'navigation is-open' : 'navigation'}>{links.map(([name, href]) => <a key={name} href={href} onClick={() => setOpen(false)}>{name}</a>)}<a className="portal-nav" href={foundation.portal}>Portal <span aria-hidden="true">↗</span></a></nav>
  </div></header>;
}
