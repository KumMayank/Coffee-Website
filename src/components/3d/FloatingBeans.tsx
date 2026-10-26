import React, { useMemo } from 'react';
import { CoffeeBean } from './DrinkModels';

export const FloatingBeans: React.FC<{ count?: number }> = ({ count = 14 }) => {
  const beansData = useMemo(() => {
    const list = [];
    for (let i = 0; i < count; i++) {
      // Distribute in a cylinder around the focal cup
      const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
      const radius = 2.0 + Math.random() * 2.2;
      const x = Math.cos(angle) * radius;
      const y = -1.2 + Math.random() * 3.2;
      const z = Math.sin(angle) * radius - 0.5;

      const scale = 0.5 + Math.random() * 0.65;
      const rot: [number, number, number] = [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      ];
      list.push({ id: i, pos: [x, y, z] as [number, number, number], rot, scale });
    }
    return list;
  }, [count]);

  return (
    <group>
      {beansData.map((b) => (
        <CoffeeBean
          key={b.id}
          position={b.pos}
          rotation={b.rot}
          scale={b.scale}
          speed={0.4}
        />
      ))}
    </group>
  );
};
