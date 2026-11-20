import React from 'react';
import { Shield, Sparkles, Eye, Compass, Layers, Gem } from 'lucide-react';
import { CRAFTSMANSHIP_LAYERS } from '../data/rings';

export default function AtelierSection() {
  const iconMap = [
    <Shield className="w-5 h-5 text-porcelain" />,
    <Sparkles className="w-5 h-5 text-crimson" />,
    <Layers className="w-5 h-5 text-rhodium-light" />,
    <Gem className="w-5 h-5 text-cyan-400" />
  ];

  return (
    <section id="craftsmanship" className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto w-full">
      {/* Section Header */}
      <div className="max-w-2xl mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono tracking-widest uppercase bg-white/[0.04] border border-white/10 text-porcelain-muted mb-4">
          <Compass className="w-3 h-3 text-crimson" />
          <span>Subterranean Metallurgy</span>
        </div>
        <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-porcelain">
          THE FOUR ANATOMIES
        </h2>
        <p className="mt-4 text-sm sm:text-base font-sans text-porcelain-muted font-light leading-relaxed">
          Engineered to outlive generations. We combine high-pressure sintered tungsten carbide with
          a physically raised 0.018m Celtic filigree sculpture, hermetically sealed under diamond-polished
          optical resin.
        </p>
      </div>

      {/* 4 Architecture Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {CRAFTSMANSHIP_LAYERS.map((layer, index) => (
          <div
            key={layer.step}
            className="group p-6 rounded-2xl glass-panel border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.03] transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Step & Icon */}
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-2xl font-bold text-white/20 group-hover:text-crimson transition-colors">
                  {layer.step}
                </span>
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {iconMap[index]}
                </div>
              </div>

              {/* Title & Specs */}
              <h3 className="font-display text-lg font-bold text-porcelain group-hover:text-white transition-colors">
                {layer.title}
              </h3>
              <p className="mt-1 text-xs font-mono text-crimson-vivid font-medium tracking-wide">
                {layer.specs}
              </p>

              {/* Detailed Description */}
              <p className="mt-4 text-xs font-sans text-porcelain-muted font-light leading-relaxed">
                {layer.description}
              </p>
            </div>

            {/* Bottom Hallmarks */}
            <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-porcelain-dark uppercase">
              <span>Spec Grade A</span>
              <span>100% Scratchproof</span>
            </div>
          </div>
        ))}
      </div>

      {/* Atelier Craftsmanship Manifesto Bar */}
      <div className="mt-16 p-8 rounded-2xl glass-subtle border border-white/[0.08] grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        <div>
          <span className="font-mono text-xs text-crimson uppercase tracking-widest block mb-1">
            01 / Diamond Chamfer
          </span>
          <p className="text-xs font-sans text-porcelain-muted">
            Twin 45-degree angled light-reflecting outer facets catch directional studio light from any angle.
          </p>
        </div>

        <div>
          <span className="font-mono text-xs text-crimson uppercase tracking-widest block mb-1">
            02 / Optical Refraction
          </span>
          <p className="text-xs font-sans text-porcelain-muted">
            High-index 1.54 IOR clear resin amplifies the depth perception of the raised silver filigree.
          </p>
        </div>

        <div>
          <span className="font-mono text-xs text-crimson uppercase tracking-widest block mb-1">
            03 / Radial Comfort Bore
          </span>
          <p className="text-xs font-sans text-porcelain-muted">
            Curved inner wall minimizes skin contact friction while carrying micro-laser Hallmarked typography.
          </p>
        </div>
      </div>
    </section>
  );
}
