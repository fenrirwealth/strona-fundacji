'use client';

import { Suspense, type ReactElement } from 'react';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr, Preload } from '@react-three/drei';
import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing';
import InteractiveParticles from './InteractiveParticles';
import GlassStatsCards from './GlassStatsCards';

export default function Scene(): ReactElement {
  return <Canvas camera={{ position: [0, 0, 8.2], fov: 42, near: 0.1, far: 100 }} dpr={[1, 1.75]} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }} performance={{ min: 0.55 }} aria-hidden="true">
    <color attach="background" args={['#050A14']} /><fog attach="fog" args={['#050A14', 8, 20]} />
    <ambientLight intensity={0.26} /><directionalLight position={[4, 6, 8]} intensity={2.15} color="#FFE4AE" /><directionalLight position={[-6, -2, 4]} intensity={0.65} color="#2B6B63" />
    <Suspense fallback={null}><InteractiveParticles /><GlassStatsCards /><EffectComposer multisampling={0}><Bloom intensity={1.15} luminanceThreshold={0.48} luminanceSmoothing={0.34} mipmapBlur /><Vignette eskil={false} offset={0.19} darkness={0.78} /></EffectComposer><Preload all /></Suspense>
    <AdaptiveDpr pixelated />
  </Canvas>;
}
