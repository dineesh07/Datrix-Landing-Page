import React from 'react';
import Hero from '@/components/Hero';
import SocialProof from '@/components/SocialProof';
import FeaturesSection from '@/components/Features/FeaturesSection';
import PricingSection from '@/components/Pricing/PricingSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-arctic-powder selection:bg-forsythia/30">
      {/* Navigation Header */}
      <header role="banner" className="sticky top-0 z-50 glass-panel border-b border-mystic-mint/30 w-full transition-all duration-layout">
        <nav aria-label="Main navigation" className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <a href="/" aria-label="Datrix home" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-forsythia to-deep-saffron flex items-center justify-center shadow-md shadow-deep-saffron/10 group-hover:scale-105 transition-transform duration-micro">
              <svg className="w-5 h-5 text-oceanic-noir" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8.372 1.349a.75.75 0 0 0-.744 0l-4.81 2.748L8 7.131l5.182-3.034zM14 5.357L8.75 8.43v6.005l4.872-2.784A.75.75 0 0 0 14 11zm-6.75 9.078V8.43L2 5.357V11c0 .27.144.518.378.651z" />
              </svg>
            </div>
            <span className="font-heading font-bold text-xl tracking-wider text-nocturnal">
              DATRIX
            </span>
          </a>

          {/* Links (Desktop) */}
          <ul role="list" className="hidden md:flex items-center gap-10 text-sm font-semibold text-nocturnal/80">
            <li>
              <a href="#features" className="nav-link">Features</a>
            </li>
            <li>
              <a href="#pricing" className="nav-link">Pricing</a>
            </li>
            <li>
              <a href="#docs" className="nav-link">Docs</a>
            </li>
            <li>
              <a href="#signin" className="nav-link">Sign In</a>
            </li>
          </ul>

          {/* CTA Button */}
          <div>
            <a 
              href="#pricing" 
              className="btn-primary px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-md"
            >
              Get Started Free
            </a>
          </div>
        </nav>
      </header>

      {/* Main Content Area */}
      <main id="main-content">
        <Hero />
        <SocialProof />
        <FeaturesSection />
        <PricingSection />
      </main>

      {/* Footer */}
      <footer role="contentinfo" className="bg-oceanic-noir border-t border-mystic-mint/10 py-16 text-mystic-mint/60">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-forsythia to-deep-saffron flex items-center justify-center">
                <svg className="w-4 h-4 text-oceanic-noir" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8.372 1.349a.75.75 0 0 0-.744 0l-4.81 2.748L8 7.131l5.182-3.034zM14 5.357L8.75 8.43v6.005l4.872-2.784A.75.75 0 0 0 14 11zm-6.75 9.078V8.43L2 5.357V11c0 .27.144.518.378.651z" />
                </svg>
              </div>
              <span className="font-heading font-bold text-lg tracking-wider text-arctic-powder">
                DATRIX
              </span>
            </div>
            <p className="text-xs sm:text-sm font-body">
              Where data meets intelligence.
            </p>
          </div>

          {/* Footer Links */}
          <div className="flex flex-wrap justify-center gap-6 text-xs sm:text-sm font-body">
            <a href="#privacy" className="hover:text-forsythia transition-colors duration-micro">Privacy</a>
            <span className="text-mystic-mint/20">&middot;</span>
            <a href="#terms" className="hover:text-forsythia transition-colors duration-micro">Terms</a>
            <span className="text-mystic-mint/20">&middot;</span>
            <a href="#docs" className="hover:text-forsythia transition-colors duration-micro">Docs</a>
            <span className="text-mystic-mint/20">&middot;</span>
            <a href="#status" className="hover:text-forsythia transition-colors duration-micro">Status</a>
            <span className="text-mystic-mint/20">&middot;</span>
            <a href="#contact" className="hover:text-forsythia transition-colors duration-micro">Contact</a>
          </div>

          {/* Copyright Info */}
          <div className="text-xs font-body text-mystic-mint/45 text-center md:text-right">
            &copy; 2026 Datrix Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
