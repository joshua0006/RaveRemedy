import React, { useEffect, useState } from 'react';
import { CheckCircle, ArrowLeft, Loader } from 'lucide-react';

const ConnectReturnPage: React.FC = () => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Verifying your account...');
  const [accountId, setAccountId] = useState<string | null>(null);

  useEffect(() => {
    // Get the stored account ID
    const storedAccountId = localStorage.getItem('stripeConnectAccountId');
    if (storedAccountId) {
      setAccountId(storedAccountId);
      checkAccountStatus(storedAccountId);
    } else {
      setStatus('error');
      setMessage('No account information found. Please try connecting again.');
    }
  }, []);

  const checkAccountStatus = async (id: string) => {
    try {
      const response = await fetch(`/.netlify/functions/get-account-status?accountId=${id}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      // Check if the account is fully onboarded
      if (data.detailsSubmitted) {
        setStatus('success');
        setMessage(
          data.isFullyOnboarded 
            ? 'Your account has been successfully connected to RaveRemedy! You can now receive payments directly to your bank account.'
            : 'Your account details have been submitted. Stripe is reviewing your information and will enable charges and payouts soon.'
        );
      } else {
        setStatus('error');
        setMessage('Your account setup is incomplete. Please complete the onboarding process to start receiving payments.');
      }
    } catch (err) {
      console.error('Account status error:', err);
      setStatus('error');
      setMessage('Failed to verify account status. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900/20 to-black text-white flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-4">
        <div className="glass-panel rounded-3xl p-8 text-center">
          <div className="flex justify-center mb-6">
            {status === 'loading' ? (
              <Loader className="w-20 h-20 text-[#ff00ff] animate-spin" />
            ) : status === 'success' ? (
              <CheckCircle className="w-20 h-20 text-[#ff00ff]" />
            ) : (
              <ArrowLeft className="w-20 h-20 text-[#ff00ff]" />
            )}
          </div>
          
          <h1 className="text-3xl font-bold gradient-text mb-4">
            {status === 'loading' ? 'Verifying Account...' : 
             status === 'success' ? 'Account Connected!' : 
             'Action Required'}
          </h1>
          
          <p className="text-lg text-gray-300 mb-6">
            {message}
          </p>
          
          <div className="space-y-4">
            {status === 'success' && (
              <a 
                href="/admin"
                className="block w-full bg-gradient-to-r from-[#ff00ff] via-[#ff66ff] to-[#00ffff] text-white px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-all"
              >
                Go to Admin Dashboard
              </a>
            )}
            
            {status === 'error' && accountId && (
              <a 
                href="/admin"
                className="block w-full bg-gradient-to-r from-[#ff00ff] via-[#ff66ff] to-[#00ffff] text-white px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-all"
              >
                Complete Account Setup
              </a>
            )}
            
            <a 
              href="/"
              className="block w-full bg-transparent border border-white/20 text-white px-6 py-2 rounded-xl hover:bg-white/5 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 inline mr-2" />
              Return to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectReturnPage;