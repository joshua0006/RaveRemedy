/**
 * FAQSection Component
 * 
 * Displays frequently asked questions in an accordion format.
 */

import React from 'react';
import { FAQHeader } from './FAQHeader';
import { FAQList } from './FAQList';

export const FAQSection: React.FC = () => {
  return (
    <div id="faq-section" className="relative py-16 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/30 to-black" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80')] opacity-5 mix-blend-overlay" />
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <FAQHeader />
        <FAQList />
      </div>
    </div>
  );
};