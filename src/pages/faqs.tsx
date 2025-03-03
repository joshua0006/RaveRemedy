import React from 'react';
import { PageLayout } from '../components/Layout/PageLayout';
import { FAQAccordion } from '../components/FAQ/FAQAccordion';
import { HelpCircle, Truck, Shield, Clock, Leaf, Phone } from 'lucide-react';
import { SEO } from '../components/SEO';

// Expanded FAQ categories with more detailed answers
const FAQ_CATEGORIES = [
  {
    title: "Shipping & Delivery",
    icon: <Truck className="w-12 h-12 text-[#ff00ff]" />,
    questions: [
      {
        question: "How long does shipping take?",
        answer: "We offer express shipping across Australia, with most orders arriving within 2-3 business days. Orders placed before 2 PM AEST on business days are typically dispatched the same day. Plus, orders of 2 or more tubs qualify for free express shipping!"
      },
      {
        question: "Do you ship internationally?",
        answer: "Currently, we only ship within Australia to ensure product freshness and quality. We're working on expanding to other countries in the future."
      },
      {
        question: "How can I track my order?",
        answer: "Once your order is dispatched, you'll receive a tracking number via email. You can use this to track your package's journey right to your door."
      }
    ]
  },
  {
    title: "Product Safety",
    icon: <Shield className="w-12 h-12 text-[#ff00ff]" />,
    questions: [
      {
        question: "Are your supplements safe?",
        answer: "Absolutely! All RaveRemedy formulas are made with premium, natural ingredients in GMP-certified facilities. Every batch is rigorously tested for purity and potency to ensure you're getting a high-quality product.\n\nPlease note: RaveRemedy is classified as a dietary supplement and is not intended to treat, cure, or prevent any medical conditions. Always consult your healthcare provider before starting any new supplement."
      },
      {
        question: "Are there any side effects?",
        answer: "RaveRemedy is formulated with natural ingredients and is generally well-tolerated. However, as with any supplement, some individuals may experience mild effects like stomach discomfort if taken on an empty stomach. We recommend taking RaveRemedy with food and plenty of water."
      },
      {
        question: "What quality controls do you have in place?",
        answer: "Our products are manufactured in GMP-certified facilities with strict quality control measures. Each batch undergoes multiple testing phases for purity, potency, and safety before being approved for release."
      }
    ]
  },
  {
    title: "Usage & Timing",
    icon: <Clock className="w-12 h-12 text-[#ff00ff]" />,
    questions: [
      {
        question: "When should I take RaveRemedy?",
        answer: "For the best results:\n• Take one scoop with water the morning after your event\n• Continue taking one scoop daily for the next few days\n• Stay hydrated and follow the included Recovery Guide for optimal results"
      },
      {
        question: "How long does each tub last?",
        answer: "Each tub contains 20 servings. If used as recommended (1-3 days after each event), one tub can support recovery for 6-10 events, depending on your usage pattern."
      },
      {
        question: "Can I take RaveRemedy preventatively?",
        answer: "While RaveRemedy is primarily designed for post-event recovery, it can be taken before events to support your body's natural resilience. Just ensure you're well-hydrated and have eaten properly."
      }
    ]
  },
  {
    title: "Ingredients & Nutrition",
    icon: <Leaf className="w-12 h-12 text-[#ff00ff]" />,
    questions: [
      {
        question: "What are the main ingredients?",
        answer: "RaveRemedy contains a premium blend of:\n• Electrolytes for hydration\n• B-Vitamins for energy\n• Antioxidants for recovery\n• Minerals for balance\n• Amino acids for mood support\n\nAll ingredients are carefully selected and dosed based on scientific research."
      },
      {
        question: "Is RaveRemedy vegan-friendly?",
        answer: "Yes! RaveRemedy is 100% vegan-friendly and contains no animal products or by-products. We're committed to creating products that everyone can enjoy."
      },
      {
        question: "Are there any allergens?",
        answer: "RaveRemedy is free from major allergens including gluten, dairy, soy, and nuts. However, it is manufactured in a facility that processes other supplements. Please check the full ingredient list if you have specific allergies."
      }
    ]
  },
  {
    title: "Returns & Support",
    icon: <HelpCircle className="w-12 h-12 text-[#ff00ff]" />,
    questions: [
      {
        question: "What's your return policy?",
        answer: "We stand by our product with a 30-day satisfaction guarantee. If you're not completely happy with your purchase, contact our support team for a full refund or replacement."
      },
      {
        question: "How can I contact support?",
        answer: "Our support team is available through multiple channels:\n• Email: support@raveremedy.com\n• Phone: 0413 624 455\n• Social Media: @raveremedyau\n\nWe aim to respond to all inquiries within 24 hours."
      }
    ]
  }
];

const FAQsPage: React.FC = () => {
  return (
    <PageLayout>
      <SEO 
        title="Frequently Asked Questions"
        description="Find answers to common questions about RaveRemedy's recovery supplements, shipping, ingredients, and more. Everything you need to know about our products."
      />
      <div className="pt-32 pb-16">
        {/* Hero Section */}
        <div className="relative mb-24">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80"
              alt="FAQ background"
              className="w-full h-[50vh] object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/40 to-black" />
          </div>
          
          <div className="relative max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold gradient-text mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Everything you need to know about RaveRemedy and our premium recovery supplements.
            </p>
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="max-w-6xl mx-auto px-4">
          {FAQ_CATEGORIES.map((category, index) => (
            <div key={index} className="mb-16">
              <div className="flex items-center gap-4 mb-8">
                {category.icon}
                <h2 className="text-3xl font-bold gradient-text">{category.title}</h2>
              </div>
              
              <div className="space-y-4">
                {category.questions.map((faq, faqIndex) => (
                  <FAQAccordion
                    key={faqIndex}
                    question={faq.question}
                    answer={faq.answer}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Support Section */}
        <div className="max-w-4xl mx-auto px-4 mt-24">
          <div className="glass-panel rounded-3xl p-8 md:p-12 text-center">
            <Phone className="w-16 h-16 text-[#ff00ff] mx-auto mb-6" />
            <h2 className="text-3xl font-bold gradient-text mb-4">Still Have Questions?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Our support team is here to help! Reach out to us anytime and we'll get back to you within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:support@raveremedy.com"
                className="px-8 py-3 bg-gradient-to-r from-[#ff00ff] via-[#ff66ff] to-[#00ffff] text-white rounded-xl font-bold hover:opacity-90 transition-all"
              >
                Email Support
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

export default FAQsPage;