import React, { useState } from 'react';
import { RING_EDITIONS } from '../data/rings';

export default function AtelierSection({
  activeEdition = 'ignis',
  onSelectEdition,
  onAddToVault
}) {
  const current = RING_EDITIONS.find((r) => r.id === activeEdition) || RING_EDITIONS[0];
  const [selectedSize, setSelectedSize] = useState('10');
  const [engraving, setEngraving] = useState('');
  const [showEngraving, setShowEngraving] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    onAddToVault(current, `US ${selectedSize}`, engraving);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1200);
  };

  return (
    <section id="atelier" className="py-24 border-b border-white/[0.06]">
      {/* Ejected Editorial Headline & Manifesto */}
      <div className="mb-24">
        <span className="font-mono text-xs uppercase tracking-[0.28em] text-porcelain-muted block mb-4">
          Subterranean Metallurgy
        </span>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-porcelain leading-[1.15]">
          Forged in obsidian.
          <br />
          Sealed in crimson.
        </h2>
        <p className="mt-6 font-sans text-sm sm:text-base font-light text-porcelain-muted leading-relaxed max-w-xl">
          Aerospace-grade tungsten carbide sintered at 1,500°C. Sunk beneath an optical crystal dome,
          a hand-stratified pearloid matrix meets physically raised Celtic dragon filigree.
        </p>
        <div className="mt-8 pt-6 border-t border-white/[0.06] flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-porcelain-dark">
          <span>Mohs 9.0 Hardness</span>
          <span>·</span>
          <span>14.2g Solid Weight</span>
          <span>·</span>
          <span>Comfort-Fit Radial Bore</span>
          <span>·</span>
          <span>1.54 IOR Optical Seal</span>
        </div>
      </div>

      {/* Section 01: Interactive Edition Switcher (Unboxed) */}
      <div className="space-y-10">
        {/* Title & Price */}
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-porcelain-dark block mb-2">
            Edition {current.editionNumber}
          </span>
          <h3 className="font-display text-2xl sm:text-3xl font-normal text-porcelain tracking-wide">
            {current.name} — ${current.price}
          </h3>
          <p className="mt-3 font-sans text-sm font-light text-porcelain-muted max-w-lg leading-relaxed">
            {current.description}
          </p>
        </div>

        {/* 3 Minimalist Underline Finish Tabs */}
        <div>
          <label className="font-mono text-[11px] uppercase tracking-[0.2em] text-porcelain-dark block mb-3">
            Finish & Matrix
          </label>
          <div className="flex items-center gap-8 border-b border-white/[0.08] pb-1">
            {RING_EDITIONS.map((edition) => {
              const isSelected = activeEdition === edition.id;
              return (
                <button
                  key={edition.id}
                  onClick={() => onSelectEdition(edition.id)}
                  className={`pb-3 font-mono text-xs uppercase tracking-[0.18em] transition-all relative ${
                    isSelected
                      ? 'text-porcelain font-medium'
                      : 'text-porcelain-muted hover:text-porcelain'
                  }`}
                >
                  {edition.finishTab}
                  {isSelected && (
                    <span className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-porcelain animate-fade-in" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Clean Size Row (6 to 12) */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="font-mono text-[11px] uppercase tracking-[0.2em] text-porcelain-dark">
              Size (Comfort-Fit Profile)
            </label>
            <span className="font-mono text-xs text-porcelain">US {selectedSize}</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            {['6', '7', '8', '9', '10', '11', '12'].map((size) => {
              const isSelected = selectedSize === size;
              return (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center font-mono text-xs transition-all ${
                    isSelected
                      ? 'bg-porcelain text-[#050507] font-medium'
                      : 'border border-white/10 text-porcelain-muted hover:text-porcelain hover:border-white/30'
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>

        {/* Optional Custom Engraving Field */}
        <div>
          {!showEngraving ? (
            <button
              onClick={() => setShowEngraving(true)}
              className="font-mono text-xs text-porcelain-muted hover:text-porcelain transition-colors underline underline-offset-4"
            >
              + Add complimentary inner-band laser inscription
            </button>
          ) : (
            <div className="space-y-2 max-w-md animate-fade-in">
              <div className="flex items-center justify-between">
                <label className="font-mono text-[11px] uppercase tracking-[0.2em] text-porcelain-dark">
                  Laser Inscription (Inner Comfort Bore)
                </label>
                <button
                  onClick={() => setShowEngraving(false)}
                  className="font-mono text-[10px] text-porcelain-dark hover:text-porcelain"
                >
                  Remove
                </button>
              </div>
              <input
                type="text"
                maxLength={28}
                value={engraving}
                onChange={(e) => setEngraving(e.target.value.toUpperCase())}
                placeholder="e.g. KRYPTOS · TUNGSTEN"
                className="w-full px-3 py-2.5 bg-transparent border border-white/15 text-porcelain font-mono text-xs focus:outline-none focus:border-white transition-colors uppercase placeholder:text-white/20"
              />
            </div>
          )}
        </div>

        {/* Single Crisp Porcelain-White Add to Vault Button */}
        <div className="pt-2">
          <button
            onClick={handleAdd}
            disabled={isAdded}
            className={`w-full sm:w-auto px-10 py-4 font-mono text-xs uppercase tracking-[0.25em] font-medium transition-all ${
              isAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-porcelain text-[#050507] hover:bg-white'
            }`}
          >
            {isAdded ? 'Added to Vault' : `Add to Vault · $${current.price}`}
          </button>
        </div>
      </div>
    </section>
  );
}
