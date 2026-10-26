import React, { useState } from 'react';
import { Award, Sparkles, Check, Gift, QrCode, ShieldCheck, ArrowRight, UserCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useUserStore } from '../store/useUserStore';
import { useToast } from '../components/common/ToastContainer';

export const ClubPage: React.FC = () => {
  const { user, updateProfile, redeemPoints } = useUserStore();
  const { showToast } = useToast();

  const [editOpen, setEditOpen] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
  });

  const perks = [
    {
      id: 'perk-1',
      cost: 150,
      title: 'Artisan Espresso Shot',
      desc: 'Double shot of Gandhi Reserve on us.',
      icon: '☕',
    },
    {
      id: 'perk-2',
      cost: 300,
      title: 'French Butter Croissant',
      desc: '72-layer Valrhona chocolate or plain butter pastry.',
      icon: '🥐',
    },
    {
      id: 'perk-3',
      cost: 500,
      title: '250g Whole Bean Bag',
      desc: 'Any single-origin lot in UV nitrogen-flushed pouch.',
      icon: '🌿',
    },
    {
      id: 'perk-4',
      cost: 800,
      title: 'Masterclass & Cupping Flight',
      desc: 'Private 1-on-1 sensory session with our head roaster.',
      icon: '✨',
    },
  ];

  const handleRedeem = (cost: number, title: string) => {
    const success = redeemPoints(cost);
    if (success) {
      confetti({
        particleCount: 50,
        spread: 60,
        colors: ['#C08A55', '#E9C46A', '#F3E7D8'],
      });
      showToast('Perk Claimed!', `${title} reward voucher added to your account`, 'deal');
    } else {
      showToast('Insufficient Points', `You need ${cost - user.points} more points to redeem`, 'warning');
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(profileForm);
    setEditOpen(false);
    showToast('Profile Updated', 'Your connoisseur details have been updated', 'success');
  };

  return (
    <div className="pt-28 pb-24 min-h-screen relative overflow-hidden">
      {/* Background Parallax Word */}
      <div className="absolute top-28 left-1/2 -translate-x-1/2 parallax-bg-word text-[140px] sm:text-[220px] md:text-[320px] opacity-[0.025] pointer-events-none select-none">
        SANCTUARY
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-caramel/20 border border-caramel/40 text-xs font-bold text-caramel tracking-wider uppercase">
            <Award className="w-3.5 h-3.5" />
            <span>The Inner Circle</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-cream">
            [CODE WITH GANDHI] <span className="gold-gradient-text italic font-normal">Club</span>
          </h1>
          <p className="text-xs sm:text-sm text-cream/70 font-sans">
            Every pour earns loyalty rewards. Enjoy private reserve allocations, priority table bookings, and complimentary rare tastings.
          </p>
        </div>

        {/* Digital Membership Pass Card (3D Luxury Aesthetic) */}
        <div className="max-w-xl mx-auto mb-16">
          <div className="relative rounded-3xl p-7 sm:p-9 bg-gradient-to-br from-cardbrown via-mocha-900 to-espresso-950 border-2 border-caramel/50 shadow-luxury overflow-hidden group">
            {/* Holographic Sheen */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-caramel/10 to-transparent pointer-events-none" />

            {/* Top Bar */}
            <div className="flex items-center justify-between mb-8 relative z-10">
              <div className="flex items-center gap-2">
                <span className="text-2xl">☕</span>
                <span className="font-serif text-sm font-bold tracking-widest text-cream uppercase">
                  [CODE WITH GANDHI]
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-caramel text-espresso-950 text-xs font-black uppercase tracking-wider shadow-gold-glow">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{user.tier} Member</span>
              </div>
            </div>

            {/* Middle: Member ID & QR Code Visual */}
            <div className="flex items-center justify-between my-6 relative z-10">
              <div className="space-y-1">
                <span className="text-[10px] text-cream/50 uppercase tracking-widest block">
                  Connoisseur Pass ID
                </span>
                <p className="font-mono text-lg sm:text-xl font-bold tracking-widest text-gold-300">
                  {user.memberId}
                </p>
                <p className="text-xs text-cream/70 font-serif italic mt-0.5">
                  Member since {user.joinedDate}
                </p>
              </div>

              {/* Digital Pass QR Representation */}
              <div className="p-2.5 rounded-2xl bg-cream/90 text-espresso-950 shadow-inner flex flex-col items-center">
                <QrCode className="w-12 h-12" />
                <span className="text-[8px] font-bold tracking-tighter uppercase mt-0.5">SCAN IN CAFE</span>
              </div>
            </div>

            {/* Bottom Member Name & Points Bar */}
            <div className="pt-4 border-t border-cream/15 flex items-center justify-between relative z-10">
              <div>
                <span className="text-[10px] text-cream/50 uppercase block">Cardholder</span>
                <p className="font-serif text-base font-bold text-cream">{user.name}</p>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-cream/50 uppercase block">Available Balance</span>
                <p className="font-serif text-xl font-bold text-caramel">{user.points} PTS</p>
              </div>
            </div>

            {/* Quick Edit Profile Trigger */}
            <button
              onClick={() => setEditOpen(!editOpen)}
              className="absolute top-4 right-4 text-[11px] text-cream/40 hover:text-caramel underline transition-colors"
            >
              Edit Details
            </button>
          </div>

          {/* Edit Profile Dropdown */}
          {editOpen && (
            <form
              onSubmit={handleSaveProfile}
              className="mt-4 p-5 rounded-2xl glass-card border border-caramel/30 space-y-3 animate-in fade-in"
            >
              <h4 className="font-serif text-sm font-bold text-cream">Update Member Profile</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  type="text"
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  placeholder="Full name"
                  className="px-3 py-2 rounded-xl bg-espresso-950 border border-cream/15 text-xs text-cream focus:border-caramel"
                />
                <input
                  type="email"
                  value={profileForm.email}
                  onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                  placeholder="Email"
                  className="px-3 py-2 rounded-xl bg-espresso-950 border border-cream/15 text-xs text-cream focus:border-caramel"
                />
                <input
                  type="tel"
                  value={profileForm.phone}
                  onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                  placeholder="Phone"
                  className="px-3 py-2 rounded-xl bg-espresso-950 border border-cream/15 text-xs text-cream focus:border-caramel"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditOpen(false)}
                  className="px-3 py-1.5 rounded-xl border border-cream/20 text-xs text-cream"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-1.5 gold-pill-btn text-xs font-bold">
                  Save Changes
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Redeemable Perks Grid */}
        <div className="mb-20">
          <div className="text-center max-w-md mx-auto mb-8 space-y-1">
            <h3 className="font-serif text-2xl font-bold text-cream">Redeem Loyalty Perks</h3>
            <p className="text-xs text-cream/70">
              Apply your earned points towards complimentary beverages, single origin bags, and experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {perks.map((perk) => {
              const canAfford = user.points >= perk.cost;
              return (
                <div
                  key={perk.id}
                  className="glass-card rounded-3xl p-6 border border-cream/10 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl">{perk.icon}</span>
                      <span className="px-2.5 py-1 rounded-full bg-caramel/15 border border-caramel/30 text-xs font-bold text-caramel">
                        {perk.cost} PTS
                      </span>
                    </div>
                    <div>
                      <h4 className="font-serif text-base font-bold text-cream">{perk.title}</h4>
                      <p className="text-xs text-cream/70 mt-1 leading-relaxed">{perk.desc}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRedeem(perk.cost, perk.title)}
                    disabled={!canAfford}
                    className={`w-full py-2.5 rounded-full text-xs font-bold transition-all ${
                      canAfford
                        ? 'gold-pill-btn shadow-gold-glow'
                        : 'bg-cardbrown/60 text-cream/40 border border-cream/10 cursor-not-allowed'
                    }`}
                  >
                    {canAfford ? 'Redeem Voucher' : `Need ${perk.cost - user.points} more`}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Membership Tiers Comparison Table */}
        <div className="glass-card rounded-3xl p-6 sm:p-10 border border-caramel/25">
          <div className="text-center max-w-md mx-auto mb-8 space-y-1">
            <h3 className="font-serif text-2xl font-bold text-cream">Tier Privileges</h3>
            <p className="text-xs text-cream/70">
              Your tier upgrades automatically with every order placed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bronze Tier */}
            <div className="p-6 rounded-2xl bg-espresso-950/60 border border-cream/10 space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-bold text-cream/60 uppercase">Entry Tier</span>
                <h4 className="font-serif text-xl font-bold text-cream">Bronze Explorer</h4>
                <p className="text-[11px] text-cream/50">0 – 199 Points</p>
              </div>
              <ul className="space-y-2 text-xs text-cream/75">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-caramel" />
                  <span>10 Points earned per $1 spent</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-caramel" />
                  <span>Free Birthday Reserve Brew</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-caramel" />
                  <span>Digital Pass for Apple Wallet</span>
                </li>
              </ul>
            </div>

            {/* Silver Tier */}
            <div className="p-6 rounded-2xl bg-espresso-950/60 border border-cream/20 space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-bold text-caramel uppercase">Connoisseur</span>
                <h4 className="font-serif text-xl font-bold text-cream">Silver Artisan</h4>
                <p className="text-[11px] text-cream/50">200 – 499 Points</p>
              </div>
              <ul className="space-y-2 text-xs text-cream/75">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-caramel" />
                  <span>All Bronze Privileges</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-caramel" />
                  <span>12 Points per $1 spent</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-caramel" />
                  <span>Free Plant Milk Upgrades (Oat / Almond)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-caramel" />
                  <span>Priority Table Reservations</span>
                </li>
              </ul>
            </div>

            {/* Gold Tier */}
            <div className="p-6 rounded-2xl bg-cardbrown border-2 border-caramel shadow-gold-glow space-y-4 relative">
              <div className="absolute -top-3 right-4 px-3 py-0.5 rounded-full bg-caramel text-espresso-950 text-[10px] font-bold uppercase tracking-wider">
                Current Tier
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold text-gold-300 uppercase">Master Circle</span>
                <h4 className="font-serif text-xl font-bold text-cream">Gold Patron</h4>
                <p className="text-[11px] text-cream/70">500+ Points</p>
              </div>
              <ul className="space-y-2 text-xs text-cream/90">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-caramel" />
                  <span>15 Points per $1 spent</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-caramel" />
                  <span>25% Off with code GOLDVIP</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-caramel" />
                  <span>Invitations to Private Roaster Cuppings</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-caramel" />
                  <span>Complimentary Shipping on Whole Bean Bags</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
