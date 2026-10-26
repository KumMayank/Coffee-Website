import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Plus, ArrowRight, Sparkles, Flame, Check } from 'lucide-react';
import { DRINKS_DATA, DrinkItem } from '../../data/drinks';
import { ProductViewer3D } from '../3d/ProductViewer3D';
import { useCartStore } from '../../store/useCartStore';
import { useToast } from '../common/ToastContainer';

// 5 Selected Signature drinks for the Interactive 3D Switcher
const SWITCHER_DRINKS = [
  DRINKS_DATA.find((d) => d.id === 'signature-espresso')!,
  DRINKS_DATA.find((d) => d.id === 'velvet-flat-white')!,
  DRINKS_DATA.find((d) => d.id === 'cinnamon-spice-brew')!,
  DRINKS_DATA.find((d) => d.id === 'nitro-cold-brew')!,
  DRINKS_DATA.find((d) => d.id === 'salted-caramel-cloud')!,
  DRINKS_DATA.find((d) => d.id === 'gandhi-signature-bean-bag')!,
];

export const ProductSwitcher: React.FC = () => {
  const [selectedDrink, setSelectedDrink] = useState<DrinkItem>(SWITCHER_DRINKS[0]);
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const { showToast } = useToast();

  const handleQuickAdd = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    addItem(selectedDrink, undefined, {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
    showToast('Added to Order', `${selectedDrink.name} added to your bag`, 'success');
  };

  return (
    <section className="relative py-24 bg-espresso-950/40 border-y border-caramel/15 overflow-hidden">
      {/* Big Morphing Parallax Background Word */}
      <div
        key={selectedDrink.bgWord}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 parallax-bg-word text-[130px] sm:text-[220px] md:text-[300px] lg:text-[360px] opacity-[0.03] pointer-events-none transition-all duration-700 ease-out z-0 whitespace-nowrap"
      >
        {selectedDrink.bgWord}
      </div>

      {/* Dynamic Accent Color Glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none transition-all duration-700 opacity-20"
        style={{ backgroundColor: selectedDrink.accentColor }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cardbrown/60 border border-caramel/30 text-xs text-caramel font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive 3D Barista Bar</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-cream tracking-tight">
            Crafted To Your <span className="gold-gradient-text italic font-normal">Exact Palette</span>
          </h2>
          <p className="text-xs sm:text-sm text-cream/70 font-sans">
            Select an artisan drink to switch the real-time 3D model, rotate and explore terroir origins, roast notes, and flavor profiles.
          </p>
        </div>

        {/* Circular Thumbnails Row (Product Switcher Buttons) */}
        <div className="flex items-center justify-center gap-3 sm:gap-5 overflow-x-auto pb-6 mb-8 px-2 no-scrollbar">
          {SWITCHER_DRINKS.map((drink) => {
            const isSelected = selectedDrink.id === drink.id;
            return (
              <button
                key={drink.id}
                onClick={() => setSelectedDrink(drink)}
                className={`group flex flex-col items-center gap-2 flex-shrink-0 transition-all duration-300 ${
                  isSelected ? 'scale-110' : 'opacity-65 hover:opacity-100 hover:scale-105'
                }`}
              >
                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full p-0.5 transition-all ${
                    isSelected
                      ? 'ring-2 ring-caramel shadow-gold-glow bg-gradient-to-tr from-caramel to-gold-300'
                      : 'border border-cream/20 bg-cardbrown'
                  }`}
                >
                  <img
                    src={drink.image}
                    alt={drink.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <span
                  className={`text-[11px] font-semibold tracking-tight transition-colors ${
                    isSelected ? 'text-caramel' : 'text-cream/70'
                  }`}
                >
                  {drink.name.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* 3D Viewer & Drink Details Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center glass-card rounded-3xl p-6 sm:p-10 border border-caramel/25 shadow-2xl">
          {/* 3D Product Interactive Viewer */}
          <div className="lg:col-span-7">
            <ProductViewer3D
              key={selectedDrink.id}
              modelType={selectedDrink.modelType}
              title={selectedDrink.name}
              sub={selectedDrink.shortDesc}
              accentColor={selectedDrink.accentColor}
              className="w-full h-[360px] sm:h-[420px] lg:h-[460px]"
            />
          </div>

          {/* Drink Information & Quick Add Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span
                  className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider"
                  style={{
                    backgroundColor: `${selectedDrink.accentColor}25`,
                    color: selectedDrink.accentColor,
                    border: `1px solid ${selectedDrink.accentColor}50`,
                  }}
                >
                  {selectedDrink.category.toUpperCase()}
                </span>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-cream">
                  <Star className="w-4 h-4 text-gold-400 fill-current" />
                  <span>{selectedDrink.rating}</span>
                  <span className="text-cream/50">({selectedDrink.reviewCount})</span>
                </div>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-cream">
                {selectedDrink.name}
              </h3>
              <p className="text-xs sm:text-sm text-cream/75 leading-relaxed font-sans">
                {selectedDrink.description}
              </p>
            </div>

            {/* Tasting Notes Chips */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-cream/60 uppercase tracking-wider block">
                Tasting Notes:
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedDrink.tastingNotes.map((note) => (
                  <span
                    key={note}
                    className="px-3 py-1 rounded-full bg-espresso-950/70 border border-cream/15 text-xs text-cream/90 font-medium"
                  >
                    • {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Origin & Roast Spec Sheet */}
            <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-espresso-950/60 border border-cream/10 text-xs">
              <div>
                <span className="text-cream/50 text-[10px] uppercase block">Terroir Origin</span>
                <span className="font-medium text-cream truncate block mt-0.5">
                  {selectedDrink.origin}
                </span>
              </div>
              <div>
                <span className="text-cream/50 text-[10px] uppercase block">Roast Profile</span>
                <span className="font-medium text-caramel block mt-0.5">
                  {selectedDrink.roastLevel} Roast
                </span>
              </div>
            </div>

            {/* Price & Action Buttons */}
            <div className="pt-2 flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] text-cream/60 uppercase block">Starting Price</span>
                <span className="font-serif text-3xl font-extrabold text-caramel">
                  ${selectedDrink.price.toFixed(2)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  to={`/product/${selectedDrink.id}`}
                  className="px-4 py-3 rounded-full border border-cream/20 text-cream hover:bg-cardbrown text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <span>Customize</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <button
                  onClick={handleQuickAdd}
                  className="px-6 py-3 gold-pill-btn text-xs font-bold flex items-center gap-1.5 shadow-gold-glow"
                >
                  <Plus className="w-4 h-4" />
                  <span>Quick Add</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
