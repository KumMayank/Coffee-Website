import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { createLatteArtTexture, createBagLabelTexture } from './textureUtils';

// 1. Single Realistic Roasted Coffee Bean with split center crease
export const CoffeeBean: React.FC<{
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  speed?: number;
}> = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1, speed = 0.5 }) => {
  const meshRef = useRef<THREE.Group>(null);
  const rotSpeed = useRef({
    x: (Math.random() - 0.5) * 0.015 * speed,
    y: (Math.random() - 0.5) * 0.015 * speed,
    z: (Math.random() - 0.5) * 0.015 * speed,
  });

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += rotSpeed.current.x;
      meshRef.current.rotation.y += rotSpeed.current.y;
      meshRef.current.rotation.z += rotSpeed.current.z;
    }
  });

  return (
    <group ref={meshRef} position={position} rotation={rotation} scale={scale}>
      {/* Bean Body Left Half */}
      <mesh position={[-0.07, 0, 0]} castShadow>
        <sphereGeometry args={[0.22, 24, 24]} />
        <meshStandardMaterial
          color="#3A1F13"
          roughness={0.4}
          metalness={0.15}
        />
      </mesh>
      {/* Bean Body Right Half */}
      <mesh position={[0.07, 0, 0]} castShadow>
        <sphereGeometry args={[0.22, 24, 24]} />
        <meshStandardMaterial
          color="#351B0F"
          roughness={0.4}
          metalness={0.15}
        />
      </mesh>
      {/* Center Crease Groove */}
      <mesh position={[0, 0, 0.12]}>
        <cylinderGeometry args={[0.02, 0.02, 0.38, 12]} />
        <meshStandardMaterial
          color="#1A0D07"
          roughness={0.9}
        />
      </mesh>
    </group>
  );
};

// 2. High-Fidelity Ceramic Coffee Cup & Saucer with Latte Art
export const CeramicCoffeeCup: React.FC<{
  latteArt?: 'heart' | 'tulip';
  cupColor?: string;
  goldRim?: boolean;
}> = ({ latteArt = 'heart', cupColor = '#1E1511', goldRim = true }) => {
  const latteTexture = useMemo(() => createLatteArtTexture(latteArt), [latteArt]);

  return (
    <group position={[0, -0.4, 0]}>
      {/* Saucer Plate */}
      <mesh position={[0, -0.32, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[1.5, 1.25, 0.09, 64]} />
        <meshStandardMaterial
          color={cupColor}
          roughness={0.25}
          metalness={0.1}
        />
      </mesh>

      {/* Saucer Inner Ring Accent */}
      <mesh position={[0, -0.27, 0]}>
        <ringGeometry args={[0.7, 0.74, 48]} />
        <meshStandardMaterial
          color="#C08A55"
          metalness={0.8}
          roughness={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Cup Outer Body */}
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.95, 0.65, 1.35, 64]} />
        <meshStandardMaterial
          color={cupColor}
          roughness={0.2}
          metalness={0.12}
        />
      </mesh>

      {/* Inner Cup Hollow Lining */}
      <mesh position={[0, 0.48, 0]}>
        <cylinderGeometry args={[0.88, 0.58, 1.3, 48]} />
        <meshStandardMaterial
          color="#2A1D17"
          roughness={0.3}
        />
      </mesh>

      {/* Luxury Gold Rim */}
      {goldRim && (
        <mesh position={[0, 1.13, 0]}>
          <torusGeometry args={[0.92, 0.035, 16, 64]} />
          <meshStandardMaterial
            color="#E9C46A"
            metalness={0.9}
            roughness={0.15}
          />
        </mesh>
      )}

      {/* Coffee Liquid Surface with Latte Art */}
      <mesh position={[0, 0.95, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.85, 64]} />
        <meshStandardMaterial
          map={latteTexture}
          roughness={0.35}
          metalness={0.05}
        />
      </mesh>

      {/* Cup Ergonomic Handle */}
      <mesh position={[0.82, 0.45, 0]} rotation={[0, 0, Math.PI * 0.15]} castShadow>
        <torusGeometry args={[0.42, 0.08, 24, 48, Math.PI * 1.35]} />
        <meshStandardMaterial
          color={cupColor}
          roughness={0.2}
          metalness={0.12}
        />
      </mesh>
    </group>
  );
};

