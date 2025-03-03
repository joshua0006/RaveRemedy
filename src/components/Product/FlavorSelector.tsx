/**
 * FlavorSelector Component
 * 
 * Handles flavor selection for the product.
 * Maintains list of available flavors and selection state.
 * 
 * @component
 * @example
 * ```tsx
 * <FlavorSelector
 *   selectedFlavor="Lemon Squash"
 *   onFlavorChange={(flavor) => console.log(flavor)}
 * />
 * ```
 */

import React from 'react';

interface FlavorSelectorProps {
  selectedFlavor: string;
  onFlavorChange: (flavor: string) => void;
}

const FLAVORS = [
  "Lemon Squash",
  "Orange Crush",
  "Pineapple Punch"
];

export const FlavorSelector: React.FC<FlavorSelectorProps> = ({
  selectedFlavor,
  onFlavorChange
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-400 mb-2">
        Flavor
      </label>
      <select
        value={selectedFlavor}
        onChange={(e) => onFlavorChange(e.target.value)}
        className="w-full"
      >
        {FLAVORS.map(flavor => (
          <option key={flavor} value={flavor}>{flavor}</option>
        ))}
      </select>
    </div>
  );
};