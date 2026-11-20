import React, { useState, useEffect } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';

export default function HeroOverlay({ scrollProgress = 0, onUnlockClick }) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    // 1.2s dark reveal opening sequence
    const timer = setTimeout(() => {
      setRevealed(true);
    }, 250);
    return () => clearTimeout(timer);
  }, []);

  // Compute opacity & transforms based on scrollProgress
  // Act 0: scroll 0 -> 0.05
  const act0Opacity = Math.max(0, 1 - scrollProgress * 15.0);
  
  // Act 1: scroll 0.05 -> 0.35 (Peel off & lock in)
  const act1Progress = Math.min(Math.max((scrollProgress - 0.05) / 0.30, 0), 1);
  const act1HeadlineOpacity = Math.min(Math.max((scrollProgress - 0.18) / 0.14, 0), 1);

  return (
    <div className="relative w-full pointer-events-none select-none">
      {/* ---------------------------------------------------- */}
      {/* ACT 0: The Dark Reveal & Architectural Wordmark      */}
      {/* ---------------------------------------------------- */}
      <section
        id="hero"
        className="h-screen w-full flex flex-col items-center justify-between py-16 px-6 relative"
      >
        {/* Silver Rim Light Sweep Opening Effect */}
        <div
          className={`absolute inset-0 bg-[#050507] transition-opacity duration-1000 pointer-events-none ${
            revealed ? 'opacity-0' : 'opacity-100'
          }`}
        />

        {/* Top Spacer */}
        <div className="pt-12"></div>

        {/* Central Architectural Title & Subtitle */}
        <div
          style={{ opacity: act0Opacity }}
          className="text-center transition-all duration-700 flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-subtle text-[11px] font-mono tracking-widest text-porcelain-muted uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-crimson animate-ping" />
            <span>Subterranean High Jewelry Atelier</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-ultra text-porcelain text-glow-silver uppercase">
            KRYPTOS
          </h1>

          <p className="mt-3 text-xs md:text-sm font-mono tracking-widest uppercase text-porcelain-muted max-w-md">
            Polished Tungsten Carbide · 3D Raised Dragon Filigree · Molten Crimson Pearloid
          </p>
        </div>

        {/* Scroll To Unlock Cue */}
        <div
          style={{ opacity: act0Opacity }}
          className="flex flex-col items-center gap-2 pointer-events-auto cursor-pointer group"
          onClick={onUnlockClick}
        >
          <span className="text-[10px] font-mono tracking-widest uppercase text-porcelain-dark group-hover:text-crimson transition-colors">
            Scroll to Unlock Core
          </span>
          <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-crimson/50 transition-colors">
            <ChevronDown className="w-4 h-4 text-porcelain-muted group-hover:text-crimson group-hover:translate-y-0.5 transition-all animate-bounce" />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* ACT 1: Spin Ignition & Flying Typography Destination */}
      {/* ---------------------------------------------------- */}
      <section className="h-[140vh] w-full flex flex-col justify-center items-center px-6 relative">
        <div className="max-w-4xl w-full text-center flex flex-col items-center">
          {/* Subtle Rune Ignition Status */}
          <div
            style={{ opacity: act1Progress > 0.05 ? 1 : 0 }}
            className="transition-opacity duration-300 inline-flex items-center gap-2 text-[11px] font-mono tracking-widest text-crimson-vivid uppercase mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-crimson animate-pulse" />
            <span>Spin-Ignition Velocity Active · Runes Locked</span>
          </div>

          {/* HTML Headline Placeholder synced to 3D flying letters */}
          <div
            style={{
              opacity: act1HeadlineOpacity,
              transform: `translateY(${(1 - act1HeadlineOpacity) * 20}px)`
            }}
            className="transition-all duration-500"
          >
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-porcelain">
              FORGED IN SHADOW.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-porcelain via-rhodium-light to-crimson-vivid">
                WORN IN LIGHT.
              </span>
            </h2>

            <p className="mt-6 text-sm sm:text-base font-sans text-porcelain-muted max-w-xl mx-auto leading-relaxed font-light">
              Each piece is sintered from aerospace tungsten carbide at 1,500°C.
              A physically raised 0.018m Celtic dragon lattice crowns a swirling molten pearloid core,
              permanently encased under an optically clear 1.54 IOR resin sleeve.
            </p>

            {/* Micro Specs Badge Grid */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs font-mono tracking-wider">
              <span className="px-3 py-1.5 rounded-md glass-panel text-porcelain border border-white/10">
                MOHS 9.0 HARDNESS
              </span>
              <span className="px-3 py-1.5 rounded-md glass-panel text-crimson-vivid border border-crimson/30">
                0.018M 3D RELIEF
              </span>
              <span className="px-3 py-1.5 rounded-md glass-panel text-porcelain border border-white/10">
                14.2G WEIGHT
              </span>
              <span className="px-3 py-1.5 rounded-md glass-panel text-porcelain border border-white/10">
                COMFORT-FIT BORE
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
