import React from 'react';
import { Camera, Sparkles } from 'lucide-react';

export const InstagramGallery: React.FC = () => {
  const photos = [
    {
      url: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=600&q=80',
      caption: '9.2 bar extraction geometry',
      tag: '@codewithgandhi',
    },
    {
      url: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=600&q=80',
      caption: 'Microfoam leaf pour',
      tag: '@codewithgandhi',
    },
    {
      url: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=600&q=80',
      caption: 'Direct-trade Ethiopian beans',
      tag: '@codewithgandhi',
    },
    {
      url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80',
      caption: 'Evening sanctuary light',
      tag: '@codewithgandhi',
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold text-caramel uppercase tracking-widest flex items-center gap-1.5">
              <Camera className="w-3.5 h-3.5" /> Curated Moments
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-cream mt-1">
              Follow Our <span className="gold-gradient-text italic font-normal">Visual Journal</span>
            </h2>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-full border border-cream/20 text-cream/80 hover:text-caramel hover:border-caramel/50 text-xs font-semibold flex items-center gap-2 transition-colors"
          >
            <span>@codewithgandhi</span>
            <Sparkles className="w-3 h-3 text-caramel" />
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {photos.map((photo, i) => (
            <div
              key={i}
              className="group relative aspect-square rounded-2xl overflow-hidden glass-card border border-cream/10"
            >
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-espresso-950/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end text-cream">
                <p className="text-xs font-bold font-serif">{photo.caption}</p>
                <p className="text-[10px] text-caramel mt-0.5">{photo.tag}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
