import React, { useEffect, useState } from 'react';
import { useCartStore } from '../../store/useCartStore';

interface Particle {
  id: number;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
}

export const FlyingCartAnimation: React.FC = () => {
  const lastAddedPos = useCartStore((s) => s.lastAddedPosition);
  const setLastAddedPosition = useCartStore((s) => s.setLastAddedPosition);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!lastAddedPos) return;

    // Find destination cart icon in DOM
    const cartIcon = document.getElementById('navbar-cart-btn') || document.getElementById('mobile-cart-tab');
    let destX = window.innerWidth - 60;
    let destY = 40;

    if (cartIcon) {
      const rect = cartIcon.getBoundingClientRect();
      destX = rect.left + rect.width / 2;
      destY = rect.top + rect.height / 2;
    }

    const p: Particle = {
      id: Date.now(),
      startX: lastAddedPos.x,
      startY: lastAddedPos.y,
      targetX: destX,
      targetY: destY,
    };

    setParticles((prev) => [...prev, p]);
    setLastAddedPosition(null);

    // Remove particle after animation completes
    const timer = setTimeout(() => {
      setParticles((prev) => prev.filter((item) => item.id !== p.id));
      // Trigger a mini bump vibration / pulse on the cart icon
      if (cartIcon) {
        cartIcon.classList.add('scale-125', 'text-caramel');
        setTimeout(() => {
          cartIcon.classList.remove('scale-125', 'text-caramel');
        }, 300);
      }
    }, 700);

    return () => clearTimeout(timer);
  }, [lastAddedPos, setLastAddedPosition]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="fixed w-7 h-7 rounded-full bg-gradient-to-tr from-caramel to-gold-300 shadow-gold-glow flex items-center justify-center text-espresso-950 font-bold text-xs"
          style={{
            left: `${p.startX}px`,
            top: `${p.startY}px`,
            animation: 'flyToCart 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
            // @ts-expect-error custom css variable
            '--target-x': `${p.targetX - p.startX}px`,
            '--target-y': `${p.targetY - p.startY}px`,
          }}
        >
          ☕
        </div>
      ))}
      <style>{`
        @keyframes flyToCart {
          0% {
            transform: translate(0, 0) scale(1) rotate(0deg);
            opacity: 1;
          }
          50% {
            transform: translate(calc(var(--target-x) * 0.5), calc(var(--target-y) * 0.4 - 60px)) scale(1.3) rotate(180deg);
            opacity: 0.95;
          }
          100% {
            transform: translate(var(--target-x), var(--target-y)) scale(0.2) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
