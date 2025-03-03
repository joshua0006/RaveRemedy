/**
 * CartSummary Component
 * 
 * Displays cart totals and checkout button.
 * 
 * @component
 * @example
 * ```tsx
 * <CartSummary cartTotal={4999} onClose={() => {}} />
 * ```
 */

import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatPrice';
import { useCheckout } from '../../hooks/useCheckout';

interface CartSummaryProps {
  cartTotal: number;
  onClose: () => void;
}

export const CartSummary: React.FC<CartSummaryProps> = ({ cartTotal, onClose }) => {
  const { cart } = useCart();
  const { handleCheckout, isLoading } = useCheckout();

  // Determine if free shipping applies (any item with quantity >= 2)
  const qualifiesForFreeShipping = cart.some(item => item.quantity >= 2);
  const shippingCost = qualifiesForFreeShipping ? 0 : 995; // $9.95 in cents
  const orderTotal = cartTotal + shippingCost;

  return (
    <div className="p-4 border-t border-white/10">
      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span className="text-white/70">Subtotal</span>
          <span>${formatPrice(cartTotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-white/70">Shipping</span>
          {qualifiesForFreeShipping ? (
            <span className="text-[#ff00ff]">Free</span>
          ) : (
            <span>${formatPrice(shippingCost)}</span>
          )}
        </div>
        <div className="flex justify-between font-bold text-lg pt-2 border-t border-white/10">
          <span>Total</span>
          <span>${formatPrice(orderTotal)}</span>
        </div>
      </div>
      
      <button 
        onClick={handleCheckout}
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-[#ff00ff] via-[#ff66ff] to-[#00ffff] text-white px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-all transform hover:scale-105 hover:shadow-[0_0_30px_rgba(255,0,255,0.3)] flex items-center justify-center gap-2 disabled:opacity-70"
        aria-label="Proceed to checkout"
      >
        <ShoppingCart className="w-5 h-5" />
        {isLoading ? 'Processing...' : 'Checkout'}
      </button>
      
      <button 
        onClick={onClose}
        className="w-full mt-2 bg-transparent border border-white/20 text-white px-6 py-2 rounded-xl hover:bg-white/5 transition-colors"
        aria-label="Continue shopping"
      >
        Continue Shopping
      </button>
    </div>
  );
};