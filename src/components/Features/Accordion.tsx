import React from 'react';
import { FEATURES, Feature } from '@/lib/features.config';
import { FeatureIcon } from './BentoGrid';

interface AccordionProps {
  activeIndex: number | null;
  setActiveIndex: (index: number | null) => void;
}

export default function Accordion({ activeIndex, setActiveIndex }: AccordionProps) {
  return (
    <div className="max-w-xl mx-auto px-6 flex flex-col gap-4">
      {FEATURES.map((feature: Feature) => {
        const isOpen = activeIndex === feature.index;
        return (
          <div 
            key={feature.index}
            className={`accordion-item border rounded-xl overflow-hidden bg-nocturnal/15 transition-all duration-layout ${
              isOpen ? 'border-forsythia/40 shadow-md' : 'border-mystic-mint/10'
            }`}
            data-index={feature.index}
          >
            {/* Trigger Button */}
            <button
              id={`trigger-${feature.index}`}
              className="w-full flex items-center justify-between p-5 text-left font-semibold text-arctic-powder hover:bg-mystic-mint/5 transition-colors duration-micro"
              aria-expanded={isOpen}
              aria-controls={`panel-${feature.index}`}
              onClick={() => setActiveIndex(isOpen ? null : feature.index)}
            >
              <div className="flex items-center gap-3.5">
                <span className={`p-2 rounded-lg border transition-colors duration-micro ${
                  isOpen ? 'bg-forsythia text-oceanic-noir border-forsythia' : 'bg-mystic-mint/5 text-mystic-mint border-mystic-mint/10'
                }`}>
                  <FeatureIcon name={feature.icon} className="w-5 h-5" />
                </span>
                <span className="font-heading text-base text-arctic-powder">{feature.title}</span>
              </div>
              
              {/* Chevron Icon */}
              <svg 
                className={`w-5 h-5 transition-transform duration-layout ${isOpen ? 'rotate-180 text-deep-saffron' : 'text-mystic-mint/60'}`}
                viewBox="0 0 24 24" 
                fill="none"
                stroke="currentColor" 
                strokeWidth="1.5"
                strokeLinecap="round" 
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m19.5 8.25l-7.5 7.5l-7.5-7.5" />
              </svg>
            </button>

            {/* Expandable Content Area */}
            <div
              id={`panel-${feature.index}`}
              className={`accordion-content transition-all duration-layout overflow-hidden`}
              role="region"
              aria-labelledby={`trigger-${feature.index}`}
              style={{
                maxHeight: isOpen ? '240px' : '0px',
                opacity: isOpen ? 1 : 0
              }}
            >
              <div className="p-5 pt-0 border-t border-mystic-mint/10 mt-1">
                {feature.badge && (
                  <span className="inline-block text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full bg-mystic-mint/10 text-mystic-mint border border-mystic-mint/20 mb-3">
                    {feature.badge}
                  </span>
                )}
                
                <p className="text-sm leading-relaxed text-mystic-mint/75 font-body">
                  {feature.description}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
