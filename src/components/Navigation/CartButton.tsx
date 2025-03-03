/**
 * CartButton Component
 * 
 * Displays the current cart status and handles cart drawer interaction.
 * Uses CartContext to maintain cart state across the application.
 * 
 * Features:
 * - Shows item count badge
 * - Handles cart drawer toggle
 * - Animated hover effects
 * 
 * @component
 * @example
 * ```tsx
 * <CartButton />
 * ```
 * 
 * Related:
 * - CartContext: Provides cart state and operations
 * - CartDrawer: Displays cart contents
 */

import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const CartButton: React.FC = () => {
  const { cartCount, setIsCartOpen } = useCart();
  
  return (
    <button 
      onClick={() => setIsCartOpen(true)}
      className="relative p-2 rounded-full bg-[#ff00ff] hover:bg-[#ff00ff]/80 transition-all transform hover:scale-105 shadow-[0_0_15px_rgba(255,0,255,0.5)]"
      aria-label={`Open cart${cartCount > 0 ? ` (${cartCount} items)` : ''}`}
    >
      <ShoppingCart className="w-5 h-5 text-white" />
      {cartCount > 0 && (
        <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-white text-[#ff00ff] text-xs flex items-center justify-center font-bold">
          {cartCount}
        </span>
      )}
    </button>
  );
};