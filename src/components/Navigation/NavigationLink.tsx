/**
 * NavigationLink Component
 * 
 * Reusable navigation link component with consistent styling.
 * Used for all clickable navigation items except special buttons.
 * 
 * @component
 * @example
 * ```tsx
 * <NavigationLink onClick={() => console.log('clicked')}>
 *   About Us
 * </NavigationLink>
 * ```
 */

import React from 'react';

interface NavigationLinkProps {
  children: React.ReactNode;
  onClick: () => void;
}

export const NavigationLink: React.FC<NavigationLinkProps> = ({ children, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="text-white hover:text-[#ff00ff] transition-colors"
    >
      {children}
    </button>
  );
};