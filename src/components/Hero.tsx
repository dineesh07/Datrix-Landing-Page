import React from 'react';

export default function Hero() {
  return (
    <section 
      id="hero" 
      aria-labelledby="hero-heading" 
      className="relative flex flex-col items-center justify-center min-h-[85vh] text-center px-4 py-20 overflow-hidden gradient-dark-mesh border-b border-mystic-mint/10"
    >
      {/* Subtle Grid overlay representing Framer/Armory style blueprints */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(217,232,226,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(217,232,226,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] -z-10" />

      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Badge */}
        <span className="hero-badge inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase bg-mystic-mint/10 text-mystic-mint mb-6 border border-mystic-mint/20">
          <span className="w-1.5 h-1.5 rounded-full bg-deep-saffron animate-pulse" />
          Next-Gen AI Automation Platform
        </span>

        {/* H1 Heading */}
        <h1 
          id="hero-heading" 
          className="hero-heading text-4xl sm:text-5xl md:text-6xl font-bold font-heading text-arctic-powder leading-[1.1] mb-6 max-w-3xl tracking-tight text-balance"
        >
          Automate the Impossible.<br />
          <span className="bg-gradient-to-r from-deep-saffron to-forsythia bg-clip-text text-transparent drop-shadow-sm">
            Scale the Rest.
          </span>
        </h1>

        {/* Subtext */}
        <p className="hero-subtext text-lg sm:text-xl text-mystic-mint/80 max-w-2xl mb-10 leading-relaxed font-body font-normal">
          Datrix turns raw data chaos into intelligent workflows — in real time, at any scale, across every team.
        </p>

        {/* CTA buttons */}
        <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-8">
          <a 
            href="#pricing" 
            className="btn-primary w-full sm:w-auto px-8 py-4 rounded-xl text-center shadow-lg font-semibold hover:shadow-deep-saffron/20 hover:-translate-y-0.5 active:translate-y-0"
          >
            Start Free Trial
          </a>
          <a 
            href="#features" 
            className="btn-secondary w-full sm:w-auto px-8 py-4 rounded-xl text-center border border-mystic-mint/30 text-mystic-mint hover:bg-mystic-mint/10 hover:-translate-y-0.5 active:translate-y-0"
          >
            See It in Action &rarr;
          </a>
        </div>

        {/* Trust signal */}
        <p className="hero-trust text-xs sm:text-sm text-mystic-mint/60 font-body">
          No credit card required &middot; Setup in 60 seconds &middot; Cancel anytime
        </p>
      </div>
    </section>
  );
}
