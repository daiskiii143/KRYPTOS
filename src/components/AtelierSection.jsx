import React, { useState } from 'react';
import { RING_EDITIONS } from '../data/rings';
import EmergeFromRing from './animation/EmergeFromRing';
import { Check, Sparkles, Shield, Flame, Activity } from 'lucide-react';

export default function AtelierSection({
  onAddToVault,
  onOpenSizing
}) {
  // Configurator dedicated to Flagship Edition 01: The Sovereign
  const sovereignRing = RING_EDITIONS[0];

  const [selectedSize, setSelectedSize] = useState('10');
  const [engraving, setEngraving] = useState('');
  const [showEngraving, setShowEngraving] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    const sizeToUse = selectedSize || '10';
    onAddToVault(sovereignRing, `US ${sizeToUse}`, engraving);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1400);
  };

  const availableSizes = ['6', '7', '8', '9', '10', '11', '12', '13'];

  return (
    <section id="atelier" className="py-24 pt-28 bg-transparent">
      {/* 1. Ejected Editorial Manifesto (Wrapped in EmergeFromRing) */}
      <EmergeFromRing originX={-320} originY={25} rotation={-2}>
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 bg-white/[0.04] border border-white/[0.08] mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-crimson" />
            <span className="text-[11px] font-medium tracking-widest uppercase text-porcelain-muted">
              Subterranean Metallurgy · Chapter I
            </span>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl tracking-tight text-porcelain leading-[1.05]">
            Forged in obsidian.
            <br />
            <span className="text-white/50 font-light">Sealed in crimson.</span>
          </h2>

          <p className="mt-5 text-sm sm:text-base font-light text-porcelain-muted leading-relaxed max-w-xl">
            Nine bespoke architectural silhouettes forged from aerospace-grade tungsten carbide, folded Damascus steel, dark rhodium, and transmissive gemstone crystals.
          </p>

          <div className="mt-8 flex flex-wrap gap-2.5">
            {[
              'Mohs 9.0 Hardness',
              'Solid Mass Integrity',
              'Comfort-Fit Radial Bore',
              'Optical Crystal Transmissivity'
            ].map((spec) => (
              <span
                key={spec}
                className="rounded-full bg-white/[0.03] border border-white/[0.06] px-3.5 py-1.5 text-xs text-porcelain-muted"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>
      </EmergeFromRing>

      {/* 2. Spacious Flagship Configurator: The Sovereign */}
      <EmergeFromRing originX={-280} originY={40} rotation={-1.5}>
        <div className="rounded-3xl bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] p-6 sm:p-10 space-y-8 shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
          {/* Header & Price */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-mono text-crimson font-medium">
                  EDITION 01 / 09 · SIGNATURE SPECIMEN
                </span>
                <span className="text-white/20">·</span>
                <span className="text-xs text-porcelain-muted font-light capitalize">
                  Men · Crimson Filigree
                </span>
              </div>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-porcelain tracking-tight">
                {sovereignRing.name}
              </h3>
            </div>

            <div className="text-left sm:text-right">
              <span className="font-display font-bold text-2xl sm:text-3xl text-porcelain block">
                ${sovereignRing.price}
              </span>
              <span className="text-[11px] text-porcelain-dark">
                Complimentary Worldwide Courier
              </span>
            </div>
          </div>

          <p className="text-sm font-light text-porcelain-muted max-w-xl leading-relaxed">
            {sovereignRing.description}
          </p>

          {/* Key Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2">
            <div className="rounded-2xl p-3.5 bg-white/[0.02] border border-white/[0.05]">
              <span className="text-[10px] font-mono text-porcelain-dark block uppercase mb-1">Alloy</span>
              <span className="text-xs text-white font-medium">Tungsten Carbide</span>
            </div>
            <div className="rounded-2xl p-3.5 bg-white/[0.02] border border-white/[0.05]">
              <span className="text-[10px] font-mono text-porcelain-dark block uppercase mb-1">Hardness</span>
              <span className="text-xs text-white font-medium">Mohs 9.0 (2,200 HV)</span>
            </div>
            <div className="rounded-2xl p-3.5 bg-white/[0.02] border border-white/[0.05]">
              <span className="text-[10px] font-mono text-porcelain-dark block uppercase mb-1">Core</span>
              <span className="text-xs text-white font-medium">Molten Pearloid</span>
            </div>
            <div className="rounded-2xl p-3.5 bg-white/[0.02] border border-white/[0.05]">
              <span className="text-[10px] font-mono text-porcelain-dark block uppercase mb-1">Filigree</span>
              <span className="text-xs text-white font-medium">3D Rhodium Lattice</span>
            </div>
          </div>

          {/* Ring Size Selection */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <label className="text-xs font-medium text-porcelain-muted">
                  Ring Size (Radial Comfort-Fit)
                </label>
                {onOpenSizing && (
                  <button
                    onClick={onOpenSizing}
                    className="text-[11px] text-porcelain-muted underline underline-offset-2 hover:text-porcelain transition-colors"
                  >
                    Sizing Guide
                  </button>
                )}
              </div>
              <span className="text-xs font-medium text-porcelain font-mono">
                Selected: US {selectedSize}
              </span>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {availableSizes.map((size) => {
                const isSelected = selectedSize === size;
                return (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-10 h-10 rounded-full font-mono text-xs flex items-center justify-center transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'bg-[#F5F5F7] text-[#050507] font-bold shadow-md scale-105'
                        : 'bg-white/[0.03] border border-white/[0.08] text-porcelain-muted hover:text-porcelain hover:bg-white/[0.08]'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Laser Engraving Accordion / Input */}
          <div className="pt-2">
            {!showEngraving ? (
              <button
                onClick={() => setShowEngraving(true)}
                className="text-xs text-porcelain-muted hover:text-porcelain flex items-center gap-2 transition-colors cursor-pointer group"
              >
                <Sparkles className="w-3.5 h-3.5 text-crimson transition-transform group-hover:rotate-12" />
                <span className="underline underline-offset-4">
                  Add complimentary custom laser engraving (interior bore)
                </span>
              </button>
            ) : (
              <div className="space-y-2 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-porcelain-muted flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-crimson" />
                    <span>Fiber Laser Inscription (Max 28 Characters)</span>
                  </label>
                  <button
                    onClick={() => {
                      setShowEngraving(false);
                      setEngraving('');
                    }}
                    className="text-[11px] text-porcelain-dark hover:text-porcelain"
                  >
                    Remove
                  </button>
                </div>

                <input
                  type="text"
                  maxLength={28}
                  value={engraving}
                  onChange={(e) => setEngraving(e.target.value.toUpperCase())}
                  placeholder="E.G. LATITUDE · RUNES · MMXXVI"
                  className="w-full rounded-xl px-4 py-2.5 bg-black/40 border border-white/10 text-porcelain font-mono text-xs focus:outline-none focus:border-white transition-colors uppercase placeholder:text-white/20"
                />

                <div className="flex items-center justify-between text-[11px] font-mono text-porcelain-dark">
                  <span>{engraving.length} / 28 chars</span>
                  <span className="tracking-widest">{engraving || '· NO INSCRIPTION ·'}</span>
                </div>
              </div>
            )}
          </div>

          {/* Add to Vault Action */}
          <div className="pt-2">
            <button
              onClick={handleAdd}
              disabled={isAdded}
              className={`rounded-full px-8 py-4 font-medium text-xs sm:text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 shadow-lg cursor-pointer ${
                isAdded
                  ? 'bg-emerald-600 text-white scale-100'
                  : 'bg-[#F5F5F7] text-[#050507] hover:bg-white hover:scale-105 active:scale-95'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>The Sovereign Added to Vault</span>
                </>
              ) : (
                <span>Add The Sovereign to Vault · ${sovereignRing.price}</span>
              )}
            </button>
          </div>
        </div>
      </EmergeFromRing>

      {/* 3. Craftsmanship & Heritage Breakdown */}
      <EmergeFromRing originX={-260} originY={45} rotation={-1.5}>
        <div className="mt-20 space-y-8">
          <div>
            <span className="text-xs font-medium text-porcelain-dark tracking-widest uppercase block mb-1">
              Atelier Engineering
            </span>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-porcelain">
              The Architecture of Permanence
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] p-6 sm:p-7 space-y-3 hover:border-white/20 transition-all duration-300">
              <div className="w-9 h-9 rounded-full bg-crimson/10 flex items-center justify-center text-crimson mb-2">
                <Flame className="w-4 h-4" />
              </div>
              <span className="text-xs font-mono text-crimson font-medium">01 / THERMAL SINTER</span>
              <h4 className="font-display font-semibold text-base text-porcelain">
                1,500°C Vacuum Fusion
              </h4>
              <p className="text-xs text-porcelain-muted leading-relaxed font-light">
                Tungsten carbide particles are compressed under 300,000 PSI and sintered in vacuum crucibles. Vickers hardness: 2,200 HV—second only to diamond.
              </p>
            </div>

            <div className="rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] p-6 sm:p-7 space-y-3 hover:border-white/20 transition-all duration-300">
              <div className="w-9 h-9 rounded-full bg-white/[0.06] flex items-center justify-center text-porcelain mb-2">
                <Activity className="w-4 h-4" />
              </div>
              <span className="text-xs font-mono text-porcelain-muted font-medium">02 / COMFORT BORE</span>
              <h4 className="font-display font-semibold text-base text-porcelain">
                Convex Radial Geometry
              </h4>
              <p className="text-xs text-porcelain-muted leading-relaxed font-light">
                Wide and slender bands require precise ergonomic clearance. Every inner chamber is machined with a parabolic curve, preventing skin friction.
              </p>
            </div>

            <div className="rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] p-6 sm:p-7 space-y-3 hover:border-white/20 transition-all duration-300">
              <div className="w-9 h-9 rounded-full bg-white/[0.06] flex items-center justify-center text-porcelain mb-2">
                <Shield className="w-4 h-4" />
              </div>
              <span className="text-xs font-mono text-porcelain-muted font-medium">03 / LIFETIME SEAL</span>
              <h4 className="font-display font-semibold text-base text-porcelain">
                Atelier Heritage Seal
              </h4>
              <p className="text-xs text-porcelain-muted leading-relaxed font-light">
                Each piece carries an indelible hallmark. If your band ever chips or requires size reallocation over your lifetime, our atelier replaces it unconditionally.
              </p>
            </div>
          </div>
        </div>
      </EmergeFromRing>
    </section>
  );
}
