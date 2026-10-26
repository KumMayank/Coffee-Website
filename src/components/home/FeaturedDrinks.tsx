import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, Plus, ArrowRight, Sparkles } from 'lucide-react';
import { DRINKS_DATA, DrinkItem } from '../../data/drinks';
import { TiltCard } from '../common/TiltCard';
import { useCartStore } from '../../store/useCartStore';
import { useFavoritesStore } from '../../store/useFavoritesStore';
import { useToast } from '../common/ToastContainer';

export const FeaturedDrinks: React.FC = () => {
  const featured = DRINKS_DATA.filter((d) => d.featured).slice(0, 6);
  const addItem = useCartStore((s) => s.addItem);
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const { showToast } = useToast();

  const handleQuickAdd = (drink: DrinkItem, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    addItem(drink, undefined, {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
    showToast('Added to Order', `${drink.name} added to your bag`, 'success');
  };

  const handleToggleHeart = (drinkId: string, drinkName: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(drinkId);
    const fav = !isFavorite(drinkId);
    showToast(fav ? 'Favorited' : 'Removed', `${drinkName} ${fav ? 'added to' : 'removed from'} favorites`, 'info');
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-bold text-caramel uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Handcrafted Masterpieces
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-cream">
              The Roaster’s <span className="gold-gradient-text italic font-normal">Selection</span>
            </h2>
            <p className="text-xs sm:text-sm text-cream/70">
              Each recipe is tuned daily to atmospheric pressure, bean roast date, and water mineral equilibrium.
            </p>
          </div>

          <Link
            to="/menu"
            className="self-start md:self-auto px-5 py-2.5 gold-outline-btn text-xs font-bold flex items-center gap-2 group"
          >
            <span>View Full 20+ Menu</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3D Tilt Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featured.map((drink) => {
            const favorite = isFavorite(drink.id);
            return (
              <TiltCard key={drink.id} maxTilt={6}>
                <Link
                  to={`/product/${drink.id}`}
                  className="block group glass-card glass-card-hover rounded-3xl p-5 border border-cream/10 relative overflow-hidden"
                >
                  {/* Image Container with Badges */}
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-espresso-950/80">
                    <img
                      src={drink.image}
                      alt={drink.name}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/80 via-transparent to-black/20 pointer-events-none" />

                    {/* Top Tag & Favorite Button */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-full bg-espresso-950/80 backdrop-blur-md border border-caramel/30 text-[10px] font-bold text-caramel uppercase tracking-wider">
                        {drink.tags[0]}
                      </span>

                      <button
                        onClick={(e) => handleToggleHeart(drink.id, drink.name, e)}
                        className={`p-2 rounded-full backdrop-blur-md transition-all ${
                          favorite
                            ? 'bg-red-500/20 text-red-400 border border-red-500/40 shadow-sm'
                            : 'bg-espresso-950/70 text-cream/70 border border-cream/15 hover:text-caramel'
                        }`}
                        title="Add to favorites"
                      >
                        <Heart className={`w-3.5 h-3.5 ${favorite ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    {/* Rating Pill */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-espresso-950/85 backdrop-blur-md border border-cream/15 text-[11px] font-semibold text-cream">
                      <Star className="w-3 h-3 text-gold-400 fill-current" />
                      <span>{drink.rating}</span>
                      <span className="text-cream/40">({drink.reviewCount})</span>
                    </div>

                    {/* 3D Model Badge */}
                    <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-full bg-caramel/20 border border-caramel/40 text-[9px] font-bold text-caramel tracking-wider uppercase backdrop-blur-md">
                      3D Interactive
                    </div>
                  </div>

                  {/* Drink Info */}
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-serif text-lg font-bold text-cream group-hover:text-caramel transition-colors truncate">
                        {drink.name}
                      </h3>
                      <p className="text-xs text-cream/65 line-clamp-2 mt-1 leading-relaxed">
                        {drink.shortDesc}
                      </p>
                    </div>

                    {/* Tasting notes pills */}
                    <div className="flex items-center gap-1.5 overflow-hidden text-[10px] text-cream/75">
                      {drink.tastingNotes.slice(0, 2).map((note) => (
                        <span key={note} className="px-2 py-0.5 rounded-md bg-cardbrown/80 border border-cream/10">
                          {note}
                        </span>
                      ))}
                      <span className="text-cream/40">• {drink.roastLevel}</span>
                    </div>

                    {/* Price & Quick Add Button */}
                    <div className="pt-2 border-t border-cream/10 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-cream/50 uppercase block">Price</span>
                        <span className="font-serif text-xl font-bold text-caramel">
                          ${drink.price.toFixed(2)}
                        </span>
                      </div>

                      <button
                        onClick={(e) => handleQuickAdd(drink, e)}
                        className="px-3.5 py-2 gold-pill-btn text-xs font-bold flex items-center gap-1.5 shadow-sm hover:scale-105 active:scale-95 transition-transform"
                        title="Quick add to order"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </Link>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};
