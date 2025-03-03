/**
 * AdminInfo Component
 * 
 * Displays information about Stripe Connect features and benefits.
 */

import React from 'react';

export const AdminInfo: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="glass-panel rounded-xl p-6 border border-white/10">
        <h2 className="text-xl font-semibold mb-3">About Stripe Connect</h2>
        <p className="text-gray-300 mb-4">
          Stripe Connect allows you to process payments on behalf of your connected account. This means:
        </p>
        
        <ul className="list-disc pl-5 space-y-2 text-gray-300">
          <li>You can accept payments from customers</li>
          <li>Funds are automatically transferred to your connected account</li>
          <li>You can set platform fees for each transaction</li>
          <li>Stripe handles all compliance and payout logistics</li>
        </ul>
      </div>
      
      <div className="text-center text-sm text-gray-400">
        <p>
          By connecting your account, you agree to Stripe's{' '}
          <a 
            href="https://stripe.com/au/connect-account/legal" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#ff00ff] hover:underline"
          >
            Terms of Service
          </a>
        </p>
      </div>
    </div>
  );
};