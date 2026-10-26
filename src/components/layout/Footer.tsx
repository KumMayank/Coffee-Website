import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Clock, Mail, ShieldCheck, Heart } from 'lucide-react';
import { useToast } from '../common/ToastContainer';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { showToast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Invalid Email', 'Please enter a valid email address', 'warning');
      return;
    }
    setIsSubscribed(true);
    showToast('Welcome to the Circle', 'Check your inbox for 15% off code', 'deal');
    setEmail('');
  };

  return (
    <footer className="relative bg-espresso-950 border-t border-caramel/15 pt-16 pb-28 lg:pb-16 text-cream/80 overflow-hidden">
      {/* Giant Parallax Background Word */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 parallax-bg-word text-[120px] md:text-[200px] opacity-[0.02] pointer-events-none whitespace-nowrap">
        ROASTERY
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-cream/10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="text-2xl">☕</span>
              <span className="font-serif text-2xl font-bold tracking-wider gold-gradient-text">
                [CODE WITH GANDHI]
              </span>
            </Link>
            <p className="text-xs text-cream/70 leading-relaxed max-w-sm">
              We roast rare micro-lots from volcanic cloud forests and pull shots on bespoke lever machines. Coffee as an architectural art form.
            </p>

            {/* Newsletter */}
            <div className="pt-2 max-w-sm">
              <span className="text-[11px] font-bold text-cream uppercase tracking-wider block mb-2">
                Join The Private Tasting Dispatch
              </span>
              {isSubscribed ? (
                <div className="p-3 rounded-xl bg-caramel/15 border border-caramel/30 text-xs text-caramel font-medium flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>You're on the allocation list. Code: DISPATCH15</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <div className="relative flex-1">
                    <Mail className="w-3.5 h-3.5 text-cream/40 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-cardbrown/60 border border-cream/15 text-cream text-xs focus:outline-none focus:border-caramel"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 gold-pill-btn text-xs font-bold flex items-center gap-1 shadow-sm"
                  >
                    <span>Join</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Nav Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-cream tracking-wider uppercase">
              The Experience
            </h4>
            <ul className="space-y-2 text-xs text-cream/70">
              <li>
                <Link to="/menu" className="hover:text-caramel transition-colors">
                  Artisan Menu
                </Link>
              </li>
              <li>
                <Link to="/origins" className="hover:text-caramel transition-colors">
                  Single Origin Lots
                </Link>
              </li>
              <li>
                <Link to="/reserve" className="hover:text-caramel transition-colors">
                  Table Reservations
                </Link>
              </li>
              <li>
                <Link to="/club" className="hover:text-caramel transition-colors">
                  Club Membership
                </Link>
              </li>
              <li>
                <Link to="/story" className="hover:text-caramel transition-colors">
                  Heritage & Roast Lab
                </Link>
              </li>
            </ul>
          </div>

          {/* Locations */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-cream tracking-wider uppercase">
              Sanctuaries
            </h4>
            <ul className="space-y-2.5 text-xs text-cream/70">
              <li className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-caramel flex-shrink-0 mt-0.5" />
                <span>SoHo Flagship — 450 W Broadway, NYC</span>
              </li>
              <li className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-caramel flex-shrink-0 mt-0.5" />
                <span>Mayfair Atelier — 18 Mount St, London</span>
              </li>
              <li className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-caramel flex-shrink-0 mt-0.5" />
                <span>Ginza Roastery — 6-Chome, Tokyo</span>
              </li>
            </ul>
          </div>

          {/* Hours & Ethical Commitment */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-cream tracking-wider uppercase">
              Roastery Hours
            </h4>
            <div className="flex items-start gap-2 text-xs text-cream/70">
              <Clock className="w-4 h-4 text-caramel flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-medium text-cream">Monday – Sunday</p>
                <p>6:30 AM – 10:00 PM EST</p>
                <p className="text-[10px] text-caramel mt-1">Live 3D Barista Bar Always Open</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-cream/50 gap-4">
          <p>© {new Date().getFullYear()} [CODE WITH GANDHI] Specialty Roasters. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Direct-Trade Certified <ShieldCheck className="w-3 h-3 text-caramel" />
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              Crafted with <Heart className="w-3 h-3 text-red-400 fill-current" /> for coffee connoisseurs
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