// 3. Iced Cold Brew in Ribbed Fluted Glass with Ice Cubes
export const GlassColdBrew: React.FC = () => {
  const iceGroup = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (iceGroup.current) {
      iceGroup.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group position={[0, -0.4, 0]}>
      {/* Coaster Base */}
      <mesh position={[0, -0.35, 0]} receiveShadow>
        <cylinderGeometry args={[1.1, 1.1, 0.08, 48]} />
        <meshStandardMaterial color="#2A1D17" roughness={0.7} />
      </mesh>

      {/* Glass Body */}
      <mesh position={[0, 0.65, 0]} castShadow>
        <cylinderGeometry args={[0.7, 0.58, 1.9, 48]} />
        <meshPhysicalMaterial
          color="#FFFFFF"
          transmission={0.92}
          opacity={1}
          transparent
          roughness={0.08}
          ior={1.52}
          thickness={0.6}
        />
      </mesh>

      {/* Cold Brew Liquid Inside */}
      <mesh position={[0, 0.55, 0]}>
        <cylinderGeometry args={[0.66, 0.54, 1.7, 48]} />
        <meshStandardMaterial
          color="#42220F"
          roughness={0.1}
          metalness={0.05}
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* Cascading Nitro Foam Head */}
      <mesh position={[0, 1.42, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.66, 48]} />
        <meshStandardMaterial
          color="#D4A373"
          roughness={0.4}
        />
      </mesh>

      {/* Floating Ice Cubes */}
      <group ref={iceGroup} position={[0, 1.0, 0]}>
        <mesh position={[0.2, 0.1, 0.1]} rotation={[0.4, 0.5, 0.2]}>
          <boxGeometry args={[0.34, 0.34, 0.34]} />
          <meshPhysicalMaterial
            color="#E8F4F8"
            transmission={0.88}
            roughness={0.1}
            ior={1.31}
            transparent
            opacity={0.8}
          />
        </mesh>
        <mesh position={[-0.18, -0.2, 0.05]} rotation={[0.2, 0.9, 0.6]}>
          <boxGeometry args={[0.3, 0.3, 0.3]} />
          <meshPhysicalMaterial
            color="#E8F4F8"
            transmission={0.88}
            roughness={0.1}
            ior={1.31}
            transparent
            opacity={0.8}
          />
        </mesh>
        <mesh position={[0.05, 0.25, -0.15]} rotation={[0.8, 0.1, 0.4]}>
          <boxGeometry args={[0.28, 0.28, 0.28]} />
          <meshPhysicalMaterial
            color="#E8F4F8"
            transmission={0.88}
            roughness={0.1}
            ior={1.31}
            transparent
            opacity={0.8}
          />
        </mesh>
      </group>
    </group>
  );
};

// 4. Cinnamon Infused Coffee with Cinnamon Stick
export const CinnamonCoffeeCup: React.FC = () => {
  return (
    <group position={[0, -0.4, 0]}>
      <CeramicCoffeeCup latteArt="tulip" cupColor="#231712" />

      {/* Cinnamon Stick angled in cup */}
      <mesh position={[0.3, 1.15, 0.2]} rotation={[0.35, 0.2, 0.5]} castShadow>
        <cylinderGeometry args={[0.07, 0.08, 1.3, 16]} />
        <meshStandardMaterial
          color="#653518"
          roughness={0.85}
        />
      </mesh>

      {/* Star Anise Pod Garnish */}
      <mesh position={[-0.3, 0.98, -0.2]} rotation={[-Math.PI / 2, 0, 0.8]}>
        <torusGeometry args={[0.16, 0.05, 8, 8]} />
        <meshStandardMaterial color="#4A2610" roughness={0.8} />
      </mesh>
    </group>
  );
};

// 5. 3D Whole Bean Coffee Bag Pouch with Gold Seal
export const CoffeeBagPouch: React.FC<{
  title?: string;
  sub?: string;
  accent?: string;
}> = ({ title = 'FOUNDER’S BLEND', sub = 'SPECIALTY GRADE • ETHIOPIA & COLOMBIA', accent = '#C08A55' }) => {
  const bagTexture = useMemo(() => createBagLabelTexture(title, sub, accent), [title, sub, accent]);

  return (
    <group position={[0, 0.1, 0]}>
      {/* Coffee Bag Body */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 2.2, 0.8]} />
        <meshStandardMaterial
          color="#16100D"
          roughness={0.35}
          metalness={0.1}
        />
      </mesh>

      {/* Front Label Print */}
      <mesh position={[0, 0, 0.405]}>
        <planeGeometry args={[1.4, 2.05]} />
        <meshStandardMaterial
          map={bagTexture}
          roughness={0.4}
          metalness={0.2}
        />
      </mesh>

      {/* Top Folded Seal */}
      <mesh position={[0, 1.15, 0]} castShadow>
        <boxGeometry args={[1.55, 0.14, 0.12]} />
        <meshStandardMaterial
          color="#C08A55"
          metalness={0.85}
          roughness={0.2}
        />
      </mesh>

      {/* One-way Aroma Valve on Back */}
      <mesh position={[0, 0.6, -0.405]} rotation={[0, Math.PI, 0]}>
        <circleGeometry args={[0.09, 24]} />
        <meshStandardMaterial
          color="#3A271E"
          metalness={0.5}
          roughness={0.4}
        />
      </mesh>
    </group>
  );
};
