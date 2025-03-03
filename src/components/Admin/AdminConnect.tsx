/**
 * AdminConnect Component
 * 
 * Handles initial Stripe Connect account creation and onboarding.
 */

import React, { useState } from 'react';
import { ExternalLink, Loader } from 'lucide-react';

interface AdminConnectProps {
  onConnect: (accountId: string) => void;
}

export const AdminConnect: React.FC<AdminConnectProps> = ({ onConnect }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConnectAccount = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/.netlify/functions/create-connect-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      // Store the account ID
      if (data.accountId) {
        localStorage.setItem('stripeConnectAccountId', data.accountId);
        onConnect(data.accountId);
      }
      
      // Redirect to Stripe Connect onboarding
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No account link URL returned from server');
      }
      
    } catch (err) {
      console.error('Connect account error:', err);
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass-panel rounded-xl p-6 border border-white/10">
      <h2 className="text-xl font-semibold mb-3">Connect Stripe Account</h2>
      <p className="text-gray-300 mb-4">
        Connect your Stripe account to start receiving payments directly to your bank account.
      </p>
      
      <button 
        onClick={handleConnectAccount}
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-[#ff00ff] via-[#ff66ff] to-[#00ffff] text-white px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
      >
        {isLoading ? (
          <>
            <Loader className="w-5 h-5 animate-spin" />
            <span>Connecting...</span>
          </>
        ) : (
          <>
            <ExternalLink className="w-5 h-5" />
            <span>Connect with Stripe</span>
          </>
        )}
      </button>
      
      {error && (
        <p className="mt-3 text-red-400 text-sm">{error}</p>
      )}
    </div>
  );
};