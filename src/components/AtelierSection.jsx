import React, { useState } from 'react';
import { RING_EDITIONS } from '../data/rings';
import EmergeFromRing from './animation/EmergeFromRing';
import { Check, Sparkles } from 'lucide-react';

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

  const specs = [
    { label: 'Chassis', value: 'Tungsten Carbide' },
    { label: 'Hardness', value: 'Mohs 9.0' },
    { label: 'Mass', value: '14.2g' },
    { label: 'Bore', value: 'Comfort Fit' }
  ];

  return (
    <section id="atelier" className="py-20 sm:py-28 bg-transparent">
      {/* 1. Editorial Manifesto */}
      <EmergeFromRing originX={-320} originY={25} rotation={-2}>
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 bg-white/[0.04] border border-white/[0.08] mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-crimson" />
            <span className="text-[11px] font-medium tracking-widest uppercase text-porcelain-muted">
              Atelier Commission · Edition 01
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
        </div>
      </EmergeFromRing>

      {/* 2. Apple-Clean Open Unboxed Configurator: The Sovereign */}
      <EmergeFromRing originX={-280} originY={40} rotation={-1.5}>
        <div className="space-y-8 pt-4 border-t border-white/[0.08]">
          {/* Header & Price */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
            <div>
              <span className="text-[11px] font-mono text-crimson uppercase tracking-wider block mb-1">
                Flagship Edition · 01 of 09
              </span>
              <h3 className="font-display font-bold text-3xl sm:text-4xl text-porcelain tracking-tight">
                {sovereignRing.name} <span className="text-white/40 font-light">— ${sovereignRing.price}</span>
              </h3>
            </div>
            <span className="text-xs font-mono text-porcelain-dark">
              Complimentary Worldwide Courier
            </span>
          </div>

          <p className="text-sm font-light text-porcelain-muted max-w-xl leading-relaxed">
            {sovereignRing.description}
          </p>

          {/* 4-Column Inline Spec Strip with Hairline Dividers */}
          <div className="grid grid-cols-2 sm:grid-cols-4 py-4 border-y border-white/[0.08]">
            {specs.map((item, idx) => (
              <div
                key={item.label}
                className={`py-2 px-3 sm:px-4 first:pl-0 last:pr-0 ${
                  idx < specs.length - 1 ? 'sm:border-r sm:border-white/[0.08]' : ''
                } ${idx % 2 === 0 ? 'border-r border-white/[0.08] sm:border-r' : ''}`}
              >
                <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 block mb-0.5">
                  {item.label}
                </span>
                <span className="text-xs sm:text-sm font-medium text-porcelain tracking-wide">
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          {/* Ring Size Selection */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <label className="text-xs font-mono uppercase tracking-wider text-white/60">
                  Select Size (US Radial Comfort-Fit)
                </label>
                {onOpenSizing && (
                  <button
                    onClick={onOpenSizing}
                    className="text-[11px] text-porcelain-muted underline underline-offset-2 hover:text-porcelain transition-colors cursor-pointer"
                  >
                    Size Guide
                  </button>
                )}
              </div>
              <span className="text-xs font-mono text-porcelain font-semibold">
                US {selectedSize}
              </span>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {availableSizes.map((size) => {
                const isSelected = selectedSize === size;
                return (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-11 h-11 rounded-full font-mono text-xs flex items-center justify-center transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'bg-[#F5F5F7] text-[#050507] font-bold shadow-md scale-105'
                        : 'bg-white/[0.03] border border-white/[0.08] text-white/70 hover:text-white hover:bg-white/[0.08]'
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
              <div className="space-y-3 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono uppercase tracking-wider text-white/70 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-crimson" />
                    <span>Fiber Laser Inscription (Max 28 Characters)</span>
                  </label>
                  <button
                    onClick={() => {
                      setShowEngraving(false);
                      setEngraving('');
                    }}
                    className="text-[11px] text-white/40 hover:text-white transition-colors cursor-pointer"
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
                  className="w-full rounded-xl px-4 py-3 bg-black/50 border border-white/[0.12] text-porcelain font-mono text-xs focus:outline-none focus:border-white transition-colors uppercase placeholder:text-white/20"
                />

                <div className="flex items-center justify-between text-[11px] font-mono text-white/40">
                  <span>{engraving.length} / 28 chars</span>
                  <span className="tracking-widest">{engraving || '· NO INSCRIPTION ·'}</span>
                </div>
              </div>
            )}
          </div>

          {/* Add to Vault Action */}
          <div className="pt-4">
            <button
              onClick={handleAdd}
              disabled={isAdded}
              className={`rounded-full px-9 py-4 font-medium text-xs sm:text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(255,255,255,0.15)] cursor-pointer ${
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
    </section>
  );
}
