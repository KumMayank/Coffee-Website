import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export const SteamParticles: React.FC<{ count?: number; origin?: [number, number, number] }> = ({
  count = 35,
  origin = [0, 0.6, 0],
}) => {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate particle positions, velocities, and lifetimes
  const [positions, velocities, phases] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    const ph = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Start in a tight radius around the cup top
      const rad = Math.random() * 0.35;
      const angle = Math.random() * Math.PI * 2;
      pos[i * 3] = origin[0] + Math.cos(angle) * rad;
      pos[i * 3 + 1] = origin[1] + Math.random() * 0.2;
      pos[i * 3 + 2] = origin[2] + Math.sin(angle) * rad;

      // Upward drift with slight sinusoidal wobble
      vel[i * 3] = (Math.random() - 0.5) * 0.003;
      vel[i * 3 + 1] = 0.008 + Math.random() * 0.012;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.003;

      ph[i] = Math.random() * Math.PI * 2;
    }
    return [pos, vel, ph];
  }, [count, origin]);

  // Particle circular soft texture
  const particleTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d')!;

    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255, 245, 235, 0.8)');
    grad.addColorStop(0.4, 'rgba(230, 200, 170, 0.4)');
    grad.addColorStop(1, 'rgba(200, 160, 130, 0)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(32, 32, 32, 0, Math.PI * 2);
    ctx.fill();

    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const geo = pointsRef.current.geometry;
    const posAttr = geo.attributes.position as THREE.BufferAttribute;
    const posArr = posAttr.array as Float32Array;

    const time = state.clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      // Rise up
      posArr[i * 3 + 1] += velocities[i * 3 + 1];
      // Wobble x and z
      posArr[i * 3] += Math.sin(time * 2 + phases[i]) * 0.002;
      posArr[i * 3 + 2] += Math.cos(time * 2 + phases[i]) * 0.002;

      // Reset when too high
      if (posArr[i * 3 + 1] > origin[1] + 2.2) {
        const rad = Math.random() * 0.3;
        const angle = Math.random() * Math.PI * 2;
        posArr[i * 3] = origin[0] + Math.cos(angle) * rad;
        posArr[i * 3 + 1] = origin[1];
        posArr[i * 3 + 2] = origin[2] + Math.sin(angle) * rad;
      }
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.24}
        map={particleTexture}
        transparent
        opacity={0.35}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};
