'use client';

import dynamic from 'next/dynamic';
import type { ReactElement } from 'react';

const Scene = dynamic(() => import('./Scene'), { ssr: false, loading: () => <div className="h-full w-full bg-night" aria-hidden="true" /> });

export default function SceneLoader(): ReactElement { return <Scene />; }
