import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navigation({
  vaultCount = 0,
  onOpenVault,
  onNavigate,
  activeSection = 'hero'
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'atelier', label: 'Atelier' },
    { id: 'collection', label: 'Collection' },
    { id: 'sizing', label: 'Sizing Guide' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleLinkClick = (id) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4 px-6 md:px-12 bg-[#050507]/90 backdrop-blur-xl border-b border-white/[0.06] transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Mark in Cinzel Decorative */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('hero');
          }}
          className="font-display text-lg sm:text-xl font-normal tracking-[0.28em] text-porcelain hover:text-white transition-colors flex items-center gap-3"
        >
          <span>KRYPTOS</span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 font-mono text-[11px] uppercase tracking-[0.22em] text-porcelain-muted">
          {navLinks.map((link, idx) => (
            <React.Fragment key={link.id}>
              {idx > 0 && <span className="text-white/15 select-none">·</span>}
              <button
                onClick={() => handleLinkClick(link.id)}
                className={`transition-colors hover:text-porcelain ${
                  activeSection === link.id ? 'text-porcelain font-medium' : ''
                }`}
              >
                {link.label}
              </button>
            </React.Fragment>
          ))}
          <span className="text-white/15 select-none">·</span>
          <button
            onClick={onOpenVault}
            className="hover:text-white transition-colors text-porcelain font-medium flex items-center gap-1.5 px-3 py-1.5 border border-white/15 bg-white/[0.03] hover:bg-white/[0.08]"
          >
            <span>Vault</span>
            <span className="text-[10px] text-porcelain-muted font-mono">({vaultCount})</span>
          </button>
        </nav>

        {/* Mobile Header Right */}
        <div className="flex lg:hidden items-center gap-3">
          <button
            onClick={onOpenVault}
            className="font-mono text-xs text-porcelain px-3 py-1.5 border border-white/15 flex items-center gap-1.5"
          >
            <span>Vault</span>
            <span className="text-[10px] text-porcelain-muted">({vaultCount})</span>
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-porcelain-muted hover:text-porcelain"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-4 pt-4 border-t border-white/[0.08] flex flex-col gap-4 font-mono text-xs uppercase tracking-[0.2em] text-porcelain-muted animate-fade-in pb-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className="text-left py-2 hover:text-porcelain transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
