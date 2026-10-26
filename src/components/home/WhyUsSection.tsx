import React from 'react';
import { Mountain, Flame, ShieldCheck, Sparkles } from 'lucide-react';
import { TiltCard } from '../common/TiltCard';

export const WhyUsSection: React.FC = () => {
  const pillars = [
    {
      icon: <Mountain className="w-6 h-6 text-caramel" />,
      title: 'Volcanic Cloud Terroir',
      subtitle: '2,200m Elevation',
      description: 'Slow-ripened under mist and indigenous forest canopies, maximizing bean sugar density and crystalline citric acidity.',
    },
    {
      icon: <Flame className="w-6 h-6 text-caramel" />,
      title: 'Kinetic Nano-Roasting',
      subtitle: 'Sub-Degree Precision',
      description: 'Roasted in 5kg micro-batches using infrared fluidized air drums, revealing terroir nuances without smokiness.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-caramel" />,
      title: 'Direct Trade Stewardship',
      subtitle: '250% Fair Trade Baseline',
      description: 'We invest directly into farmer washing stations, clean water access, and regenerative soil biodiversity.',
    },
    {
      icon: <Sparkles className="w-6 h-6 text-caramel" />,
      title: 'Sensory Sanctuary',
      subtitle: 'Lever Machine Mastery',
      description: 'Pulled on custom spring-lever machines calibrated hourly for barometric pressure and water mineral hardness.',
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <span className="text-xs font-bold text-caramel uppercase tracking-widest">
            The Philosophy
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-cream">
            Why We Refuse <span className="gold-gradient-text italic font-normal">Compromise</span>
          </h2>
          <p className="text-xs sm:text-sm text-cream/70">
            Every step from cherry picking on steep volcanic slopes to the golden crema in your cup is executed with reverent precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => (
            <TiltCard key={pillar.title} maxTilt={8}>
              <div className="h-full glass-card glass-card-hover rounded-3xl p-6 border border-cream/10 space-y-4 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-cardbrown/80 border border-caramel/30 flex items-center justify-center shadow-gold-glow">
                    {pillar.icon}
                  </div>
                  <div>
                    <span className="text-[10px] text-caramel font-bold tracking-wider uppercase block">
                      0{idx + 1} • {pillar.subtitle}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-cream mt-1">
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="text-xs text-cream/70 leading-relaxed font-sans">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-cream/10 flex items-center gap-1.5 text-[11px] font-semibold text-caramel">
                  <span>Learn Protocol</span>
                  <span>→</span>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};
