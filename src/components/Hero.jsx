import React from 'react';

export default function Hero({
  onExploreClick,
  onSizingClick,
}) {
  return (
    <section
      id="hero"
      className="relative w-full min-h-[88vh] flex items-center pt-20 pb-12 overflow-hidden bg-transparent"
    >
      {/* Container: Constrained to max-w-[1280px] mx-auto px-6 lg:px-12 */}
      <div className="w-full max-w-[1280px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 items-center gap-6 z-20">
        {/* Left Column (lg:col-span-5): Clean Typography & Text-Only Pill Buttons */}
        <div className="lg:col-span-5 flex flex-col justify-center py-8">
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-[4.75rem] font-normal tracking-[-0.02em] text-[#F2EFE9] leading-[1.04] mb-6">
            Sculpted Tungsten.
          </h1>

          <p className="text-sm sm:text-base text-[#8E8A82] leading-relaxed font-normal max-w-md mb-8">
            Engineered from diamond-hard tungsten carbide and cryogenic crystalline inlay. Architectural silhouettes tailored for enduring daily wear.
          </p>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              onClick={onExploreClick}
              className="rounded-full bg-[#F2EFE9] text-[#0D0D0F] hover:bg-white px-7 py-3.5 text-xs sm:text-sm font-medium tracking-normal transition-all duration-200 cursor-pointer shadow-sm active:scale-98"
            >
              Shop Collection
            </button>

            <button
              onClick={onSizingClick}
              className="rounded-full bg-[#151518]/50 border border-[#F2EFE9]/20 hover:border-[#F2EFE9]/40 text-[#F2EFE9] px-7 py-3.5 text-xs sm:text-sm font-medium tracking-normal transition-all duration-200 cursor-pointer active:scale-98"
            >
              Sizing Guide
            </button>
          </div>
        </div>

        {/* Right Column (lg:col-span-7): Spacious Stage for 3D Ring (X = 0.75) + Watermark */}
        <div className="lg:col-span-7 relative h-[420px] sm:h-[500px] lg:h-[580px] flex items-center justify-center pointer-events-none select-none">
          {/* Subtle wide KRYPTOS watermark behind the 3D ring (opacity-[0.03]) */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <span className="font-sans font-semibold text-[16vw] lg:text-[11vw] tracking-[0.16em] uppercase text-[#F2EFE9] opacity-[0.03] select-none whitespace-nowrap">
              KRYPTOS
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
