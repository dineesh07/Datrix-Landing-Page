import React from 'react';

interface Testimonial {
  title: string;
  label: string;
  rating: number;
  quote: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    title: "Infrastructure that finally scales",
    label: "Vertex Labs",
    rating: 5,
    quote: "The reliability of Datrix is unmatched. We've migrated our entire neural pipeline to their edge nodes with zero downtime for our users.",
  },
  {
    title: "Saved us months of R&D",
    label: "FlowState AI",
    rating: 5,
    quote: "Instead of building our own agent logic from scratch, we used Datrix. We went from a prototype to a global production launch in weeks.",
  },
  {
    title: "Precision in every inference",
    label: "Neural Sync",
    rating: 5,
    quote: "The observability tools allow us to monitor agent accuracy in real-time. It has become a vital part of our model evaluation workflow.",
  },
  {
    title: "Enterprise-grade by default",
    label: "Sentinel Ops",
    rating: 5,
    quote: "The node-based builder is a game changer for our team. Even our non-technical stakeholders can now help map out complex agent behaviors.",
  },
];

export const STATS = [
  { value: "10,000+", label: "Teams" },
  { value: "200+", label: "Integrations" },
  { value: "99.99%", label: "Uptime SLA" },
  { value: "<50ms", label: "Avg. Latency" },
];

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="relative flex rounded-2xl glass-panel border border-mystic-mint/10 hover:border-forsythia/35 transition-all duration-micro overflow-hidden min-h-[360px] group text-left w-full">
      {/* Glow Overlay */}
      <div className="hover-ellipse group-hover:opacity-100" />
      
      {/* Left Sidebar Label */}
      <div className="w-12 border-r border-mystic-mint/10 flex flex-col items-center justify-between py-6 bg-mystic-mint/5 shrink-0">
        <div className="flex flex-col gap-1.5 opacity-30">
          <div className="w-3 h-0.5 bg-mystic-mint" />
          <div className="w-3 h-0.5 bg-mystic-mint" />
          <div className="w-3 h-0.5 bg-mystic-mint" />
        </div>
        
        <span className="vertical-text text-[10px] font-heading font-bold uppercase tracking-widest text-mystic-mint/65">
          {t.label}
        </span>
      </div>

      {/* Main content right side */}
      <div className="flex-grow p-6 flex flex-col justify-between relative z-10">
        <div>
          {/* Card Title */}
          <h4 className="font-heading font-bold text-base text-arctic-powder mb-6 group-hover:text-deep-saffron transition-colors duration-micro leading-snug">
            {t.title}
          </h4>

          {/* Rating */}
          <div className="mb-4">
            <span className="text-[9px] font-heading font-semibold uppercase tracking-widest text-mystic-mint/45 block mb-1">
              RATING
            </span>
            <div className="flex gap-0.5 text-forsythia">
              {Array.from({ length: t.rating }).map((_, i) => (
                <svg key={i} className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
        </div>

        {/* Comment quote text */}
        <div>
          <span className="text-[9px] font-heading font-semibold uppercase tracking-widest text-mystic-mint/45 block mb-2">
            COMMENT
          </span>
          <p className="text-xs leading-relaxed text-mystic-mint/75 font-body">
            {t.quote}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SocialProof() {
  return (
    <section 
      id="social-proof" 
      aria-labelledby="proof-heading" 
      className="py-24 gradient-dark-mesh text-arctic-powder relative overflow-hidden"
    >
      {/* Background Accent Gradients */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-nocturnal/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-deep-saffron/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center border-b border-mystic-mint/10 pb-16 mb-24">
          {STATS.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <span className="text-4xl sm:text-5xl font-bold font-heading bg-gradient-to-r from-forsythia to-deep-saffron bg-clip-text text-transparent mb-2">
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm uppercase tracking-widest text-mystic-mint/60 font-body">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Testimonials Section */}
        <div className="mb-24">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h3 className="text-3xl sm:text-4xl font-bold font-heading text-arctic-powder leading-tight">
              Trusted by the pioneers
            </h3>
            <p className="text-mystic-mint/60 mt-4 text-sm sm:text-base font-body leading-relaxed">
              From high-growth startups to enterprise research labs, Datrix is the chosen infrastructure for teams building the next era of AI.
            </p>
          </div>

          {/* Testimonials Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto items-stretch">
            {TESTIMONIALS.map((t, idx) => (
              <TestimonialCard key={idx} t={t} />
            ))}
          </div>
        </div>

        {/* Logo Cloud Marquee below Testimonials */}
        <div className="text-center">
          <h2 
            id="proof-heading" 
            className="text-[10px] font-heading font-semibold uppercase tracking-widest text-mystic-mint/45 mb-8"
          >
            Powering mission-critical operations globally
          </h2>
          
          <div className="carousel-container opacity-70 hover:opacity-100 transition-opacity duration-micro">
            <div className="carousel-track">
              {/* First Track Set */}
              <div className="flex items-center gap-20">
                <div className="flex items-center gap-2.5 text-arctic-powder font-heading font-bold text-base tracking-wider">
                  <svg className="w-5 h-5 text-forsythia shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                  aetna
                </div>
                <div className="flex items-center gap-2.5 text-arctic-powder font-heading font-bold text-base tracking-wider">
                  <svg className="w-5 h-5 text-deep-saffron shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3a9 9 0 00-9 9v1a3 3 0 003 3h1.5a1.5 1.5 0 011.5 1.5V19a3 3 0 003 3h2a3 3 0 003-3v-1.5a1.5 1.5 0 011.5-1.5H20a3 3 0 003-3v-1a9 9 0 00-9-9z"/>
                  </svg>
                  cigna
                </div>
                <div className="flex items-center gap-2.5 text-arctic-powder font-heading font-bold text-base tracking-wider">
                  <svg className="w-5 h-5 text-mystic-mint shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                  Anthem
                </div>
                <div className="flex items-center gap-2.5 text-arctic-powder font-heading font-bold text-base tracking-wider">
                  <svg className="w-5 h-5 text-forsythia shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 10.5h-5.5V5h-3v5.5H5v3h5.5V19h3v-5.5H19v-3z"/>
                  </svg>
                  CVS pharmacy
                </div>
                <div className="flex items-center gap-2.5 text-arctic-powder font-heading font-bold text-base tracking-wider">
                  <svg className="w-5 h-5 text-deep-saffron shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 5v6c0 5.25 3.8 10.12 10 11.5 6.2-1.38 10-6.25 10-11.5V5L12 2z"/>
                  </svg>
                  UnitedHealthcare
                </div>
                <div className="flex items-center gap-2.5 text-arctic-powder font-heading font-bold text-base tracking-wider">
                  <svg className="w-5 h-5 text-mystic-mint shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 22h20L12 2z"/>
                  </svg>
                  VERTEX LABS
                </div>
                <div className="flex items-center gap-2.5 text-arctic-powder font-heading font-bold text-base tracking-wider">
                  <svg className="w-5 h-5 text-forsythia shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                  </svg>
                  FLOWSTATE
                </div>
              </div>

              {/* Second Track Set */}
              <div className="flex items-center gap-20 ml-20">
                <div className="flex items-center gap-2.5 text-arctic-powder font-heading font-bold text-base tracking-wider">
                  <svg className="w-5 h-5 text-forsythia shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                  aetna
                </div>
                <div className="flex items-center gap-2.5 text-arctic-powder font-heading font-bold text-base tracking-wider">
                  <svg className="w-5 h-5 text-deep-saffron shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3a9 9 0 00-9 9v1a3 3 0 003 3h1.5a1.5 1.5 0 011.5 1.5V19a3 3 0 003 3h2a3 3 0 003-3v-1.5a1.5 1.5 0 011.5-1.5H20a3 3 0 003-3v-1a9 9 0 00-9-9z"/>
                  </svg>
                  cigna
                </div>
                <div className="flex items-center gap-2.5 text-arctic-powder font-heading font-bold text-base tracking-wider">
                  <svg className="w-5 h-5 text-mystic-mint shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                  Anthem
                </div>
                <div className="flex items-center gap-2.5 text-arctic-powder font-heading font-bold text-base tracking-wider">
                  <svg className="w-5 h-5 text-forsythia shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 10.5h-5.5V5h-3v5.5H5v3h5.5V19h3v-5.5H19v-3z"/>
                  </svg>
                  CVS pharmacy
                </div>
                <div className="flex items-center gap-2.5 text-arctic-powder font-heading font-bold text-base tracking-wider">
                  <svg className="w-5 h-5 text-deep-saffron shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 5v6c0 5.25 3.8 10.12 10 11.5 6.2-1.38 10-6.25 10-11.5V5L12 2z"/>
                  </svg>
                  UnitedHealthcare
                </div>
                <div className="flex items-center gap-2.5 text-arctic-powder font-heading font-bold text-base tracking-wider">
                  <svg className="w-5 h-5 text-mystic-mint shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 22h20L12 2z"/>
                  </svg>
                  VERTEX LABS
                </div>
                <div className="flex items-center gap-2.5 text-arctic-powder font-heading font-bold text-base tracking-wider">
                  <svg className="w-5 h-5 text-forsythia shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                  </svg>
                  FLOWSTATE
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
