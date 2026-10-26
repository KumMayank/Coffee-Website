import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Coffee, Calendar, ShoppingBag, User } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { useUserStore } from '../../store/useUserStore';

export const MobileTabBar: React.FC = () => {
  const totalCount = useCartStore((s) => s.getItemCount());
  const toggleCart = useCartStore((s) => s.toggleCart);
  const user = useUserStore((s) => s.user);

  return (
    <div className="fixed bottom-4 left-4 right-4 z-40 lg:hidden pointer-events-none">
      <div className="max-w-md mx-auto pointer-events-auto flex items-center justify-around py-2.5 px-3 rounded-full bg-espresso-950/85 backdrop-blur-2xl border border-caramel/25 shadow-2xl shadow-black/80">
        {/* Home */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 px-3 py-1 rounded-full transition-all ${
              isActive ? 'text-caramel scale-105' : 'text-cream/60 hover:text-cream'
            }`
          }
        >
          <Home className="w-4 h-4" />
          <span className="text-[10px] font-medium tracking-tight">Home</span>
        </NavLink>

        {/* Menu */}
        <NavLink
          to="/menu"
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 px-3 py-1 rounded-full transition-all ${
              isActive ? 'text-caramel scale-105' : 'text-cream/60 hover:text-cream'
            }`
          }
        >
          <Coffee className="w-4 h-4" />
          <span className="text-[10px] font-medium tracking-tight">Menu</span>
        </NavLink>

        {/* Reserve */}
        <NavLink
          to="/reserve"
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 px-3 py-1 rounded-full transition-all ${
              isActive ? 'text-caramel scale-105' : 'text-cream/60 hover:text-cream'
            }`
          }
        >
          <Calendar className="w-4 h-4" />
          <span className="text-[10px] font-medium tracking-tight">Book</span>
        </NavLink>

        {/* Cart Drawer Trigger */}
        <button
          id="mobile-cart-tab"
          onClick={toggleCart}
          className="relative flex flex-col items-center gap-0.5 px-3 py-1 rounded-full text-cream/70 hover:text-caramel transition-all"
        >
          <div className="relative">
            <ShoppingBag className="w-4 h-4" />
            {totalCount > 0 && (
              <span className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-caramel text-espresso-950 text-[10px] font-bold flex items-center justify-center">
                {totalCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium tracking-tight">Cart</span>
        </button>

        {/* Profile */}
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 px-3 py-1 rounded-full transition-all ${
              isActive ? 'text-caramel scale-105' : 'text-cream/60 hover:text-cream'
            }`
          }
        >
          <div className="relative">
            <User className="w-4 h-4" />
            {user?.tier === 'Gold' && (
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-gold-400 ring-1 ring-espresso-950" />
            )}
          </div>
          <span className="text-[10px] font-medium tracking-tight">Profile</span>
        </NavLink>
      </div>
    </div>
  );
};
