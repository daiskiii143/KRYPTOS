import React, { useState } from 'react';
import { RING_EDITIONS, RING_CATEGORIES } from '../data/rings';
import EmergeFromRing from './animation/EmergeFromRing';

export default function CollectionSection({ onOpenInspect, onAddToVault }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedSizes, setSelectedSizes] = useState({});
  const [quickAddedId, setQuickAddedId] = useState(null);

  // Filter rings according to category pill
  const filteredRings = RING_EDITIONS.filter((ring) => {
    if (activeCategory === 'all') return true;
    return ring.categories && ring.categories.includes(activeCategory);
  });

  const handleSizeChange = (ringId, size) => {
    setSelectedSizes((prev) => ({ ...prev, [ringId]: size }));
  };

  const handleQuickAdd = (ring) => {
    const size = selectedSizes[ring.id] || '10';
    onAddToVault(ring, `US ${size}`, '');
    setQuickAddedId(ring.id);
    setTimeout(() => setQuickAddedId(null), 1200);
  };

  return (
    <section id="collection" className="py-24 border-b border-white/[0.06]">
      {/* 1. Collection Header (EmergeFromRing) */}
      <EmergeFromRing originX={-360} originY={30} rotation={-3}>
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-6 h-px bg-crimson" />
            <span className="font-mono text-xs uppercase tracking-[0.28em] text-porcelain-muted">
              Permanent Archive · Chapter II
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-porcelain">
            The Six Formations
          </h2>

          <p className="mt-4 font-serif text-lg sm:text-xl font-light text-porcelain-muted max-w-xl leading-relaxed italic">
            Six distinct expressions of gothic metallurgy and gemstone inlay, resting upon dark volcanic slate.
            Engineered in 8.0 mm comfort-fit profiles.
          </p>

          {/* Category Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center gap-2 border-b border-white/[0.08] pb-4">
            {RING_CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] transition-all ${
                    isSelected
                      ? 'bg-porcelain text-[#050507] font-medium'
                      : 'border border-white/10 text-porcelain-muted hover:border-white/25 hover:text-porcelain bg-transparent'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </EmergeFromRing>

      {/* 2. Full 6-Ring Grid with Macro Photography (Wrapped in EmergeFromRing per item/row) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16">
        {filteredRings.map((ring, idx) => {
          const currentSize = selectedSizes[ring.id] || '10';
          const isJustAdded = quickAddedId === ring.id;

          return (
            <EmergeFromRing
              key={ring.id}
              originX={-320 - (idx % 2) * 60}
              originY={40 + (idx % 2) * 20}
              rotation={idx % 2 === 0 ? -3 : -2}
              className="group"
            >
              <div className="flex flex-col justify-between h-full bg-[#07080B] border border-white/[0.08] p-6 hover:border-white/25 transition-all duration-500">
                {/* Product Photography Container */}
                <div
                  onClick={() => onOpenInspect(ring)}
                  className="relative aspect-square w-full overflow-hidden bg-[#040405] cursor-pointer mb-6"
                >
                  <img
                    src={ring.image}
                    alt={ring.name}
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Subtle rim highlight gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07080B] via-transparent to-transparent opacity-60" />

                  {/* Edition Tag */}
                  <div className="absolute top-4 left-4 font-mono text-[10px] tracking-[0.25em] uppercase text-porcelain-dark bg-[#050507]/80 backdrop-blur-md px-2.5 py-1 border border-white/10">
                    EDITION {ring.editionNumber}
                  </div>

                  {/* Price Tag */}
                  <div className="absolute top-4 right-4 font-mono text-xs text-porcelain bg-[#050507]/80 backdrop-blur-md px-2.5 py-1 border border-white/10 font-medium">
                    ${ring.price}
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-crimson font-medium">
                        {ring.category}
                      </span>
                      <span className="font-mono text-[11px] text-porcelain-dark">
                        {ring.weight.split('(')[0]}
                      </span>
                    </div>

                    <h3
                      onClick={() => onOpenInspect(ring)}
                      className="font-display text-xl sm:text-2xl font-normal text-porcelain tracking-wide cursor-pointer hover:text-white transition-colors"
                    >
                      {ring.name}
                    </h3>

                    <p className="mt-2 font-serif text-sm font-light text-porcelain-muted leading-relaxed italic">
                      {ring.subtitle}
                    </p>
                  </div>

                  {/* Quick Size Selector */}
                  <div className="mt-6 pt-4 border-t border-white/[0.06]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-porcelain-dark">
                        Select Size
                      </span>
                      <span className="font-mono text-[11px] text-porcelain">US {currentSize}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {ring.sizes.map((sz) => (
                        <button
                          key={sz}
                          onClick={() => handleSizeChange(ring.id, sz)}
                          className={`flex-1 py-1.5 font-mono text-[11px] transition-all ${
                            currentSize === sz
                              ? 'bg-porcelain text-[#050507] font-medium'
                              : 'border border-white/10 text-porcelain-dark hover:text-porcelain hover:border-white/25'
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em]">
                    <button
                      onClick={() => handleQuickAdd(ring)}
                      disabled={isJustAdded}
                      className={`flex-1 py-3 text-center transition-all ${
                        isJustAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-white/10 hover:bg-white/20 text-porcelain border border-white/15'
                      }`}
                    >
                      {isJustAdded ? 'Added' : 'Add to Vault'}
                    </button>
                    <button
                      onClick={() => onOpenInspect(ring)}
                      className="px-4 py-3 border border-white/15 hover:border-white/35 text-porcelain-muted hover:text-porcelain transition-all"
                    >
                      Inspect
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
