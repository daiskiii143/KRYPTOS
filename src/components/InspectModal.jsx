import React, { useState } from 'react';
import { X, Check, Shield, Sparkles } from 'lucide-react';

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
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-2xl animate-fade-in overflow-y-auto">
      {/* Backdrop click to dismiss */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Dialog Card (Zero Sharp Rectangles) */}
      <div className="relative w-full max-w-4xl rounded-3xl bg-[#090A0E]/95 backdrop-blur-2xl border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.8)] p-6 sm:p-10 z-10 my-auto max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-white/[0.08] pb-6 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[11px] font-mono text-crimson font-medium uppercase tracking-wider">
                EDITION {ring.editionNumber} / 06 · {ring.category}
              </span>
              <span className="text-white/20">·</span>
              <span className="text-xs text-porcelain-dark font-mono">
                {ring.weight.split('(')[0]}
              </span>
            </div>
            <h3 className="font-display font-bold text-2xl sm:text-4xl text-porcelain tracking-tight">
              {ring.name}
            </h3>
            <p className="text-xs sm:text-sm text-porcelain-muted font-light mt-1">
              {ring.subtitle}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2.5 text-porcelain-muted hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Left Column: Macro Photograph */}
          <div className="space-y-4">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-black/60 border border-white/[0.08]">
              <img
                src={ring.image}
                alt={ring.name}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-50" />
              <div className="absolute bottom-3.5 left-3.5 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 border border-white/10 text-[10px] font-mono text-porcelain-muted tracking-wider uppercase">
                MACRO VOLCANIC SLATE CAPTURE
              </div>
            </div>

            {/* Metallurgical Specs List */}
            <div className="rounded-2xl p-4 bg-white/[0.03] border border-white/[0.06] space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-porcelain-dark block mb-1">
                Verified Technical Parameters
              </span>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs font-mono text-porcelain-muted">
                <div>
                  <span className="text-porcelain-dark">Hardness: </span>
                  <span className="text-porcelain font-medium">{ring.hardness}</span>
                </div>
                <div>
                  <span className="text-porcelain-dark">Profile Width: </span>
                  <span className="text-porcelain font-medium">{ring.width}</span>
                </div>
                <div>
                  <span className="text-porcelain-dark">Thickness: </span>
                  <span className="text-porcelain font-medium">{ring.thickness}</span>
                </div>
                <div>
                  <span className="text-porcelain-dark">Core Ingot: </span>
                  <span className="text-porcelain font-medium truncate block">{ring.core.split(' ')[0]}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Configuration */}
          <div className="space-y-6">
            {/* Editorial Lore */}
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-porcelain-dark block mb-1.5">
                Metallurgical Narrative
              </span>
              <p className="text-xs sm:text-sm font-light text-porcelain-muted leading-relaxed">
                {ring.description}
              </p>
            </div>

            {/* Price & Allocation */}
            <div className="rounded-2xl p-4 bg-white/[0.03] border border-white/[0.06] flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-porcelain-dark block">
                  Vault Allocation Price
                </span>
                <span className="font-display font-bold text-2xl text-porcelain">
                  ${ring.price} USD
                </span>
              </div>
              <span className="rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 text-[11px] font-medium">
                In Crucible Stock
              </span>
            </div>

            {/* Size Picker */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2">
                  <label className="text-xs font-medium text-porcelain-muted">
                    Radial Comfort-Fit Size
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
                <span className="text-xs font-mono font-medium text-porcelain">US {selectedSize}</span>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                {ring.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-mono text-xs transition-all duration-200 ${
                      selectedSize === sz
                        ? 'bg-[#F5F5F7] text-[#050507] font-bold shadow-sm scale-105'
                        : 'bg-white/[0.03] border border-white/[0.08] text-porcelain-muted hover:text-porcelain hover:bg-white/[0.08]'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Laser Engraving Input */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-porcelain-muted flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-crimson" />
                  <span>Complimentary Fiber Laser Inscription</span>
                </label>
                <span className="text-[10px] font-mono text-porcelain-dark">
                  {engravingText.length} / 28
                </span>
              </div>
              <input
                type="text"
                maxLength={28}
                value={engravingText}
                onChange={(e) => setEngravingText(e.target.value.toUpperCase())}
                placeholder="E.G. LATITUDE · RUNES · MMXXVI"
                className="w-full rounded-xl px-4 py-2.5 bg-black/40 border border-white/10 text-porcelain font-mono text-xs focus:outline-none focus:border-white transition-colors uppercase placeholder:text-white/20"
              />
            </div>

            {/* Actions */}
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={handleAdd}
                disabled={isAdded}
                className={`flex-1 rounded-full py-4 text-xs font-semibold tracking-wide transition-all duration-300 flex items-center justify-center gap-2 shadow-lg cursor-pointer ${
                  isAdded
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#F5F5F7] text-[#050507] hover:bg-white hover:scale-[1.02] active:scale-95'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Vault</span>
                  </>
                ) : (
                  <span>Add to Vault · ${ring.price}</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
