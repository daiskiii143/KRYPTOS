import React from 'react';
import { RING_EDITIONS } from '../data/rings';

export default function CollectionSection({ onOpenInspect, onAddToVault }) {
  return (
    <section id="editions" className="py-24 border-b border-white/[0.06]">
      {/* Section Header */}
      <div className="mb-16">
        <span className="font-mono text-xs uppercase tracking-[0.28em] text-porcelain-muted block mb-3">
          Archive
        </span>
        <h2 className="font-display text-3xl sm:text-4xl font-normal tracking-tight text-porcelain">
          Curated Editions
        </h2>
        <p className="mt-3 font-sans text-sm font-light text-porcelain-muted max-w-lg leading-relaxed">
          Three permanent expressions of tungsten metallurgy, each pairing a high-density chassis with
          hand-stratified pearloid matrices and physically raised dragon interlace.
        </p>
      </div>

      {/* Clean 2-Column Gallery with Generous Negative Space */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        {RING_EDITIONS.map((ring) => (
          <div
            key={ring.id}
            className="flex flex-col justify-between py-6 border-b border-white/[0.06] group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-porcelain-dark tracking-[0.2em] uppercase">
                  Edition {ring.editionNumber}
                </span>
                <span className="font-mono text-xs text-porcelain">
                  ${ring.price}
                </span>
              </div>

              <h3 className="font-display text-xl sm:text-2xl font-normal text-porcelain tracking-wide group-hover:text-white transition-colors">
                {ring.name}
              </h3>

              <p className="mt-2 font-sans text-xs sm:text-sm font-light text-porcelain-muted leading-relaxed">
                {ring.subtitle}
              </p>

              <div className="mt-4 font-mono text-[11px] text-porcelain-dark">
                {ring.alloy.split('(')[0]} · {ring.weight.split('(')[0]}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex items-center gap-6 font-mono text-xs uppercase tracking-[0.2em]">
              <button
                onClick={() => onOpenInspect(ring)}
                className="text-porcelain hover:text-white underline underline-offset-8 transition-colors"
              >
                Inspect Piece
              </button>
              <span className="text-white/20 select-none">·</span>
              <button
                onClick={() => onAddToVault(ring, 'US 10', '')}
                className="text-porcelain-muted hover:text-porcelain transition-colors"
              >
                Quick Vault
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
