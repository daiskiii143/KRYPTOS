import React from 'react';
import { Sparkles, Eye, ArrowUpRight, Shield, Zap } from 'lucide-react';
import { RING_EDITIONS } from '../data/rings';

export default function CollectionSection({ onOpenInspect, onSelectEdition, activeEdition }) {
  return (
    <section id="collection" className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto w-full">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono tracking-widest uppercase bg-white/[0.04] border border-white/10 text-porcelain-muted mb-4">
            <Sparkles className="w-3 h-3 text-crimson" />
            <span>Permanent Collection · 2026</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-porcelain">
            CURATED EDITIONS
          </h2>
          <p className="mt-3 text-sm sm:text-base font-sans text-porcelain-muted max-w-lg font-light leading-relaxed">
            Four expressions of tungsten metallurgy, each pairing a high-density chassis with
            hand-marbled pearloid cores and physically raised 3D dragon interlace.
          </p>
        </div>

        <div className="text-right hidden md:block">
          <span className="text-xs font-mono tracking-widest text-porcelain-dark uppercase">
            All pieces include
          </span>
          <p className="text-xs font-mono text-porcelain-muted mt-0.5">
            Lifetime Armor Warranty & Custom Comfort Bore
          </p>
        </div>
      </div>

      {/* 4 Ring Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {RING_EDITIONS.map((ring) => {
          const isActive = activeEdition === ring.id;
          return (
            <div
              key={ring.id}
              className={`group relative rounded-2xl glass-panel border transition-all duration-500 flex flex-col justify-between overflow-hidden ${
                isActive
                  ? 'border-crimson/80 bg-white/[0.03] shadow-xl shadow-crimson/10'
                  : 'border-white/[0.08] hover:border-white/25 hover:bg-white/[0.03]'
              }`}
            >
              {/* Top Bar inside Card */}
              <div className="p-5 flex items-center justify-between border-b border-white/[0.05]">
                <span className="font-mono text-xs text-porcelain-muted tracking-widest">
                  EDITION {ring.editionNumber}
                </span>
                <div
                  className="w-2.5 h-2.5 rounded-full border border-white/30"
                  style={{ backgroundColor: ring.accentColor }}
                />
              </div>

              {/* Center Visual Showcase */}
              <div
                onClick={() => {
                  onSelectEdition(ring.id);
                  onOpenInspect(ring);
                }}
                className="relative py-12 px-6 flex flex-col items-center justify-center cursor-pointer group-hover:scale-105 transition-transform duration-500 overflow-hidden"
              >
                {/* Radial Glow Underlay */}
                <div
                  className="absolute w-40 h-40 rounded-full blur-3xl opacity-25 transition-opacity group-hover:opacity-40"
                  style={{ backgroundColor: ring.accentColor }}
                />

                {/* Abstract Stylized Ring Silhouette Badge */}
                <div className="relative w-36 h-36 rounded-full border-[10px] border-[#07080A] shadow-2xl flex items-center justify-center overflow-hidden">
                  {/* Outer Bevel Ring Rim */}
                  <div className="absolute inset-0 rounded-full border-2 border-white/20" />
                  
                  {/* Channel Inlay Texture Preview */}
                  <div
                    className="absolute inset-2 rounded-full opacity-90 transition-transform duration-700 group-hover:scale-110"
                    style={{
                      background:
                        ring.id === 'ignis'
                          ? 'radial-gradient(circle, #8B0015 20%, #1A0205 70%, #000 95%)'
                          : ring.id === 'eclipse'
                          ? 'radial-gradient(circle, #27272A 20%, #09090B 70%, #000 95%)'
                          : ring.id === 'aether'
                          ? 'radial-gradient(circle, #059669 20%, #064E3B 70%, #000 95%)'
                          : 'radial-gradient(circle, #6D28D9 20%, #2E1065 70%, #000 95%)'
                    }}
                  />

                  {/* Silver Filigree Overlay Ring Pattern */}
                  <div className="absolute inset-3 rounded-full border border-dashed border-white/50 animate-spin-slow opacity-75" />

                  {/* Core Bore */}
                  <div className="w-16 h-16 rounded-full bg-[#050507] border border-white/10 flex items-center justify-center">
                    <span className="font-mono text-[9px] text-porcelain-dark tracking-tighter uppercase">
                      KRYPTOS
                    </span>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <span className="inline-block text-[10px] font-mono tracking-widest uppercase text-porcelain-dark group-hover:text-porcelain transition-colors">
                    Click to Inspect 3D
                  </span>
                </div>
              </div>

              {/* Bottom Card Content */}
              <div className="p-5 border-t border-white/[0.05] flex flex-col gap-4 bg-[#050507]/40">
                <div>
                  <h3 className="font-display text-base font-bold text-porcelain tracking-tight group-hover:text-white transition-colors">
                    {ring.name}
                  </h3>
                  <p className="text-xs font-mono text-porcelain-muted mt-1 truncate">
                    {ring.subtitle}
                  </p>
                </div>

                {/* Specs Row */}
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-porcelain-muted pt-2 border-t border-white/[0.04]">
                  <div>
                    <span className="text-porcelain-dark block text-[9px] uppercase">Alloy</span>
                    <span className="text-porcelain truncate block">Tungsten 85.7%</span>
                  </div>
                  <div>
                    <span className="text-porcelain-dark block text-[9px] uppercase">Weight</span>
                    <span className="text-porcelain truncate block">{ring.weight.split('(')[0]}</span>
                  </div>
                </div>

                {/* Actions & Price */}
                <div className="pt-2 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-porcelain-dark block">
                      Price
                    </span>
                    <span className="font-mono text-lg font-bold text-porcelain">
                      ${ring.price}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      onSelectEdition(ring.id);
                      onOpenInspect(ring);
                    }}
                    className="p-2.5 rounded-xl border border-white/10 hover:border-crimson hover:bg-crimson/10 text-porcelain hover:text-white transition-all flex items-center gap-1.5"
                    aria-label={`Inspect ${ring.name}`}
                  >
                    <span className="text-xs font-mono uppercase tracking-wider pr-1">Configure</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-crimson" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
