import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

export const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFading(true);
            setTimeout(onComplete, 500);
          }, 200);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15 + 8);
      });
    }, 60);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-espresso-950 text-cream transition-opacity duration-500 ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative flex flex-col items-center space-y-6 max-w-xs text-center">
        {/* Animated Coffee Cup Pour Visual */}
        <div className="relative w-24 h-24 flex items-center justify-center">
          {/* Outer Pulsing Glow */}
          <div className="absolute inset-0 rounded-full bg-caramel/20 blur-xl animate-pulse" />

          {/* Cup Silhouette */}
          <div className="relative w-16 h-16 rounded-2xl border-2 border-caramel/60 flex items-center justify-center overflow-hidden bg-espresso-900 shadow-luxury">
            {/* Liquid Fill Level rising */}
            <div
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-caramel-dark via-caramel to-gold-300 transition-all duration-150 ease-out"
              style={{ height: `${progress}%` }}
            />
            {/* Cup icon on top */}
            <span className="relative z-10 text-2xl drop-shadow">☕</span>
          </div>

          {/* Steam puffs above */}
          <div className="absolute -top-3 flex gap-1">
            <span className="w-1.5 h-3 rounded-full bg-cream/40 animate-steam" />
            <span
              className="w-1.5 h-4 rounded-full bg-cream/60 animate-steam"
              style={{ animationDelay: '0.4s' }}
            />
            <span
              className="w-1.5 h-3 rounded-full bg-cream/30 animate-steam"
              style={{ animationDelay: '0.8s' }}
            />
          </div>
        </div>

        {/* Brand Name */}
        <div className="space-y-1">
          <h2 className="font-serif text-xl font-bold tracking-widest gold-gradient-text">
            [CODE WITH GANDHI]
          </h2>
          <p className="text-[10px] tracking-[0.25em] text-cream/60 uppercase font-sans">
            Calibrating 3D Roastery • 9.2 Bar
          </p>
        </div>

        {/* Progress Bar & Percentage */}
        <div className="w-48 space-y-2">
          <div className="w-full h-1.5 rounded-full bg-cardbrown overflow-hidden p-0.5 border border-cream/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-caramel to-gold-300 transition-all duration-100 ease-out shadow-gold-glow"
              style={{ width: `${Math.min(100, progress)}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] font-mono text-cream/50">
            <span>EXTRACTION</span>
            <span className="text-caramel font-bold">{Math.min(100, progress)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
