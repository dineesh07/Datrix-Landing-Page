// Base rates in USD cents per month
export const BASE_RATES = {
  starter:    { monthly: 0,    annual: 0     }, 
  pro:        { monthly: 8000, annual: 6400  },
  enterprise: { monthly: 0,    annual: 0     }, 
};

// Regional tariff multipliers
export const TARIFF = {
  USD: { multiplier: 1.00, symbol: '$', code: 'USD' },
  INR: { multiplier: 83.5, symbol: '₹', code: 'INR' },
  EUR: { multiplier: 0.92, symbol: '€', code: 'EUR' },
};

export type Tier = 'starter' | 'pro' | 'enterprise';
export type Cycle = 'monthly' | 'annual';
export type Currency = 'USD' | 'INR' | 'EUR';

// Compute price dynamically — NEVER hardcode display values
export function getPrice(tier: Tier, cycle: Cycle, currency: Currency) {
  const base = BASE_RATES[tier][cycle];        // cents
  const { multiplier, symbol } = TARIFF[currency];
  const amount = Math.round((base / 100) * multiplier);
  return { display: `${symbol}${amount.toLocaleString()}`, raw: amount };
}
