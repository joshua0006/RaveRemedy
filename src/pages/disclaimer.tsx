import React from 'react';
import { PageLayout } from '../components/Layout/PageLayout';
import { AlertTriangle, Leaf, Shield, HeartPulse, Scale, Bell } from 'lucide-react';
import { SEO } from '../components/SEO';

const DisclaimerPage: React.FC = () => {
  return (
    <PageLayout>
      <SEO 
        title="Disclaimer"
        description="Important information about RaveRemedy's products and services. Read our health and safety notices, legal disclaimers, and product usage guidelines."
      />
      <div className="pt-32 pb-16">
        {/* Hero Section */}
        <div className="relative mb-24">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80"
              alt="Disclaimer background"
              className="w-full h-[50vh] object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/40 to-black" />
          </div>
          
          <div className="relative max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold gradient-text mb-6">
              Disclaimer
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Important information about our products and your use of our services.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4">
          {/* General Notice */}
          <div className="glass-panel rounded-3xl p-8 md:p-12 mb-8">
            <div className="flex items-center gap-4 mb-6">
              <AlertTriangle className="w-12 h-12 text-[#ff00ff]" />
              <h2 className="text-3xl font-bold gradient-text">General Notice</h2>
            </div>
            <p className="text-gray-300 mb-4">
              The information provided on this website and our products is for general informational purposes only. While we strive to keep the information up to date and accurate, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information, products, services, or related graphics contained on the website.
            </p>
            <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
              <p className="text-[#ff00ff] font-semibold mb-2">Please Note:</p>
              <p className="text-gray-300">
                Any reliance you place on such information is strictly at your own risk. We will not be liable for any loss or damage arising from your use of our products or website.
              </p>
            </div>
          </div>

          {/* Dietary Supplement Notice */}
          <div className="glass-panel rounded-3xl p-8 md:p-12 mb-8">
            <div className="flex items-center gap-4 mb-6">
              <Leaf className="w-12 h-12 text-[#ff00ff]" />
              <h2 className="text-3xl font-bold gradient-text">Dietary Supplement Notice</h2>
            </div>
            <div className="space-y-6">
              <p className="text-gray-300">
                RaveRemedy products are dietary supplements. These statements have not been evaluated by the Therapeutic Goods Administration (TGA). This product is not intended to diagnose, treat, cure, or prevent any disease.
              </p>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Important Information:</h3>
                <ul className="list-disc pl-6 text-gray-300 space-y-2">
                  <li>Results may vary between individuals</li>
                  <li>Not a substitute for medical treatment</li>
                  <li>Consult healthcare provider before use</li>
                  <li>Not recommended during pregnancy or nursing</li>
                  <li>Keep out of reach of children</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Health & Safety */}
          <div className="glass-panel rounded-3xl p-8 md:p-12 mb-8">
            <div className="flex items-center gap-4 mb-6">
              <HeartPulse className="w-12 h-12 text-[#ff00ff]" />
              <h2 className="text-3xl font-bold gradient-text">Health & Safety</h2>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Medical Conditions</h3>
                <p className="text-gray-300">
                  If you have any medical conditions, are taking medications, or have concerns about using our products, please consult your healthcare provider before use. Discontinue use and seek medical attention if you experience any adverse reactions.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">Allergies & Sensitivities</h3>
                <p className="text-gray-300">
                  While our products are manufactured in facilities that follow strict quality control procedures, they may contain ingredients that could cause allergic reactions in some individuals. Review all ingredients carefully before use.
                </p>
              </div>
            </div>
          </div>

          {/* Legal Disclaimers */}
          <div className="glass-panel rounded-3xl p-8 md:p-12 mb-8">
            <div className="flex items-center gap-4 mb-6">
              <Scale className="w-12 h-12 text-[#ff00ff]" />
              <h2 className="text-3xl font-bold gradient-text">Legal Disclaimers</h2>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Limitation of Liability</h3>
                <p className="text-gray-300">
                  To the fullest extent permitted by applicable law, RaveRemedy shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">Content Disclaimer</h3>
                <p className="text-gray-300">
                  The content on our website is provided for informational purposes only. We do not guarantee the accuracy, completeness, or usefulness of this information. Any action you take upon the information on our website is strictly at your own risk.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="glass-panel rounded-3xl p-8 md:p-12 text-center">
            <Bell className="w-16 h-16 text-[#ff00ff] mx-auto mb-6" />
            <h2 className="text-3xl font-bold gradient-text mb-4">Questions or Concerns?</h2>
            <p className="text-xl text-gray-300 mb-8">
              If you have any questions about this disclaimer or our products, please contact our support team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:support@raveremedy.com"
                className="px-8 py-3 bg-gradient-to-r from-[#ff00ff] via-[#ff66ff] to-[#00ffff] text-white rounded-xl font-bold hover:opacity-90 transition-all"
              >
                Contact Support
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

export default DisclaimerPage;