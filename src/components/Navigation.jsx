import React, { useState, useEffect } from 'react';
import { ShoppingBag, Compass, Layers, ShieldCheck } from 'lucide-react';

export default function Navigation({ vaultCount = 0, onOpenVault, onNavigate }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-4 bg-[#050507]/80 backdrop-blur-md border-b border-white/[0.06]'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Architectural Wordmark */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('hero');
          }}
          className="flex items-center gap-3 group"
        >
          <div className="w-6 h-6 border border-white/20 rotate-45 flex items-center justify-center transition-all duration-300 group-hover:border-crimson group-hover:rotate-90">
            <div className="w-1.5 h-1.5 bg-crimson rounded-full"></div>
          </div>
          <span className="font-display text-xl md:text-2xl font-bold tracking-widest text-porcelain">
            KRYPTOS
          </span>
          <span className="text-[10px] uppercase font-mono tracking-widest text-porcelain-dark hidden sm:inline-block border-l border-white/10 pl-3">
            Atelier 01
          </span>
        </a>

        {/* Minimal Editorial Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-widest uppercase text-porcelain-muted">
          <button
            onClick={() => onNavigate('configurator')}
            className="hover:text-porcelain transition-colors flex items-center gap-1.5"
          >
            <Compass className="w-3.5 h-3.5 text-crimson" />
            <span>3D Atelier</span>
          </button>
          <button
            onClick={() => onNavigate('collection')}
            className="hover:text-porcelain transition-colors flex items-center gap-1.5"
          >
            <Layers className="w-3.5 h-3.5 text-white/40" />
            <span>Editions</span>
          </button>
          <button
            onClick={() => onNavigate('craftsmanship')}
            className="hover:text-porcelain transition-colors flex items-center gap-1.5"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-white/40" />
            <span>Metallurgy</span>
          </button>
        </nav>

        {/* Vault Bag Trigger */}
        <button
          onClick={onOpenVault}
          className="relative group flex items-center gap-2.5 px-4 py-2 rounded-full glass-panel hover:border-white/30 transition-all duration-300"
          aria-label="Open Vault Bag"
        >
          <ShoppingBag className="w-3.5 h-3.5 text-porcelain group-hover:text-crimson transition-colors" />
          <span className="text-xs font-mono uppercase tracking-widest text-porcelain">
            Vault
          </span>
          <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-crimson/20 border border-crimson/40 text-[10px] font-mono text-crimson font-medium">
            {vaultCount}
          </span>
        </button>
      </div>
    </header>
  );
}
