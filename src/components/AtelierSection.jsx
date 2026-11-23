import React, { useState } from 'react';
import { RING_EDITIONS } from '../data/rings';

export default function AtelierSection({
  onAddToVault,
  onOpenSizing
}) {
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
    { label: 'Bore', value: 'Radial Comfort-Fit' }
  ];

  return (
    <section id="atelier" className="py-20 sm:py-28 bg-transparent">
      {/* Section Manifesto */}
      <div className="mb-12">
        <h2 className="font-serif text-3xl sm:text-5xl text-[#F2EFE9] font-normal tracking-[-0.02em] leading-tight">
          The Sovereign.
        </h2>
        <p className="mt-3 text-sm text-[#8E8A82] font-normal max-w-xl leading-relaxed">
          The archetype of the collection. A mirror-black tungsten carbide frame encasing a hand-stratified crimson pearloid matrix and raised rhodium filigree.
        </p>
      </div>

      {/* Open Architectural Configurator */}
      <div className="space-y-8 pt-6 border-t border-[#F2EFE9]/[0.08]">
        {/* Title, Edition & Price */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
          <div>
            <span className="text-xs text-[#8E8A82] font-medium uppercase tracking-wider block mb-1">
              Edition 01 of 09 · Flagship
            </span>
            <div className="flex items-baseline gap-3">
              <h3 className="font-sans font-medium text-2xl text-[#F2EFE9]">
                {sovereignRing.name}
              </h3>
              <span className="font-sans font-normal text-lg text-[#8E8A82]">
                ${sovereignRing.price}
              </span>
            </div>
          </div>
          <span className="text-xs text-[#8E8A82] font-normal">
            Complimentary Insured Courier
          </span>
        </div>

        {/* 4-Column Inline Spec Strip with 1px Hairline Dividers */}
        <div className="grid grid-cols-2 sm:grid-cols-4 py-4 border-y border-[#F2EFE9]/[0.08]">
          {specs.map((item, idx) => (
            <div
              key={item.label}
              className={`py-2 px-3 sm:px-4 first:pl-0 last:pr-0 ${
                idx < specs.length - 1 ? 'border-r border-[#F2EFE9]/[0.08]' : ''
              }`}
            >
              <span className="text-[11px] text-[#8E8A82] uppercase tracking-wider block mb-1">
                {item.label}
              </span>
              <span className="text-xs sm:text-sm font-medium text-[#F2EFE9]">
                {item.value}
              </span>
            </div>
          ))}
        </div>

        {/* Ring Size Selection */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <label className="text-xs font-medium text-[#F2EFE9]">
                Select Size
              </label>
              {onOpenSizing && (
                <button
                  onClick={onOpenSizing}
                  className="text-xs text-[#8E8A82] hover:text-[#F2EFE9] underline underline-offset-4 transition-colors cursor-pointer"
                >
                  Sizing Guide
                </button>
              )}
            </div>
            <span className="text-xs font-medium text-[#F2EFE9]">
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
                  className={`w-10 h-10 rounded-full text-xs font-medium flex items-center justify-center transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? 'bg-[#F2EFE9] text-[#0D0D0F] font-semibold'
                      : 'bg-[#151518] border border-[#F2EFE9]/[0.10] text-[#8E8A82] hover:text-[#F2EFE9] hover:border-[#F2EFE9]/25'
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>

        {/* Custom Laser Engraving Disclosure */}
        <div className="pt-2">
          {!showEngraving ? (
            <button
              onClick={() => setShowEngraving(true)}
              className="text-xs text-[#8E8A82] hover:text-[#F2EFE9] underline underline-offset-4 transition-colors cursor-pointer"
            >
              Add complimentary laser engraving (interior bore)
            </button>
          ) : (
            <div className="space-y-3 p-5 rounded-xl bg-[#151518] border border-[#F2EFE9]/[0.08]">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-[#F2EFE9]">
                  Interior Fiber Laser Inscription (Max 28 Characters)
                </label>
                <button
                  onClick={() => {
                    setShowEngraving(false);
                    setEngraving('');
                  }}
                  className="text-xs text-[#8E8A82] hover:text-[#F2EFE9] transition-colors cursor-pointer"
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
                className="w-full rounded-lg px-4 py-3 bg-[#0D0D0F] border border-[#F2EFE9]/[0.12] text-[#F2EFE9] text-xs focus:outline-none focus:border-[#F2EFE9]/40 transition-colors uppercase placeholder:text-[#8E8A82]/50"
              />

              <div className="flex items-center justify-between text-[11px] text-[#8E8A82]">
                <span>{engraving.length} / 28</span>
                <span className="tracking-wider">{engraving || 'No inscription'}</span>
              </div>
            </div>
          )}
        </div>

        {/* Add to Bag Action (Text-Only, Zero Icons) */}
        <div className="pt-4">
          <button
            onClick={handleAdd}
            disabled={isAdded}
            className={`rounded-full px-8 py-3.5 text-xs sm:text-sm font-medium tracking-normal transition-all duration-200 cursor-pointer shadow-sm ${
              isAdded
                ? 'bg-[#151518] text-[#F2EFE9] border border-[#F2EFE9]/30'
                : 'bg-[#F2EFE9] text-[#0D0D0F] hover:bg-white active:scale-98'
            }`}
          >
            {isAdded ? 'Added to Bag' : `Add to Bag · $${sovereignRing.price}`}
          </button>
        </div>
      </div>
    </section>
  );
}
