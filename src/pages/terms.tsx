import React from 'react';
import { PageLayout } from '../components/Layout/PageLayout';
import { Scale, ShieldCheck, CreditCard, Package, Bell, FileText } from 'lucide-react';
import { SEO } from '../components/SEO';

const TermsOfServicePage: React.FC = () => {
  return (
    <PageLayout>
      <SEO 
        title="Terms of Service"
        description="Read RaveRemedy's terms of service. Important information about your use of our website and products, including purchase terms and conditions."
      />
      <div className="pt-32 pb-16">
        {/* Hero Section */}
        <div className="relative mb-24">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80"
              alt="Terms of Service background"
              className="w-full h-[50vh] object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/40 to-black" />
          </div>
          
          <div className="relative max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold gradient-text mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Please read these terms carefully before using our services.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4">
          {/* Introduction */}
          <div className="glass-panel rounded-3xl p-8 md:p-12 mb-8">
            <div className="flex items-center gap-4 mb-6">
              <Scale className="w-12 h-12 text-[#ff00ff]" />
              <h2 className="text-3xl font-bold gradient-text">Agreement to Terms</h2>
            </div>
            <p className="text-gray-300 mb-4">
              These Terms of Service ("Terms") govern your access to and use of RaveRemedy's website, products, and services. By accessing or using our services, you agree to be bound by these Terms.
            </p>
            <p className="text-gray-300">
              Last updated: March 15, 2024
            </p>
          </div>

          {/* Account & Eligibility */}
          <div className="glass-panel rounded-3xl p-8 md:p-12 mb-8">
            <div className="flex items-center gap-4 mb-6">
              <ShieldCheck className="w-12 h-12 text-[#ff00ff]" />
              <h2 className="text-3xl font-bold gradient-text">Account & Eligibility</h2>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Account Creation</h3>
                <p className="text-gray-300 mb-2">When creating an account, you agree to:</p>
                <ul className="list-disc pl-6 text-gray-300 space-y-2">
                  <li>Provide accurate and complete information</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Promptly update any changes to your information</li>
                  <li>Accept responsibility for all activities under your account</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">Eligibility Requirements</h3>
                <p className="text-gray-300 mb-2">To use our services, you must:</p>
                <ul className="list-disc pl-6 text-gray-300 space-y-2">
                  <li>Be at least 18 years old</li>
                  <li>Have the legal capacity to enter into contracts</li>
                  <li>Reside in Australia</li>
                  <li>Not be prohibited from using our services by law</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Purchases & Payments */}
          <div className="glass-panel rounded-3xl p-8 md:p-12 mb-8">
            <div className="flex items-center gap-4 mb-6">
              <CreditCard className="w-12 h-12 text-[#ff00ff]" />
              <h2 className="text-3xl font-bold gradient-text">Purchases & Payments</h2>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Payment Terms</h3>
                <ul className="list-disc pl-6 text-gray-300 space-y-2">
                  <li>All prices are in Australian Dollars (AUD)</li>
                  <li>Payments are processed securely through Stripe</li>
                  <li>Orders are subject to availability and confirmation</li>
                  <li>We reserve the right to refuse any order</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">Shipping & Delivery</h3>
                <ul className="list-disc pl-6 text-gray-300 space-y-2">
                  <li>Free shipping on orders of 2 or more tubs</li>
                  <li>Standard shipping fees apply to single-tub orders</li>
                  <li>Delivery times are estimates only</li>
                  <li>Risk of loss passes to you upon delivery</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Product Policies */}
          <div className="glass-panel rounded-3xl p-8 md:p-12 mb-8">
            <div className="flex items-center gap-4 mb-6">
              <Package className="w-12 h-12 text-[#ff00ff]" />
              <h2 className="text-3xl font-bold gradient-text">Product Policies</h2>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Product Information</h3>
                <p className="text-gray-300 mb-4">
                  While we strive to provide accurate product information, we do not warrant that product descriptions, images, or other content are accurate, complete, reliable, current, or error-free.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">Returns & Refunds</h3>
                <ul className="list-disc pl-6 text-gray-300 space-y-2">
                  <li>30-day satisfaction guarantee</li>
                  <li>Unused portion must be returned</li>
                  <li>Return shipping costs are customer responsibility</li>
                  <li>Refunds processed within 5-7 business days</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Legal Disclaimers */}
          <div className="glass-panel rounded-3xl p-8 md:p-12 mb-8">
            <div className="flex items-center gap-4 mb-6">
              <FileText className="w-12 h-12 text-[#ff00ff]" />
              <h2 className="text-3xl font-bold gradient-text">Legal Disclaimers</h2>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Limitation of Liability</h3>
                <p className="text-gray-300 mb-4">
                  To the maximum extent permitted by law, RaveRemedy shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">Health Disclaimer</h3>
                <p className="text-gray-300 mb-4">
                  Our products are dietary supplements and are not intended to diagnose, treat, cure, or prevent any disease. Always consult your healthcare provider before starting any supplement regimen.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="glass-panel rounded-3xl p-8 md:p-12 text-center">
            <Bell className="w-16 h-16 text-[#ff00ff] mx-auto mb-6" />
            <h2 className="text-3xl font-bold gradient-text mb-4">Questions About Our Terms?</h2>
            <p className="text-xl text-gray-300 mb-8">
              If you have any questions about our Terms of Service, please contact our legal team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:legal@raveremedy.com"
                className="px-8 py-3 bg-gradient-to-r from-[#ff00ff] via-[#ff66ff] to-[#00ffff] text-white rounded-xl font-bold hover:opacity-90 transition-all"
              >
                Contact Legal Team
              </a>
              <a 
                href="/contact"
                className="px-8 py-3 bg-white/10 text-white rounded-xl font-bold hover:bg-white/20 transition-colors"
              >
                General Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default TermsOfServicePage;