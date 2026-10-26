import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Heart, Search, Sun, Moon, Sparkles, Menu as MenuIcon, X } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { useFavoritesStore } from '../../store/useFavoritesStore';
import { useThemeStore } from '../../store/useThemeStore';
import { useUserStore } from '../../store/useUserStore';

export const Navbar: React.FC<{ onOpenSearch?: () => void }> = ({ onOpenSearch }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const totalCount = useCartStore((s) => s.getItemCount());
  const toggleCart = useCartStore((s) => s.toggleCart);
  const favoriteCount = useFavoritesStore((s) => s.favoriteIds.length);
  const { theme, toggleTheme } = useThemeStore();
  const user = useUserStore((s) => s.user);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Menu', path: '/menu' },
    { label: 'Single Origins', path: '/origins' },
    { label: 'Reserve Table', path: '/reserve' },
    { label: 'The Club', path: '/club' },
    { label: 'Our Story', path: '/story' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'py-3 bg-espresso-950/85 backdrop-blur-xl border-b border-caramel/15 shadow-glass'
            : 'py-5 bg-gradient-to-b from-espresso-950/90 via-espresso-950/50 to-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cardbrown to-caramel flex items-center justify-center border border-caramel/40 shadow-gold-glow group-hover:scale-105 transition-transform">
              <span className="text-xl">☕</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-xl font-bold tracking-wider gold-gradient-text">
                [CODE WITH GANDHI]
              </span>
              <span className="text-[10px] tracking-[0.25em] text-cream/60 uppercase -mt-1 font-sans">
                Artisan 3D Roastery
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-cardbrown/40 border border-cream/10 backdrop-blur-md">
            {navLinks.map((link) => {
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all ${
                    active
                      ? 'bg-caramel text-espresso-950 font-bold shadow-sm'
                      : 'text-cream/80 hover:text-cream hover:bg-cardbrown/60'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Live Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2 sm:p-2.5 rounded-full bg-cardbrown/40 hover:bg-cardbrown text-cream/80 hover:text-caramel border border-cream/10 transition-colors"
              title="Search artisan drinks"
              id="search-btn"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Favorites Wishlist Link */}
            <Link
              to="/menu?filter=favorites"
              className="relative p-2 sm:p-2.5 rounded-full bg-cardbrown/40 hover:bg-cardbrown text-cream/80 hover:text-caramel border border-cream/10 transition-colors"
              title="View favorites"
            >
              <Heart className="w-4 h-4" />
              {favoriteCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-caramel text-espresso-950 text-[10px] font-bold flex items-center justify-center">
                  {favoriteCount}
                </span>
              )}
            </Link>

            {/* Cart Drawer Trigger */}
            <button
              id="navbar-cart-btn"
              onClick={toggleCart}
              className="relative p-2 sm:p-2.5 rounded-full bg-cardbrown/40 hover:bg-cardbrown text-cream/80 hover:text-caramel border border-cream/10 transition-all"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {totalCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r from-caramel to-gold-400 text-espresso-950 text-[11px] font-extrabold flex items-center justify-center shadow-gold-glow animate-pulse">
                  {totalCount}
                </span>
              )}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 sm:p-2.5 rounded-full bg-cardbrown/40 hover:bg-cardbrown text-cream/80 hover:text-caramel border border-cream/10 transition-colors hidden sm:flex"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Join The Club CTA */}
            <Link
              to="/club"
              className="hidden md:flex items-center gap-1.5 px-4 py-2 gold-pill-btn text-xs font-bold shadow-md"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{user ? user.tier + ' Pass' : 'Join The Club'}</span>
            </Link>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-cardbrown/50 border border-cream/10 text-cream"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-30 lg:hidden bg-espresso-950/95 backdrop-blur-2xl border-b border-caramel/20 p-6 flex flex-col gap-4 animate-in fade-in">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-2xl text-base font-medium flex items-center justify-between ${
                  location.pathname === link.path
                    ? 'bg-caramel text-espresso-950 font-bold'
                    : 'text-cream/90 hover:bg-cardbrown/60'
                }`}
              >
                <span>{link.label}</span>
                <span>→</span>
              </Link>
            ))}
          </div>

          <div className="mt-auto pt-6 border-t border-cream/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs text-cream/60">Theme:</span>
              <button
                onClick={toggleTheme}
                className="px-3 py-1.5 rounded-full bg-cardbrown text-xs text-cream flex items-center gap-1.5"
              >
                {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-caramel" /> : <Moon className="w-3.5 h-3.5" />}
                <span className="capitalize">{theme}</span>
              </button>
            </div>
            <Link
              to="/club"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2 gold-pill-btn text-xs font-bold"
            >
              Join The Club
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
