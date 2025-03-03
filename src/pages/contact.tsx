import React, { useState } from 'react';
import { PageLayout } from '../components/Layout/PageLayout';
import { Mail, Phone, MapPin, Send, Loader } from 'lucide-react';
import { SEO } from '../components/SEO';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout>
      <SEO 
        title="Contact Us"
        description="Get in touch with RaveRemedy's support team. We're here to help with any questions about our recovery supplements or your order."
      />
      <div className="pt-32 pb-16">
        {/* Hero Section */}
        <div className="relative mb-24">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80"
              alt="Contact background"
              className="w-full h-[50vh] object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/40 to-black" />
          </div>
          
          <div className="relative max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold gradient-text mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Have questions about our products or need support? We're here to help!
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Contact Methods */}
            <div className="glass-panel rounded-2xl p-6 text-center hover-glow">
              <Phone className="w-12 h-12 text-[#ff00ff] mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Call Us</h3>
              <a 
                href="tel:0413624455" 
                className="text-gray-300 hover:text-[#ff00ff] transition-colors"
              >
                0413 624 455
              </a>
            </div>
            
            <div className="glass-panel rounded-2xl p-6 text-center hover-glow">
              <Mail className="w-12 h-12 text-[#ff00ff] mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Email Us</h3>
              <a 
                href="mailto:contact@raveremedy.com" 
                className="text-gray-300 hover:text-[#ff00ff] transition-colors"
              >
                contact@raveremedy.com
              </a>
            </div>
            
            <div className="glass-panel rounded-2xl p-6 text-center hover-glow">
              <MapPin className="w-12 h-12 text-[#ff00ff] mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Visit Us</h3>
              <p className="text-gray-300">
                Sydney, Australia
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto">
            <div className="glass-panel rounded-3xl p-8 md:p-12">
              <h2 className="text-3xl font-bold gradient-text mb-8 text-center">
                Send Us a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                    className="w-full bg-white/10 text-white border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-[#ff00ff] transition-colors"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    required
                    className="w-full bg-white/10 text-white border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-[#ff00ff] transition-colors"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                    required
                    className="w-full bg-white/10 text-white border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-[#ff00ff] transition-colors"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    required
                    rows={5}
                    className="w-full bg-white/10 text-white border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-[#ff00ff] transition-colors"
                    placeholder="Tell us what you need..."
                  />
                </div>

                {submitStatus === 'success' && (
                  <p className="text-green-400 text-center">
                    Thank you for your message! We'll get back to you soon.
                  </p>
                )}

                {submitStatus === 'error' && (
                  <p className="text-red-400 text-center">
                    Something went wrong. Please try again.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#ff00ff] via-[#ff66ff] to-[#00ffff] text-white px-6 py-4 rounded-xl font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ContactPage;