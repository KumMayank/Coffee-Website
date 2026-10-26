import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { ProductSwitcher } from '../components/home/ProductSwitcher';
import { FeaturedDrinks } from '../components/home/FeaturedDrinks';
import { OriginsSection } from '../components/home/OriginsSection';
import { WhyUsSection } from '../components/home/WhyUsSection';
import { SpecialOfferBanner } from '../components/home/SpecialOfferBanner';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { InstagramGallery } from '../components/home/InstagramGallery';

export const HomePage: React.FC = () => {
  return (
    <div className="relative">
      <HeroSection />
      <ProductSwitcher />
      <FeaturedDrinks />
      <OriginsSection />
      <WhyUsSection />
      <SpecialOfferBanner />
      <TestimonialsSection />
      <InstagramGallery />
    </div>
  );
};
