import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Heart, ArrowLeft, Plus, Minus, Sparkles, Flame, Check, ShieldCheck, Share2 } from 'lucide-react';
import { DRINKS_DATA, DrinkItem } from '../data/drinks';
import { ProductViewer3D } from '../components/3d/ProductViewer3D';
import { useCartStore, CupSize, SIZE_PRICE_MODIFIERS } from '../store/useCartStore';
import { useFavoritesStore } from '../store/useFavoritesStore';
import { useToast } from '../components/common/ToastContainer';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem, openCart } = useCartStore();
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const { showToast } = useToast();

  const drink = DRINKS_DATA.find((d) => d.id === id) || DRINKS_DATA[0];
  const favorite = isFavorite(drink.id);

  // Customization state
  const [size, setSize] = useState<CupSize>('M');
  const [milk, setMilk] = useState('Oat Milk (Artisan)');
  const [sweetness, setSweetness] = useState('Regular (100%)');
  const [temperature, setTemperature] = useState<'hot' | 'iced'>('hot');
  const [extraShot, setExtraShot] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Calculate live price
  const sizeCost = SIZE_PRICE_MODIFIERS[size];
  const milkCost = milk.includes('Oat') || milk.includes('Almond') ? 0.50 : 0;
  const extraShotCost = extraShot ? 0.90 : 0;
  const unitPrice = drink.price + sizeCost + milkCost + extraShotCost;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    for (let i = 0; i < quantity; i++) {
      addItem(
        drink,
        {
          size,
          milk,
          sweetness,
          temperature,
          extraShot,
        },
        {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        }
      );
    }
    showToast(
      'Customized Order Added',
      `${quantity}x ${drink.name} (${size}, ${temperature}) added to bag`,
      'success'
    );
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `[CODE WITH GANDHI] — ${drink.name}`,
        text: drink.description,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link Copied', 'Drink link copied to clipboard', 'info');
    }
  };

  // Related drinks
  const relatedDrinks = DRINKS_DATA.filter((d) => d.id !== drink.id && d.category === drink.category).slice(0, 3);

  return (
    <div className="pt-24 pb-24 min-h-screen relative overflow-hidden">
      {/* Background Parallax Word */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 parallax-bg-word text-[130px] sm:text-[220px] md:text-[320px] opacity-[0.025] pointer-events-none select-none">
        {drink.bgWord}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Navigation Breadcrumb & Back */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-xs font-semibold text-cream/70 hover:text-caramel transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Menu</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-full glass-card hover:border-caramel/40 text-cream/70 hover:text-caramel transition-colors"
              title="Share drink"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                toggleFavorite(drink.id);
                showToast(favorite ? 'Removed' : 'Favorited', `${drink.name} saved to favorites`, 'info');
              }}
              className={`p-2 rounded-full glass-card transition-all ${
                favorite ? 'text-red-400 border-red-500/40' : 'text-cream/70 hover:text-caramel'
              }`}
              title="Save to favorites"
            >
              <Heart className={`w-4 h-4 ${favorite ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: 3D Interactive Model Viewer */}
          <div className="lg:col-span-6 space-y-4">
            <ProductViewer3D
              key={drink.id}
              modelType={drink.modelType}
              title={drink.name}
              sub={drink.shortDesc}
              accentColor={drink.accentColor}
              className="w-full h-[420px] sm:h-[480px] lg:h-[540px]"
            />

            {/* Quick Nutritional Specs */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-2xl glass-card text-center">
                <span className="text-[10px] text-cream/50 uppercase block">Caffeine</span>
                <span className="font-serif text-sm font-bold text-cream mt-0.5 block">{drink.caffeine}</span>
              </div>
              <div className="p-3 rounded-2xl glass-card text-center">
                <span className="text-[10px] text-cream/50 uppercase block">Calories</span>
                <span className="font-serif text-sm font-bold text-cream mt-0.5 block">{drink.calories} kcal</span>
              </div>
              <div className="p-3 rounded-2xl glass-card text-center">
                <span className="text-[10px] text-cream/50 uppercase block">Roast Level</span>
                <span className="font-serif text-sm font-bold text-caramel mt-0.5 block">{drink.roastLevel}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Customization Controls & Order Form */}
          <div className="lg:col-span-6 glass-card rounded-3xl p-6 sm:p-8 border border-caramel/25 space-y-6">
            {/* Header info */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span
                  className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider"
                  style={{
                    backgroundColor: `${drink.accentColor}25`,
                    color: drink.accentColor,
                    border: `1px solid ${drink.accentColor}50`,
                  }}
                >
                  {drink.category.toUpperCase()}
                </span>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-cream">
                  <Star className="w-4 h-4 text-gold-400 fill-current" />
                  <span>{drink.rating}</span>
                  <span className="text-cream/50">({drink.reviewCount} connoisseurs)</span>
                </div>
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-cream">
                {drink.name}
              </h1>
              <p className="text-xs sm:text-sm text-cream/75 leading-relaxed font-sans">
                {drink.description}
              </p>
            </div>

            {/* Terroir & Origin Tag */}
            <div className="p-3 rounded-2xl bg-espresso-950/60 border border-cream/10 flex items-center justify-between text-xs">
              <span className="text-cream/60">Terroir Single Origin:</span>
              <span className="font-semibold text-caramel">{drink.origin}</span>
            </div>

            {/* Customization 1: Size Selector */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-cream uppercase tracking-wider text-[11px]">Cup Size</span>
                <span className="text-cream/50">
                  {size === 'S' ? 'Piccolo 8oz' : size === 'M' ? 'Regular 12oz' : 'Grande 16oz'}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(['S', 'M', 'L'] as CupSize[]).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    className={`py-2.5 rounded-xl text-xs font-bold transition-all border ${
                      size === s
                        ? 'bg-caramel text-espresso-950 border-caramel shadow-gold-glow'
                        : 'bg-espresso-950/70 border-cream/15 text-cream/80 hover:border-caramel/40'
                    }`}
                  >
                    <span>Size {s}</span>
                    {SIZE_PRICE_MODIFIERS[s] > 0 && (
                      <span className="block text-[10px] font-normal opacity-80">
                        +${SIZE_PRICE_MODIFIERS[s].toFixed(2)}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Customization 2: Milk Alternative */}
            <div className="space-y-2">
              <span className="font-bold text-cream uppercase tracking-wider text-[11px] block">
                Milk Selection
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  'Oat Milk (Artisan) (+$0.50)',
                  'Guernsey Whole Milk',
                  'Almond Milk (+$0.50)',
                  'Pure Coconut Milk',
                ].map((m) => {
                  const isSelected = milk.startsWith(m.split(' ')[0]);
                  return (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMilk(m)}
                      className={`p-2.5 rounded-xl text-left transition-all border ${
                        isSelected
                          ? 'bg-caramel/20 border-caramel text-caramel font-semibold'
                          : 'bg-espresso-950/70 border-cream/15 text-cream/70 hover:border-caramel/40'
                      }`}
                    >
                      <span className="block text-xs truncate">{m}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Customization 3: Temperature & Sweetness */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="font-bold text-cream uppercase tracking-wider text-[11px] block mb-1.5">
                  Temperature
                </span>
                <div className="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-espresso-950/80 border border-cream/15 text-xs">
                  <button
                    type="button"
                    onClick={() => setTemperature('hot')}
                    className={`py-1.5 rounded-lg font-semibold transition-all ${
                      temperature === 'hot' ? 'bg-caramel text-espresso-950' : 'text-cream/70'
                    }`}
                  >
                    Hot ♨
                  </button>
                  <button
                    type="button"
                    onClick={() => setTemperature('iced')}
                    className={`py-1.5 rounded-lg font-semibold transition-all ${
                      temperature === 'iced' ? 'bg-caramel text-espresso-950' : 'text-cream/70'
                    }`}
                  >
                    Iced ❄
                  </button>
                </div>
              </div>

              <div>
                <span className="font-bold text-cream uppercase tracking-wider text-[11px] block mb-1.5">
                  Sweetness
                </span>
                <select
                  value={sweetness}
                  onChange={(e) => setSweetness(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-espresso-950/80 border border-cream/15 text-cream text-xs focus:outline-none focus:border-caramel"
                >
                  <option value="Unsweetened (0%)">Unsweetened (0%)</option>
                  <option value="Subtle (50%)">Subtle (50%)</option>
                  <option value="Regular (100%)">Regular (100%)</option>
                </select>
              </div>
            </div>

            {/* Customization 4: Extra Espresso Shot */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-espresso-950/60 border border-cream/10 text-xs">
              <div>
                <span className="font-semibold text-cream block">Add Extra Ristretto Shot</span>
                <span className="text-[10px] text-cream/50">+9.2 bar extraction pressure</span>
              </div>
              <button
                type="button"
                onClick={() => setExtraShot(!extraShot)}
                className={`px-3 py-1.5 rounded-xl border font-bold text-xs transition-all ${
                  extraShot
                    ? 'bg-caramel text-espresso-950 border-caramel'
                    : 'bg-cardbrown/60 text-cream/70 border-cream/20'
                }`}
              >
                {extraShot ? 'Added (+ $0.90)' : '+ $0.90'}
              </button>
            </div>

            {/* Quantity Stepper & Add to Order Bar */}
            <div className="pt-4 border-t border-cream/10 flex items-center justify-between gap-4">
              {/* Stepper */}
              <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-espresso-950/80 border border-cream/15">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1 text-cream/60 hover:text-cream"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-serif font-bold text-sm text-cream w-6 text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1 text-cream/60 hover:text-cream"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Order Button */}
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 py-3.5 gold-pill-btn text-xs font-bold shadow-gold-glow flex items-center justify-center gap-2"
              >
                <span>Add to Order</span>
                <span>•</span>
                <span>${totalPrice.toFixed(2)}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Related Drinks Recommendations */}
        {relatedDrinks.length > 0 && (
          <div className="mt-20 pt-12 border-t border-cream/10">
            <h3 className="font-serif text-2xl font-bold text-cream mb-6">
              You May Also Savor
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedDrinks.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/product/${rel.id}`}
                  className="glass-card glass-card-hover rounded-2xl p-4 flex items-center gap-4 group"
                >
                  <img
                    src={rel.image}
                    alt={rel.name}
                    className="w-16 h-16 rounded-xl object-cover border border-cream/10 flex-shrink-0"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-cream group-hover:text-caramel transition-colors truncate">
                      {rel.name}
                    </h4>
                    <p className="text-[11px] text-cream/60 mt-0.5 line-clamp-1">{rel.shortDesc}</p>
                    <span className="font-serif text-sm font-bold text-caramel mt-1 block">
                      ${rel.price.toFixed(2)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
