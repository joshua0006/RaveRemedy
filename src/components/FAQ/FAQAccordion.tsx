import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQAccordionProps {
  question: string;
  answer: string;
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="glass-panel rounded-2xl border border-white/10 hover:border-[#ff00ff]/20 transition-all duration-300 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-semibold pr-8">{question}</span>
        {isOpen ? (
          <ChevronUp className="w-6 h-6 text-[#ff00ff] flex-shrink-0" />
        ) : (
          <ChevronDown className="w-6 h-6 text-[#ff00ff] flex-shrink-0" />
        )}
      </button>
      
      {isOpen && (
        <div className="px-6 pb-4">
          <div className="pt-2 border-t border-white/10">
            {answer.split('\n').map((line, index) => (
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
  );
}