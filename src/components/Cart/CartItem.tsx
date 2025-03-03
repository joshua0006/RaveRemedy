/**
 * CartItem Component
 * 
 * Individual cart item display with quantity controls.
 * 
 * @component
 * @example
 * ```tsx
 * <CartItem item={cartItem} />
 * ```
 */

import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatPrice';
import type { CartItem as CartItemType } from '../../context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCart();

  return (
    <div className="glass-panel rounded-xl p-4 border border-white/10 hover:border-[#ff00ff]/20 transition-all">
      <div className="flex gap-4">
        <div className="w-20 h-20 bg-white/5 rounded-lg overflow-hidden flex items-center justify-center">
          <img 
            src={item.images[0]} 
            alt={item.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between">
            <h3 className="font-semibold">{item.name}</h3>
            <button 
              onClick={() => removeFromCart(item.id)}
              className="text-white/60 hover:text-[#ff00ff] transition-colors"
              aria-label={`Remove ${item.name} from cart`}
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
          
          <p className="text-white/60 text-sm">{item.flavor}</p>
          
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center border border-white/20 rounded-lg overflow-hidden">
              <button 
                onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                className="p-1 bg-white/5 hover:bg-white/10 transition-colors"
                disabled={item.quantity <= 1}
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-3" aria-label={`Quantity: ${item.quantity}`}>{item.quantity}</span>
              <button 
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="p-1 bg-white/5 hover:bg-white/10 transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            
            <p className="font-semibold">${formatPrice(item.unitPrice * item.quantity)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};