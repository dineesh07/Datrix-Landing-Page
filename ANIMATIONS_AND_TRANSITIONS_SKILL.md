# Datrix — Animations and Transitions Skill Guide

This skill file documents the exact animations, layout transitions, and micro-interactions used across the Datrix AI Platform landing page. It outlines the custom easings, keyframes, transitions, and state-isolation methods implemented to ensure GPU-composited, high-performance visual states.

---

## 1. Animation Philosophy & Performance Constraints

To achieve a premium, fluid, and responsive user experience, all animations must adhere to these rules:
*   **No Heavy Runtimes**: Do not import Framer Motion, GSAP, or other JavaScript animation libraries. All animations use native CSS Transitions, `@keyframes`, or the Web Animations API (WAAPI).
*   **GPU Acceleration**: Limit animated properties to `transform` and `opacity` to prevent costly browser layouts (`layout` and `paint` thrashing).
*   **Orchestration Constraints**: Page entry animation flow must complete in under **500ms** to ensure immediate Time to Interactive (TTI).

---

## 2. Global Design System (Easings & Timing)

All transitions and keyframe animations utilize custom cubic-bezier easings to mimic hardware acceleration.

### CSS Custom Properties
```css
:root {
  /* Micro-interactions (hovers, toggles, clicks) */
  --ease-micro: 175ms cubic-bezier(0.16, 1, 0.3, 1);
  
  /* Layout reflows (accordions, sliding panels, resizes) */
  --ease-layout: 350ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Tailwind Config Integration
```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      transitionDuration: {
        'micro': '175ms',
        'layout': '350ms',
      },
    },
  },
};
```

---

## 3. Entry & Hero Section Orchestration

A staggered fade-up entry pattern orchestrates the load flow of the Hero section components, keeping the entire TTI timeline below **500ms**.

### Keyframes (`globals.css`)
```css
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Staggered Classes (`globals.css`)
To prevent flash-of-unstyled-content (FOUC), elements are styled with `animation-fill-mode: both` to hold the starting transparent frame until their delay triggers.
```css
.hero-badge     { animation: fadeUp 400ms ease-out 0ms   both; }
.hero-heading   { animation: fadeUp 400ms ease-out 80ms  both; }
.hero-subtext   { animation: fadeUp 400ms ease-out 160ms both; }
.hero-cta       { animation: fadeUp 400ms ease-out 240ms both; }
.hero-trust     { animation: fadeUp 400ms ease-out 320ms both; }
```

### Interactive Glows (`Hero.tsx`)
A pulse animation on the badge indicator signals dynamic platform state:
```html
<span className="w-1.5 h-1.5 rounded-full bg-deep-saffron animate-pulse" />
```

---

## 4. Bento Grid Hover Interactions (Desktop)

The Bento Grid uses subtle transformations, color shifts, and ambient gradient glows to guide the user's attention.

### Card Scale & Border Color Swap (`BentoGrid.tsx`)
```jsx
className={`group relative p-8 rounded-2xl border transition-all duration-layout bg-nocturnal/15 ${
  isHovered 
    ? 'border-forsythia/40 shadow-lg shadow-forsythia/5 scale-[1.01]' 
    : 'border-mystic-mint/10'
}`}
```

### Ambient Glow & Bottom Slide border (`BentoGrid.tsx`)
A radial gradient background fades in on hover, combined with a colored border sliding horizontally across the bottom margin:
```jsx
{/* Ambient Background Accent on Hover */}
<div 
  className={`absolute top-0 right-0 w-[200px] h-[200px] bg-gradient-to-bl from-forsythia/5 to-transparent rounded-full blur-[60px] pointer-events-none transition-opacity duration-layout ${
    isHovered ? 'opacity-100' : 'opacity-0'
  }`}
/>

/* ... */

{/* Bottom highlight border line */}
<div 
  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-forsythia to-deep-saffron transition-transform duration-layout ${
    isHovered ? 'scale-x-100' : 'scale-x-0'
  }`}
/>
```

---

## 5. Accordion Expand/Collapse (Mobile)

On mobile layout resizes, the features shift to an accordion. Transitioning `max-height` and `opacity` together creates a smooth height adjustment that doesn't feel jarring.

### Accordion Container & Content Transition (`Accordion.tsx` & `globals.css`)
```css
.accordion-content {
  overflow: hidden;
  max-height: 0;
  transition: max-height var(--ease-layout), opacity 300ms ease-in-out;
  opacity: 0;
}
```
*   **React Inline Overrides**:
    To dynamically compute state while maintaining performance, the height values are declared using safe ceiling variables:
    ```jsx
    style={{
      maxHeight: isOpen ? '240px' : '0px',
      opacity: isOpen ? 1 : 0
    }}
    ```

### Interactive Chevron Rotation
A helper transition spins the indicator:
```jsx
className={`w-5 h-5 transition-transform duration-layout ${
  isOpen ? 'rotate-180 text-deep-saffron' : 'text-mystic-mint/60'
}`}
```

---

## 6. Segmented Switcher & Toggle Slide Transitions

Fluid sliding indicators are used on interactive controls like currency segment control bars and billing toggles.

### Segmented Currency Switcher Slider (`PricingSection.tsx`)
Using absolute positioning and `transform: translateX` yields high-performance element sliding:
```jsx
{/* Animated Slide Indicator */}
<div 
  className="absolute top-1 bottom-1 left-1 bg-forsythia rounded-lg shadow-sm transition-all duration-150 ease-out"
  style={{
    width: 'calc(33.333% - 4px)',
    transform: `translateX(${currency === 'USD' ? '100%' : currency === 'EUR' ? '200%' : '0%'})`
  }}
/>
```

### Billing Toggle Switch Thumb (`PricingSection.tsx`)
```jsx
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
```

---

## 7. Isolated State Text Swap Transitions

To prevent layout thrashing on price updates, the billing toggle and currency switch do not trigger React re-renders on the container cards. Instead, direct DOM node updates bypass React's virtual DOM:

```typescript
const updatePrices = useCallback((newCurrency: Currency, newCycle: Cycle) => {
  currencyRef.current = newCurrency;
  cycleRef.current = newCycle;

  Object.entries(priceRefs.current).forEach(([tier, ref]) => {
    if (ref) {
      const calculated = getPrice(tier as Tier, newCycle, newCurrency);
      // Directly mutate DOM text nodes to trigger instant redraws without layout thrashing
      ref.textContent = calculated.display;
    }
  });
}, []);
```
This isolates the visual update to the price span node itself, preserving 60 FPS scrolling and interaction even under performance throttling.
