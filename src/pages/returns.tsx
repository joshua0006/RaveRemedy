import React from 'react';
import { PageLayout } from '../components/Layout/PageLayout';
import { RefreshCw, Package, Truck, Clock, CreditCard, Bell } from 'lucide-react';
import { SEO } from '../components/SEO';

const ReturnsPage: React.FC = () => {
  return (
    <PageLayout>
      <SEO 
        title="Returns Policy"
        description="Learn about RaveRemedy's 30-day satisfaction guarantee and hassle-free return process. We want you to be completely satisfied with your purchase."
      />
      <div className="pt-32 pb-16">
        {/* Hero Section */}
        <div className="relative mb-24">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80"
              alt="Returns Policy background"
              className="w-full h-[50vh] object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/40 to-black" />
          </div>
          
          <div className="relative max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold gradient-text mb-6">
              Returns Policy
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              We want you to be completely satisfied with your purchase. Learn about our hassle-free return process.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4">
          {/* Satisfaction Guarantee */}
          <div className="glass-panel rounded-3xl p-8 md:p-12 mb-8">
            <div className="flex items-center gap-4 mb-6">
              <RefreshCw className="w-12 h-12 text-[#ff00ff]" />
              <h2 className="text-3xl font-bold gradient-text">30-Day Satisfaction Guarantee</h2>
            </div>
            <p className="text-gray-300 mb-4">
              We stand behind the quality of our products with a 30-day money-back guarantee. If you're not completely satisfied with your purchase, we'll make it right.
            </p>
            <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
              <p className="text-[#ff00ff] font-semibold mb-2">Important Note:</p>
              <p className="text-gray-300">
                The 30-day period begins from the date of delivery, as confirmed by our shipping partners.
              </p>
            </div>
          </div>

          {/* Return Eligibility */}
          <div className="glass-panel rounded-3xl p-8 md:p-12 mb-8">
            <div className="flex items-center gap-4 mb-6">
              <Package className="w-12 h-12 text-[#ff00ff]" />
              <h2 className="text-3xl font-bold gradient-text">Return Eligibility</h2>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Eligible Items</h3>
                <ul className="list-disc pl-6 text-gray-300 space-y-2">
                  <li>Unopened products in original packaging</li>
                  <li>Partially used products (if unsatisfied with results)</li>
                  <li>Damaged or defective items</li>
                  <li>Incorrect items received</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">Non-Eligible Items</h3>
                <ul className="list-disc pl-6 text-gray-300 space-y-2">
                  <li>Products purchased more than 30 days ago</li>
                  <li>Items with removed or damaged safety seals</li>
                  <li>Products not purchased directly from RaveRemedy</li>
                  <li>Free promotional items or gifts</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Return Process */}
          <div className="glass-panel rounded-3xl p-8 md:p-12 mb-8">
            <div className="flex items-center gap-4 mb-6">
              <Truck className="w-12 h-12 text-[#ff00ff]" />
              <h2 className="text-3xl font-bold gradient-text">Return Process</h2>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl">
                <div className="w-8 h-8 bg-[#ff00ff] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Contact Support</h3>
                  <p className="text-gray-300">
                    Email our support team at returns@raveremedy.com with your order number and reason for return.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl">
                <div className="w-8 h-8 bg-[#ff00ff] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Receive Return Authorization</h3>
                  <p className="text-gray-300">
                    We'll review your request and send return authorization with shipping instructions within 24 hours.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl">
                <div className="w-8 h-8 bg-[#ff00ff] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Ship the Item</h3>
                  <p className="text-gray-300">
                    Package the item securely and ship it to our returns center using the provided instructions.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl">
                <div className="w-8 h-8 bg-[#ff00ff] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">4</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Receive Refund</h3>
                  <p className="text-gray-300">
                    Once we receive and process your return, we'll issue a refund to your original payment method.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Refund Information */}
          <div className="glass-panel rounded-3xl p-8 md:p-12 mb-8">
            <div className="flex items-center gap-4 mb-6">
              <CreditCard className="w-12 h-12 text-[#ff00ff]" />
              <h2 className="text-3xl font-bold gradient-text">Refund Information</h2>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Processing Time</h3>
                <ul className="list-disc pl-6 text-gray-300 space-y-2">
                  <li>Returns are processed within 2 business days of receipt</li>
                  <li>Refunds are issued to original payment method</li>
                  <li>Bank processing time: 5-7 business days</li>
                  <li>You'll receive email confirmation once refund is processed</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">Refund Amount</h3>
                <ul className="list-disc pl-6 text-gray-300 space-y-2">
                  <li>Full product price refunded</li>
                  <li>Original shipping costs are non-refundable</li>
                  <li>Return shipping costs are customer responsibility</li>
                  <li>Store credit option available upon request</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="glass-panel rounded-3xl p-8 md:p-12 text-center">
            <Bell className="w-16 h-16 text-[#ff00ff] mx-auto mb-6" />
            <h2 className="text-3xl font-bold gradient-text mb-4">Need Help with a Return?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Our support team is here to help make your return process as smooth as possible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/return-form"
                className="px-8 py-3 bg-gradient-to-r from-[#ff00ff] via-[#ff66ff] to-[#00ffff] text-white rounded-xl font-bold hover:opacity-90 transition-all"
              >
                Start Return Process
              </a>
              <a 
                href="/contact"
                className="px-8 py-3 bg-white/10 text-white rounded-xl font-bold hover:bg-white/20 transition-colors"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ReturnsPage;