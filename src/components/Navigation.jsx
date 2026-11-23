import React, { useState, useEffect } from 'react';

export default function Navigation({
  vaultCount = 0,
  onOpenVault,
  onNavigate,
  activeSection = 'hero',
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'collection', label: 'Collection' },
    { id: 'atelier', label: 'Atelier' },
    { id: 'sizing', label: 'Sizing' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleLinkClick = (id) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 w-full bg-[#0D0D0F]/85 backdrop-blur-md border-b border-[#F2EFE9]/[0.06] transition-colors duration-200">
      <div className="max-w-[1280px] mx-auto h-full px-6 lg:px-12 flex items-center justify-between">
        {/* Left: Plain KRYPTOS wordmark in #F2EFE9 (Zero Red Dot, Zero Icons) */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('hero');
          }}
          className="text-[#F2EFE9] font-medium tracking-[0.14em] text-sm uppercase select-none hover:opacity-80 transition-opacity"
        >
          KRYPTOS
        </a>

        {/* Center: Normal-spaced clean links (Collection, Atelier, Sizing, Contact) */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-[#8E8A82]">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`transition-colors duration-150 cursor-pointer ${
                  isActive ? 'text-[#F2EFE9]' : 'hover:text-[#F2EFE9]'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right: Minimal Bag (count) text button (Zero Icons) */}
        <div className="flex items-center gap-4">
          <button
            onClick={onOpenVault}
            className="text-xs font-medium text-[#F2EFE9] hover:text-white px-3.5 py-1.5 rounded-full border border-[#F2EFE9]/10 hover:border-[#F2EFE9]/25 bg-[#151518]/60 transition-all cursor-pointer"
          >
            Bag ({vaultCount})
          </button>

          {/* Mobile menu trigger - clean text button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-xs font-medium text-[#8E8A82] hover:text-[#F2EFE9] px-2 py-1 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-[#0D0D0F]/95 backdrop-blur-xl border-b border-[#F2EFE9]/[0.08] px-6 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className="text-left text-sm font-medium text-[#8E8A82] hover:text-[#F2EFE9] py-1 transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
