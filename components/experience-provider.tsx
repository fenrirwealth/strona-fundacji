'use client';
import { MotionConfig } from 'framer-motion';
import type { ReactNode } from 'react';
import { design } from '@/lib/design';
import { SmoothScroll } from './SmoothScroll';
import 'lenis/dist/lenis.css';

/** Global Framer Motion defaults shared by all interactive sections. */
export function ExperienceProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user" transition={{ ease: design.ease.editorial }}><SmoothScroll>{children}</SmoothScroll></MotionConfig>;
}
