import React, { useState, useEffect } from 'react';
import { ShieldCheck, ExternalLink, Loader, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';

export const AdminSection: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [accountId, setAccountId] = useState<string | null>(null);
  const [accountStatus, setAccountStatus] = useState<{
    detailsSubmitted?: boolean;
    chargesEnabled?: boolean;
    payoutsEnabled?: boolean;
    isFullyOnboarded?: boolean;
  } | null>(null);

  // Check if we have a stored account ID
  useEffect(() => {
    const storedAccountId = localStorage.getItem('stripeConnectAccountId');
    if (storedAccountId) {
      setAccountId(storedAccountId);
      checkAccountStatus(storedAccountId);
    }
  }, []);

  const checkAccountStatus = async (id: string) => {
    setIsCheckingStatus(true);
    try {
      const response = await fetch(`/.netlify/functions/get-account-status?accountId=${id}`);
      
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
      
      // Store the account ID for later use
      if (data.accountId) {
        localStorage.setItem('stripeConnectAccountId', data.accountId);
        setAccountId(data.accountId);
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

  const handleLoginToAccount = async () => {
    if (!accountId) return;
    
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
      
      // Redirect to Stripe dashboard
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

  const refreshAccountStatus = () => {
    if (accountId) {
      checkAccountStatus(accountId);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900/20 to-black text-white">
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

      <div className="pt-32 pb-16 max-w-4xl mx-auto px-4">
        <div className="flex items-center gap-4 mb-8">
          <ShieldCheck className="w-10 h-10 text-[#ff00ff]" />
          <h1 className="text-3xl font-bold gradient-text">Stripe Connect Dashboard</h1>
        </div>
        
        <div className="space-y-8">
          {accountId && accountStatus ? (
            <div className="glass-panel rounded-xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Account Status</h2>
                <button 
                  onClick={refreshAccountStatus}
                  disabled={isCheckingStatus}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  aria-label="Refresh account status"
                >
                  <RefreshCw className={`w-5 h-5 ${isCheckingStatus ? 'animate-spin' : ''}`} />
                </button>
              </div>
              
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
              
              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleLoginToAccount}
                  disabled={isLoading}
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <Loader className="w-5 h-5 animate-spin" />
                  ) : (
                    <ExternalLink className="w-5 h-5" />
                  )}
                  <span>View Stripe Dashboard</span>
                </button>
                
                {!accountStatus.isFullyOnboarded && (
                  <button 
                    onClick={handleConnectAccount}
                    disabled={isLoading}
                    className="flex-1 bg-gradient-to-r from-[#ff00ff] via-[#ff66ff] to-[#00ffff] text-white px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <Loader className="w-5 h-5 animate-spin" />
                    ) : (
                      <RefreshCw className="w-5 h-5" />
                    )}
                    <span>Complete Onboarding</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
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
          )}
          
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
      </div>
    </div>
  );
};