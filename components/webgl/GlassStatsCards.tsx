'use client';

import { useLayoutEffect, useRef, type ReactElement } from 'react';
import { Float, RoundedBox } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

type CardProps = { position: [number, number, number]; rotation: [number, number, number]; scale: number; color: string; speed: number };

function GlassCard({ position, rotation, scale, color, speed }: CardProps): ReactElement {
  return <Float speed={speed} rotationIntensity={0.12} floatIntensity={0.28} floatingRange={[-0.12, 0.12]}>
    <RoundedBox args={[1.8, 1.05, 0.12]} radius={0.14} smoothness={8} position={position} rotation={rotation} scale={scale}>
      <meshPhysicalMaterial color={color} transmission={1} roughness={0.2} thickness={0.5} ior={1.5} transparent opacity={0.78} metalness={0.03} clearcoat={1} clearcoatRoughness={0.12} side={THREE.DoubleSide} />
    </RoundedBox>
  </Float>;
}

export default function GlassStatsCards(): ReactElement {
  const groupRef = useRef<THREE.Group>(null);
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!groupRef.current) return;
    const context = gsap.context(() => {
      gsap.to(groupRef.current!.rotation, { y: Math.PI * 0.7, x: 0.18, ease: 'none', scrollTrigger: { trigger: document.documentElement, start: 'top top', end: 'bottom bottom', scrub: 1.4 } });
    });
    return () => context.revert();
  }, []);
  return <group ref={groupRef} position={[2.55, -0.25, -1.4]}>
    <GlassCard position={[-1.1, 1.15, 0]} rotation={[0.05, -0.32, -0.08]} scale={0.9} color="#D8AE63" speed={1.1} />
    <GlassCard position={[0.25, 0.05, 0.45]} rotation={[-0.08, 0.16, 0.09]} scale={1.08} color="#7FB09B" speed={0.85} />
    <GlassCard position={[-0.7, -1.18, -0.15]} rotation={[0.12, 0.36, -0.06]} scale={0.82} color="#FFF0D3" speed={1.35} />
  </group>;
}
