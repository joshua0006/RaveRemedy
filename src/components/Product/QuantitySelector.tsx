/**
 * QuantitySelector Component
 * 
 * Handles quantity selection for the product.
 * Includes quantity limits and validation.
 * 
 * @component
 * @example
 * ```tsx
 * <QuantitySelector
 *   quantity={1}
 *   onQuantityChange={(quantity) => console.log(quantity)}
 * />
 * ```
 */

import React from 'react';

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onQuantityChange
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-400 mb-2">
        Quantity
      </label>
      <select
        value={quantity}
        onChange={(e) => onQuantityChange(Number(e.target.value))}
        className="w-full"
      >
        {[1, 2, 3, 4, 5].map(num => (
          <option key={num} value={num}>
            {num} {num === 1 ? 'Pack' : 'Packs'}
            {num >= 2 ? ' (Free Shipping)' : ''}
          </option>
        ))}
      </select>
    </div>
  );
};