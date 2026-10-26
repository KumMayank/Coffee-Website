import React, { useState, useEffect } from 'react';
import { Sparkles, Copy, Check, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '../common/ToastContainer';

export const SpecialOfferBanner: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 42,
    seconds: 18,
  });
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard.writeText('GANDHI20');
    setCopied(true);
    showToast('Code Copied!', 'Use GANDHI20 at checkout for 20% off', 'deal');
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section className="py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-8 sm:p-12 overflow-hidden border border-caramel/40 bg-gradient-to-r from-mocha-900 via-cardbrown to-espresso-950 shadow-luxury">
          {/* Subtle Decorative Background Beans */}
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-cover bg-center opacity-10 pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Offer Text */}
            <div className="lg:col-span-7 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-caramel/20 border border-caramel/40 text-[11px] font-bold text-caramel tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
                <span>Limited Roaster Allocation</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-cream">
                20% Off Your First Roastery Order
              </h3>
              <p className="text-xs sm:text-sm text-cream/75 max-w-xl font-sans leading-relaxed">
                Unlock 20% off all single-origin whole bean bags, reserve flights, and craft cafe orders. Hand-packed in nitrogen-sealed UV proof pouches.
              </p>

              {/* Code Pill & Copy Button */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-espresso-950/80 border border-caramel/40 text-xs font-mono font-bold text-caramel">
                  <span>CODE:</span>
                  <span className="text-cream tracking-widest">GANDHI20</span>
                  <button
                    onClick={handleCopyCode}
                    className="p-1 text-cream/60 hover:text-caramel transition-colors"
                    title="Copy promo code"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <Link
                  to="/menu"
                  className="px-6 py-2.5 gold-pill-btn text-xs font-bold flex items-center gap-1.5 shadow-gold-glow"
                >
                  <span>Claim Allocation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Live Countdown Timer */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-end space-y-2">
              <div className="flex items-center gap-1.5 text-xs text-cream/60">
                <Clock className="w-3.5 h-3.5 text-caramel" />
                <span>Allocation window closes in:</span>
              </div>

              <div className="flex items-center gap-3">
                {/* Hours */}
                <div className="flex flex-col items-center p-3 rounded-2xl bg-espresso-950/90 border border-cream/15 min-w-[70px] shadow-glass">
                  <span className="font-serif text-2xl sm:text-3xl font-extrabold text-cream">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] uppercase tracking-wider text-cream/50 mt-0.5">Hours</span>
                </div>

                <span className="font-serif text-2xl font-bold text-caramel">:</span>

                {/* Minutes */}
                <div className="flex flex-col items-center p-3 rounded-2xl bg-espresso-950/90 border border-cream/15 min-w-[70px] shadow-glass">
                  <span className="font-serif text-2xl sm:text-3xl font-extrabold text-cream">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] uppercase tracking-wider text-cream/50 mt-0.5">Mins</span>
                </div>

                <span className="font-serif text-2xl font-bold text-caramel">:</span>

                {/* Seconds */}
                <div className="flex flex-col items-center p-3 rounded-2xl bg-espresso-950/90 border border-cream/15 min-w-[70px] shadow-glass">
                  <span className="font-serif text-2xl sm:text-3xl font-extrabold text-caramel">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] uppercase tracking-wider text-cream/50 mt-0.5">Secs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
