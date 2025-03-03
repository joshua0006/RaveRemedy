import React from 'react';
import { Facebook, Instagram, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative -mt-12 py-12 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black/90" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80')] opacity-5 mix-blend-overlay" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <img 
              src="/01.png"
              alt="RaveRemedy Logo"
              className="h-12 w-auto object-contain cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            />
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 gradient-text">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="/about"
                  className="text-gray-400 hover:text-[#ff00ff] transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a 
                  href="/contact"
                  className="text-gray-400 hover:text-[#ff00ff] transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <a 
                  href="/faqs"
                  className="text-gray-400 hover:text-[#ff00ff] transition-colors"
                >
                  FAQs
                </a>
              </li>
              <li>
                <a 
                  href="/shop"
                  className="text-gray-400 hover:text-[#ff00ff] transition-colors"
                >
                  Buy Now
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4 gradient-text">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="/privacy"
                  className="text-gray-400 hover:text-[#ff00ff] transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a 
                  href="/terms"
                  className="text-gray-400 hover:text-[#ff00ff] transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a 
                  href="/returns"
                  className="text-gray-400 hover:text-[#ff00ff] transition-colors"
                >
                  Return Policy
                </a>
              </li>
              <li>
                <a 
                  href="/disclaimer"
                  className="text-gray-400 hover:text-[#ff00ff] transition-colors"
                >
                  Disclaimer
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 gradient-text">Get in Touch</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">
                <a href="tel:0413624455" className="hover:text-[#ff00ff] transition-colors">
                  0413 624 455
                </a>
              </li>
              <li className="text-gray-400">
                <a href="mailto:contact@raveremedy.com" className="hover:text-[#ff00ff] transition-colors">
                  contact@raveremedy.com
                </a>
              </li>
            </ul>
            <div className="flex space-x-4 mt-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-[#ff00ff] transition-colors"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a 
                href="https://www.instagram.com/raveremedyau/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-[#ff00ff] transition-colors"
              >
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} RaveRemedy. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm flex items-center">
              Made with <Heart className="w-4 h-4 text-[#ff00ff] mx-1" /> in Australia
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};