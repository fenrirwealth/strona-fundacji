/** Shared motion and layout tokens: restrained distance, long deceleration. */
export const design = {
  colors: { paper: '#f8f6f1', ink: '#20242a', navy: '#101b2d', night: '#05080f', graphite: '#0b1019', surface: '#eef2f5', gold: '#d8ae63', teal: '#158f98', cream: '#fff9f0', muted: '#616873', line: '#d9dfe5' },
  fonts: { sans: ['Inter Variable', 'sans-serif'], display: ['Cormorant Garamond', 'serif'] },
  ease: { editorial: [.22, 1, .36, 1] as const, precise: [.76, 0, .24, 1] as const },
  duration: { reveal: .75, headline: 1.15, count: 1.6 },
  spring: { stiffness: 180, damping: 24, mass: .35 },
};
