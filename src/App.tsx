import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';

// Store & Providers
import { ToastProvider } from './components/common/ToastContainer';
import { useThemeStore } from './store/useThemeStore';

// Layout & Common
import { Navbar } from './components/layout/Navbar';
import { MobileTabBar } from './components/layout/MobileTabBar';
import { CartDrawer } from './components/layout/CartDrawer';
import { Footer } from './components/layout/Footer';
import { CustomCursor } from './components/common/CustomCursor';
import { FlyingCartAnimation } from './components/common/FlyingCartAnimation';
import { SearchModal } from './components/common/SearchModal';
import { LoadingScreen } from './components/common/LoadingScreen';

// Pages
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { OriginsPage } from './pages/OriginsPage';
import { ClubPage } from './pages/ClubPage';
import { ReservationPage } from './pages/ReservationPage';
import { StoryPage } from './pages/StoryPage';
import { ProfilePage } from './pages/ProfilePage';

// Scroll to Top Helper
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export const AppContent: React.FC = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const theme = useThemeStore((s) => s.theme);

  // Apply theme class to document
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-espresso-900 text-cream selection:bg-caramel selection:text-espresso-950">
      {/* Initial Loading Screen */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      <ScrollToTop />
      <CustomCursor />
      <FlyingCartAnimation />
      <CartDrawer />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Luxury Navigation */}
      <Navbar onOpenSearch={() => setSearchOpen(true)} />

      {/* Main Pages */}
      <main className="relative z-10">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/origins" element={<OriginsPage />} />
          <Route path="/club" element={<ClubPage />} />
          <Route path="/reserve" element={<ReservationPage />} />
          <Route path="/story" element={<StoryPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      {/* Floating Mobile Tab Bar */}
      <MobileTabBar />

      {/* Editorial Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ToastProvider>
  );
}
