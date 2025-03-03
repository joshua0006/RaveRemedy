/**
 * BenefitsScroll Component
 * 
 * Displays scrolling benefits cards with animations.
 */

import React from 'react';
import { FileWarning as Running, AlarmClock, Plane, Frown } from 'lucide-react';

const BENEFITS = [
  {
    icon: <Running className="w-12 h-12 text-[#ff00ff]" />,
    title: "Busy Week?",
    description: "Party hard and stay productive"
  },
  {
    icon: <AlarmClock className="w-12 h-12 text-[#ff00ff]" />,
    title: "Early Start?",
    description: "Show up fresh after late nights"
  },
  {
    icon: <Plane className="w-12 h-12 text-[#ff00ff]" />,
    title: "Festival Ready?",
    description: "Skip the recovery days"
  },
  {
    icon: <Frown className="w-12 h-12 text-[#ff00ff]" />,
    title: "Post-Party Blues?",
    description: "Bounce back stronger"
  }
];

export const BenefitsScroll: React.FC = () => {
  const tripleSetBenefits = [...BENEFITS, ...BENEFITS, ...BENEFITS];
  
  return (
    <div className="benefits-scroll-container">
      <div className="benefits-scroll-content">
        {tripleSetBenefits.map((benefit, index) => (
          <div key={index} className="benefit-card">
            <div className="group relative glass-panel rounded-xl p-6 border border-white/10 hover:border-[#ff00ff]/20 hover-glow cursor-pointer overflow-hidden h-[280px] w-[240px] flex items-center justify-center">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#ff00ff]/10 to-[#00ffff]/10 rounded-full blur-2xl transform translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-500" />
              <div className="relative flex flex-col items-center justify-center h-full w-full">
                <div className="w-16 h-16 mb-4">
                  {React.cloneElement(benefit.icon, { 
                    className: "w-16 h-16 text-[#ff00ff] group-hover:text-[#ff66ff] transition-colors duration-300"
                  })}
                </div>
                <h3 className="text-2xl font-bold gradient-text group-hover:from-[#ff00ff] group-hover:via-white group-hover:to-[#00ffff] transition-all duration-300 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-lg text-gray-300 group-hover:text-white transition-colors duration-300">
                  {benefit.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};