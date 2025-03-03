/**
 * EmptyCart Component
 * 
 * Displays empty cart state with call to action.
 * 
 * @component
 * @example
 * ```tsx
 * <EmptyCart onClose={() => {}} />
 * ```
 */

import React from 'react';
import { ShoppingCart } from 'lucide-react';

interface EmptyCartProps {
  onClose: () => void;
}

export const EmptyCart: React.FC<EmptyCartProps> = ({ onClose }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <ShoppingCart className="w-16 h-16 text-white/20 mb-4" />
      <p className="text-white/60 text-lg">Your cart is empty</p>
      <button 
        onClick={onClose}
        className="mt-4 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
      >
        Continue Shopping
      </button>
    </div>
  );
};