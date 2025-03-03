import React from 'react';

export const HeroSection: React.FC = () => (
  <div className="relative pt-24">
    <div className="absolute inset-0">
      <img
        src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80"
        alt="Rave background"
        className="w-full h-screen object-cover opacity-40"
        loading="eager" 
        fetchpriority="high"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/40 to-black mix-blend-multiply" />
    </div>
    <div className="relative min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="-mt-[2.4cm] mb-16">
          <img 
            src="/01.png"
            alt="RaveRemedy Logo"
            className="max-w-[1000px] w-full h-auto mx-auto object-contain"
            loading="eager"
            fetchpriority="high"
          />
        </div>
      </div>
    </div>
  </div>
);