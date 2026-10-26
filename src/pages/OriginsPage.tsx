import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Globe2, Mountain, Flame, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { COFFEE_ORIGINS, CoffeeOrigin } from '../data/origins';
import { ProductViewer3D } from '../components/3d/ProductViewer3D';

export const OriginsPage: React.FC = () => {
  const [selectedOrigin, setSelectedOrigin] = useState<CoffeeOrigin>(COFFEE_ORIGINS[0]);

  return (
    <div className="pt-28 pb-24 min-h-screen relative overflow-hidden">
      {/* Background Parallax Word */}
      <div className="absolute top-28 left-1/2 -translate-x-1/2 parallax-bg-word text-[140px] sm:text-[220px] md:text-[320px] opacity-[0.025] pointer-events-none select-none">
        EQUATOR
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-caramel/20 border border-caramel/40 text-xs font-bold text-caramel tracking-wider uppercase">
            <Globe2 className="w-3.5 h-3.5" />
            <span>The Equatorial Belt</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-cream">
            Single-Origin <span className="gold-gradient-text italic font-normal">Micro-Lots</span>
          </h1>
          <p className="text-xs sm:text-sm text-cream/70 font-sans">
            Explore the volcanic slopes and shade-grown estates that yield our most precious coffees.
          </p>
        </div>

        {/* 3D Bag & Origin Detail Showcase */}
        <div className="glass-card rounded-3xl p-6 sm:p-10 border border-caramel/30 mb-16 shadow-luxury grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6">
            <ProductViewer3D
              key={selectedOrigin.id}
              modelType="bag"
              title={`${selectedOrigin.country} Lot`}
              sub={`${selectedOrigin.region} • ${selectedOrigin.altitude}`}
              accentColor={selectedOrigin.color}
              className="w-full h-[380px] sm:h-[440px]"
            />
          </div>

          <div className="lg:col-span-6 space-y-5">
            <div className="flex items-center gap-2 text-2xl">
              <span>{selectedOrigin.flag}</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-cream">
                {selectedOrigin.country} — {selectedOrigin.region}
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-cream/75 leading-relaxed font-sans">
              {selectedOrigin.description}
            </p>

            {/* Spec Matrix */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-espresso-950/70 border border-cream/10">
                <span className="text-[10px] text-cream/50 uppercase block">Elevation</span>
                <span className="font-semibold text-cream mt-0.5 block">{selectedOrigin.altitude}</span>
              </div>
              <div className="p-3 rounded-2xl bg-espresso-950/70 border border-cream/10">
                <span className="text-[10px] text-cream/50 uppercase block">Processing Method</span>
                <span className="font-semibold text-cream mt-0.5 block truncate">{selectedOrigin.process}</span>
              </div>
              <div className="p-3 rounded-2xl bg-espresso-950/70 border border-cream/10">
                <span className="text-[10px] text-cream/50 uppercase block">Arabica Varietal</span>
                <span className="font-semibold text-cream mt-0.5 block truncate">{selectedOrigin.varietals}</span>
              </div>
              <div className="p-3 rounded-2xl bg-espresso-950/70 border border-cream/10">
                <span className="text-[10px] text-cream/50 uppercase block">Harvest Cycle</span>
                <span className="font-semibold text-cream mt-0.5 block truncate">{selectedOrigin.harvest}</span>
              </div>
            </div>

            {/* Tasting Notes */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-cream/60 uppercase tracking-wider block">
                Terroir Cupping Notes:
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedOrigin.notes.map((n) => (
                  <span
                    key={n}
                    className="px-3 py-1 rounded-full bg-caramel/15 border border-caramel/30 text-xs font-semibold text-caramel"
                  >
                    ★ {n}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/menu?filter=filter"
                className="inline-flex items-center gap-2 px-6 py-3 gold-pill-btn text-xs font-bold shadow-gold-glow"
              >
                <span>Order {selectedOrigin.country} Brews</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* All Origins Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {COFFEE_ORIGINS.map((origin) => {
            const isSelected = selectedOrigin.id === origin.id;
            return (
              <button
                key={origin.id}
                onClick={() => setSelectedOrigin(origin)}
                className={`p-6 rounded-3xl text-left transition-all ${
                  isSelected
                    ? 'bg-cardbrown border-2 border-caramel shadow-gold-glow scale-102'
                    : 'glass-card border border-cream/10 hover:border-caramel/40 opacity-75 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl">{origin.flag}</span>
                  <span className="text-[10px] text-caramel font-bold tracking-wider uppercase">
                    {origin.altitude.split(' ')[0]}
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-cream">{origin.country}</h3>
                <p className="text-xs text-cream/60 truncate mt-0.5">{origin.region}</p>
                <div className="mt-4 pt-3 border-t border-cream/10 flex items-center justify-between text-[11px] text-caramel font-semibold">
                  <span>Inspect Lot</span>
                  <span>→</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
