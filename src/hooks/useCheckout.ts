/**
 * useCheckout Hook
 * 
 * Handles checkout process and Stripe integration.
 * 
 * @example
 * ```ts
 * const { handleCheckout, isLoading } = useCheckout();
 * ```
 */

import { useState } from 'react';
import { useCart } from '../context/CartContext';

export const useCheckout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { cart, clearCart } = useCart();

  const handleCheckout = async () => {
    setIsLoading(true);
    
    try {
      // Check if the cart is empty
      if (!cart || cart.length === 0) {
        throw new Error('Your cart is empty');
      }

      // Format the checkout data
      const checkoutData = { 
        cart: cart.map(item => ({
          name: item.name,
          description: item.description || 'No description',
          images: item.images || [],
          unitPrice: item.unitPrice,
          quantity: item.quantity || 1,
          flavor: item.flavor || 'Original'
        }))
      };
      
      console.log('Checkout data:', checkoutData);
      
      // Always use the Netlify function endpoint, which works in both development and production
      // This ensures consistency across environments
      const apiEndpoint = '/api/create-checkout';
      
      console.log('Sending checkout request to:', apiEndpoint);
      
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(checkoutData),
      });
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        
        let errorMessage = `Error ${response.status}`;
        try {
          const errorJson = JSON.parse(errorText);
          errorMessage = errorJson.error || errorJson.details || errorMessage;
        } catch (e) {
          // If it's not valid JSON, use the raw text
          errorMessage = errorText;
        }
        
        throw new Error(errorMessage);
      }
      
      const data = await response.json();
      console.log('Checkout response data received');
      
      if (data.url) {
        console.log('Redirecting to Stripe checkout...');
        clearCart();
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned from server');
      }
      
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'Something went wrong with the checkout process. Please try again.';
      
      console.error('Checkout error:', errorMessage);
      alert(`Checkout Error: ${errorMessage}`);
      setIsLoading(false);
    }
  };

  return { handleCheckout, isLoading };
};