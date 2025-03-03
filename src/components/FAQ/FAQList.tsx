/**
 * FAQList Component
 * 
 * Displays the list of FAQs in an accordion format.
 */

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQS = [
  {
    id: 1,
    question: "How long does shipping take?",
    answer: "We offer express shipping across Australia, with most orders arriving within 2-3 business days. Plus, orders of 2 or more tubs qualify for free express shipping!"
  },
  {
    id: 2,
    question: "Are your supplements safe?",
    answer: "Absolutely! All RaveRemedy formulas are made with premium, natural ingredients in GMP-certified facilities. Every batch is rigorously tested for purity and potency to ensure you're getting a high-quality product.\n\nPlease note: RaveRemedy is classified as a dietary supplement and is not intended to treat, cure, or prevent any medical conditions. Always consult your healthcare provider before starting any new supplement."
  },
  {
    id: 3,
    question: "When should I take RaveRemedy?",
    answer: "For the best results:\n• Take one scoop with water the morning after your event\n• Continue taking one scoop daily for the next few days\n• Stay hydrated and follow the included Recovery Guide for optimal results"
  },
  {
    id: 4,
    question: "Can I take RaveRemedy with other supplements?",
    answer: "RaveRemedy is designed to be safe when taken as directed. However, if you're taking other medications or supplements, we recommend consulting your healthcare provider to ensure compatibility."
  },
  {
    id: 5,
    question: "What's your return policy?",
    answer: "We stand by our product with a 30-day satisfaction guarantee. If you're not completely happy with your purchase, contact our support team for a full refund or replacement."
  }
];

export const FAQList: React.FC = () => {
  const [openFaqId, setOpenFaqId] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {FAQS.map((faq) => (
        <div
          key={faq.id}
          className="glass-panel rounded-2xl border border-white/10 hover:border-[#ff00ff]/20 transition-all duration-300 overflow-hidden"
        >
          <button
            onClick={() => setOpenFaqId(openFaqId === faq.id ? null : faq.id)}
            className="w-full text-left px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
          >
            <span className="text-lg font-semibold pr-8">{faq.question}</span>
            {openFaqId === faq.id ? (
              <ChevronUp className="w-6 h-6 text-[#ff00ff] flex-shrink-0" />
            ) : (
              <ChevronDown className="w-6 h-6 text-[#ff00ff] flex-shrink-0" />
            )}
          </button>
          
          {openFaqId === faq.id && (
            <div className="px-6 pb-4">
              <div className="pt-2 border-t border-white/10">
                {faq.answer.split('\n').map((line, index) => (
                  <p 
                    key={index} 
                    className={`text-gray-300 ${line.startsWith('•') ? 'pl-4' : ''} ${index > 0 ? 'mt-2' : ''}`}
                  >
                    {line}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};