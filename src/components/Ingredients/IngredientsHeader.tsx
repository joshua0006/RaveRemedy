/**
 * IngredientsHeader Component
 * 
 * Displays the header section for ingredients list.
 */

import React from 'react';

export const IngredientsHeader: React.FC = () => {
  return (
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-bold mb-4">
        <span className="gradient-text">What's in Every Scoop?</span>
      </h2>
      <p className="text-xl text-gray-300 max-w-3xl mx-auto">
        At RaveRemedy, we've carefully crafted our Post-party Pack to provide you with the essential vitamins and minerals your body needs to recover and thrive.
      </p>
    </div>
  );
};