import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Package, Calendar, Heart, MapPin, Sparkles, RefreshCw, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useUserStore } from '../store/useUserStore';
import { useFavoritesStore } from '../store/useFavoritesStore';
import { useCartStore } from '../store/useCartStore';
import { DRINKS_DATA } from '../data/drinks';
import { useToast } from '../components/common/ToastContainer';

export const ProfilePage: React.FC = () => {
  const { user, orders, reservations } = useUserStore();
  const { favoriteIds, toggleFavorite } = useFavoritesStore();
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'orders' | 'reservations' | 'favorites' | 'addresses'>('orders');

  const favoriteDrinks = DRINKS_DATA.filter((d) => favoriteIds.includes(d.id));

  const handleReorder = (order: any) => {
    order.items.forEach((item: any) => {
      addItem(item.drink, item.customization);
    });
    showToast('Items Added to Bag', `${order.items.length} drinks added from Order #${order.id}`, 'success');
    openCart();
  };

  return (
    <div className="pt-28 pb-24 min-h-screen relative overflow-hidden">
      {/* Background Parallax Word */}
      <div className="absolute top-28 left-1/2 -translate-x-1/2 parallax-bg-word text-[140px] sm:text-[220px] md:text-[320px] opacity-[0.025] pointer-events-none select-none">
        PATRON
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Profile Card Header */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-caramel/30 mb-8 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 shadow-luxury">
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <div className="relative">
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-20 h-20 rounded-full object-cover border-2 border-caramel shadow-gold-glow"
              />
              <span className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-caramel text-espresso-950 font-bold text-[10px] flex items-center justify-center ring-2 ring-espresso-900">
                ★
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h1 className="font-serif text-2xl font-bold text-cream">{user.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-caramel/20 border border-caramel/40 text-[10px] font-bold text-caramel uppercase tracking-wider">
                  {user.tier} Patron
                </span>
              </div>
              <p className="text-xs text-cream/60">{user.email} • {user.phone}</p>
              <p className="text-[11px] font-mono text-gold-300 mt-1">ID: {user.memberId}</p>
            </div>
          </div>

          {/* Points Counter */}
          <div className="p-4 rounded-2xl bg-espresso-950/80 border border-cream/15 text-center min-w-[160px]">
            <span className="text-[10px] text-cream/50 uppercase tracking-widest block">Loyalty Points</span>
            <span className="font-serif text-3xl font-extrabold text-caramel block mt-0.5">
              {user.points} <span className="text-xs font-sans font-bold text-cream/60">PTS</span>
            </span>
            <Link
              to="/club"
              className="text-[11px] text-caramel hover:underline font-semibold block mt-1"
            >
              Redeem Rewards →
            </Link>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {[
            { id: 'orders', label: `Order History (${orders.length})`, icon: <Package className="w-4 h-4" /> },
            { id: 'reservations', label: `Table Bookings (${reservations.length})`, icon: <Calendar className="w-4 h-4" /> },
            { id: 'favorites', label: `Wishlist (${favoriteDrinks.length})`, icon: <Heart className="w-4 h-4" /> },
            { id: 'addresses', label: 'Saved Addresses', icon: <MapPin className="w-4 h-4" /> },
          ].map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-caramel text-espresso-950 shadow-gold-glow font-bold'
                    : 'glass-card text-cream/70 hover:text-cream border border-cream/10'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content: Orders */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="py-16 text-center glass-card rounded-3xl p-8 space-y-3">
                <span className="text-4xl">📦</span>
                <h3 className="font-serif text-xl font-bold text-cream">No Past Orders Yet</h3>
                <p className="text-xs text-cream/60 max-w-xs mx-auto">
                  Explore our single-origin menu and place your first roast order.
                </p>
                <Link to="/menu" className="inline-block px-5 py-2.5 gold-pill-btn text-xs font-bold">
                  Browse Menu
                </Link>
              </div>
            ) : (
              orders.map((ord) => (
                <div
                  key={ord.id}
                  className="glass-card rounded-3xl p-6 border border-cream/10 space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-cream/10 gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-serif text-base font-bold text-cream">
                          Order #{ord.id}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-caramel/20 text-caramel text-[10px] font-bold uppercase tracking-wider">
                          {ord.status}
                        </span>
                      </div>
                      <span className="text-[11px] text-cream/50">Placed on {ord.date} • {ord.type === 'pickup' ? 'Cafe Pickup' : 'Delivery'}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-serif text-xl font-bold text-caramel">
                        ${ord.total.toFixed(2)}
                      </span>
                      <button
                        onClick={() => handleReorder(ord)}
                        className="px-3.5 py-1.5 rounded-full bg-cardbrown hover:bg-cardbrown-light border border-caramel/40 text-caramel text-xs font-semibold flex items-center gap-1.5 transition-colors"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Reorder</span>
                      </button>
                    </div>
                  </div>

                  {/* Items list */}
                  <div className="space-y-2">
                    {ord.items.map((item: any, i: number) => (
                      <div key={i} className="flex items-center justify-between text-xs text-cream/80">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-caramel">{item.quantity}x</span>
                          <span className="font-medium text-cream">{item.drink.name}</span>
                          <span className="text-cream/50 text-[11px]">
                            ({item.customization.size}, {item.customization.milk.split(' ')[0]})
                          </span>
                        </div>
                        <span className="font-medium text-cream">
                          ${(item.unitPrice * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab Content: Reservations */}
        {activeTab === 'reservations' && (
          <div className="space-y-4">
            {reservations.length === 0 ? (
              <div className="py-16 text-center glass-card rounded-3xl p-8 space-y-3">
                <span className="text-4xl">🛋️</span>
                <h3 className="font-serif text-xl font-bold text-cream">No Bookings Found</h3>
                <p className="text-xs text-cream/60">Reserve a table at our SoHo flagship sanctuary.</p>
                <Link to="/reserve" className="inline-block px-5 py-2.5 gold-pill-btn text-xs font-bold">
                  Book Table
                </Link>
              </div>
            ) : (
              reservations.map((res) => (
                <div
                  key={res.id}
                  className="glass-card rounded-3xl p-6 border border-caramel/25 space-y-3 flex flex-col sm:flex-row sm:items-center justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-serif text-base font-bold text-cream">
                        Booking {res.id}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 border border-green-500/30 text-[10px] font-bold uppercase">
                        {res.status}
                      </span>
                    </div>
                    <p className="text-xs text-cream/80">
                      {res.date} at <span className="text-caramel font-semibold">{res.time}</span> • {res.guests} Guests
                    </p>
                    <p className="text-[11px] text-cream/60">Area: {res.area} • SoHo Flagship NYC</p>
                  </div>

                  <Link
                    to="/reserve"
                    className="self-start sm:self-auto px-4 py-2 rounded-full border border-cream/20 text-cream text-xs font-semibold hover:border-caramel/50"
                  >
                    Modify Booking
                  </Link>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab Content: Favorites Wishlist */}
        {activeTab === 'favorites' && (
          <div>
            {favoriteDrinks.length === 0 ? (
              <div className="py-16 text-center glass-card rounded-3xl p-8 space-y-3">
                <span className="text-4xl">❤️</span>
                <h3 className="font-serif text-xl font-bold text-cream">Your Wishlist is Empty</h3>
                <p className="text-xs text-cream/60">Heart any drink on the menu to quickly find it here.</p>
                <Link to="/menu" className="inline-block px-5 py-2.5 gold-pill-btn text-xs font-bold">
                  Explore Menu
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteDrinks.map((drink) => (
                  <div
                    key={drink.id}
                    className="glass-card rounded-3xl p-4 border border-cream/10 space-y-3 flex flex-col justify-between"
                  >
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-espresso-950">
                      <img src={drink.image} alt={drink.name} className="w-full h-full object-cover" />
                      <button
                        onClick={() => toggleFavorite(drink.id)}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-espresso-950/80 text-red-400"
                        title="Remove from wishlist"
                      >
                        <Heart className="w-4 h-4 fill-current" />
                      </button>
                    </div>

                    <div>
                      <h4 className="font-serif text-base font-bold text-cream">{drink.name}</h4>
                      <p className="text-[11px] text-cream/60 line-clamp-1 mt-0.5">{drink.origin}</p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-cream/10">
                      <span className="font-serif text-lg font-bold text-caramel">
                        ${drink.price.toFixed(2)}
                      </span>
                      <Link
                        to={`/product/${drink.id}`}
                        className="px-3.5 py-1.5 gold-pill-btn text-xs font-bold"
                      >
                        Customize 3D
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab Content: Saved Addresses */}
        {activeTab === 'addresses' && (
          <div className="space-y-4">
            <div className="glass-card rounded-3xl p-6 border border-caramel/25 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-caramel" />
                  <span className="font-serif text-base font-bold text-cream">Primary Residence (NYC)</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-caramel/20 text-caramel text-[10px] font-bold uppercase">
                  Default
                </span>
              </div>
              <p className="text-xs text-cream/80">
                Dev Gandhi • +1 (555) 789-2345
              </p>
              <p className="text-xs text-cream/60">
                450 West Broadway, Penthouse 4B, SoHo, New York, NY 10012
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
