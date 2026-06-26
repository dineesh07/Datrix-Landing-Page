'use client';

import React, { useRef, useState, useCallback } from 'react';
import { getPrice, Tier, Cycle, Currency } from '@/lib/pricing.config';

// Re-export TIERS for layout usage
export const PRICING_TIERS = [
  {
    id: 'starter' as Tier,
    name: 'Starter',
    tagline: 'For individuals and small teams getting started.',
    highlight: false,
    badge: null,
    features: [
      'Up to 500K events/month',
      '5 active workflows',
      '10 connectors',
      'Community support',
      'Basic analytics dashboard',
    ],
    cta: 'Start Free Trial',
  },
  {
    id: 'pro' as Tier,
    name: 'Pro',
    tagline: 'For growing teams that need power and speed.',
    highlight: true,
    badge: '⚡ Most Popular',
    features: [
      'Up to 10M events/month',
      'Unlimited workflows',
      '50 connectors',
      'Priority email support',
      'Advanced analytics + alerts',
      'Team collaboration tools',
    ],
    cta: 'Start Free Trial',
  },
  {
    id: 'enterprise' as Tier,
    name: 'Enterprise',
    tagline: 'For orgs that need unlimited scale and compliance.',
    highlight: false,
    badge: '🏢 Custom Pricing',
    features: [
      'Unlimited events',
      'Unlimited workflows',
      '200+ connectors',
      'Dedicated support + SLA',
      'SOC 2 audit logs',
      'Custom SSO / SAML',
      'On-prem deployment option',
    ],
    cta: 'Contact Sales',
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
        const calculated = getPrice(tier as Tier, newCycle, newCurrency);
        ref.textContent = calculated.display;
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch mb-12">
          {PRICING_TIERS.map((tier) => {
            const initialPrice = getPrice(tier.id, isAnnual ? 'annual' : 'monthly', currency);
            return (
              <div
                key={tier.id}
                className={`relative flex flex-col justify-between p-8 rounded-2xl border transition-all duration-micro bg-nocturnal/15 ${
                  tier.highlight 
                    ? 'border-deep-saffron shadow-xl scale-[1.03] z-10' 
                    : 'border-mystic-mint/10 hover:border-forsythia/30'
                }`}
              >
                {/* Visual Highlight Badge */}
                {tier.badge && (
                  <span className="absolute -top-3.5 left-8 px-4 py-1 text-[10px] font-bold tracking-widest uppercase rounded-full bg-deep-saffron text-arctic-powder shadow-sm">
                    {tier.badge}
                  </span>
                )}

                <div>
                  <h3 className="text-xl font-bold font-heading text-arctic-powder mb-2">
                    {tier.name}
                  </h3>
                  <p className="text-xs text-mystic-mint/70 font-body min-h-[32px]">
                    {tier.tagline}
                  </p>

                  {/* Isolated Price Node */}
                  <div className="my-8 flex items-baseline gap-2">
                    <span 
                      ref={(el) => {
                        priceRefs.current[tier.id] = el;
                      }}
                      className="text-4xl sm:text-5xl font-bold font-heading text-arctic-powder tracking-tight"
                    >
                      {initialPrice.display}
                    </span>
                    <span className="text-sm font-medium text-mystic-mint/50 font-body">
                      / month
                    </span>
                  </div>

                  {/* Feature Checklist */}
                  <ul role="list" className="space-y-4 border-t border-mystic-mint/10 pt-6">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-deep-saffron shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-mystic-mint/80 font-body leading-tight">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-10">
                  <a
                    href="#pricing"
                    className={`block w-full py-4 rounded-xl text-center font-semibold text-sm transition-all duration-micro ${
                      tier.highlight
                        ? 'btn-primary'
                        : 'btn-secondary border border-mystic-mint/20 text-mystic-mint hover:bg-mystic-mint/10 hover:border-mystic-mint/50'
                    }`}
                  >
                    {tier.cta}
                  </a>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Trust Signal */}
        <p className="text-center text-xs text-mystic-mint/55 font-body mt-8">
          All plans include: 14-day free trial &middot; No setup fees &middot; Cancel anytime
        </p>

      </div>
    </section>
  );
}
