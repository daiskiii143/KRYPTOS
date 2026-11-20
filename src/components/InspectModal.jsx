import React, { useState } from 'react';
import { X, Check, Shield } from 'lucide-react';

export default function InspectModal({ ring, isOpen, onClose, onAddToVault, onOpenSizing }) {
  const [selectedSize, setSelectedSize] = useState('10');
  const [engravingText, setEngravingText] = useState('');
  const [isAdded, setIsAdded] = useState(false);

  if (!isOpen || !ring) return null;

  const handleAdd = () => {
    onAddToVault(ring, `US ${selectedSize}`, engravingText);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-fade-in overflow-y-auto">
      {/* Backdrop click to dismiss */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-4xl bg-[#08090C] border border-white/10 rounded-none shadow-2xl p-6 sm:p-10 z-10 my-auto max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-white/[0.08] pb-6 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-crimson font-medium">
                Edition {ring.editionNumber} / 06 · {ring.category}
              </span>
              <span className="text-white/20">·</span>
              <span className="font-mono text-xs text-porcelain-dark">
                {ring.weight.split('(')[0]}
              </span>
            </div>
            <h3 className="font-display text-2xl sm:text-4xl font-normal text-porcelain">
              {ring.name}
            </h3>
            <p className="font-serif text-base text-porcelain-muted italic font-light mt-1">
              {ring.subtitle}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-porcelain-muted hover:text-white transition-colors border border-white/10 hover:border-white/25"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column: Macro Photograph */}
          <div className="space-y-4">
            <div className="relative aspect-square w-full overflow-hidden bg-[#040405] border border-white/[0.08]">
              <img
                src={ring.image}
                alt={ring.name}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08090C] via-transparent to-transparent opacity-50" />
              <div className="absolute bottom-4 left-4 font-mono text-[10px] tracking-[0.25em] text-porcelain-dark uppercase bg-[#050507]/80 backdrop-blur-md px-3 py-1.5 border border-white/10">
                MACRO VOLCANIC SLATE CAPTURE
              </div>
            </div>

            {/* Metallurgical Specs List */}
            <div className="p-4 bg-white/[0.02] border border-white/[0.06] space-y-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-porcelain-dark block mb-2">
                Verified Technical Parameters
              </span>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 font-mono text-xs text-porcelain-muted">
                <div>
                  <span className="text-porcelain-dark">Hardness: </span>
                  <span className="text-porcelain">{ring.hardness}</span>
                </div>
                <div>
                  <span className="text-porcelain-dark">Width: </span>
                  <span className="text-porcelain">{ring.width}</span>
                </div>
                <div>
                  <span className="text-porcelain-dark">Thickness: </span>
                  <span className="text-porcelain">{ring.thickness}</span>
                </div>
                <div>
                  <span className="text-porcelain-dark">Core: </span>
                  <span className="text-porcelain truncate block">{ring.core.split(' ')[0]}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Configuration */}
          <div className="space-y-6">
            {/* Editorial Lore */}
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-porcelain-dark block mb-2">
                Metallurgical Narrative
              </span>
              <p className="font-sans text-xs sm:text-sm font-light text-porcelain-muted leading-relaxed">
                {ring.detailedStory || ring.description}
              </p>
            </div>

            {/* Ring Size Selection */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-porcelain-dark">
                  Ring Size (8.0 mm Comfort Profile)
                </label>
                <span className="font-mono text-xs text-porcelain font-medium">US {selectedSize}</span>
              </div>

              <div className="grid grid-cols-7 gap-1.5">
                {ring.sizes.map((size) => {
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2.5 font-mono text-xs transition-all ${
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

            {/* Laser Inscription */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-porcelain-dark">
                  Inner-Wall Laser Engraving (Complimentary)
                </label>
                <span className="font-mono text-[10px] text-porcelain-muted">
                  {engravingText.length} / 28
                </span>
              </div>

              <input
                type="text"
                maxLength={28}
                value={engravingText}
                onChange={(e) => setEngravingText(e.target.value.toUpperCase())}
                placeholder="e.g. KRYPTOS · FORGED 2026"
                className="w-full px-3.5 py-2.5 bg-transparent border border-white/15 text-porcelain font-mono text-xs focus:outline-none focus:border-white transition-colors uppercase placeholder:text-white/20"
              />

              <div className="p-2.5 bg-[#050507] border border-white/[0.06] text-center">
                <span className="font-mono text-[11px] text-zinc-400 tracking-[0.22em]">
                  {engravingText || '· NO INSCRIPTION ·'}
                </span>
              </div>
            </div>

            {/* Price & Add to Vault Action */}
            <div className="pt-4 border-t border-white/[0.08] space-y-3">
              <div className="flex items-center justify-between font-mono">
                <span className="text-xs text-porcelain-dark uppercase tracking-wider">
                  Price:
                </span>
                <span className="text-xl text-porcelain font-medium">
                  ${ring.price} USD
                </span>
              </div>

              <button
                onClick={handleAdd}
                disabled={isAdded}
                className={`w-full py-4 font-mono text-xs uppercase tracking-[0.25em] font-medium transition-all ${
                  isAdded
                    ? 'bg-emerald-600 text-white'
                    : 'bg-porcelain text-[#050507] hover:bg-white'
                }`}
              >
                {isAdded ? 'Piece Secured in Vault' : `Add to Vault · $${ring.price}`}
              </button>

              <div className="flex items-center justify-center gap-2 font-mono text-[10px] text-porcelain-dark">
                <Shield className="w-3.5 h-3.5 text-crimson" />
                <span>Lifetime Warranty · Free Insured Express Courier</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
