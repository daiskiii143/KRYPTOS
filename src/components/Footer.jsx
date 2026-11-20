import React from 'react';

export default function Footer({ onNavigate }) {
  return (
    <footer className="py-20 border-t border-white/[0.06] text-porcelain-muted font-mono text-xs">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
        <div>
          <span className="font-display text-sm tracking-[0.25em] text-porcelain uppercase block mb-1">
            KRYPTOS
          </span>
          <p className="font-mono text-[11px] text-porcelain-dark">
            Subterranean High Jewelry Atelier · Tungsten Metallurgy
          </p>
        </div>

        <div className="flex items-center gap-6 text-[11px] uppercase tracking-[0.18em]">
          <button
            onClick={() => onNavigate('hero')}
            className="hover:text-porcelain transition-colors"
          >
            Top
          </button>
          <span>·</span>
          <button
            onClick={() => onNavigate('atelier')}
            className="hover:text-porcelain transition-colors"
          >
            Atelier
          </button>
          <span>·</span>
          <button
            onClick={() => onNavigate('editions')}
            className="hover:text-porcelain transition-colors"
          >
            Editions
          </button>
        </div>

        <div className="text-[11px] text-porcelain-dark">
          © 2026 KRYPTOS. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
