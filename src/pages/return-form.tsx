import React, { useState } from 'react';
import { PageLayout } from '../components/Layout/PageLayout';
import { Package, Send, Loader } from 'lucide-react';
import { SEO } from '../components/SEO';

interface ReturnFormData {
  orderNumber: string;
  email: string;
  reason: string;
  description: string;
  preference: 'refund' | 'replacement';
}

const ReturnFormPage: React.FC = () => {
  const [formData, setFormData] = useState<ReturnFormData>({
    orderNumber: '',
    email: '',
    reason: '',
    description: '',
    preference: 'refund'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const returnReasons = [
    'Unsatisfied with results',
    'Received wrong item',
    'Product damaged/defective',
    'Ordered by mistake',
    'Other'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitStatus('success');
      setFormData({
        orderNumber: '',
        email: '',
        reason: '',
        description: '',
        preference: 'refund'
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout>
      <SEO 
        title="Start Return Process"
        description="Initiate your RaveRemedy product return. Quick and easy return process with our online form. We'll process your request within 24 hours."
      />
      <div className="pt-32 pb-16">
        {/* Hero Section */}
        <div className="relative mb-24">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80"
              alt="Return Form background"
              className="w-full h-[50vh] object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/40 to-black" />
          </div>
          
          <div className="relative max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold gradient-text mb-6">
              Start Return Process
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Fill out the form below to initiate your return. We'll process your request within 24 hours.
            </p>
          </div>
        </div>

        {/* Return Form */}
        <div className="max-w-2xl mx-auto px-4">
          <div className="glass-panel rounded-3xl p-8 md:p-12">
            <div className="flex items-center gap-4 mb-8">
              <Package className="w-12 h-12 text-[#ff00ff]" />
              <h2 className="text-3xl font-bold gradient-text">Return Request Form</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-400 mb-2">
                  Order Number*
                </label>
                <input
                  type="text"
                  id="orderNumber"
                  value={formData.orderNumber}
                  onChange={(e) => setFormData(prev => ({ ...prev, orderNumber: e.target.value }))}
                  required
                  className="w-full bg-white/10 text-white border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-[#ff00ff] transition-colors"
                  placeholder="e.g., RR-12345"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                  Email Address*
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  required
                  className="w-full bg-white/10 text-white border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-[#ff00ff] transition-colors"
                  placeholder="Enter the email used for order"
                />
              </div>

              <div>
                <label htmlFor="reason" className="block text-sm font-medium text-gray-400 mb-2">
                  Reason for Return*
                </label>
                <select
                  id="reason"
                  value={formData.reason}
                  onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value }))}
                  required
                  className="w-full"
                >
                  <option value="">Select a reason</option>
                  {returnReasons.map(reason => (
                    <option key={reason} value={reason}>{reason}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-400 mb-2">
                  Additional Details
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  className="w-full bg-white/10 text-white border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-[#ff00ff] transition-colors"
                  placeholder="Please provide any additional information about your return..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Preference*
                </label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      value="refund"
                      checked={formData.preference === 'refund'}
                      onChange={(e) => setFormData(prev => ({ ...prev, preference: e.target.value as 'refund' | 'replacement' }))}
                      className="text-[#ff00ff] focus:ring-[#ff00ff]"
                    />
                    <span className="text-gray-300">Refund to original payment method</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      value="replacement"
                      checked={formData.preference === 'replacement'}
                      onChange={(e) => setFormData(prev => ({ ...prev, preference: e.target.value as 'refund' | 'replacement' }))}
                      className="text-[#ff00ff] focus:ring-[#ff00ff]"
                    />
                    <span className="text-gray-300">Send replacement product</span>
                  </label>
                </div>
              </div>

              {submitStatus === 'success' && (
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-center">
                  Return request submitted successfully! We'll be in touch within 24 hours with next steps.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-center">
                  Something went wrong. Please try again or contact support.
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#ff00ff] via-[#ff66ff] to-[#00ffff] text-white px-6 py-4 rounded-xl font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Submit Return Request</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ReturnFormPage;