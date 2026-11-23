import React, { useState } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';

export default function Navigation({
  vaultCount = 0,
  onOpenVault,
  onNavigate,
  activeSection = 'hero'
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'atelier', label: 'Atelier' },
    { id: 'collection', label: 'Collection' },
    { id: 'sizing', label: 'Sizing' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleLinkClick = (id) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full px-6 sm:px-10 md:px-14 py-6 sm:py-8 flex items-center justify-between pointer-events-none transition-all duration-300">
      {/* 1. Far Left Minimal Brand Mark (Floating directly over canvas) */}
      <a
        href="#hero"
        onClick={(e) => {
          e.preventDefault();
          handleLinkClick('hero');
        }}
        className="pointer-events-auto flex items-center gap-2.5 group cursor-pointer"
      >
        <span className="w-2 h-2 rounded-full bg-crimson shadow-[0_0_12px_rgba(220,38,38,0.8)] transition-transform group-hover:scale-125" />
        <span className="font-display font-medium text-sm sm:text-base tracking-[0.22em] uppercase text-porcelain group-hover:text-white transition-colors">
          KRYPTOS
        </span>
      </a>

      {/* 2. Center Lightweight Navigation Links (Borderless spatial floating) */}
      <nav className="pointer-events-auto hidden md:flex items-center gap-8 lg:gap-10 text-xs font-mono tracking-[0.2em] uppercase text-white/50">
        {navLinks.map((link) => {
          const isActive = activeSection === link.id;
          return (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`relative py-1 transition-colors duration-200 hover:text-white cursor-pointer ${
                isActive ? 'text-white font-medium' : ''
              }`}
            >
              {link.label}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/60" />
              )}
            </button>
          );
        })}
      </nav>

      {/* 3. Far Right Crisp Porcelain/Glass Vault Pill */}
      <div className="pointer-events-auto flex items-center gap-3">
        <button
          onClick={onOpenVault}
          className="rounded-full bg-white/[0.08] hover:bg-white/[0.16] active:scale-95 border border-white/[0.15] backdrop-blur-xl transition-all duration-300 px-5 py-2 text-xs font-medium text-porcelain flex items-center gap-2.5 cursor-pointer shadow-[0_8px_24px_rgba(0,0,0,0.3)] hover:border-white/30 hover:text-white"
        >
          <ShoppingBag className="w-3.5 h-3.5 text-white/70" />
          <span className="tracking-wide">Vault</span>
          <span className="rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-mono font-semibold text-white">
            {vaultCount}
          </span>
        </button>

        {/* Mobile Menu Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-full text-porcelain-muted hover:text-white hover:bg-white/[0.08] backdrop-blur-md transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto absolute top-full left-6 right-6 mt-2 rounded-3xl bg-[#090A0E]/95 backdrop-blur-2xl border border-white/10 p-5 shadow-2xl flex flex-col gap-2 animate-fade-in text-sm font-mono tracking-widest uppercase text-white/60">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className="rounded-2xl px-4 py-3 text-left hover:text-white hover:bg-white/[0.06] transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
