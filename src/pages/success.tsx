import React, { useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { SEO } from '../components/SEO';

const SuccessPage: React.FC = () => {
  useEffect(() => {
    // You could add analytics tracking here
  }, []);

  return (
    <>
      <SEO 
        title="Order Successful"
        description="Thank you for your RaveRemedy order! Your recovery supplements are on their way. Track your order and get ready for faster recovery."
      />
      <div className="min-h-screen bg-gradient-to-b from-black via-purple-900/20 to-black text-white flex items-center justify-center">
        <div className="max-w-md w-full mx-auto px-4">
          <div className="glass-panel rounded-3xl p-8 text-center">
            <div className="flex justify-center mb-6">
              <CheckCircle className="w-20 h-20 text-[#ff00ff]" />
            </div>
            
            <h1 className="text-3xl font-bold gradient-text mb-4">
              Order Successful!
            </h1>
            
            <p className="text-lg text-gray-300 mb-6">
              Thank you for your purchase! Your RaveRemedy is on its way to you.
            </p>
            
            <p className="text-gray-400 mb-8">
              You'll receive a confirmation email shortly with your order details and tracking information.
            </p>
            
            <div className="space-y-4">
              <a 
                href="/"
                className="block w-full bg-gradient-to-r from-[#ff00ff] via-[#ff66ff] to-[#00ffff] text-white px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-all"
              >
                Return to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuccessPage;