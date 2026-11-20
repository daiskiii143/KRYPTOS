import React from 'react';

export default function Footer({ onNavigate }) {
  return (
    <footer className="py-24 border-t border-white/[0.08] text-porcelain-muted font-mono text-xs">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
        <div>
          <span className="font-display text-lg tracking-[0.25em] text-porcelain uppercase block mb-1">
            KRYPTOS
          </span>
          <p className="font-mono text-[11px] text-porcelain-dark max-w-sm">
            Subterranean High Jewelry Atelier · Tungsten Metallurgy Sintering · Comfort-Fit Geometry
          </p>
          <p className="font-mono text-[11px] text-crimson mt-2">
            atelier@kryptos.store
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-[11px] uppercase tracking-[0.2em]">
          <button
            onClick={() => onNavigate('hero')}
            className="hover:text-porcelain transition-colors"
          >
            Top
          </button>
          <span className="text-white/20 select-none">·</span>
          <button
            onClick={() => onNavigate('atelier')}
            className="hover:text-porcelain transition-colors"
          >
            Atelier
          </button>
          <span className="text-white/20 select-none">·</span>
          <button
            onClick={() => onNavigate('collection')}
            className="hover:text-porcelain transition-colors"
          >
            Collection
          </button>
          <span className="text-white/20 select-none">·</span>
          <button
            onClick={() => onNavigate('sizing')}
            className="hover:text-porcelain transition-colors"
          >
            Sizing Guide
          </button>
          <span className="text-white/20 select-none">·</span>
          <button
            onClick={() => onNavigate('contact')}
            className="hover:text-porcelain transition-colors"
          >
            Contact
          </button>
        </div>

        <div className="text-[11px] text-porcelain-dark text-right">
          <div>ZURICH · LONDON · REYKJAVIK</div>
          <div className="mt-1">© 2026 KRYPTOS. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}
