/**
 * ProductSection Component
 * 
 * Main product display and purchase section. Handles:
 * - Product information display
 * - Flavor selection
 * - Quantity selection
 * - Add to cart functionality
 * 
 * Uses smaller components to maintain separation of concerns:
 * - ProductImage: Handles product image display
 * - FlavorSelector: Manages flavor selection
 * - QuantitySelector: Manages quantity selection
 * - AddToCartButton: Handles cart interaction
 * 
 * @component
 * @example
 * ```tsx
 * <ProductSection />
 * ```
 */

import React, { useState } from 'react';
import { ProductImage } from './ProductImage';
import { FlavorSelector } from './FlavorSelector';
import { QuantitySelector } from './QuantitySelector';
import { AddToCartButton } from './AddToCartButton';
import { useCart } from '../../context/CartContext';
import { PRODUCTS } from '../../lib/products';
import { formatPrice } from '../../utils/formatPrice';

export const ProductSection: React.FC = () => {
  const [selectedFlavor, setSelectedFlavor] = useState('Lemon Squash');
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const product = PRODUCTS[selectedFlavor];
    addToCart({
      id: product.id,
      name: product.name,
      description: product.description,
      images: product.images,
      unitPrice: product.unitPrice,
      quantity,
      flavor: selectedFlavor
    });
  };

  return (
    <div id="product" className="relative py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-12">
            <ProductImage />
            
            <div className="space-y-6">
              <h2 className="text-4xl font-bold gradient-text">
                Recovery Pack
              </h2>
              <p className="text-xl text-gray-300">
                Premium post-rave recovery supplement with natural ingredients
              </p>
              
              <div className="space-y-4">
                <FlavorSelector
                  selectedFlavor={selectedFlavor}
                  onFlavorChange={setSelectedFlavor}
                />
                
                <QuantitySelector
                  quantity={quantity}
                  onQuantityChange={setQuantity}
                />

                <div className="pt-4">
                  <p className="text-3xl font-bold">
                    ${formatPrice(4999 * quantity)}
                  </p>
                  {quantity >= 2 && (
                    <p className="text-[#ff00ff] text-sm mt-1">
                      Free Shipping!
                    </p>
                  )}
                </div>

                <AddToCartButton
                  onClick={handleAddToCart}
                  quantity={quantity}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};