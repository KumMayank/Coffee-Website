import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Heart, Plus, Star, Filter, ArrowUpDown, Sparkles, X } from 'lucide-react';
import { DRINKS_DATA, DrinkItem } from '../data/drinks';
import { TiltCard } from '../components/common/TiltCard';
import { useCartStore } from '../store/useCartStore';
import { useFavoritesStore } from '../store/useFavoritesStore';
import { useToast } from '../components/common/ToastContainer';

type CategoryFilter = 'all' | 'espresso' | 'milk' | 'cold' | 'filter' | 'pastry';
type SortOption = 'featured' | 'rating' | 'price-asc' | 'price-desc';

export const MenuPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const filterParam = searchParams.get('filter');
  const initialCategory: CategoryFilter | 'favorites' = filterParam === 'favorites' ? 'favorites' : ((filterParam as CategoryFilter) || 'all');

  const [activeCategory, setActiveCategory] = useState<CategoryFilter | 'favorites'>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  const addItem = useCartStore((s) => s.addItem);
  const { toggleFavorite, isFavorite, favoriteIds } = useFavoritesStore();
  const { showToast } = useToast();

  const categories: { id: CategoryFilter | 'favorites'; label: string; icon: string }[] = [
    { id: 'all', label: 'All Drinks & Treats', icon: '☕' },
    { id: 'espresso', label: 'Espresso Bar', icon: '⚡' },
    { id: 'milk', label: 'Velvet & Latte', icon: '🥛' },
    { id: 'cold', label: 'Nitro & Cold Brew', icon: '🧊' },
    { id: 'filter', label: 'Single Origin Filter', icon: '🌿' },
    { id: 'pastry', label: 'Artisan Pastries', icon: '🥐' },
    { id: 'favorites', label: `Favorites (${favoriteIds.length})`, icon: '❤️' },
  ];

  const filteredDrinks = useMemo(() => {
    let list = [...DRINKS_DATA];

    // Filter by Category or Favorites
    if (activeCategory === 'favorites') {
      list = list.filter((d) => isFavorite(d.id));
    } else if (activeCategory !== 'all') {
      list = list.filter((d) => d.category === activeCategory);
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.description.toLowerCase().includes(q) ||
          d.origin.toLowerCase().includes(q) ||
          d.tags.some((t) => t.toLowerCase().includes(q)) ||
          d.tastingNotes.some((n) => n.toLowerCase().includes(q))
      );
    }

    // Sorting
    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [activeCategory, searchQuery, sortBy, isFavorite]);

  const handleQuickAdd = (drink: DrinkItem, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    addItem(drink, undefined, {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
    showToast('Added to Bag', `${drink.name} added to your order`, 'success');
  };

  const handleToggleHeart = (drink: DrinkItem, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(drink.id);
    const fav = !isFavorite(drink.id);
    showToast(fav ? 'Favorited' : 'Removed', `${drink.name} ${fav ? 'added to' : 'removed from'} favorites`, 'info');
  };

  return (
    <div className="pt-28 pb-24 min-h-screen relative overflow-hidden">
      {/* Background Parallax Word */}
      <div className="absolute top-28 left-1/2 -translate-x-1/2 parallax-bg-word text-[140px] sm:text-[220px] md:text-[320px] opacity-[0.025] pointer-events-none select-none">
        MENU
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Page Title */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <span className="text-xs font-bold text-caramel uppercase tracking-widest flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> 20+ Artisanal Creations
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-cream">
            The Craft <span className="gold-gradient-text italic font-normal">Repertoire</span>
          </h1>
          <p className="text-xs sm:text-sm text-cream/70 font-sans">
            Every drink is pulled to golden extraction ratios. Filter by roast profile, category, or your personal favorites.
          </p>
        </div>

        {/* Search & Sort Controls Toolbar */}
        <div className="glass-card rounded-3xl p-4 sm:p-5 mb-8 border border-caramel/20 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Live Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-caramel absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search drinks, tasting notes..."
              className="w-full pl-10 pr-9 py-2.5 rounded-2xl bg-espresso-950/70 border border-cream/15 text-cream text-xs placeholder:text-cream/40 focus:outline-none focus:border-caramel"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-cream/50 hover:text-cream"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 self-end md:self-auto w-full md:w-auto justify-end">
            <div className="flex items-center gap-1.5 text-xs text-cream/60">
              <ArrowUpDown className="w-3.5 h-3.5 text-caramel" />
              <span>Sort:</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-3 py-2 rounded-xl bg-espresso-950/80 border border-cream/15 text-cream text-xs focus:outline-none focus:border-caramel"
            >
              <option value="featured">Featured First</option>
              <option value="rating">Highest Rated ★</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Category Filter Chips Bar */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-caramel text-espresso-950 shadow-gold-glow scale-102 font-bold'
                    : 'bg-cardbrown/60 hover:bg-cardbrown text-cream/70 hover:text-cream border border-cream/10'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Drinks Grid */}
        {filteredDrinks.length === 0 ? (
          <div className="py-20 text-center glass-card rounded-3xl p-8 max-w-md mx-auto space-y-3">
            <span className="text-4xl">☕</span>
            <h3 className="font-serif text-xl font-bold text-cream">No coffees match your filter</h3>
            <p className="text-xs text-cream/60">
              Try adjusting your search terms or switch categories to explore other selections.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="px-5 py-2 gold-outline-btn text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredDrinks.map((drink) => {
              const favorite = isFavorite(drink.id);
              return (
                <TiltCard key={drink.id} maxTilt={6}>
                  <Link
                    to={`/product/${drink.id}`}
                    className="block group glass-card glass-card-hover rounded-3xl p-5 border border-cream/10 relative overflow-hidden h-full flex flex-col justify-between"
                  >
                    <div>
                      {/* Image Header with Interactive 3D tag & Favorite */}
                      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-espresso-950/80">
                        <img
                          src={drink.image}
                          alt={drink.name}
                          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/80 via-transparent to-black/20 pointer-events-none" />

                        {/* Top Badges */}
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                          <span className="px-2.5 py-1 rounded-full bg-espresso-950/85 backdrop-blur-md border border-caramel/30 text-[10px] font-bold text-caramel uppercase tracking-wider">
                            {drink.tags[0]}
                          </span>

                          <button
                            onClick={(e) => handleToggleHeart(drink, e)}
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

                        {/* 3D Indicator */}
                        <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-full bg-caramel/20 border border-caramel/40 text-[9px] font-bold text-caramel tracking-wider uppercase backdrop-blur-md">
                          3D Interactive
                        </div>
                      </div>

                      {/* Drink Info */}
                      <div className="space-y-2">
                        <h3 className="font-serif text-lg font-bold text-cream group-hover:text-caramel transition-colors truncate">
                          {drink.name}
                        </h3>
                        <p className="text-xs text-cream/65 line-clamp-2 leading-relaxed">
                          {drink.shortDesc}
                        </p>

                        {/* Tasting Notes */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {drink.tastingNotes.slice(0, 3).map((note) => (
                            <span
                              key={note}
                              className="px-2 py-0.5 rounded-md bg-espresso-950/60 border border-cream/10 text-[10px] text-cream/75"
                            >
                              {note}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Price & Quick Add */}
                    <div className="pt-4 mt-4 border-t border-cream/10 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-cream/50 uppercase block">Starting</span>
                        <span className="font-serif text-xl font-bold text-caramel">
                          ${drink.price.toFixed(2)}
                        </span>
                      </div>

                      <button
                        onClick={(e) => handleQuickAdd(drink, e)}
                        className="px-4 py-2 gold-pill-btn text-xs font-bold flex items-center gap-1.5 shadow-sm hover:scale-105 active:scale-95 transition-transform"
                        title="Add to order"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    </div>
                  </Link>
                </TiltCard>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
