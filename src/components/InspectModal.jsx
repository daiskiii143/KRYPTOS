import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

export default function InspectModal({ ring, isOpen, onClose, onAddToVault }) {
  const [selectedSize, setSelectedSize] = useState('10');
  const [engravingText, setEngravingText] = useState('KRYPTOS · TUNGSTEN CARBIDE');
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/85 backdrop-blur-xl animate-fade-in">
      {/* Backdrop click to dismiss */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-xl bg-[#090A0D] border border-white/10 rounded-none shadow-2xl p-8 sm:p-10 space-y-8 z-10">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-white/[0.08] pb-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-porcelain-dark block mb-1">
              Edition {ring.editionNumber}
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-normal text-porcelain">
              {ring.name}
            </h3>
            <p className="font-mono text-xs text-porcelain-muted mt-1">
              ${ring.price} USD · Bespoke Sizing
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-porcelain-muted hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Ring Size Selection */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="font-mono text-[11px] uppercase tracking-[0.2em] text-porcelain-dark">
              Ring Size (Comfort-Fit Profile)
            </label>
            <span className="font-mono text-xs text-porcelain">US {selectedSize}</span>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {['6', '7', '8', '9', '10', '11', '12'].map((size) => {
              const isSelected = selectedSize === size;
              return (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-3 font-mono text-xs transition-all ${
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
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="font-mono text-[11px] uppercase tracking-[0.2em] text-porcelain-dark">
              Inner-Wall Laser Engraving (Complimentary)
            </label>
            <span className="font-mono text-[11px] text-porcelain-muted">
              {engravingText.length} / 28
            </span>
          </div>

          <input
            type="text"
            maxLength={28}
            value={engravingText}
            onChange={(e) => setEngravingText(e.target.value.toUpperCase())}
            placeholder="e.g. KRYPTOS · FORGED 2026"
            className="w-full px-4 py-3 bg-transparent border border-white/15 text-porcelain font-mono text-xs focus:outline-none focus:border-white transition-colors uppercase placeholder:text-white/20"
          />

          <div className="p-3 bg-[#050507] border border-white/[0.06] text-center">
            <span className="font-mono text-xs text-zinc-400 tracking-[0.25em]">
              {engravingText || '· EMPTY ENGRAVING ·'}
            </span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="font-mono text-xs uppercase tracking-[0.2em] text-porcelain-muted hover:text-white transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={handleAdd}
            disabled={isAdded}
            className={`px-8 py-3.5 font-mono text-xs uppercase tracking-[0.25em] font-medium transition-all ${
              isAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-porcelain text-[#050507] hover:bg-white'
            }`}
          >
            {isAdded ? 'Added to Vault' : `Add to Vault · $${ring.price}`}
          </button>
        </div>
      </div>
    </div>
  );
}
