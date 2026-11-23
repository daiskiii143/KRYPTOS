import React, { useState } from 'react';
import { RING_EDITIONS, GENDER_FILTERS } from '../data/rings';

export default function CollectionSection({ onOpenInspect, onAddToVault, onSelectEdition }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [quickAddedId, setQuickAddedId] = useState(null);
  const [activeSizeRingId, setActiveSizeRingId] = useState(null);

  const filteredRings = RING_EDITIONS.filter((ring) => {
    if (activeCategory === 'all') return true;
    return (
      ring.gender === activeCategory ||
      (ring.categories && ring.categories.includes(activeCategory))
    );
  });

  const handleQuickAdd = (ring, size = '10') => {
    onAddToVault(ring, `US ${size}`, '');
    setQuickAddedId(ring.id);
    setActiveSizeRingId(null);
    setTimeout(() => setQuickAddedId(null), 1400);
  };

  const handleCardClick = (ring) => {
    if (onSelectEdition) {
      onSelectEdition(ring.id);
    }
    onOpenInspect(ring);
  };

  return (
    <section id="collection" className="py-20 bg-transparent">
      {/* Editorial Section Header */}
      <div className="mb-10">
        <h2 className="font-serif text-3xl sm:text-5xl text-[#F2EFE9] font-normal tracking-[-0.02em] leading-tight">
          The Collection
        </h2>
        <p className="mt-3 text-sm text-[#8E8A82] font-normal max-w-xl leading-relaxed">
          Nine architectural formations sintered in dense tungsten carbide, dark rhodium, and crystalline matrices.
        </p>

        {/* Clean Category Tabs (All, Men, Women, Unisex) - Simple Underline / Pill Active State */}
        <div className="mt-8 flex items-center gap-6 border-b border-[#F2EFE9]/[0.08] pb-3 text-xs font-medium">
          {GENDER_FILTERS.map((cat) => {
            const isSelected = activeCategory === cat.id;
            const label = cat.id === 'all' ? 'All' : cat.label;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative pb-3 transition-colors duration-150 cursor-pointer ${
                  isSelected ? 'text-[#F2EFE9]' : 'text-[#8E8A82] hover:text-[#F2EFE9]'
                }`}
              >
                <span>{label}</span>
                {isSelected && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#F2EFE9]" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* RIMOWA-Style Architectural Product Grid (2 Columns on tablet/desktop, rounded-xl, bg-[#151518]) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
        {filteredRings.map((ring) => {
          const isJustAdded = quickAddedId === ring.id;
          const isSelectingSize = activeSizeRingId === ring.id;

          return (
            <div
              key={ring.id}
              className="group rounded-xl bg-[#151518] border border-[#F2EFE9]/[0.08] hover:border-[#F2EFE9]/[0.18] transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              {/* Product Image Container (Zero Badges Overlaid, Clean Presentation) */}
              <div
                onClick={() => handleCardClick(ring)}
                className="relative aspect-square w-full overflow-hidden bg-[#0D0D0F] cursor-pointer"
              >
                <img
                  src={ring.image}
                  alt={ring.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
              </div>

              {/* Clean 2-Line Editorial Footer */}
              <div className="p-5 flex flex-col gap-3">
                {/* Row 1: Ring Name left-aligned + Price right-aligned */}
                <div className="flex items-baseline justify-between gap-4">
                  <h3
                    onClick={() => handleCardClick(ring)}
                    className="font-sans font-medium text-base text-[#F2EFE9] tracking-normal cursor-pointer hover:opacity-80 transition-opacity"
                  >
                    {ring.name}
                  </h3>
                  <span className="font-sans font-normal text-sm text-[#F2EFE9]">
                    ${ring.price}
                  </span>
                </div>

                {/* Row 2: Concise 1-Line Material Description in #8E8A82 + Subtle Action */}
                <div className="flex items-center justify-between gap-4 text-xs">
                  <span className="text-[#8E8A82] truncate font-normal">
                    {ring.alloy.split('(')[0] || ring.subtitle}
                  </span>

                  <div className="flex-shrink-0">
                    {isJustAdded ? (
                      <span className="text-[#F2EFE9] font-medium text-[11px]">
                        Added
                      </span>
                    ) : isSelectingSize ? (
                      <div className="flex items-center gap-1.5 animate-fade-in">
                        {ring.sizes.slice(0, 4).map((sz) => (
                          <button
                            key={sz}
                            onClick={() => handleQuickAdd(ring, sz)}
                            className="px-2 py-0.5 rounded bg-[#F2EFE9]/10 hover:bg-[#F2EFE9] hover:text-[#0D0D0F] text-[#F2EFE9] text-[10px] font-medium transition-colors"
                          >
                            {sz}
                          </button>
                        ))}
                        <button
                          onClick={() => handleCardClick(ring)}
                          className="text-[#8E8A82] hover:text-[#F2EFE9] text-[10px] px-1"
                        >
                          More
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setActiveSizeRingId(ring.id)}
                        className="text-[#8E8A82] hover:text-[#F2EFE9] transition-colors underline underline-offset-4 text-xs font-normal cursor-pointer"
                      >
                        Quick Add
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
