'use client';

import React, { useState, useEffect } from 'react';
import BentoGrid from './BentoGrid';
import Accordion from './Accordion';

export default function FeaturesSection() {
  const [activeDesktopIndex, setActiveDesktopIndex] = useState<number | null>(null);
  const [activeAccordionIndex, setActiveAccordionIndex] = useState<number | null>(0); // Default to first item open

  // Debounced window resize handler to transfer state context from desktop bento hover to mobile accordion
  useEffect(() => {
    let resizeTimer: NodeJS.Timeout;
    
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const isMobile = window.innerWidth < 768;
        if (isMobile && activeDesktopIndex !== null) {
          // Transfer context: open the same index in accordion
          setActiveAccordionIndex(activeDesktopIndex);
        }
      }, 100); // 100ms debounce
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, [activeDesktopIndex]);

  return (
    <section 
      id="features" 
      aria-labelledby="features-heading" 
      className="py-24 bg-oceanic-noir/40 border-t border-b border-mystic-mint/10"
    >
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <h2 
          id="features-heading" 
          className="text-3xl sm:text-4xl font-bold font-heading text-arctic-powder mb-4"
        >
          Built Different. By Design.
        </h2>
        <p className="text-base text-mystic-mint/85 max-w-2xl mx-auto font-body">
          Every feature engineered for teams that can&apos;t afford to be slow.
        </p>
      </div>

      {/* Desktop View: Bento Grid */}
      <div className="hidden md:block">
        <BentoGrid 
          activeHoverIndex={activeDesktopIndex} 
          setActiveHoverIndex={setActiveDesktopIndex} 
        />
      </div>

      {/* Mobile View: Accordion */}
      <div className="block md:hidden">
        <Accordion 
          activeIndex={activeAccordionIndex} 
          setActiveIndex={setActiveAccordionIndex} 
        />
      </div>
    </section>
  );
}
