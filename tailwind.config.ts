import type { Config } from 'tailwindcss';
import { design } from './lib/design';
/** Tailwind 4 reads this explicit compatibility config through @config in globals.css. */
export default {
  theme: { extend: {
    colors: design.colors,
    fontFamily: design.fonts,
    transitionTimingFunction: { editorial: 'cubic-bezier(.22,1,.36,1)', precise: 'cubic-bezier(.76,0,.24,1)' },
    boxShadow: { glow: '0 0 24px rgba(216,174,99,.38), 0 0 80px rgba(216,174,99,.16)', glass: '0 30px 100px rgba(0,0,0,.35)' },
    backdropBlur: { glass: '22px' },
    spacing: { section: '7rem', 'section-mobile': '4.75rem' },
    maxWidth: { content: '80rem' },
  } },
} satisfies Config;
