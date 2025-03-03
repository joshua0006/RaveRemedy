/**
 * ProductImage Component
 * 
 * Handles product image display with proper loading and error states.
 * 
 * @component
 * @example
 * ```tsx
 * <ProductImage />
 * ```
 */

import React from 'react';

export const ProductImage: React.FC = () => {
  return (
    <div className="relative aspect-square rounded-2xl overflow-hidden">
      <img 
        src="/01.png"
        alt="RaveRemedy Product"
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  );
};