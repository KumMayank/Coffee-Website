import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck, Flame, Award } from 'lucide-react';
import { CoffeeCupScene } from '../3d/CoffeeCupScene';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Huge Faded Parallax Word */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 parallax-bg-word text-[140px] sm:text-[220px] md:text-[300px] lg:text-[360px] opacity-[0.035] pointer-events-none select-none z-0">
        ESPRESSO
      </div>

      {/* Atmospheric Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[550px] h-[550px] rounded-full bg-caramel/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 rounded-full bg-mocha-700/20 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-5 text-center lg:text-left space-y-6">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cardbrown/70 border border-caramel/30 backdrop-blur-md shadow-glass">
              <Sparkles className="w-3.5 h-3.5 text-caramel animate-pulse" />
              <span className="text-xs font-semibold tracking-wider gold-gradient-text uppercase">
                Single-Origin 3D Coffee Sanctuary
              </span>
            </div>

            {/* Main Title */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-cream leading-[1.08] tracking-tight">
              Brew Beyond <br />
              <span className="gold-gradient-text italic font-normal">Ordinary.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-cream/70 max-w-lg mx-auto lg:mx-0 leading-relaxed font-sans">
              Hand-harvested at 2,200 meters in volcanic cloud forests. Extracted at 9.2 bars on bespoke lever machines. Experience coffee elevated into fine architecture.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link
                to="/menu"
                className="w-full sm:w-auto px-8 py-3.5 gold-pill-btn text-xs font-bold flex items-center justify-center gap-2 shadow-gold-glow"
              >
                <span>Explore Menu</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/club"
                className="w-full sm:w-auto px-7 py-3.5 gold-outline-btn text-xs font-bold flex items-center justify-center gap-2"
              >
                <Award className="w-4 h-4 text-caramel" />
                <span>Join The Club</span>
              </Link>
            </div>

            {/* Metric Highlights */}
            <div className="pt-6 border-t border-cream/10 grid grid-cols-3 gap-4 text-center lg:text-left">
              <div>
                <p className="font-serif text-2xl font-bold text-cream">2,200m</p>
                <p className="text-[11px] text-cream/60 uppercase tracking-wider mt-0.5">Volcanic Altitude</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-bold text-caramel">9.2 Bar</p>
                <p className="text-[11px] text-cream/60 uppercase tracking-wider mt-0.5">Crema Pressure</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-bold text-gold-300">92+</p>
                <p className="text-[11px] text-cream/60 uppercase tracking-wider mt-0.5">Cup Score</p>
              </div>
            </div>
          </div>

          {/* Right 3D Coffee Cup Column */}
          <div className="lg:col-span-7 relative flex items-center justify-center">
            {/* 3D Scene */}
            <CoffeeCupScene className="w-full h-[400px] sm:h-[480px] lg:h-[540px]" latteArt="heart" />
          </div>
        </div>
      </div>
    </section>
  );
};
