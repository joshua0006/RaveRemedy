/**
 * FAQHeader Component
 * 
 * Displays the header section for FAQs.
 */

import React from 'react';

export const FAQHeader: React.FC = () => {
  return (
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-bold mb-4">
        <span className="gradient-text">
          Frequently Asked Questions
        </span>
      </h2>
      <p className="text-xl text-gray-300">
        Everything you need to know about RaveRemedy
      </p>
    </div>
  );
};