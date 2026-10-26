import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Float } from '@react-three/drei';
import { CeramicCoffeeCup, GlassColdBrew, CinnamonCoffeeCup, CoffeeBagPouch, CoffeeBean } from './DrinkModels';
import { SteamParticles } from './SteamParticles';
import { RotateCw, ZoomIn, Sun, Sparkles } from 'lucide-react';

interface ProductViewer3DProps {
  modelType?: 'cup' | 'glass' | 'latte' | 'cinnamon' | 'bag' | 'pastry';
  title?: string;
  sub?: string;
  accentColor?: string;
  className?: string;
}

export const ProductViewer3D: React.FC<ProductViewer3DProps> = ({
  modelType = 'cup',
  title = 'Gandhi Reserve',
  sub = 'Specialty Roast',
  accentColor = '#C08A55',
  className = 'w-full h-[400px] md:h-[480px]',
}) => {
  const [autoRotate, setAutoRotate] = useState(true);
  const [warmLighting, setWarmLighting] = useState(true);

  // Render appropriate 3D model
  const renderModel = () => {
    switch (modelType) {
      case 'glass':
        return <GlassColdBrew />;
      case 'cinnamon':
        return (
          <>
            <CinnamonCoffeeCup />
            <SteamParticles count={25} origin={[0, 0.7, 0]} />
          </>
        );
      case 'bag':
        return <CoffeeBagPouch title={title} sub={sub} accent={accentColor} />;
      case 'latte':
        return (
          <>
            <CeramicCoffeeCup latteArt="heart" cupColor="#231712" />
            <SteamParticles count={25} origin={[0, 0.7, 0]} />
          </>
        );
      case 'cup':
      default:
        return (
          <>
            <CeramicCoffeeCup latteArt="tulip" cupColor="#1E1511" />
            <SteamParticles count={20} origin={[0, 0.7, 0]} />
          </>
        );
    }
  };

  return (
    <div className={`relative ${className} rounded-3xl overflow-hidden glass-card group select-none`}>
      {/* 3D Canvas */}
      <Canvas
        shadows
        camera={{ position: [0, 1.6, 3.4], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={warmLighting ? 0.9 : 0.6} />
        <directionalLight
          position={[4, 7, 5]}
          intensity={warmLighting ? 1.8 : 1.4}
          color={warmLighting ? '#FFF2E0' : '#FFFFFF'}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight
          position={[-3, 2, -3]}
          intensity={1.0}
          color={accentColor}
        />
        <pointLight position={[0, -2, 2]} intensity={0.4} color={accentColor} />

        <Suspense fallback={null}>
          <Float speed={1.0} rotationIntensity={0.1} floatIntensity={0.2}>
            {renderModel()}
            {/* Ambient small beans orbiting */}
            <CoffeeBean position={[-1.6, 0.8, -0.5]} scale={0.6} />
            <CoffeeBean position={[1.5, -0.4, 0.6]} scale={0.5} />
          </Float>

          {/* Ground Contact Shadow */}
          <ContactShadows
            position={[0, -0.85, 0]}
            opacity={0.7}
            scale={4.5}
            blur={2.5}
            far={3}
            color="#0A0604"
          />

          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minDistance={2.2}
            maxDistance={5.0}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2.1}
            autoRotate={autoRotate}
            autoRotateSpeed={1.8}
            dampingFactor={0.06}
          />
        </Suspense>
      </Canvas>

      {/* Floating 3D Controls Overlay */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className={`p-2.5 rounded-full backdrop-blur-md border transition-all ${
            autoRotate
              ? 'bg-caramel text-espresso-950 border-caramel shadow-gold-glow'
              : 'bg-espresso-900/80 text-cream/80 border-cream/15 hover:border-caramel/50'
          }`}
          title={autoRotate ? 'Pause 3D rotation' : 'Start 3D rotation'}
        >
          <RotateCw className={`w-4 h-4 ${autoRotate ? 'animate-spin-slow' : ''}`} />
        </button>

        <button
          onClick={() => setWarmLighting(!warmLighting)}
          className={`p-2.5 rounded-full backdrop-blur-md border transition-all ${
            warmLighting
              ? 'bg-caramel/20 text-caramel border-caramel/40'
              : 'bg-espresso-900/80 text-cream/80 border-cream/15'
          }`}
          title="Toggle warm cafe lighting"
        >
          <Sun className="w-4 h-4" />
        </button>
      </div>

      {/* Interactive Helper Pill */}
      <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-espresso-950/80 backdrop-blur-md border border-caramel/20 text-xs text-cream/70">
        <Sparkles className="w-3.5 h-3.5 text-caramel" />
        <span>Drag to rotate • Scroll to zoom</span>
      </div>
    </div>
  );
};
