import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { REVIEWS_DATA } from '../../data/reviews';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((c) => (c === 0 ? REVIEWS_DATA.length - 1 : c - 1));
  };

  const next = () => {
    setCurrentIndex((c) => (c === REVIEWS_DATA.length - 1 ? 0 : c + 1));
  };

  const current = REVIEWS_DATA[currentIndex];

  return (
    <section className="py-20 relative overflow-hidden bg-espresso-950/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-xl mx-auto space-y-2 mb-12">
          <span className="text-xs font-bold text-caramel uppercase tracking-widest">
            Connoisseur Acclaim
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-cream">
            Whispers from the <span className="gold-gradient-text italic font-normal">Sanctuary</span>
          </h2>
        </div>

        {/* Testimonial Feature Card */}
        <div className="max-w-3xl mx-auto glass-card rounded-3xl p-8 sm:p-12 border border-caramel/25 shadow-2xl relative">
          <Quote className="w-12 h-12 text-caramel/20 absolute top-6 right-8 pointer-events-none" />

          <div className="space-y-6">
            {/* Stars */}
            <div className="flex items-center gap-1">
              {[...Array(current.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-gold-400 fill-current" />
              ))}
            </div>

            {/* Comment */}
            <p className="font-serif text-lg sm:text-2xl text-cream/90 italic leading-relaxed">
              "{current.comment}"
            </p>

            {/* Author details */}
            <div className="flex items-center justify-between pt-4 border-t border-cream/10">
              <div className="flex items-center gap-3.5">
                <img
                  src={current.avatar}
                  alt={current.author}
                  className="w-12 h-12 rounded-full object-cover border border-caramel/40"
                />
                <div>
                  <h4 className="font-serif text-base font-bold text-cream">{current.author}</h4>
                  <p className="text-xs text-caramel">{current.role}</p>
                  <p className="text-[10px] text-cream/50 mt-0.5">Favorited: {current.drink}</p>
                </div>
              </div>

              {/* Slider Arrows */}
              <div className="flex items-center gap-2">
                <button
                  onClick={prev}
                  className="p-2.5 rounded-full bg-espresso-950/80 border border-cream/15 text-cream/70 hover:text-caramel hover:border-caramel/50 transition-colors"
                  title="Previous testimonial"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={next}
                  className="p-2.5 rounded-full bg-espresso-950/80 border border-cream/15 text-cream/70 hover:text-caramel hover:border-caramel/50 transition-colors"
                  title="Next testimonial"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
