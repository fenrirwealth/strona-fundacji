'use client';

import { AdaptiveDpr } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useReducedMotion } from 'framer-motion';
import { useMemo, useRef, type ReactElement } from 'react';
import * as THREE from 'three';

const PARTICLE_COUNT = 1_050;

function seededRandom(seed: number): () => number {
  let value = seed >>> 0;
  return () => {
    value = (value * 1_664_525 + 1_013_904_223) >>> 0;
    return value / 4_294_967_296;
  };
}

function GoldenDust(): ReactElement {
  const points = useRef<THREE.Points<THREE.BufferGeometry, THREE.PointsMaterial>>(null);
  const targetRotation = useMemo(() => new THREE.Vector2(), []);
  const positions = useMemo(() => {
    const random = seededRandom(20260917);
    const data = new Float32Array(PARTICLE_COUNT * 3);

    for (let index = 0; index < PARTICLE_COUNT; index += 1) {
      const offset = index * 3;
      const radius = 2 + Math.pow(random(), 0.55) * 9;
      const angle = random() * Math.PI * 2;
      data[offset] = Math.cos(angle) * radius + (random() - 0.5) * 2.5;
      data[offset + 1] = Math.sin(angle) * radius * 0.62 + (random() - 0.5) * 2.2;
      data[offset + 2] = (random() - 0.5) * 7;
    }

    return data;
  }, []);

  useFrame((state, delta) => {
    if (!points.current) return;
    targetRotation.set(state.pointer.y * 0.055, state.pointer.x * 0.09);
    const damping = 1 - Math.exp(-delta * 1.8);
    points.current.rotation.x = THREE.MathUtils.lerp(points.current.rotation.x, targetRotation.x, damping);
    points.current.rotation.y = THREE.MathUtils.lerp(points.current.rotation.y, targetRotation.y, damping);
    points.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.055) * 0.045;
    points.current.position.y = Math.sin(state.clock.elapsedTime * 0.12) * 0.08;
  });

  return <points ref={points} frustumCulled={false}>
    <bufferGeometry>
      <bufferAttribute attach="attributes-position" args={[positions, 3]} />
    </bufferGeometry>
    <pointsMaterial
      color="#e4bd72"
      size={0.038}
      sizeAttenuation
      transparent
      opacity={0.76}
      depthWrite={false}
      blending={THREE.AdditiveBlending}
    />
  </points>;
}

export default function CinematicBackground(): ReactElement {
  const reducedMotion = useReducedMotion();

  return <div className="pointer-events-none fixed inset-0 z-0 bg-night" aria-hidden="true">
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45, near: 0.1, far: 50 }}
      dpr={[1, 1.7]}
      frameloop={reducedMotion ? 'demand' : 'always'}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      performance={{ min: 0.55 }}
    >
      <color attach="background" args={['#05080f']} />
      <fog attach="fog" args={['#05080f', 8, 18]} />
      <GoldenDust />
      <AdaptiveDpr pixelated />
    </Canvas>
  </div>;
}
