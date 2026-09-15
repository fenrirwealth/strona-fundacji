/** Shared motion and layout tokens: restrained distance, long deceleration. */
export const design = {
  colors: { paper: '#f8f7f3', ink: '#252621', gold: '#8d7149', muted: '#64675e', line: '#d8d8cf' },
  fonts: { sans: ['DM Sans Variable', 'sans-serif'], serif: ['Cormorant Garamond', 'Georgia', 'serif'] },
  ease: { editorial: [.22, 1, .36, 1] as const, precise: [.76, 0, .24, 1] as const },
  duration: { reveal: .75, headline: 1.15, count: 1.6 },
  spring: { stiffness: 180, damping: 24, mass: .35 },
};
