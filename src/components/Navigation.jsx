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
    <header className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-5xl transition-all duration-300">
      <div className="rounded-full bg-white/[0.04] backdrop-blur-2xl border border-white/[0.08] px-5 sm:px-7 py-3 flex items-center justify-between shadow-[0_10px_35px_rgba(0,0,0,0.6)]">
        {/* Brand Mark in Space Grotesk */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('hero');
          }}
          className="font-display font-bold text-base sm:text-lg tracking-tight text-porcelain hover:text-white transition-colors flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-crimson" />
          <span>KRYPTOS</span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2 text-xs font-medium text-porcelain-muted">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`rounded-full px-4 py-1.5 transition-all duration-200 hover:text-porcelain hover:bg-white/[0.06] ${
                activeSection === link.id
                  ? 'text-porcelain bg-white/[0.08] font-semibold'
                  : ''
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right Vault Pill Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenVault}
            className="rounded-full bg-white/[0.06] hover:bg-white/[0.12] active:scale-95 border border-white/[0.12] transition-all px-4 py-1.5 text-xs font-medium text-porcelain flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-porcelain-muted" />
            <span>Vault</span>
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-mono text-porcelain font-semibold">
              {vaultCount}
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full text-porcelain-muted hover:text-porcelain hover:bg-white/[0.08] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 rounded-2xl bg-[#090A0E]/95 backdrop-blur-2xl border border-white/10 p-4 shadow-2xl flex flex-col gap-2 animate-fade-in text-sm font-medium text-porcelain-muted">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className="rounded-xl px-4 py-2.5 text-left hover:text-porcelain hover:bg-white/[0.06] transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
