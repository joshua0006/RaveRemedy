/**
 * AdminDashboard Component
 * 
 * Displays account status and management options for connected accounts.
 */

import React, { useState, useEffect } from 'react';
import { ShieldCheck, ExternalLink, Loader, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';

interface AdminDashboardProps {
  accountId: string;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ accountId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [accountStatus, setAccountStatus] = useState<{
    detailsSubmitted?: boolean;
    chargesEnabled?: boolean;
    payoutsEnabled?: boolean;
    isFullyOnboarded?: boolean;
  } | null>(null);

  const checkAccountStatus = async () => {
    setIsCheckingStatus(true);
    try {
      const response = await fetch(`/.netlify/functions/get-account-status?accountId=${accountId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      setAccountStatus(data);
    } catch (err) {
      console.error('Account status error:', err);
      setError(err instanceof Error ? err.message : 'Failed to check account status');
    } finally {
      setIsCheckingStatus(false);
    }
  };

  useEffect(() => {
    checkAccountStatus();
  }, [accountId]);

  const handleLoginToAccount = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/.netlify/functions/create-login-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accountId }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      if (data.url) {
        window.open(data.url, '_blank');
      } else {
        throw new Error('No login link URL returned from server');
      }
      
    } catch (err) {
      console.error('Login link error:', err);
      setError(err instanceof Error ? err.message : 'Failed to create login link');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 mb-8">
        <ShieldCheck className="w-10 h-10 text-[#ff00ff]" />
        <h1 className="text-3xl font-bold gradient-text">Account Status</h1>
      </div>

      <div className="glass-panel rounded-xl p-6 border border-white/10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Status Overview</h2>
          <button 
            onClick={checkAccountStatus}
            disabled={isCheckingStatus}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Refresh account status"
          >
            <RefreshCw className={`w-5 h-5 ${isCheckingStatus ? 'animate-spin' : ''}`} />
          </button>
        </div>
        
        {accountStatus && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              {accountStatus.detailsSubmitted ? (
                <CheckCircle className="w-6 h-6 text-green-500" />
              ) : (
                <AlertCircle className="w-6 h-6 text-yellow-500" />
              )}
              <span>Account details submitted: {accountStatus.detailsSubmitted ? 'Yes' : 'No'}</span>
            </div>
            
            <div className="flex items-center gap-3">
              {accountStatus.chargesEnabled ? (
                <CheckCircle className="w-6 h-6 text-green-500" />
              ) : (
                <AlertCircle className="w-6 h-6 text-yellow-500" />
              )}
              <span>Charges enabled: {accountStatus.chargesEnabled ? 'Yes' : 'No'}</span>
            </div>
            
            <div className="flex items-center gap-3">
              {accountStatus.payoutsEnabled ? (
                <CheckCircle className="w-6 h-6 text-green-500" />
              ) : (
                <AlertCircle className="w-6 h-6 text-yellow-500" />
              )}
              <span>Payouts enabled: {accountStatus.payoutsEnabled ? 'Yes' : 'No'}</span>
            </div>
            
            <div className="pt-4 border-t border-white/10">
              <div className="flex items-center gap-3">
                {accountStatus.isFullyOnboarded ? (
                  <CheckCircle className="w-6 h-6 text-green-500" />
                ) : (
                  <AlertCircle className="w-6 h-6 text-yellow-500" />
                )}
                <span className="font-semibold">
                  Account status: {accountStatus.isFullyOnboarded ? 'Fully onboarded' : 'Onboarding incomplete'}
                </span>
              </div>
            </div>
          </div>
        )}
        
        <div className="mt-6">
          <button 
            onClick={handleLoginToAccount}
            disabled={isLoading}
            className="w-full bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <Loader className="w-5 h-5 animate-spin" />
            ) : (
              <ExternalLink className="w-5 h-5" />
            )}
            <span>View Stripe Dashboard</span>
          </button>
          
          {error && (
            <p className="mt-3 text-red-400 text-sm">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
};