import React from 'react';

export const TESTIMONIALS = [
  {
    quote: "Datrix cut our data pipeline build time from 3 weeks to 3 hours. It's the backbone of our entire analytics stack.",
    name: "Priya Nair",
    role: "Head of Data Engineering",
    company: "Zeta Financial",
  },
  {
    quote: "The pricing matrix feature alone saved us hours of spreadsheet work. Datrix just gets enterprise complexity.",
    name: "Marcus Chen",
    role: "CTO",
    company: "Loopline Systems",
  },
  {
    quote: "We process 50 million events a day through Datrix. It's never missed a beat — and the UI is genuinely beautiful.",
    name: "Aisha Okonkwo",
    role: "VP Engineering",
    company: "Novu Analytics",
  },
];

export const STATS = [
  { value: "10,000+", label: "Teams" },
  { value: "200+", label: "Integrations" },
  { value: "99.99%", label: "Uptime SLA" },
  { value: "<50ms", label: "Avg. Latency" },
];

export default function SocialProof() {
  return (
    <section 
      id="social-proof" 
      aria-labelledby="proof-heading" 
      className="py-24 bg-oceanic-noir text-arctic-powder relative overflow-hidden"
    >
      {/* Background Accent Gradients */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-nocturnal/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-deep-saffron/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Logo cloud */}
        <div className="text-center mb-20">
          <h2 
            id="proof-heading" 
            className="text-sm font-semibold uppercase tracking-widest text-mystic-mint/60 mb-8"
          >
            Trusted by 10,000+ data teams across 40 countries
          </h2>
          
          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20 opacity-70 hover:opacity-100 transition-opacity duration-micro">
            {/* Logo 1: Zeta */}
            <div className="flex items-center gap-2 text-arctic-powder font-heading font-bold text-lg tracking-wider">
              <svg className="w-6 h-6 text-forsythia" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
              ZETA
            </div>

            {/* Logo 2: Loopline */}
            <div className="flex items-center gap-2 text-arctic-powder font-heading font-bold text-lg tracking-wider">
              <svg className="w-6 h-6 text-deep-saffron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
                <path d="M12 6v12M6 12h12"/>
              </svg>
              LOOPLINE
            </div>

            {/* Logo 3: Novu */}
            <div className="flex items-center gap-2 text-arctic-powder font-heading font-bold text-lg tracking-wider">
              <svg className="w-6 h-6 text-mystic-mint" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
              NOVU
            </div>

            {/* Logo 4: Acme */}
            <div className="flex items-center gap-2 text-arctic-powder font-heading font-bold text-lg tracking-wider">
              <svg className="w-6 h-6 text-forsythia" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
              </svg>
              ACME
            </div>

            {/* Logo 5: Apex */}
            <div className="flex items-center gap-2 text-arctic-powder font-heading font-bold text-lg tracking-wider">
              <svg className="w-6 h-6 text-deep-saffron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 22h20L12 2z"/>
              </svg>
              APEX
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center border-t border-b border-mystic-mint/10 py-16 mb-24">
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

        {/* Testimonials Grid */}
        <div>
          <div className="text-center mb-16">
            <h3 className="text-2xl sm:text-3xl font-bold font-heading text-arctic-powder">
              Loved by Engineers. Trusted by Enterprise.
            </h3>
            <p className="text-mystic-mint/60 mt-3 font-body">
              Read how teams are scaling their operations with Datrix.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, idx) => (
              <div 
                key={idx} 
                className="flex flex-col justify-between p-8 rounded-2xl bg-nocturnal/20 border border-mystic-mint/10 hover:border-forsythia/30 transition-all duration-micro group"
              >
                <div>
                  {/* Quotes Icon */}
                  <svg className="w-8 h-8 text-forsythia/20 mb-6 group-hover:text-forsythia/40 transition-colors duration-micro" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.154c-2.433.914-4.006 3.636-4.006 5.846h4v10h-9.99z"/>
                  </svg>
                  
                  <p className="text-base text-mystic-mint/90 leading-relaxed italic mb-8 font-body">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
                
                <div className="border-t border-mystic-mint/10 pt-6">
                  <h4 className="text-sm font-semibold font-heading text-arctic-powder">
                    {t.name}
                  </h4>
                  <p className="text-xs text-mystic-mint/50 font-body mt-1">
                    {t.role} &middot; <span className="text-deep-saffron font-medium">{t.company}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
