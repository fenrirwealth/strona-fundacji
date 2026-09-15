import type { Config } from 'tailwindcss';
import { design } from './lib/design';
/** Tailwind 4 reads this explicit compatibility config through @config in globals.css. */
export default {
  theme: { extend: {
    colors: design.colors,
    fontFamily: design.fonts,
    transitionTimingFunction: { editorial: 'cubic-bezier(.22,1,.36,1)', precise: 'cubic-bezier(.76,0,.24,1)' },
    spacing: { section: '7rem', 'section-mobile': '4.75rem' },
    maxWidth: { content: '80rem' },
  } },
} satisfies Config;
