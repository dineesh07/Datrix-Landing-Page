import React from 'react';

export default function Hero() {
  return (
    <section 
      id="hero" 
      aria-labelledby="hero-heading" 
      className="relative flex flex-col justify-center min-h-[90vh] px-6 lg:px-16 py-24 overflow-hidden gradient-dark-mesh border-b border-mystic-mint/10"
    >
      {/* Subtle Grid overlay representing Framer/Armory style blueprints */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(217,232,226,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(217,232,226,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] -z-10" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        {/* Left Column: Heading, Subtext, and CTA */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* H1 Heading */}
          <h1 
            id="hero-heading" 
            className="hero-heading text-5xl sm:text-6xl md:text-7xl font-bold font-heading text-arctic-powder leading-[1.05] mb-8 tracking-tight max-w-2xl"
          >
            Power your<br />future with AI
          </h1>

          {/* Subtext */}
          <p className="hero-subtext text-base sm:text-lg text-mystic-mint/80 max-w-xl mb-12 leading-relaxed font-body font-normal">
            Deploy custom enterprise agents and automate complex workflows.
            Scale your intelligence with Datrix today.
          </p>

          {/* CTA Button with sliding icon animation */}
          <div className="hero-cta flex items-center gap-6 w-full sm:w-auto">
            <button 
              onClick={() => {
                const el = document.getElementById('features');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="armory-btn shrink-0"
              aria-label="See It in Action"
            >
              <span className="armory-btn-icon" aria-hidden="true">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4 11h12v2H4zm12-4h2v2h-2zm2 2h2v2h-2zm2 2h2v2h-2zm-2 2h2v2h-2zm-2 2h2v2h-2z" />
                </svg>
              </span>
              <span className="armory-btn-text">See It in Action</span>
            </button>
          </div>
        </div>

        {/* Right Column: Large Features List & Partner Logos */}
        <div className="lg:col-span-5 flex flex-col items-start lg:items-end justify-center lg:text-right border-l lg:border-l-0 lg:border-r border-mystic-mint/10 lg:pr-12 pl-6 lg:pl-0 py-4 gap-8">
          <div className="flex flex-col gap-6">
            <div className="text-3xl sm:text-4xl font-heading font-bold text-mystic-mint/40 hover:text-arctic-powder transition-colors duration-micro cursor-default">
              AI Strategy
            </div>
            <div className="text-3xl sm:text-4xl font-heading font-bold text-mystic-mint/40 hover:text-arctic-powder transition-colors duration-micro cursor-default">
              Custom Agents
            </div>
            <div className="text-3xl sm:text-4xl font-heading font-bold text-mystic-mint/40 hover:text-arctic-powder transition-colors duration-micro cursor-default">
              Process Automation
            </div>
            <div className="text-3xl sm:text-4xl font-heading font-bold text-mystic-mint/40 hover:text-arctic-powder transition-colors duration-micro cursor-default">
              Data Intelligence
            </div>
          </div>

          {/* Quick Partner Logos below list */}
          <div className="flex items-center gap-8 opacity-45 hover:opacity-85 transition-opacity duration-micro mt-8">
            <div className="text-xs font-heading font-bold tracking-widest text-mystic-mint">
              AETNA
            </div>
            <div className="text-xs font-heading font-bold tracking-widest text-mystic-mint">
              CIGNA
            </div>
            <div className="text-xs font-heading font-bold tracking-widest text-mystic-mint">
              HUMANA
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
