/**
 * CartDrawer Component
 * 
 * Slide-out cart drawer that displays cart contents and handles checkout.
 * 
 * Features:
 * - Cart item display and management
 * - Quantity adjustments
 * - Price calculations
 * - Checkout process
 * 
 * @component
 * @example
 * ```tsx
 * <CartDrawer />
 * ```
 */

import React from 'react';
import { X, ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatPrice';
import { CartItem } from './CartItem';
import { CartSummary } from './CartSummary';
import { EmptyCart } from './EmptyCart';

export const CartDrawer: React.FC = () => {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    cartTotal,
    cartCount
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true" aria-labelledby="cart-title">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />
      
      <div className="absolute top-0 right-0 h-full w-full max-w-md transform transition-transform duration-300 ease-in-out bg-black/90 border-l border-[#ff00ff]/20">
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center">
              <ShoppingCart className="w-6 h-6 text-[#ff00ff] mr-2" />
              <h2 id="cart-title" className="text-xl font-bold">Your Cart ({cartCount})</h2>
            </div>
            <button 
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full hover:bg-white/5 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {cart.length === 0 ? (
              <EmptyCart onClose={() => setIsCartOpen(false)} />
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <CartItem key={`${item.id}-${item.flavor}`} item={item} />
                ))}
              </div>
            )}
          </div>
          
          {/* Summary and Checkout */}
          {cart.length > 0 && (
            <CartSummary 
              cartTotal={cartTotal} 
              onClose={() => setIsCartOpen(false)} 
            />
          )}
        </div>
      </div>
    </div>
  );
};