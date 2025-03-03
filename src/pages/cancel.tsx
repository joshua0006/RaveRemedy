import React from 'react';
import { XCircle, ArrowLeft } from 'lucide-react';
import { SEO } from '../components/SEO';

const CancelPage: React.FC = () => {
  return (
    <>
      <SEO 
        title="Order Cancelled"
        description="Your RaveRemedy order has been cancelled. No payment has been processed. Feel free to contact us if you have any questions."
      />
      <div className="min-h-screen bg-gradient-to-b from-black via-purple-900/20 to-black text-white flex items-center justify-center">
        <div className="max-w-md w-full mx-auto px-4">
          <div className="glass-panel rounded-3xl p-8 text-center">
            <div className="flex justify-center mb-6">
              <XCircle className="w-20 h-20 text-gray-500" />
            </div>
            
            <h1 className="text-3xl font-bold mb-4">
              Order Cancelled
            </h1>
            
            <p className="text-lg text-gray-300 mb-6">
              Your order has been cancelled and no payment has been processed.
            </p>
            
            <p className="text-gray-400 mb-8">
              If you experienced any issues during checkout or have questions about our products, please don't hesitate to contact our support team.
            </p>
            
            <div className="space-y-4">
              <a 
                href="/"
                className="flex items-center justify-center w-full bg-white/10 text-white px-6 py-3 rounded-xl font-bold hover:bg-white/20 transition-all"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Return to Store
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CancelPage;