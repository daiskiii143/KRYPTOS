import React, { useState, useEffect } from 'react';
import { X, Check, ShieldCheck, Sparkles, Sliders, Type, PackageCheck } from 'lucide-react';

export default function InspectModal({ ring, isOpen, onClose, onAddToVault }) {
  const [selectedSize, setSelectedSize] = useState('US 10');
  const [engravingText, setEngravingText] = useState('KRYPTOS · TUNGSTEN CARBIDE');
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (ring?.sizes && ring.sizes.length > 0) {
      if (!ring.sizes.includes(selectedSize)) {
        setSelectedSize(ring.sizes[0]);
      }
    }
  }, [ring]);

  if (!isOpen || !ring) return null;

  const handleAdd = () => {
    onAddToVault(ring, selectedSize, engravingText);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-fade-in">
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-2xl bg-[#090A0E] border border-white/10 rounded-2xl shadow-2xl shadow-black overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Top Header */}
        <div className="p-6 border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-porcelain-muted tracking-widest uppercase">
              EDITION {ring.editionNumber}
            </span>
            <span className="text-white/20">|</span>
            <span className="font-mono text-xs text-crimson uppercase tracking-widest">
              Atelier Specification
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-white/10 hover:border-white/30 flex items-center justify-center text-porcelain-muted hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body: Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Title & Description */}
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-porcelain">
              {ring.name}
            </h2>
            <p className="text-sm font-sans text-porcelain-muted mt-1 leading-relaxed">
              {ring.description}
            </p>
          </div>

          {/* Ring Size Selector (US 6 to US 12) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono uppercase tracking-widest text-porcelain">
                Ring Size (Comfort-Fit Profile)
              </label>
              <span className="text-[11px] font-mono text-porcelain-muted">
                Selected: <strong className="text-porcelain">{selectedSize}</strong>
              </span>
            </div>

            <div className="grid grid-cols-7 gap-2">
              {['US 6', 'US 7', 'US 8', 'US 9', 'US 10', 'US 11', 'US 12'].map((size) => {
                const isSelected = selectedSize === size;
                const isAvailable = ring.sizes?.includes(size) ?? true;
                return (
                  <button
                    key={size}
                    disabled={!isAvailable}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2.5 rounded-lg font-mono text-xs transition-all ${
                      isSelected
                        ? 'bg-porcelain text-[#050507] font-bold shadow-md shadow-white/10'
                        : isAvailable
                        ? 'bg-white/[0.04] text-porcelain hover:bg-white/10 border border-white/[0.06]'
                        : 'bg-white/[0.01] text-white/20 border border-white/[0.03] cursor-not-allowed line-through'
                    }`}
                  >
                    {size.replace('US ', '')}
                  </button>
                );
              })}
            </div>
            <p className="text-[11px] font-mono text-porcelain-dark">
              *Comfort-fit inner bore features rounded radial geometry; standard true-to-size fit recommended.
            </p>
          </div>

          {/* Live Inner-Band Custom Comfort Engraving Preview */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono uppercase tracking-widest text-porcelain flex items-center gap-1.5">
                <Type className="w-3.5 h-3.5 text-crimson" />
                <span>Inner-Wall Laser Engraving (Complimentary)</span>
              </label>
              <span className="text-[11px] font-mono text-porcelain-muted">
                {engravingText.length} / 32 chars
              </span>
            </div>

            <input
              type="text"
              maxLength={32}
              value={engravingText}
              onChange={(e) => setEngravingText(e.target.value.toUpperCase())}
              placeholder="e.g. KRYPTOS · FORGED 2026"
              className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-porcelain font-mono text-xs focus:outline-none focus:border-crimson focus:ring-1 focus:ring-crimson tracking-wider placeholder:text-white/20"
            />

            {/* Visual Simulated Inner Inscription Ribbon */}
            <div className="p-4 rounded-xl bg-[#050507] border border-white/[0.08] flex flex-col items-center justify-center gap-1">
              <span className="text-[9px] font-mono uppercase tracking-widest text-porcelain-dark">
                Simulated Inner Comfort Bore Profile:
              </span>
              <div className="w-full py-2 px-4 rounded bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 border border-zinc-700/40 flex items-center justify-center shadow-inner">
                <span className="font-mono text-xs text-zinc-400 tracking-[0.25em] font-medium drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                  {engravingText || '· EMPTY ENGRAVING ·'}
                </span>
              </div>
            </div>
          </div>

          {/* Metallurgy & Physical Characteristics Grid */}
          <div className="p-4 rounded-xl glass-subtle border border-white/[0.06] grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div>
              <span className="text-porcelain-dark block text-[10px] uppercase">Hardness</span>
              <span className="text-porcelain font-medium">{ring.hardness.split(' ')[0]} {ring.hardness.split(' ')[1]}</span>
            </div>
            <div>
              <span className="text-porcelain-dark block text-[10px] uppercase">Thickness</span>
              <span className="text-porcelain font-medium">{ring.thickness}</span>
            </div>
            <div>
              <span className="text-porcelain-dark block text-[10px] uppercase">Width</span>
              <span className="text-porcelain font-medium">{ring.width}</span>
            </div>
            <div>
              <span className="text-porcelain-dark block text-[10px] uppercase">Overcoat</span>
              <span className="text-porcelain font-medium">1.54 IOR Optical</span>
            </div>
          </div>
        </div>

        {/* Modal Bottom Footer Actions */}
        <div className="p-6 border-t border-white/[0.08] bg-[#050507] flex items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono text-porcelain-dark uppercase block">
              Bespoke Total
            </span>
            <span className="font-mono text-2xl font-bold text-porcelain">
              ${ring.price}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-5 py-3 rounded-xl border border-white/10 hover:border-white/20 text-xs font-mono uppercase tracking-wider text-porcelain transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAdd}
              disabled={isAdded}
              className={`px-6 py-3 rounded-xl font-mono text-xs uppercase tracking-widest font-semibold transition-all flex items-center gap-2 ${
                isAdded
                  ? 'bg-emerald-600 text-white'
                  : 'bg-porcelain hover:bg-white text-[#050507] shadow-lg shadow-white/5'
              }`}
            >
              {isAdded ? (
                <>
                  <PackageCheck className="w-4 h-4" />
                  <span>Added to Vault</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-crimson" />
                  <span>Add to Vault · ${ring.price}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
