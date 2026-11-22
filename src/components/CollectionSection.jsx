import React, { useState } from 'react';
import { RING_EDITIONS, GENDER_FILTERS } from '../data/rings';
import EmergeFromRing from './animation/EmergeFromRing';
import { Check, Eye, Plus } from 'lucide-react';

export default function CollectionSection({ onOpenInspect, onAddToVault, onSelectEdition }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedSizes, setSelectedSizes] = useState({});
  const [quickAddedId, setQuickAddedId] = useState(null);

  // Filter rings according to category pill (All / Men / Women / Unisex)
  const filteredRings = RING_EDITIONS.filter((ring) => {
    if (activeCategory === 'all') return true;
    return (
      ring.gender === activeCategory ||
      (ring.categories && ring.categories.includes(activeCategory))
    );
  });

  const handleSizeChange = (ringId, size) => {
    setSelectedSizes((prev) => ({ ...prev, [ringId]: size }));
  };

  const handleQuickAdd = (ring) => {
    const defaultSz = ring.sizes ? ring.sizes[Math.floor(ring.sizes.length / 2)] : '10';
    const size = selectedSizes[ring.id] || defaultSz;
    onAddToVault(ring, `US ${size}`, '');
    setQuickAddedId(ring.id);
    setTimeout(() => setQuickAddedId(null), 1400);
  };

  const handleCardClick = (ring) => {
    if (onSelectEdition) {
      onSelectEdition(ring.id);
    }
    onOpenInspect(ring);
  };

  return (
    <section id="collection" className="py-24 bg-transparent">
      {/* 1. Collection Header (EmergeFromRing) */}
      <EmergeFromRing originX={-340} originY={30} rotation={-2}>
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 bg-white/[0.04] border border-white/[0.08] mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-crimson" />
            <span className="text-[11px] font-medium tracking-widest uppercase text-porcelain-muted">
              Permanent Archive · Chapter II
            </span>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl tracking-tight text-porcelain leading-[1.05]">
            The Nine Formations
          </h2>

          <p className="mt-4 text-sm sm:text-base font-light text-porcelain-muted max-w-xl leading-relaxed">
            Nine distinct expressions of gothic metallurgy, gemstone inlay, and sculptural fluid metal, resting upon dark volcanic slate. Engineered in bespoke comfort-fit profiles.
          </p>

          {/* Primary Category Filter Pills: All · Men · Women · Unisex */}
          <div className="mt-8 flex flex-wrap items-center gap-2">
            {GENDER_FILTERS.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`rounded-full px-5 py-2 text-xs font-medium transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-[#F5F5F7] text-[#050507] shadow-md scale-105 font-semibold'
                      : 'bg-white/[0.03] border border-white/[0.08] text-porcelain-muted hover:text-porcelain hover:bg-white/[0.08]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </EmergeFromRing>

      {/* 2. Full 9-Ring Grid with Macro Photography */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {filteredRings.map((ring, idx) => {
          const defaultSz = ring.sizes ? ring.sizes[Math.floor(ring.sizes.length / 2)] : '10';
          const currentSize = selectedSizes[ring.id] || defaultSz;
          const isJustAdded = quickAddedId === ring.id;

          return (
            <EmergeFromRing
              key={ring.id}
              originX={-280 - (idx % 2) * 50}
              originY={35 + (idx % 2) * 15}
              rotation={idx % 2 === 0 ? -2.5 : -1.5}
              className="group"
            >
              <div className="flex flex-col justify-between h-full rounded-3xl bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] p-5 sm:p-6 hover:border-white/20 hover:bg-white/[0.05] transition-all duration-500 shadow-[0_15px_40px_rgba(0,0,0,0.5)] overflow-hidden">
                {/* Product Photography Container */}
                <div
                  onClick={() => handleCardClick(ring)}
                  className="relative aspect-square w-full rounded-2xl overflow-hidden bg-black/50 cursor-pointer mb-5 group/img"
                >
                  <img
                    src={ring.image}
                    alt={ring.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-center transform group-hover/img:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Subtle rim highlight gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                  {/* Edition Tag Pill */}
                  <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5">
                    <span className="rounded-full bg-black/60 backdrop-blur-md px-3 py-1 border border-white/10 text-[10px] font-mono text-porcelain font-medium tracking-wider uppercase">
                      NO. {ring.editionNumber}
                    </span>
                    <span className="rounded-full bg-white/10 backdrop-blur-md px-2.5 py-1 border border-white/10 text-[10px] font-mono text-porcelain-muted capitalize">
                      {ring.gender}
                    </span>
                  </div>

                  {/* Price Pill */}
                  <div className="absolute top-3.5 right-3.5 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 border border-white/10 text-xs font-mono font-medium text-porcelain">
                    ${ring.price}
                  </div>

                  {/* Hover Inspect Icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity bg-black/20 backdrop-blur-[2px]">
                    <span className="rounded-full bg-white/15 backdrop-blur-md px-4 py-2 border border-white/20 text-xs font-medium text-porcelain flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect Specimen</span>
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-medium uppercase tracking-wider text-crimson">
                        {ring.style || ring.category}
                      </span>
                      <span className="text-xs font-mono text-porcelain-dark">
                        {ring.weight.split('(')[0]}
                      </span>
                    </div>

                    <h3
                      onClick={() => handleCardClick(ring)}
                      className="font-display font-bold text-xl sm:text-2xl text-porcelain tracking-tight cursor-pointer hover:text-white transition-colors"
                    >
                      {ring.name}
                    </h3>

                    <p className="mt-2 text-xs sm:text-sm font-light text-porcelain-muted leading-relaxed line-clamp-2">
                      {ring.subtitle}
                    </p>
                  </div>

                  {/* Quick Size Selector Pills */}
                  <div className="mt-5 pt-4 border-t border-white/[0.06]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] text-porcelain-muted">
                        Select Comfort Size
                      </span>
                      <span className="text-xs font-mono text-porcelain font-semibold">
                        US {currentSize}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 flex-wrap">
                      {ring.sizes.map((sz) => (
                        <button
                          key={sz}
                          onClick={() => handleSizeChange(ring.id, sz)}
                          className={`flex-1 min-w-[28px] py-1.5 rounded-full text-xs font-mono transition-all duration-200 cursor-pointer ${
                            currentSize === sz
                              ? 'bg-[#F5F5F7] text-[#050507] font-bold shadow-sm'
                              : 'bg-white/[0.03] border border-white/[0.08] text-porcelain-muted hover:text-porcelain hover:bg-white/[0.08]'
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Pill Action Buttons */}
                  <div className="mt-5 flex items-center gap-2.5">
                    <button
                      onClick={() => handleQuickAdd(ring)}
                      disabled={isJustAdded}
                      className={`flex-1 py-3 rounded-full text-xs font-medium tracking-wide transition-all duration-300 flex items-center justify-center gap-1.5 shadow-sm cursor-pointer ${
                        isJustAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#F5F5F7] text-[#050507] hover:bg-white hover:scale-105 active:scale-95 font-semibold'
                      }`}
                    >
                      {isJustAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to Vault</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleCardClick(ring)}
                      className="px-4 py-3 rounded-full bg-white/[0.04] hover:bg-white/[0.10] active:scale-95 border border-white/10 text-xs font-medium text-porcelain transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5 text-porcelain-muted" />
                      <span>Inspect</span>
                    </button>
                  </div>
                </div>
              </div>
            </EmergeFromRing>
          );
        })}
      </div>
    </section>
  );
}
