import React from 'react';
import { RefreshCw, ArrowLeft } from 'lucide-react';

const ConnectRefreshPage: React.FC = () => {
  const handleRetry = () => {
    // In a real implementation, you would call your backend to create a new account link
    // For now, we'll just redirect to home
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900/20 to-black text-white flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-4">
        <div className="glass-panel rounded-3xl p-8 text-center">
          <div className="flex justify-center mb-6">
            <RefreshCw className="w-20 h-20 text-[#ff00ff]" />
          </div>
          
          <h1 className="text-3xl font-bold gradient-text mb-4">
            Connection Expired
          </h1>
          
          <p className="text-lg text-gray-300 mb-6">
            Your account connection session has expired. Please try again to connect your account.
          </p>
          
          <div className="space-y-4">
            <button 
              onClick={handleRetry}
              className="block w-full bg-gradient-to-r from-[#ff00ff] via-[#ff66ff] to-[#00ffff] text-white px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-all"
            >
              <RefreshCw className="w-5 h-5 inline mr-2" />
              Try Again
            </button>
            
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

export default ConnectRefreshPage;