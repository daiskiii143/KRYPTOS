import React, { useState } from 'react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0D0D0F]/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      {/* Backdrop click to dismiss */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-3xl rounded-xl bg-[#151518] border border-[#F2EFE9]/[0.10] shadow-2xl p-6 sm:p-8 z-10 my-auto max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#F2EFE9]/[0.08] pb-5 mb-6">
          <div>
            <span className="text-[11px] text-[#8E8A82] uppercase tracking-wider block mb-1">
              Edition {ring.editionNumber} · {ring.gender || 'Unisex'} · {ring.style || ring.category}
            </span>
            <h3 className="font-sans font-medium text-2xl sm:text-3xl text-[#F2EFE9]">
              {ring.name}
            </h3>
            <p className="text-xs sm:text-sm text-[#8E8A82] font-normal mt-1">
              {ring.subtitle}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-xs font-medium text-[#8E8A82] hover:text-[#F2EFE9] px-2.5 py-1 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            Close
          </button>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Left Column: Image & Specs */}
          <div className="space-y-4">
            <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-[#0D0D0F] border border-[#F2EFE9]/[0.06]">
              <img
                src={ring.image}
                alt={ring.name}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Technical Parameters */}
            <div className="rounded-lg p-3.5 bg-[#0D0D0F] border border-[#F2EFE9]/[0.06] space-y-1.5 text-xs">
              <span className="text-[10px] text-[#8E8A82] uppercase tracking-wider block">
                Specifications
              </span>
              <div className="grid grid-cols-2 gap-2 text-[#8E8A82]">
                <div>
                  Hardness: <span className="text-[#F2EFE9]">{ring.hardness.split(' ')[0]} {ring.hardness.split(' ')[1]}</span>
                </div>
                <div>
                  Width: <span className="text-[#F2EFE9]">{ring.width}</span>
                </div>
                <div>
                  Thickness: <span className="text-[#F2EFE9]">{ring.thickness}</span>
                </div>
                <div>
                  Weight: <span className="text-[#F2EFE9]">{ring.weight.split('(')[0]}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Configuration */}
          <div className="space-y-5">
            <div>
              <span className="text-[11px] text-[#8E8A82] uppercase tracking-wider block mb-1">
                Narrative
              </span>
              <p className="text-xs sm:text-sm text-[#8E8A82] font-normal leading-relaxed">
                {ring.description}
              </p>
            </div>

            {/* Price Row */}
            <div className="flex items-baseline justify-between border-y border-[#F2EFE9]/[0.08] py-3">
              <span className="text-xs text-[#8E8A82]">Price</span>
              <span className="font-sans font-medium text-lg text-[#F2EFE9]">
                ${ring.price}
              </span>
            </div>

            {/* Size Picker */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <label className="text-[#F2EFE9] font-medium">Select Size</label>
                  {onOpenSizing && (
                    <button
                      onClick={onOpenSizing}
                      className="text-[#8E8A82] hover:text-[#F2EFE9] underline underline-offset-4"
                    >
                      Guide
                    </button>
                  )}
                </div>
                <span className="text-[#F2EFE9] font-medium">US {selectedSize}</span>
              </div>

              <div className="flex items-center gap-1.5 flex-wrap">
                {ring.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`w-8 h-8 rounded-full text-xs font-medium flex items-center justify-center transition-colors cursor-pointer ${
                      selectedSize === sz
                        ? 'bg-[#F2EFE9] text-[#0D0D0F]'
                        : 'bg-[#0D0D0F] border border-[#F2EFE9]/[0.10] text-[#8E8A82] hover:text-[#F2EFE9]'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Inscription Input (Zero Icons) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <label className="text-[#8E8A82]">Interior Inscription (Optional)</label>
                <span className="text-[10px] text-[#8E8A82]">{engravingText.length} / 28</span>
              </div>
              <input
                type="text"
                maxLength={28}
                value={engravingText}
                onChange={(e) => setEngravingText(e.target.value.toUpperCase())}
                placeholder="E.G. LATITUDE · RUNES"
                className="w-full rounded-lg px-3 py-2 bg-[#0D0D0F] border border-[#F2EFE9]/[0.10] text-[#F2EFE9] text-xs focus:outline-none focus:border-[#F2EFE9]/40 transition-colors uppercase placeholder:text-[#8E8A82]/40"
              />
            </div>

            {/* Action */}
            <div className="pt-2">
              <button
                onClick={handleAdd}
                disabled={isAdded}
                className={`w-full rounded-full py-3.5 text-xs font-medium tracking-normal transition-all duration-200 cursor-pointer ${
                  isAdded
                    ? 'bg-[#0D0D0F] text-[#F2EFE9] border border-[#F2EFE9]/20'
                    : 'bg-[#F2EFE9] text-[#0D0D0F] hover:bg-white active:scale-98'
                }`}
              >
                {isAdded ? 'Added to Bag' : `Add to Bag · $${ring.price}`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
