import React, { useState } from 'react';
import { PageLayout } from '../components/Layout/PageLayout';
import { Star, Truck, Shield, Package, Clock } from 'lucide-react';
import { ProductSection } from '../components/Product/ProductSection';
import { SEO } from '../components/SEO';

const ShopPage: React.FC = () => {
  return (
    <PageLayout>
      <SEO 
        title="Shop Recovery Supplements"
        description="Premium post-rave recovery supplements in three delicious flavors. Free express shipping on orders of 2+ tubs. Natural ingredients, scientifically formulated."
      />
      <div className="pt-32 pb-16">
        {/* Hero Section */}
        <div className="relative mb-24">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80"
              alt="Shop background"
              className="w-full h-[50vh] object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/40 to-black" />
          </div>
          
          <div className="relative max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold gradient-text mb-6">
              RaveRemedy Shop
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Premium post-rave recovery supplements to help you bounce back faster.
            </p>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="max-w-7xl mx-auto px-4 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="glass-panel rounded-xl p-6 text-center hover-glow">
              <Star className="w-12 h-12 text-[#ff00ff] mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">Premium Quality</h3>
              <p className="text-gray-300">Natural ingredients, scientifically formulated</p>
            </div>
            
            <div className="glass-panel rounded-xl p-6 text-center hover-glow">
              <Truck className="w-12 h-12 text-[#ff00ff] mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">Free Shipping</h3>
              <p className="text-gray-300">On orders of 2 or more tubs</p>
            </div>
            
            <div className="glass-panel rounded-xl p-6 text-center hover-glow">
              <Shield className="w-12 h-12 text-[#ff00ff] mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">Money-Back Guarantee</h3>
              <p className="text-gray-300">30-day satisfaction guarantee</p>
            </div>
            
            <div className="glass-panel rounded-xl p-6 text-center hover-glow">
              <Clock className="w-12 h-12 text-[#ff00ff] mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">Fast Delivery</h3>
              <p className="text-gray-300">2-3 business days Australia-wide</p>
            </div>
          </div>
        </div>

        {/* Product Section */}
        <ProductSection />

        {/* Additional Information */}
        <div className="max-w-4xl mx-auto px-4 mt-16">
          <div className="glass-panel rounded-3xl p-8 md:p-12">
            <div className="flex items-center gap-4 mb-8">
              <Package className="w-12 h-12 text-[#ff00ff]" />
              <h2 className="text-3xl font-bold gradient-text">Product Details</h2>
            </div>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-3">What's Inside</h3>
                <ul className="list-disc pl-6 text-gray-300 space-y-2">
                  <li>Premium Electrolyte Formula (1000mg)</li>
                  <li>Vitamin B-Complex for Energy (100mg)</li>
                  <li>High-Dose Vitamin C (1000mg)</li>
                  <li>Magnesium for Recovery (200mg)</li>
                  <li>N-Acetylcysteine for Liver Support (600mg)</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">Usage Instructions</h3>
                <ul className="list-disc pl-6 text-gray-300 space-y-2">
                  <li>Mix one scoop with 300-500ml of water</li>
                  <li>Take the morning after your event</li>
                  <li>Can be taken for 1-3 days post-event</li>
                  <li>Best served chilled</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">Storage</h3>
                <ul className="list-disc pl-6 text-gray-300 space-y-2">
                  <li>Store in a cool, dry place</li>
                  <li>Keep sealed when not in use</li>
                  <li>Use within 6 months of opening</li>
                  <li>Keep out of direct sunlight</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ShopPage;