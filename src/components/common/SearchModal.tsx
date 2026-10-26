import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { DRINKS_DATA, DrinkItem } from '../../data/drinks';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<DrinkItem[]>(DRINKS_DATA.slice(0, 6));
  const navigate = useNavigate();

  useEffect(() => {
    if (!query.trim()) {
      setResults(DRINKS_DATA.slice(0, 6));
    } else {
      const q = query.toLowerCase();
      const filtered = DRINKS_DATA.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.tags.some((t) => t.toLowerCase().includes(q)) ||
          d.origin.toLowerCase().includes(q) ||
          d.tastingNotes.some((n) => n.toLowerCase().includes(q))
      );
      setResults(filtered);
    }
  }, [query]);

  // Keyboard shortcut Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // Toggle search
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-espresso-950/80 backdrop-blur-md transition-opacity"
      />

      <div className="relative w-full max-w-2xl bg-mocha-900 border border-caramel/30 rounded-3xl shadow-2xl p-6 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Search Bar Input */}
        <div className="relative flex items-center border-b border-cream/15 pb-4">
          <Search className="w-5 h-5 text-caramel absolute left-1" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search drinks, origins, tasting notes (e.g. Geisha, Jasmine, Nitro)..."
            className="w-full pl-9 pr-8 bg-transparent text-cream placeholder:text-cream/40 text-sm sm:text-base focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-cream/50 hover:text-cream">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="py-3 flex items-center gap-2 overflow-x-auto text-[11px] text-cream/70">
          <span className="text-caramel font-semibold flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Trending:
          </span>
          {['Espresso', 'Flat White', 'Nitro', 'Geisha', 'Oat', 'Cardamom'].map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-2.5 py-1 rounded-full bg-cardbrown/60 hover:bg-caramel hover:text-espresso-950 transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto space-y-2 mt-2 pr-1">
          {results.length === 0 ? (
            <div className="py-8 text-center text-xs text-cream/60">
              No artisanal drinks found for "{query}". Try "Ethiopia" or "Latte".
            </div>
          ) : (
            results.map((drink) => (
              <div
                key={drink.id}
                onClick={() => {
                  onClose();
                  navigate(`/product/${drink.id}`);
                }}
                className="flex items-center justify-between p-3 rounded-2xl glass-card hover:border-caramel/40 cursor-pointer group transition-all"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={drink.image}
                    alt={drink.name}
                    className="w-12 h-12 rounded-xl object-cover border border-cream/10"
                  />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-cream group-hover:text-caramel transition-colors">
                      {drink.name}
                    </h4>
                    <p className="text-[11px] text-cream/60 mt-0.5">
                      {drink.origin} • <span className="text-caramel font-medium">${drink.price.toFixed(2)}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-cream/50 group-hover:text-caramel">
                  <span className="hidden sm:inline text-[11px]">Inspect 3D</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
