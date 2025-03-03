import React from 'react';
import { X, ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';

export const CartDrawer: React.FC = () => {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateQuantity, 
    cartTotal,
    cartCount
  } = useCart();

  const handleCheckout = async () => {
    try {
      // Use the Node.js server endpoint
      const response = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          cart: cart.map(item => ({
            name: item.name,
            description: item.description,
            images: item.images,
            unitPrice: item.unitPrice,
            quantity: item.quantity,
            flavor: item.flavor,
            priceId: import.meta.env.VITE_STRIPE_PRICE_ID // Use environment variable
          }))
        }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.error) {
        console.error('Checkout error:', data.error);
        alert(`Checkout error: ${data.error}`);
        return;
      }
      
      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned from server');
      }
      
    } catch (err) {
      console.error('Checkout error:', err);
      alert('Something went wrong with the checkout process. Please try again.');
    }
  };

  // Determine if free shipping applies (any item with quantity >= 2)
  const qualifiesForFreeShipping = cart.some(item => item.quantity >= 2);
  const shippingCost = qualifiesForFreeShipping ? 0 : 995; // $9.95 in cents
  const orderTotal = cartTotal + shippingCost;

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
          
          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingCart className="w-16 h-16 text-white/20 mb-4" />
                <p className="text-white/60 text-lg">Your cart is empty</p>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="mt-4 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div 
                    key={`${item.id}-${item.flavor}`} 
                    className="glass-panel rounded-xl p-4 border border-white/10 hover:border-[#ff00ff]/20 transition-all"
                  >
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
                ))}
              </div>
            )}
          </div>
          
          {/* Summary and Checkout */}
          {cart.length > 0 && (
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
                className="w-full bg-gradient-to-r from-[#ff00ff] via-[#ff66ff] to-[#00ffff] text-white px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-all transform hover:scale-105 hover:shadow-[0_0_30px_rgba(255,0,255,0.3)] flex items-center justify-center gap-2"
                aria-label="Proceed to checkout"
              >
                <ShoppingCart className="w-5 h-5" />
                Checkout
              </button>
              
              <button 
                onClick={() => setIsCartOpen(false)}
                className="w-full mt-2 bg-transparent border border-white/20 text-white px-6 py-2 rounded-xl hover:bg-white/5 transition-colors"
                aria-label="Continue shopping"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};