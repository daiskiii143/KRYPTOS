import React from 'react';

export default function Footer({ onNavigate }) {
  return (
    <footer className="py-20 mt-16 border-t border-white/[0.08] text-porcelain-muted text-xs bg-transparent">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <span className="font-display font-bold text-lg tracking-tight text-porcelain uppercase block mb-1">
            KRYPTOS
          </span>
          <p className="text-xs text-porcelain-muted max-w-sm font-light">
            Subterranean High Jewelry Atelier · Tungsten Metallurgy Sintering · Comfort-Fit Geometry
          </p>
          <p className="text-xs text-crimson font-mono mt-2">
            atelier@kryptos.store
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs">
          {[
            { id: 'hero', label: 'Top' },
            { id: 'atelier', label: 'Atelier' },
            { id: 'collection', label: 'Collection' },
            { id: 'sizing', label: 'Sizing' },
            { id: 'contact', label: 'Contact' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="rounded-full px-3.5 py-1.5 bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.08] hover:text-porcelain transition-all cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="text-xs text-porcelain-dark font-mono text-left md:text-right">
          <div>ZURICH · LONDON · REYKJAVIK</div>
          <div className="mt-1">© 2026 KRYPTOS. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}
