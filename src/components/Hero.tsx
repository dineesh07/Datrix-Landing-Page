import React from 'react';

export default function Hero() {
  return (
    <section 
      id="hero" 
      aria-labelledby="hero-heading" 
      className="relative flex flex-col items-center justify-center min-h-[85vh] text-center px-4 py-20 overflow-hidden gradient-light-mesh"
    >
      {/* Decorative gradient blur in background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-forsythia/20 to-deep-saffron/20 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Badge */}
        <span className="hero-badge inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase bg-nocturnal/10 text-nocturnal mb-6 border border-nocturnal/5">
          <span className="w-1.5 h-1.5 rounded-full bg-deep-saffron animate-pulse" />
          Next-Gen AI Automation Platform
        </span>

        {/* H1 Heading */}
        <h1 
          id="hero-heading" 
          className="hero-heading text-4xl sm:text-5xl md:text-6xl font-bold font-heading text-nocturnal leading-[1.1] mb-6 max-w-3xl tracking-tight text-balance"
        >
          Automate the Impossible.<br />
          <span className="bg-gradient-to-r from-deep-saffron to-forsythia bg-clip-text text-transparent drop-shadow-sm">
            Scale the Rest.
          </span>
        </h1>

        {/* Subtext */}
        <p className="hero-subtext text-lg sm:text-xl text-nocturnal/80 max-w-2xl mb-10 leading-relaxed font-body font-normal">
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
            className="btn-secondary w-full sm:w-auto px-8 py-4 rounded-xl text-center border border-mystic-mint font-medium hover:bg-mystic-mint/40 hover:-translate-y-0.5 active:translate-y-0"
          >
            See It in Action &rarr;
          </a>
        </div>

        {/* Trust signal */}
        <p className="hero-trust text-xs sm:text-sm text-nocturnal/60 font-body">
          No credit card required &middot; Setup in 60 seconds &middot; Cancel anytime
        </p>
      </div>
    </section>
  );
}
