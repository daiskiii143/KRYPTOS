import React from 'react';

export default function Navigation({ vaultCount = 0, onOpenVault, onNavigate }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4 px-6 md:px-12 bg-[#050507]/85 backdrop-blur-md border-b border-white/[0.06] transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Minimal Serif Architectural Mark */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('hero');
          }}
          className="font-display text-lg font-normal tracking-[0.28em] text-porcelain hover:text-white transition-colors"
        >
          KRYPTOS
        </a>

        {/* Minimal Right Navigation */}
        <nav className="flex items-center gap-6 md:gap-8 font-mono text-xs uppercase tracking-[0.2em] text-porcelain-muted">
          <button
            onClick={() => onNavigate('atelier')}
            className="hover:text-porcelain transition-colors"
          >
            Atelier
          </button>
          <span className="text-white/20 select-none">·</span>
          <button
            onClick={() => onNavigate('editions')}
            className="hover:text-porcelain transition-colors"
          >
            Editions
          </button>
          <span className="text-white/20 select-none">·</span>
          <button
            onClick={onOpenVault}
            className="hover:text-porcelain transition-colors text-porcelain font-medium flex items-center gap-1.5"
          >
            <span>Vault</span>
            <span className="text-[11px] text-porcelain-muted">({vaultCount})</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
