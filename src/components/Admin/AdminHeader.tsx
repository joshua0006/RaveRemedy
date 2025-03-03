/**
 * AdminHeader Component
 * 
 * Header for the admin section with navigation and branding.
 */

import React from 'react';

export const AdminHeader: React.FC = () => {
  return (
    <nav className="fixed w-full z-50 bg-black/60 backdrop-blur-lg border-b border-white/20">
      <div className="w-full px-4">
        <div className="flex items-center justify-between h-24">
          <div className="flex items-center">
            <img 
              src="/01.png"
              alt="RaveRemedy Logo" 
              className="h-16 w-auto object-contain cursor-pointer"
              onClick={() => window.location.href = '/'}
            />
            <span className="ml-4 text-xl font-bold">Admin Portal</span>
          </div>
          <div>
            <a 
              href="/"
              className="text-white hover:text-[#ff00ff] transition-colors"
            >
              Return to Store
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};