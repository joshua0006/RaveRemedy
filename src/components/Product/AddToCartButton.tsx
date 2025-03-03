/**
 * AddToCartButton Component
 * 
 * Handles the add to cart interaction with loading state and animation.
 * 
 * @component
 * @example
 * ```tsx
 * <AddToCartButton
 *   onClick={() => console.log('Added to cart')}
 *   quantity={2}
 * />
 * ```
 */

import React from 'react';
import { ShoppingCart } from 'lucide-react';

interface AddToCartButtonProps {
  onClick: () => void;
  quantity: number;
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  onClick,
  quantity
}) => {
  return (
    <button
      onClick={onClick}
      className="w-full bg-gradient-to-r from-[#ff00ff] via-[#ff66ff] to-[#00ffff] text-white px-6 py-4 rounded-xl font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2"
      aria-label={`Add ${quantity} ${quantity === 1 ? 'pack' : 'packs'} to cart`}
    >
      <ShoppingCart className="w-5 h-5" />
      Add to Cart
    </button>
  );
};