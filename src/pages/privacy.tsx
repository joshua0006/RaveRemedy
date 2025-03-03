import React from 'react';
import { PageLayout } from '../components/Layout/PageLayout';
import { Shield, Lock, Eye, Database, Bell, UserCheck } from 'lucide-react';
import { SEO } from '../components/SEO';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <PageLayout>
      <SEO 
        title="Privacy Policy"
        description="Learn how RaveRemedy collects, uses, and protects your personal information. Our commitment to your privacy and data security."
      />
      <div className="pt-32 pb-16">
        {/* Hero Section */}
        <div className="relative mb-24">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80"
              alt="Privacy Policy background"
              className="w-full h-[50vh] object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/40 to-black" />
          </div>
          
          <div className="relative max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold gradient-text mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Your privacy is important to us. Learn how we collect, use, and protect your personal information.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4">
          {/* Introduction */}
          <div className="glass-panel rounded-3xl p-8 md:p-12 mb-8">
            <div className="flex items-center gap-4 mb-6">
              <Shield className="w-12 h-12 text-[#ff00ff]" />
              <h2 className="text-3xl font-bold gradient-text">Introduction</h2>
            </div>
            <p className="text-gray-300 mb-4">
              This Privacy Policy explains how RaveRemedy ("we", "us", or "our") collects, uses, and protects your personal information when you use our website and services. By using our services, you agree to the collection and use of information in accordance with this policy.
            </p>
            <p className="text-gray-300">
              Last updated: March 15, 2024
            </p>
          </div>

          {/* Information Collection */}
          <div className="glass-panel rounded-3xl p-8 md:p-12 mb-8">
            <div className="flex items-center gap-4 mb-6">
              <Database className="w-12 h-12 text-[#ff00ff]" />
              <h2 className="text-3xl font-bold gradient-text">Information We Collect</h2>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Personal Information</h3>
                <p className="text-gray-300 mb-2">We collect information that you provide directly to us, including:</p>
                <ul className="list-disc pl-6 text-gray-300 space-y-2">
                  <li>Name and contact information</li>
                  <li>Billing and shipping addresses</li>
                  <li>Payment information</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>Order history and preferences</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">Automatically Collected Information</h3>
                <p className="text-gray-300 mb-2">When you visit our website, we automatically collect:</p>
                <ul className="list-disc pl-6 text-gray-300 space-y-2">
                  <li>IP address and device information</li>
                  <li>Browser type and settings</li>
                  <li>Browsing activity and patterns</li>
                  <li>Referral sources</li>
                  <li>Time spent on our website</li>
                </ul>
              </div>
            </div>
          </div>

          {/* How We Use Information */}
          <div className="glass-panel rounded-3xl p-8 md:p-12 mb-8">
            <div className="flex items-center gap-4 mb-6">
              <Eye className="w-12 h-12 text-[#ff00ff]" />
              <h2 className="text-3xl font-bold gradient-text">How We Use Your Information</h2>
            </div>
            <p className="text-gray-300 mb-4">We use the collected information for various purposes:</p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2">
              <li>Process and fulfill your orders</li>
              <li>Send order confirmations and updates</li>
              <li>Provide customer support</li>
              <li>Send marketing communications (with your consent)</li>
              <li>Improve our products and services</li>
              <li>Analyze website performance and user behavior</li>
              <li>Prevent fraud and enhance security</li>
              <li>Comply with legal obligations</li>
            </ul>
          </div>

          {/* Data Protection */}
          <div className="glass-panel rounded-3xl p-8 md:p-12 mb-8">
            <div className="flex items-center gap-4 mb-6">
              <Lock className="w-12 h-12 text-[#ff00ff]" />
              <h2 className="text-3xl font-bold gradient-text">Data Protection</h2>
            </div>
            <p className="text-gray-300 mb-4">
              We implement appropriate security measures to protect your personal information:
            </p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2">
              <li>SSL encryption for data transmission</li>
              <li>Secure payment processing through trusted providers</li>
              <li>Regular security audits and updates</li>
              <li>Limited access to personal information by authorized personnel</li>
              <li>Secure data storage and backup systems</li>
            </ul>
          </div>

          {/* Your Rights */}
          <div className="glass-panel rounded-3xl p-8 md:p-12 mb-8">
            <div className="flex items-center gap-4 mb-6">
              <UserCheck className="w-12 h-12 text-[#ff00ff]" />
              <h2 className="text-3xl font-bold gradient-text">Your Rights</h2>
            </div>
            <p className="text-gray-300 mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Object to processing of your information</li>
              <li>Withdraw consent for marketing communications</li>
              <li>Request data portability</li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="glass-panel rounded-3xl p-8 md:p-12 text-center">
            <Bell className="w-16 h-16 text-[#ff00ff] mx-auto mb-6" />
            <h2 className="text-3xl font-bold gradient-text mb-4">Questions or Concerns?</h2>
            <p className="text-xl text-gray-300 mb-8">
              If you have any questions about our Privacy Policy or how we handle your information, please don't hesitate to contact us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:privacy@raveremedy.com"
                className="px-8 py-3 bg-gradient-to-r from-[#ff00ff] via-[#ff66ff] to-[#00ffff] text-white rounded-xl font-bold hover:opacity-90 transition-all"
              >
                Email Privacy Team
              </a>
              <a 
                href="/contact"
                className="px-8 py-3 bg-white/10 text-white rounded-xl font-bold hover:bg-white/20 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default PrivacyPolicyPage;