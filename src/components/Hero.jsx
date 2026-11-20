import React from 'react';

export default function Hero({ scrollProgress = 0, onExploreClick }) {
  // Smoothly fade out as user scrolls past 0.08
  const opacity = Math.max(0, 1 - scrollProgress * 10);
  const translateY = scrollProgress * 60;

  return (
    <section
      id="hero"
      className="relative h-screen w-full flex flex-col items-center justify-between py-16 px-6 pointer-events-none select-none"
    >
      {/* Top spacing below header */}
      <div className="pt-16" />

      {/* Centered Minimal Wordmark */}
      <div
        style={{
          opacity,
          transform: `translateY(${translateY}px)`
        }}
        className="text-center flex flex-col items-center transition-opacity duration-300 pointer-events-auto"
      >
        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-normal tracking-[0.32em] text-porcelain uppercase">
          KRYPTOS
        </h1>
      </div>

      {/* Subtle Scroll Cue */}
      <div
        style={{ opacity }}
        className="flex flex-col items-center gap-2 pointer-events-auto cursor-pointer transition-opacity duration-300"
        onClick={onExploreClick}
      >
        <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-porcelain-muted hover:text-porcelain transition-colors">
          Scroll to explore
        </span>
        <div className="w-px h-6 bg-white/20 animate-pulse mt-1" />
      </div>
    </section>
  );
}
