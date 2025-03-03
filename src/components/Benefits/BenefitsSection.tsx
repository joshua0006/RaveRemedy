/**
 * BenefitsSection Component
 * 
 * Displays the benefits of using RaveRemedy in a scrolling card format.
 */

import React from 'react';
import { BenefitsHeader } from './BenefitsHeader';
import { BenefitsScroll } from './BenefitsScroll';

export const BenefitsSection: React.FC = () => {
  return (
    <div className="relative -mt-32 pb-8 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/30 to-black" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80')] opacity-5 mix-blend-overlay" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <BenefitsHeader />
        <BenefitsScroll />
      </div>
    </div>
  );
};