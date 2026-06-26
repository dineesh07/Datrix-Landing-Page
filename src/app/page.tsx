'use client';

import React, { useEffect, useState } from 'react';
import Hero from '@/components/Hero';
import SocialProof from '@/components/SocialProof';
import FeaturesSection from '@/components/Features/FeaturesSection';
import PricingSection from '@/components/Pricing/PricingSection';

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>('hero');

  useEffect(() => {
    const sections = ['hero', 'features', 'social-proof', 'pricing'];
    const observers = sections.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        });
      }, { threshold: 0.2, rootMargin: '-80px 0px -40% 0px' });
      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach(obs => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-oceanic-noir selection:bg-forsythia/30">
      {/* Navigation Header */}
      <header role="banner" className="floating-nav">
        <nav aria-label="Main navigation" className="w-full flex items-center justify-between">
          {/* Logo */}
          <a href="/" aria-label="Datrix home" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-full bg-oceanic-noir border border-arctic-powder/15 flex items-center justify-center shadow-md shadow-arctic-powder/5 group-hover:scale-105 transition-transform duration-micro">
              <svg className="w-5 h-5 text-arctic-powder" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8.372 1.349a.75.75 0 0 0-.744 0l-4.81 2.748L8 7.131l5.182-3.034zM14 5.357L8.75 8.43v6.005l4.872-2.784A.75.75 0 0 0 14 11zm-6.75 9.078V8.43L2 5.357V11c0 .27.144.518.378.651z" />
              </svg>
            </div>
            <span className="font-heading font-bold text-base tracking-wider text-arctic-powder">
              DATRIX
            </span>
          </a>

          {/* Links (Desktop) */}
          <ul role="list" className="hidden md:flex items-center gap-10 text-sm font-semibold text-mystic-mint/80">
            <li>
              <a href="#features" className={`nav-link ${activeSection === 'features' ? 'active' : ''}`}>Features</a>
            </li>
            <li>
              <a href="#pricing" className={`nav-link ${activeSection === 'pricing' ? 'active' : ''}`}>Pricing</a>
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

          {/* Social Expand Row */}
          <div className="flex gap-4 items-center justify-center my-6 md:my-0">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-expand-item text-mystic-mint hover:text-oceanic-noir">
              <svg className="w-5 h-5 shrink-0 transition-all duration-300" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              <span className="social-name">Twitter</span>
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-expand-item text-mystic-mint hover:text-oceanic-noir">
              <svg className="w-5 h-5 shrink-0 transition-all duration-300" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.193 22 16.44 22 12.017 22 6.484 17.522 2 12 2z"/>
              </svg>
              <span className="social-name">GitHub</span>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-expand-item text-mystic-mint hover:text-oceanic-noir">
              <svg className="w-5 h-5 shrink-0 transition-all duration-300" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              <span className="social-name">LinkedIn</span>
            </a>
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
