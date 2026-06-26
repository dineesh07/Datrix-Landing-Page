'use client';

import React, { useRef, useState, useCallback } from 'react';
import { getPrice, Tier, Cycle, Currency } from '@/lib/pricing.config';

// Re-export TIERS for layout usage
export const PRICING_TIERS = [
  {
    id: 'starter' as Tier,
    name: 'Free Plan',
    tagline: 'For beginners to explore our platform and start their automation journey.',
    highlight: false,
    badge: null,
    iconColor: 'from-blue-500 to-indigo-600 shadow-blue-500/30',
    radialGlow: 'from-blue-500/10',
    features: [
      'Track up to 5 stocks',
      'Access to real-time stock prices',
      'Mobile access for tracking on-the-go',
      'Basic investment insights',
      'Limited watchlist management',
    ],
    cta: 'Start for Free',
  },
  {
    id: 'pro' as Tier,
    name: 'Pro Plan',
    tagline: 'For active investors who want advanced tools to grow their portfolio.',
    highlight: true,
    badge: '★ POPULAR',
    iconColor: 'from-amber-400 to-orange-500 shadow-orange-500/30',
    radialGlow: 'from-orange-500/10',
    features: [
      'Track unlimited stocks',
      'Advanced analytics and perform',
      'Custom alerts for price movements',
      'Expert-curated stock',
      'Priority support assistance',
      'Export data to CSV/PDF',
    ],
    cta: 'Start Free 7 Days Trial',
  },
  {
    id: 'enterprise' as Tier,
    name: 'Advance Plan',
    tagline: 'For institutions or high-net-worth individuals seeking tailored solutions.',
    highlight: false,
    badge: null,
    iconColor: 'from-green-500 to-emerald-600 shadow-green-500/30',
    radialGlow: 'from-emerald-500/10',
    features: [
      'Dedicated account manager',
      'Customizable investment tools',
      'Integration with third-party',
      'Advanced AI-driven insights',
      'Team collaboration tools',
    ],
    cta: 'Contact Us',
  },
];

