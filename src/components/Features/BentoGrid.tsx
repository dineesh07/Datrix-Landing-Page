import React from 'react';
import { FEATURES, Feature } from '@/lib/features.config';

// Inline SVGs for precise CSS styling (e.g., stroke, fill, hover transformations)
export function FeatureIcon({ name, className = "w-6 h-6" }: { name: string; className?: string }) {
  switch (name) {
    case 'arrow-path.svg':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
      );
    case 'cog-8-tooth.svg':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93c.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204c.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78c-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107c-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93c-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204c-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78c.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107c.397-.165.71-.505.78-.929l.15-.894Z" />
          <path d="M15 12a3 3 0 1 1-6 0a3 3 0 0 1 6 0Z" />
        </svg>
      );
    case 'link.svg':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
        </svg>
      );
    case 'arrow-trending-up.svg':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 0 1 5.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
        </svg>
      );
    case 'cube-16-solid.svg':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 16 16" fill="currentColor">
          <path d="M8.372 1.349a.75.75 0 0 0-.744 0l-4.81 2.748L8 7.131l5.182-3.034zM14 5.357L8.75 8.43v6.005l4.872-2.784A.75.75 0 0 0 14 11zm-6.75 9.078V8.43L2 5.357V11c0 .27.144.518.378.651z" />
        </svg>
      );
    case 'chart-pie.svg':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
          <path d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
        </svg>
      );
    default:
      return null;
  }
}

interface BentoGridProps {
  activeHoverIndex: number | null;
  setActiveHoverIndex: (index: number | null) => void;
}

export default function BentoGrid({ activeHoverIndex, setActiveHoverIndex }: BentoGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto px-6">
      {FEATURES.map((feature: Feature) => {
        const isHovered = activeHoverIndex === feature.index;
        
        // Split sentence for short/full text swap reveal
        const sentences = feature.description.split('. ');
        const shortText = sentences[0] + (sentences.length > 1 ? '.' : '');
        
        return (
          <div
            key={feature.index}
            className={`group relative p-8 rounded-2xl border transition-all duration-layout flex flex-col justify-between overflow-hidden glass-panel min-h-[320px] ${
              feature.span === 'wide' ? 'md:col-span-2' : 'md:col-span-1'
            } ${
              isHovered 
                ? 'border-forsythia/40 shadow-lg shadow-forsythia/5 scale-[1.01]' 
                : 'border-mystic-mint/10'
            }`}
            onMouseEnter={() => setActiveHoverIndex(feature.index)}
            onMouseLeave={() => setActiveHoverIndex(null)}
          >
            {/* Glow Overlay */}
            <div className="hover-ellipse group-hover:opacity-100" />

            {/* Ambient Background Accent on Hover */}
            <div 
              className={`absolute top-0 right-0 w-[200px] h-[200px] bg-gradient-to-bl from-forsythia/5 to-transparent rounded-full blur-[60px] pointer-events-none transition-opacity duration-layout ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            />

            <div className="capability-overlay flex flex-col h-full relative z-10 w-full">
              {/* Card Header (Icon + Badge) */}
              <div className="flex items-center justify-between mb-8">
                <div 
                  className={`p-3.5 rounded-xl border transition-colors duration-micro ${
                    isHovered 
                      ? 'bg-forsythia text-oceanic-noir border-forsythia' 
                      : 'bg-mystic-mint/5 text-mystic-mint border-mystic-mint/10'
                  }`}
                >
                  <FeatureIcon name={feature.icon} className="w-6 h-6" />
                </div>

                {feature.badge && (
                  <span className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full bg-mystic-mint/10 text-mystic-mint border border-mystic-mint/20">
                    {feature.badge}
                  </span>
                )}
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold font-heading text-arctic-powder mb-3 group-hover:text-deep-saffron transition-colors duration-micro">
                {feature.title}
              </h3>
              
              <div className="relative overflow-hidden">
                <p className="text-sm leading-relaxed text-mystic-mint/75 font-body cap-short-text mb-4">
                  {shortText}
                </p>
                <p className="text-sm leading-relaxed text-mystic-mint/90 font-body cap-full-text">
                  {feature.description}
                </p>
              </div>
            </div>

            {/* Bottom highlight border line */}
            <div 
              className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-forsythia to-deep-saffron transition-transform duration-layout ${
                isHovered ? 'scale-x-100' : 'scale-x-0'
              }`}
            />
          </div>
        );
      })}

      {/* Row 3 - Column 3 Stats/CTA Bento Cell */}
      <div 
        className="group relative p-8 rounded-2xl border border-mystic-mint/10 glass-panel text-arctic-powder flex flex-col justify-between md:col-span-1 overflow-hidden min-h-[320px]"
      >
        <div className="hover-ellipse group-hover:opacity-100" />
        <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-deep-saffron/5 rounded-full blur-[50px] pointer-events-none" />
        
        <div className="relative z-10">
          <div className="p-3.5 rounded-xl bg-mystic-mint/5 text-forsythia border border-mystic-mint/10 w-fit mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
          </div>
          
          <h3 className="text-xl font-bold font-heading text-arctic-powder mb-3">
            Developer Sandbox
          </h3>
          <p className="text-sm leading-relaxed text-mystic-mint/70 font-body">
            Spin up a secure test environment locally. Execute logic gates, mock API connections, and run data stream sandboxes.
          </p>
        </div>

        <a 
          href="#pricing"
          className="mt-8 text-xs font-semibold tracking-wider uppercase text-forsythia hover:text-deep-saffron transition-colors duration-micro flex items-center gap-1.5 relative z-10"
        >
          Access developer docs
          <span className="group-hover:translate-x-1 transition-transform duration-micro font-bold">&rarr;</span>
        </a>
      </div>
    </div>
  );
}
