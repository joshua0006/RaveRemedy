import React from 'react';
import { PageLayout } from '../components/Layout/PageLayout';
import { Heart, Star, Shield, Award, Users, Clock } from 'lucide-react';
import { SEO } from '../components/SEO';

const AboutPage: React.FC = () => {
  return (
    <PageLayout>
      <SEO 
        title="About Us"
        description="Learn about RaveRemedy's mission to help ravers stay healthy and energized. Discover our story, values, and commitment to the rave community."
      />
      <div className="pt-32 pb-16">
        {/* Hero Section */}
        <div className="relative mb-24">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80"
              alt="Rave background"
              className="w-full h-[50vh] object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/40 to-black" />
          </div>
          
          <div className="relative max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold gradient-text mb-6">
              Our Story
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Born from the heart of the rave community, RaveRemedy is dedicated to helping party-goers 
              stay healthy, energized, and ready for whatever comes next.
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <div className="max-w-4xl mx-auto px-4 mb-24">
          <div className="glass-panel rounded-3xl p-8 md:p-12 text-center">
            <Heart className="w-16 h-16 text-[#ff00ff] mx-auto mb-6" />
            <h2 className="text-3xl font-bold gradient-text mb-6">Our Mission</h2>
            <p className="text-xl text-gray-300">
              We believe in the power of music, community, and responsible partying. Our mission is to provide 
              premium recovery supplements that help ravers bounce back faster, stay healthier, and make the 
              most of every experience.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="max-w-6xl mx-auto px-4 mb-24">
          <h2 className="text-4xl font-bold gradient-text text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-panel rounded-2xl p-6 text-center hover-glow">
              <Shield className="w-12 h-12 text-[#ff00ff] mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Safety First</h3>
              <p className="text-gray-300">
                All our products are rigorously tested and made with premium ingredients in GMP-certified facilities.
              </p>
            </div>
            <div className="glass-panel rounded-2xl p-6 text-center hover-glow">
              <Star className="w-12 h-12 text-[#ff00ff] mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Quality Guaranteed</h3>
              <p className="text-gray-300">
                We never compromise on quality, using only the finest ingredients backed by scientific research.
              </p>
            </div>
            <div className="glass-panel rounded-2xl p-6 text-center hover-glow">
              <Users className="w-12 h-12 text-[#ff00ff] mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Community Focused</h3>
              <p className="text-gray-300">
                We're active members of the rave community, supporting events and promoting responsible partying.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="max-w-6xl mx-auto px-4 mb-24">
          <div className="glass-panel rounded-3xl p-8 md:p-12">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <Clock className="w-12 h-12 text-[#ff00ff] mx-auto mb-4" />
                <p className="text-4xl font-bold gradient-text mb-2">2-3 Days</p>
                <p className="text-gray-300">Express Delivery</p>
              </div>
              <div>
                <Award className="w-12 h-12 text-[#ff00ff] mx-auto mb-4" />
                <p className="text-4xl font-bold gradient-text mb-2">50k+</p>
                <p className="text-gray-300">Happy Customers</p>
              </div>
              <div>
                <Star className="w-12 h-12 text-[#ff00ff] mx-auto mb-4" />
                <p className="text-4xl font-bold gradient-text mb-2">4.9/5</p>
                <p className="text-gray-300">Customer Rating</p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold gradient-text text-center mb-12">Meet Our Team</h2>
          <div className="glass-panel rounded-3xl p-8 md:p-12 text-center">
            <p className="text-xl text-gray-300 mb-8">
              We're a team of ravers, health enthusiasts, and supplement experts dedicated to helping 
              you make the most of every event while staying healthy and energized.
            </p>
            <a 
              href="mailto:contact@raveremedy.com"
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-[#ff00ff] via-[#ff66ff] to-[#00ffff] text-white rounded-xl font-bold hover:opacity-90 transition-all"
            >
              Join Our Team
            </a>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default AboutPage;