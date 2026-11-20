import React, { useState } from 'react';
import { RING_EDITIONS } from '../data/rings';
import EmergeFromRing from './animation/EmergeFromRing';

export default function AtelierSection({
  activeEdition = 'sovereign',
  onSelectEdition,
  onAddToVault,
  onOpenSizing
}) {
  const current = RING_EDITIONS.find((r) => r.id === activeEdition || r.modelEdition === activeEdition) || RING_EDITIONS[0];
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
      {/* 1. Ejected Editorial Manifesto (Wrapped in EmergeFromRing) */}
      <EmergeFromRing originX={-380} originY={30} rotation={-3}>
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-6 h-px bg-crimson" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-porcelain-muted">
              Subterranean Metallurgy · Chapter I
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-porcelain leading-[1.12]">
            Forged in obsidian.
            <br />
            Sealed in crimson.
          </h2>

          <p className="mt-6 font-serif text-lg sm:text-xl font-light text-porcelain-muted leading-relaxed max-w-xl italic">
            Aerospace-grade tungsten carbide sintered at 1,500°C. Sunk beneath an optical crystal dome,
            a hand-stratified pearloid matrix meets physically raised Celtic dragon interlace.
          </p>

          <div className="mt-8 pt-6 border-t border-white/[0.06] flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-porcelain-dark">
            <span>Mohs 9.0 Hardness</span>
            <span>·</span>
            <span>14.2g Solid Mass</span>
            <span>·</span>
            <span>Comfort-Fit Radial Bore</span>
            <span>·</span>
            <span>1.54 IOR Optical Seal</span>
          </div>
        </div>
      </EmergeFromRing>

      {/* 2. Interactive 3D Edition Configurator (Wrapped in EmergeFromRing) */}
      <EmergeFromRing originX={-340} originY={50} rotation={-2}>
        <div className="space-y-10">
          {/* Header & Price */}
          <div className="border-b border-white/[0.08] pb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-porcelain-dark">
                Edition {current.editionNumber} / 06 · Active 3D Specimen
              </span>
              <span className="font-mono text-sm sm:text-base text-porcelain font-medium">
                ${current.price} USD
              </span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-normal text-porcelain tracking-wide">
              {current.name}
            </h3>
            <p className="mt-2 font-sans text-sm font-light text-porcelain-muted max-w-lg leading-relaxed">
              {current.description}
            </p>
          </div>

          {/* Edition Selector Tabs (Switches live 3D ring materials) */}
          <div>
            <label className="font-mono text-[11px] uppercase tracking-[0.22em] text-porcelain-dark block mb-3">
              Configure Metal & Inlay Matrix
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {RING_EDITIONS.map((edition) => {
                const isSelected = current.id === edition.id;
                return (
                  <button
                    key={edition.id}
                    onClick={() => onSelectEdition(edition.id)}
                    className={`p-3 text-left border transition-all ${
                      isSelected
                        ? 'border-porcelain bg-white/[0.06] text-porcelain'
                        : 'border-white/10 bg-transparent text-porcelain-muted hover:border-white/25 hover:text-porcelain'
                    }`}
                  >
                    <div className="flex items-center justify-between font-mono text-[10px] text-porcelain-dark mb-1">
                      <span>{edition.editionNumber}</span>
                      <span>${edition.price}</span>
                    </div>
                    <div className="font-display text-xs sm:text-sm tracking-wide truncate">
                      {edition.name}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Ring Size Selection (US 6 to 12) */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <label className="font-mono text-[11px] uppercase tracking-[0.2em] text-porcelain-dark">
                  Ring Size (Comfort-Fit Profile)
                </label>
                {onOpenSizing && (
                  <button
                    onClick={onOpenSizing}
                    className="font-mono text-[10px] text-porcelain-muted underline underline-offset-2 hover:text-porcelain"
                  >
                    Sizing Guide
                  </button>
                )}
              </div>
              <span className="font-mono text-xs text-porcelain">US {selectedSize}</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
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

          {/* Laser Inscription Input */}
          <div>
            {!showEngraving ? (
              <button
                onClick={() => setShowEngraving(true)}
                className="font-mono text-xs text-porcelain-muted hover:text-porcelain transition-colors underline underline-offset-4"
              >
                + Add complimentary inner-band laser inscription
              </button>
            ) : (
              <div className="space-y-2 max-w-md animate-fade-in bg-white/[0.02] p-4 border border-white/[0.08]">
                <div className="flex items-center justify-between">
                  <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-porcelain-dark">
                    Laser Inscription (Inner Comfort Bore)
                  </label>
                  <button
                    onClick={() => {
                      setShowEngraving(false);
                      setEngraving('');
                    }}
                    className="font-mono text-[10px] text-porcelain-dark hover:text-porcelain"
                  >
                    Cancel
                  </button>
                </div>
                <input
                  type="text"
                  maxLength={28}
                  value={engraving}
                  onChange={(e) => setEngraving(e.target.value.toUpperCase())}
                  placeholder="e.g. KRYPTOS · TUNGSTEN"
                  className="w-full px-3 py-2 bg-transparent border border-white/15 text-porcelain font-mono text-xs focus:outline-none focus:border-white transition-colors uppercase placeholder:text-white/20"
                />
                <div className="flex items-center justify-between font-mono text-[10px] text-porcelain-dark">
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
              className={`w-full sm:w-auto px-10 py-4 font-mono text-xs uppercase tracking-[0.25em] font-medium transition-all ${
                isAdded
                  ? 'bg-emerald-600 text-white'
                  : 'bg-porcelain text-[#050507] hover:bg-white'
              }`}
            >
              {isAdded ? 'Piece Added to Vault' : `Add to Vault · $${current.price}`}
            </button>
          </div>
        </div>
      </EmergeFromRing>

      {/* 3. Craftsmanship & Heritage Breakdown (Clean Open Layout) */}
      <EmergeFromRing originX={-300} originY={60} rotation={-2}>
        <div className="mt-28 pt-16 border-t border-white/[0.08] space-y-12">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.28em] text-porcelain-dark block mb-2">
              Atelier Engineering
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-normal text-porcelain">
              The Architecture of Permanence
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <span className="font-mono text-xs text-crimson uppercase tracking-[0.2em] block mb-2">
                01 / Thermal Sintering
              </span>
              <h4 className="font-display text-lg text-porcelain mb-2 font-normal">
                1,500°C Vacuum Fusion
              </h4>
              <p className="font-sans text-xs text-porcelain-muted leading-relaxed font-light">
                Tungsten carbide particles are compressed under 300,000 PSI and sintered in high-vacuum crucibles. The resulting ingot possesses a Vickers hardness rating of 2,200 HV—second only to diamond.
              </p>
            </div>

            <div>
              <span className="font-mono text-xs text-crimson uppercase tracking-[0.2em] block mb-2">
                02 / Comfort Radial Bore
              </span>
              <h4 className="font-display text-lg text-porcelain mb-2 font-normal">
                Convex Interior Geometry
              </h4>
              <p className="font-sans text-xs text-porcelain-muted leading-relaxed font-light">
                Wide 8.0 mm bands require precise ergonomic clearance. Every inner chamber is machined with a parabolic curve, reducing skin contact friction and preventing moisture entrapment.
              </p>
            </div>

            <div>
              <span className="font-mono text-xs text-crimson uppercase tracking-[0.2em] block mb-2">
                03 / Lifetime Warranty
              </span>
              <h4 className="font-display text-lg text-porcelain mb-2 font-normal">
                Atelier Heritage Seal
              </h4>
              <p className="font-sans text-xs text-porcelain-muted leading-relaxed font-light">
                Each piece carries our indelible serial hallmark. If your band ever chips, breaks, or requires size re-allocation over your lifetime, our Zurich atelier replaces it unconditionally.
              </p>
            </div>
          </div>
        </div>
      </EmergeFromRing>
    </section>
  );
}
