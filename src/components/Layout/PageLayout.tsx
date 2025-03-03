/**
 * PageLayout Component
 * 
 * Main layout wrapper for all pages. Handles:
 * - Common background styles
 * - Layout structure
 * - Cart provider integration
 * 
 * @component
 * @example
 * ```tsx
 * <PageLayout>
 *   <YourContent />
 * </PageLayout>
 * ```
 */

import React from 'react';
import { CartProvider } from '../../context/CartContext';
import { Navigation } from '../Navigation/Navigation';
import { Footer } from '../Footer';
import { CartDrawer } from '../Cart/CartDrawer';

interface PageLayoutProps {
  children: React.ReactNode;
  showNavigation?: boolean;
  showFooter?: boolean;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ 
  children, 
  showNavigation = true,
  showFooter = true
}) => {
  return (
    <CartProvider>
      <div className="min-h-screen bg-gradient-to-b from-black via-purple-900/20 to-black text-white">
        {showNavigation && <Navigation scrollToProduct={() => {}} />}
        <main>
          {children}
        </main>
        {showFooter && <Footer />}
        <CartDrawer />
      </div>
    </CartProvider>
  );
};