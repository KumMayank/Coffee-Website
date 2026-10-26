import React, { useRef, Suspense, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { CeramicCoffeeCup } from './DrinkModels';
import { SteamParticles } from './SteamParticles';
import { FloatingBeans } from './FloatingBeans';

interface InteractiveCupProps {
  latteArt?: 'heart' | 'tulip';
  cupColor?: string;
  scrollY?: number;
}

const InteractiveCup: React.FC<InteractiveCupProps> = ({
  latteArt = 'heart',
  cupColor = '#1E1511',
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Target rotation based on mouse pointer coordinates
    const targetRotX = 0.28 + pointer.y * 0.25;
    const targetRotY = pointer.x * 0.45;

    // Smooth damping
    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      targetRotX,
      3.5,
      delta
    );
    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      targetRotY,
      3.5,
      delta
    );

    // Subtle breathing floating motion
    const time = state.clock.getElapsedTime();
    groupRef.current.position.y = Math.sin(time * 1.5) * 0.08;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <CeramicCoffeeCup latteArt={latteArt} cupColor={cupColor} goldRim={true} />
      <SteamParticles count={30} origin={[0, 0.7, 0]} />
    </group>
  );
};

export const CoffeeCupScene: React.FC<{
  className?: string;
  latteArt?: 'heart' | 'tulip';
  cupColor?: string;
}> = ({ className = 'w-full h-full min-h-[460px]', latteArt = 'heart', cupColor = '#1E1511' }) => {
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }
  }, []);

  if (!hasWebGL) {
    return (
      <div className={`flex items-center justify-center relative overflow-hidden ${className}`}>
        <img
          src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80"
          alt="Artisan Coffee Cup"
          className="w-72 h-72 object-contain drop-shadow-2xl animate-float"
        />
      </div>
    );
  }

  return (
    <div className={`relative ${className} select-none`}>
      <Canvas
        shadows
        camera={{ position: [0, 1.8, 3.8], fov: 42 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.8} />

        {/* Warm key light */}
        <directionalLight
          position={[4, 7, 5]}
          intensity={1.8}
          color="#FFF0DE"
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-bias={-0.0001}
        />

        {/* Subtle caramel rim backlight */}
        <directionalLight
          position={[-4, 3, -3]}
          intensity={1.2}
          color="#C08A55"
        />

        {/* Ground soft warm bounce light */}
        <pointLight position={[0, -2, 2]} intensity={0.5} color="#D4A373" />

        <Suspense fallback={null}>
          <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.3}>
            <InteractiveCup latteArt={latteArt} cupColor={cupColor} />
            <FloatingBeans count={12} />
          </Float>

          {/* Soft Ground Contact Shadow */}
          <ContactShadows
            position={[0, -0.9, 0]}
            opacity={0.65}
            scale={5}
            blur={2.4}
            far={3}
            color="#080402"
          />
        </Suspense>
      </Canvas>

      {/* Floating 3D Interaction Hint Badge */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-espresso-950/70 border border-caramel/25 backdrop-blur-md text-[11px] font-medium text-cream/75 pointer-events-none shadow-glass">
        <span className="w-2 h-2 rounded-full bg-caramel animate-ping" />
        <span>Move cursor or tilt to rotate 3D cup</span>
      </div>
    </div>
  );
};
