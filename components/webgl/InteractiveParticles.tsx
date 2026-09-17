'use client';

import { useMemo, useRef, type ReactElement } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const PARTICLE_COUNT = 850;
const REPEL_RADIUS = 1.35;

function seededRandom(seed: number): () => number {
  let value = seed >>> 0;
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

export default function InteractiveParticles(): ReactElement {
  const pointsRef = useRef<THREE.Points<THREE.BufferGeometry, THREE.PointsMaterial>>(null);
  const cursorPoint = useMemo(() => new THREE.Vector3(), []);
  const interactionPlane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), []);
  const basePositions = useMemo(() => {
    const random = seededRandom(470260);
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    for (let index = 0; index < PARTICLE_COUNT; index += 1) {
      const stride = index * 3;
      const radius = 2.2 + Math.pow(random(), 0.62) * 7.8;
      const angle = random() * Math.PI * 2;
      positions[stride] = Math.cos(angle) * radius + (random() - 0.5) * 2.4;
      positions[stride + 1] = Math.sin(angle) * radius * 0.62 + (random() - 0.5) * 2;
      positions[stride + 2] = (random() - 0.5) * 5;
    }
    return positions;
  }, []);
  const livePositions = useMemo(() => new Float32Array(basePositions), [basePositions]);

  useFrame((state, delta) => {
    const points = pointsRef.current;
    if (!points) return;
    state.raycaster.setFromCamera(state.pointer, state.camera);
    const hasIntersection = state.raycaster.ray.intersectPlane(interactionPlane, cursorPoint) !== null;
    const positionAttribute = points.geometry.getAttribute('position') as THREE.BufferAttribute;
    const positions = positionAttribute.array as Float32Array;
    const elapsed = state.clock.getElapsedTime();
    const spring = 1 - Math.exp(-delta * 2.2);
    const repel = 1 - Math.exp(-delta * 8.5);
    for (let index = 0; index < PARTICLE_COUNT; index += 1) {
      const stride = index * 3;
      const baseX = basePositions[stride];
      const baseY = basePositions[stride + 1];
      const baseZ = basePositions[stride + 2];
      let targetX = baseX;
      let targetY = baseY;
      if (hasIntersection) {
        const dx = positions[stride] - cursorPoint.x;
        const dy = positions[stride + 1] - cursorPoint.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance > 0.001 && distance < REPEL_RADIUS) {
          const force = Math.pow(1 - distance / REPEL_RADIUS, 2) * 1.45;
          targetX += (dx / distance) * force;
          targetY += (dy / distance) * force;
        }
      }
      const influence = targetX === baseX && targetY === baseY ? spring : repel;
      positions[stride] = THREE.MathUtils.lerp(positions[stride], targetX, influence);
      positions[stride + 1] = THREE.MathUtils.lerp(positions[stride + 1], targetY, influence);
      positions[stride + 2] = baseZ + Math.sin(elapsed * 0.22 + index * 0.13) * 0.09;
    }
    positionAttribute.needsUpdate = true;
    points.rotation.z = Math.sin(elapsed * 0.055) * 0.08;
    points.rotation.y = Math.cos(elapsed * 0.04) * 0.06;
  });

  return <points ref={pointsRef} frustumCulled={false}>
    <bufferGeometry><bufferAttribute attach="attributes-position" args={[livePositions, 3]} /></bufferGeometry>
    <pointsMaterial color="#E6BF73" size={0.035} sizeAttenuation transparent opacity={0.72} depthWrite={false} blending={THREE.AdditiveBlending} />
  </points>;
}
