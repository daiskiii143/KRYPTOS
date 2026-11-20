import React from 'react';
import { Shield, Sparkles, Compass } from 'lucide-react';

export default function Footer({ onNavigate }) {
  return (
    <footer className="border-t border-white/[0.08] bg-[#030406] py-16 px-6 md:px-12 relative z-20">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Top Tier: Brand & Hallmarks */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border border-white/20 rotate-45 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-crimson rounded-full" />
              </div>
              <span className="font-display text-xl font-bold tracking-widest text-porcelain">
                KRYPTOS
              </span>
            </div>
            <p className="text-xs font-sans text-porcelain-muted max-w-sm font-light leading-relaxed">
              Subterranean luxury ring atelier specializing in sintered tungsten carbide chassis,
              hand-stratified pearloid matrices, and physically raised 3D Celtic filigree.
            </p>
          </div>

          {/* Nav Links */}
          <div className="md:col-span-3 space-y-2 font-mono text-xs uppercase tracking-wider text-porcelain-muted">
            <span className="text-porcelain-dark block text-[10px] mb-3">Navigation</span>
            <div>
              <button
                onClick={() => onNavigate('hero')}
                className="hover:text-porcelain transition-colors"
              >
                00 / The Reveal
              </button>
            </div>
            <div>
              <button
                onClick={() => onNavigate('configurator')}
                className="hover:text-porcelain transition-colors"
              >
                01 / 3D Atelier Configurator
              </button>
            </div>
            <div>
              <button
                onClick={() => onNavigate('collection')}
                className="hover:text-porcelain transition-colors"
              >
                02 / Curated Editions
              </button>
            </div>
            <div>
              <button
                onClick={() => onNavigate('craftsmanship')}
                className="hover:text-porcelain transition-colors"
              >
                03 / Metallurgy Breakdown
              </button>
            </div>
          </div>

          {/* Hallmarks Badge */}
          <div className="md:col-span-4 space-y-3 font-mono text-xs">
            <span className="text-porcelain-dark block text-[10px] uppercase tracking-wider">
              Atelier Hallmarks
            </span>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2 text-[11px] text-porcelain-muted">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-crimson" />
                <span>WC 85.7% · Co 9.5% · Ni 4.8% Pure Sinter</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rhodium-light" />
                <span>0.018m Raised 3D Celtic Relief</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>1.54 IOR Optical Seal</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Tier: Copyright & Disclaimers */}
        <div className="pt-8 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-porcelain-dark">
          <span>© 2026 KRYPTOS HIGH JEWELRY ATELIER. ALL RIGHTS RESERVED.</span>
          <div className="flex items-center gap-6">
            <span>MOHS 9.0 CERTIFIED</span>
            <span>LIFETIME METALLURGY GUARANTEE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