export default function PricingSection() {
  const [currency, setCurrency] = useState<Currency>('USD');
  const [isAnnual, setIsAnnual] = useState<boolean>(false);

  // Refs for state isolation updating (No global re-renders for price numbers)
  const currencyRef = useRef<Currency>('USD');
  const cycleRef = useRef<Cycle>('monthly');
  const priceRefs = useRef<Record<string, HTMLSpanElement | null>>({});

  const updatePrices = useCallback((newCurrency: Currency, newCycle: Cycle) => {
    currencyRef.current = newCurrency;
    cycleRef.current = newCycle;

    Object.entries(priceRefs.current).forEach(([tier, ref]) => {
      if (ref) {
        if (tier === 'enterprise') {
          ref.textContent = 'Custom';
        } else {
          const calculated = getPrice(tier as Tier, newCycle, newCurrency);
          ref.textContent = calculated.display;
        }
      }
    });
  }, []);

  const handleCurrencyChange = useCallback((c: Currency) => {
    setCurrency(c); // UI state update only (re-positions visual slider)
    updatePrices(c, cycleRef.current);
  }, [updatePrices]);

  const toggleBilling = useCallback(() => {
    const nextAnnual = !isAnnual;
    setIsAnnual(nextAnnual);
    const nextCycle: Cycle = nextAnnual ? 'annual' : 'monthly';
    updatePrices(currencyRef.current, nextCycle);
  }, [isAnnual, updatePrices]);

  return (
    <section 
      id="pricing" 
      aria-labelledby="pricing-heading" 
      className="py-24 bg-oceanic-noir/50 relative overflow-hidden"
    >
      {/* Decorative gradients */}
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-forsythia/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] bg-deep-saffron/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header section with heading and controls */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 
            id="pricing-heading" 
            className="text-3xl sm:text-4xl font-bold font-heading text-arctic-powder mb-4"
          >
            One Platform. Every Scale.
          </h2>
          <p className="text-base text-mystic-mint/80 max-w-xl mx-auto font-body mb-10">
            No hidden fees. No vendor lock-in. Switch plans anytime.
          </p>

          {/* Pricing Controls: Segmented Currency & Billing Switcher */}
          <div className="flex flex-col sm:flex-row items-center gap-6 z-10">
            
            {/* Currency Switcher: 3-way Segmented Control */}
            <div 
              role="group" 
              aria-label="Currency selector" 
              className="relative flex p-1 bg-mystic-mint/5 rounded-xl border border-mystic-mint/10 h-12 w-64 items-center"
            >
              {/* Animated Slide Indicator */}
              <div 
                className="absolute top-1 bottom-1 left-1 bg-forsythia rounded-lg shadow-sm transition-all duration-150 ease-out"
                style={{
                  width: 'calc(33.333% - 4px)',
                  transform: `translateX(${currency === 'USD' ? '100%' : currency === 'EUR' ? '200%' : '0%'})`
                }}
              />
              
              {(['INR', 'USD', 'EUR'] as Currency[]).map((c) => (
                <button
                  key={c}
                  role="radio"
                  aria-checked={currency === c}
                  onClick={() => handleCurrencyChange(c)}
                  className={`relative z-10 w-1/3 text-xs font-semibold font-heading h-full rounded-lg transition-colors duration-150 ${
                    currency === c ? 'text-oceanic-noir' : 'text-mystic-mint/60 hover:text-mystic-mint'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Billing Cycle Switch */}
            <div 
              role="switch" 
              aria-checked={isAnnual} 
              onClick={toggleBilling}
              className="flex items-center gap-3 cursor-pointer select-none bg-mystic-mint/5 border border-mystic-mint/10 py-2 px-4 rounded-xl hover:bg-mystic-mint/10 transition-colors duration-micro"
            >
              <span className={`text-xs font-semibold font-body ${!isAnnual ? 'text-arctic-powder' : 'text-mystic-mint/60'}`}>
                Monthly
              </span>
              
              {/* Toggle Track */}
              <div className="relative w-10 h-6 bg-nocturnal rounded-full transition-colors duration-layout">
                {/* Thumb */}
                <div 
                   className="absolute top-1 left-1 w-4 h-4 bg-forsythia rounded-full transition-transform duration-layout"
                  style={{
                    transform: isAnnual ? 'translateX(16px)' : 'none'
                  }}
                />
              </div>

              <span className={`text-xs font-semibold font-body flex items-center gap-1.5 ${isAnnual ? 'text-arctic-powder' : 'text-mystic-mint/60'}`}>
                Annual 
                <mark className="px-1.5 py-0.5 text-[9px] font-bold uppercase rounded bg-deep-saffron text-arctic-powder tracking-wider">
                  Save 20%
                </mark>
              </span>
            </div>

          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch mb-12">
          {PRICING_TIERS.map((tier) => {
            const initialPrice = getPrice(tier.id, isAnnual ? 'annual' : 'monthly', currency);
            const isCustom = tier.id === 'enterprise';
            const priceVal = isCustom ? 'Custom' : initialPrice.display;
            
            return (
              <div
                key={tier.id}
                className={`relative flex flex-col justify-between p-8 rounded-3xl border transition-all duration-micro glass-panel group ${
                  tier.highlight 
                    ? 'border-deep-saffron shadow-xl scale-[1.02] z-10 bg-nocturnal/25' 
                    : 'border-mystic-mint/10 hover:border-forsythia/30'
                }`}
              >
                {/* Top-left Ambient Glowing Background inside card */}
                <div className={`absolute top-0 left-0 w-64 h-64 bg-gradient-to-br ${tier.radialGlow} to-transparent rounded-full blur-[80px] pointer-events-none opacity-40`} />

                {/* Glow Overlay */}
                <div className="hover-ellipse group-hover:opacity-100" />

                {/* Top Right Popular Badge inside card to match screenshot */}
                {tier.badge && (
                  <span className="absolute top-6 right-6 flex items-center gap-1 px-3 py-1 rounded-full text-[9px] font-heading font-bold uppercase tracking-wider bg-mystic-mint/10 text-arctic-powder border border-mystic-mint/15 shadow-sm">
                    {tier.badge}
                  </span>
                )}

                <div className="relative z-10 text-left">
                  {/* Glowing Icon Square Container */}
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${tier.iconColor} flex items-center justify-center shadow-md mb-6 relative`}>
                    <div className="absolute inset-0 rounded-xl blur-sm bg-inherit opacity-70" />
                    <div className="w-4 h-4 rounded bg-white/25 relative z-10" />
                  </div>

                  <h3 className="text-xl font-bold font-heading text-arctic-powder mb-2">
                    {tier.name}
                  </h3>

                  {/* Isolated Price Node */}
                  <div className="my-6 flex items-baseline gap-1.5">
                    <span 
                      ref={(el) => {
                        priceRefs.current[tier.id] = el;
                      }}
                      className="text-4xl sm:text-5xl font-bold font-heading text-arctic-powder tracking-tight"
                    >
                      {priceVal}
                    </span>
                    {!isCustom && (
                      <span className="text-sm font-medium text-mystic-mint/50 font-body">
                        / month
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-mystic-mint/70 font-body leading-relaxed mb-8 min-h-[36px]">
                    {tier.tagline}
                  </p>

                  {/* Pricing Tier CTA Button */}
                  <div className="mb-8">
                    <a
                      href="#pricing"
                      className={`block w-full py-3.5 rounded-xl text-center font-semibold text-sm transition-all duration-micro ${
                        tier.highlight
                          ? 'bg-white text-black hover:bg-arctic-powder shadow-lg shadow-white/5'
                          : 'bg-mystic-mint/5 border border-mystic-mint/15 text-arctic-powder hover:bg-mystic-mint/10'
                      }`}
                    >
                      {tier.cta}
                    </a>
                  </div>

                  {/* Stand Out Features Separator */}
                  <div className="flex items-center gap-3 my-6">
                    <div className="h-px bg-mystic-mint/10 flex-grow" />
                    <span className="text-[9px] font-heading font-bold uppercase tracking-widest text-mystic-mint/30 shrink-0">STAND OUT FEATURES</span>
                    <div className="h-px bg-mystic-mint/10 flex-grow" />
                  </div>

                  {/* Feature List with Custom Bullet Icons */}
                  <ul role="list" className="space-y-4">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <svg className="w-4 h-4 text-mystic-mint/40 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                        </svg>
                        <span className="text-xs text-mystic-mint/75 font-body leading-tight">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Trust Signal */}
        <p className="text-center text-xs text-mystic-mint/55 font-body mt-8">
          Start your journey risk free &mdash; No credit card needed
        </p>

      </div>
    </section>
  );
}
