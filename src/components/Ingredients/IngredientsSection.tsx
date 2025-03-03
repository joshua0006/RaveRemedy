/**
 * IngredientsSection Component
 * 
 * Displays the ingredients used in RaveRemedy with detailed information.
 */

import React from 'react';
import { IngredientsHeader } from './IngredientsHeader';
import { IngredientsList } from './IngredientsList';

export const IngredientsSection: React.FC = () => {
  return (
    <div className="relative pt-8 pb-8 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/30 to-black" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80')] opacity-5 mix-blend-overlay" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <IngredientsHeader />
        <IngredientsList />
      </div>
    </div>
  );
};