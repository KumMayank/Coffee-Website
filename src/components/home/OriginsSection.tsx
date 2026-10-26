import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Globe2, Mountain, Sparkles, ArrowRight } from 'lucide-react';
import { COFFEE_ORIGINS, CoffeeOrigin } from '../../data/origins';
import { ProductViewer3D } from '../3d/ProductViewer3D';

export const OriginsSection: React.FC = () => {
  const [activeOrigin, setActiveOrigin] = useState<CoffeeOrigin>(COFFEE_ORIGINS[0]);

  return (
    <section className="py-24 relative bg-espresso-950/70 border-t border-caramel/15 overflow-hidden">
      {/* Background Parallax Word */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 parallax-bg-word text-[120px] sm:text-[200px] md:text-[280px] opacity-[0.025] pointer-events-none select-none">
        ORIGINS
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cardbrown/60 border border-caramel/30 text-xs text-caramel font-semibold uppercase tracking-wider">
            <Globe2 className="w-3.5 h-3.5" />
            <span>Terroir & Direct Trade</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-cream">
            Sacred Soils & <span className="gold-gradient-text italic font-normal">Cloud Forests</span>
          </h2>
          <p className="text-xs sm:text-sm text-cream/70">
            We bypass middlemen and commodity markets, paying 250% of Fair Trade price directly to single-estate farmers across the equatorial coffee belt.
          </p>
        </div>

        {/* 3D Bag Feature & Origins Selector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center glass-card rounded-3xl p-6 sm:p-10 border border-caramel/25 shadow-2xl mb-12">
          {/* 3D Bag Model */}
          <div className="lg:col-span-6">
            <ProductViewer3D
              key={activeOrigin.id}
              modelType="bag"
              title={`${activeOrigin.country} Lot`}
              sub={`${activeOrigin.region} • ${activeOrigin.altitude}`}
              accentColor={activeOrigin.color}
              className="w-full h-[360px] sm:h-[420px]"
            />
          </div>

          {/* Active Origin Spec Sheet */}
          <div className="lg:col-span-6 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{activeOrigin.flag}</span>
                <span className="text-xs font-bold text-caramel uppercase tracking-widest">
                  {activeOrigin.country} • {activeOrigin.region}
                </span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-cream">
                {activeOrigin.country} Single Estate
              </h3>
              <p className="text-xs sm:text-sm text-cream/75 leading-relaxed">
                {activeOrigin.description}
              </p>
            </div>

            {/* Spec Matrix */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-espresso-950/70 border border-cream/10">
                <span className="text-[10px] text-cream/50 uppercase block flex items-center gap-1">
                  <Mountain className="w-3 h-3 text-caramel" /> Altitude
                </span>
                <span className="font-semibold text-cream mt-0.5 block">{activeOrigin.altitude}</span>
              </div>
              <div className="p-3 rounded-2xl bg-espresso-950/70 border border-cream/10">
                <span className="text-[10px] text-cream/50 uppercase block">Processing</span>
                <span className="font-semibold text-cream mt-0.5 block truncate">{activeOrigin.process}</span>
              </div>
              <div className="p-3 rounded-2xl bg-espresso-950/70 border border-cream/10">
                <span className="text-[10px] text-cream/50 uppercase block">Varietals</span>
                <span className="font-semibold text-cream mt-0.5 block truncate">{activeOrigin.varietals}</span>
              </div>
              <div className="p-3 rounded-2xl bg-espresso-950/70 border border-cream/10">
                <span className="text-[10px] text-cream/50 uppercase block">Harvest Season</span>
                <span className="font-semibold text-cream mt-0.5 block truncate">{activeOrigin.harvest}</span>
              </div>
            </div>

            {/* Tasting Notes */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-cream/60 uppercase tracking-wider block">
                Dominant Flavor Profiles:
              </span>
              <div className="flex flex-wrap gap-2">
                {activeOrigin.notes.map((note) => (
                  <span
                    key={note}
                    className="px-3 py-1 rounded-full bg-caramel/15 border border-caramel/30 text-xs text-caramel font-semibold"
                  >
                    ★ {note}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/menu?filter=filter"
                className="inline-flex items-center gap-2 px-6 py-3 gold-pill-btn text-xs font-bold shadow-gold-glow"
              >
                <span>Taste This Origin</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Origin Selector Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {COFFEE_ORIGINS.map((origin) => {
            const isSelected = activeOrigin.id === origin.id;
            return (
              <button
                key={origin.id}
                onClick={() => setActiveOrigin(origin)}
                className={`p-4 rounded-2xl text-left transition-all ${
                  isSelected
                    ? 'bg-cardbrown border-2 border-caramel shadow-gold-glow scale-102'
                    : 'glass-card border border-cream/10 opacity-70 hover:opacity-100 hover:border-caramel/40'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{origin.flag}</span>
                  <span className="text-[10px] text-caramel font-bold tracking-wider uppercase">
                    {origin.altitude.split(' ')[0]}
                  </span>
                </div>
                <h4 className="font-serif text-base font-bold text-cream">{origin.country}</h4>
                <p className="text-[11px] text-cream/60 truncate mt-0.5">{origin.region}</p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
