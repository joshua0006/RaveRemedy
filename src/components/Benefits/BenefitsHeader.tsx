/**
 * BenefitsHeader Component
 * 
 * Displays the header section for benefits with title and subtitle.
 */

import React from 'react';

export const BenefitsHeader: React.FC = () => {
  return (
    <div className="text-center mb-16 pt-32">
      <h2 className="text-4xl md:text-5xl font-bold mb-6">
        <span className="gradient-text">
          Join 50k+ Ravers
        </span>
      </h2>
      <p className="text-xl text-gray-300">
        Enjoy Free Shipping Across Australia When You Order 2 or More Tubs!
      </p>
    </div>
  );
};