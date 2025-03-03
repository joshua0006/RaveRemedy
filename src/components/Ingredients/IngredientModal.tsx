/**
 * IngredientModal Component
 * 
 * Displays detailed information about a selected ingredient.
 */

import React from 'react';
import { X } from 'lucide-react';
import type { INGREDIENTS } from './ingredients.data';

interface IngredientModalProps {
  ingredient: typeof INGREDIENTS[0];
  onClose: () => void;
}

export const IngredientModal: React.FC<IngredientModalProps> = ({ 
  ingredient, 
  onClose 
}) => {
  const formatDetails = (details: string) => {
    return details.split('\n').map((line, index) => {
      if (line.startsWith('•')) {
        const [bullet, ...content] = line.split('**');
        const [boldText, ...rest] = content.join('').split('**');
        return (
          <div key={index} className="flex items-start space-x-2 mb-3">
            <span className="text-[#ff00ff]">•</span>
            <p className="text-gray-300">
              <strong className="text-[#ff00ff]">{boldText}</strong>
              {rest}
            </p>
          </div>
        );
      }
      return <p key={index} className="text-gray-300">{line}</p>;
    });
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ingredient-modal-title"
    >
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative bg-black/90 rounded-2xl border border-[#ff00ff]/20 p-8 max-w-2xl w-full hover-glow overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 w-12 h-12 flex items-center justify-center bg-black/90 rounded-full border border-[#ff00ff]/20 text-white/60 hover:text-white transition-colors"
          aria-label="Close details"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex items-center space-x-6 mb-6">
          <div className="w-32 h-32">
            <img 
              src={ingredient.image}
              alt={ingredient.name}
              className="w-full h-full object-contain drop-shadow-[0_0_12px_rgba(255,0,255,0.3)]"
            />
          </div>
          <div>
            <h2 id="ingredient-modal-title" className="text-3xl font-bold gradient-text mb-2">
              {ingredient.name}
            </h2>
            <p className="text-gray-300">{ingredient.desc}</p>
          </div>
        </div>

        <div className="space-y-2">
          {formatDetails(ingredient.details)}
        </div>
      </div>
    </div>
  );
};