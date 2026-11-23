import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Sparkles, Shield, Gem } from 'lucide-react';

export default function Hero({
  scrollProgress = 0,
  onExploreClick,
  onOpenEngraving
}) {
  // Hero sticky fade out as user scrolls past 14%
  const fadeOutProgress = Math.min(Math.max((scrollProgress - 0.12) / 0.08, 0), 1);
  const heroOpacity = Math.max(0, 1 - fadeOutProgress);

  return (
    <section
      id="hero"
      className="relative min-h-[140vh] w-full flex flex-col justify-start bg-transparent pointer-events-none select-none"
    >
      {/* Sticky Hero Viewport Container */}
      <div
        style={{ opacity: heroOpacity }}
        className="sticky top-0 h-screen w-full flex flex-col justify-between pt-24 sm:pt-28 pb-8 sm:pb-12 px-6 sm:px-10 md:px-14 transition-opacity duration-300"
      >
        {/* 1. Edge-to-Edge Giant Watermark (Like "BLUEBIRD" in Reference) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0">
          <div className="font-display font-medium text-[20vw] leading-none tracking-[0.14em] text-white/[0.045] select-none uppercase whitespace-nowrap mask-radial-fade">
            KRYPTOS
          </div>
        </div>

        {/* 2. Top Spacer (clean clearance below floating header) */}
        <div className="relative z-10 w-full" />

        {/* 3. Lower-Left Clean Typography & Pill CTAs */}
        <div className="relative z-20 pointer-events-auto max-w-xl mb-6 sm:mb-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] tracking-tight leading-[0.98] mb-5">
              <span className="block text-white/45 font-light">Forged in</span>
              <span className="block text-porcelain font-semibold">obsidian.</span>
            </h1>

            <p className="text-sm sm:text-base text-white/55 max-w-md font-light leading-relaxed mb-7 sm:mb-8">
              Nine bespoke sculptural rings for Men, Women, and Unisex. Sintered in subterranean vacuum crucibles with cryogenic gemstone stabilization.
            </p>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                onClick={onExploreClick}
                className="rounded-full bg-[#F5F5F7] text-[#050507] hover:bg-white hover:scale-105 active:scale-95 transition-all duration-300 px-7 py-3.5 font-medium text-xs sm:text-sm tracking-wide shadow-[0_10px_30px_rgba(255,255,255,0.18)] flex items-center gap-2.5 cursor-pointer group"
              >
                <span>Explore Editions</span>
                <div className="w-5 h-5 rounded-full bg-[#050507] flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                  <ArrowRight className="w-3 h-3 text-white" />
                </div>
              </button>

              <button
                onClick={onExploreClick}
                className="rounded-full bg-white/[0.05] hover:bg-white/[0.12] active:scale-95 border border-white/[0.14] backdrop-blur-xl transition-all duration-300 px-6 py-3.5 text-xs sm:text-sm font-medium text-white hover:border-white/30 cursor-pointer flex items-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-crimson" />
                <span>Custom Engraving</span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* 4. Bottom Spatial Bento Highlights (Match 3 Cards from Reference) */}
        <div className="relative z-20 pointer-events-auto w-full flex flex-col items-end">
          {/* Subtle Floating Atelier Badge (Like the Avatar Badge in Reference) */}
          <div className="hidden sm:inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] mb-3 self-end shadow-sm">
            <div className="flex -space-x-1.5 items-center">
              <span className="w-2.5 h-2.5 rounded-full bg-crimson ring-2 ring-[#050507]" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300 ring-2 ring-[#050507]" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-[#050507]" />
            </div>
            <span className="text-[11px] font-mono tracking-wider uppercase text-white/70">
              Subterranean Atelier · 9 Editions
            </span>
          </div>

          {/* 3 Bento Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 w-full max-w-4xl">
            {/* Card 1: Translucent Frosted Glass (The Sovereign) */}
            <div
              onClick={onExploreClick}
              className="group relative rounded-3xl bg-white/[0.04] hover:bg-white/[0.07] backdrop-blur-2xl border border-white/[0.08] hover:border-white/20 p-5 sm:p-6 transition-all duration-300 cursor-pointer shadow-[0_15px_35px_rgba(0,0,0,0.3)] flex flex-col justify-between"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 bg-white/[0.08] border border-white/[0.12] text-[10px] font-mono tracking-wider uppercase text-white/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-crimson animate-pulse" />
                  <span>Signature 01</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
              </div>

              <div>
                <h4 className="font-display font-semibold text-sm sm:text-base text-white tracking-tight mb-1">
                  The Sovereign
                </h4>
                <p className="text-xs text-white/50 leading-relaxed font-light">
                  Black tungsten carbide chassis with hand-stratified molten crimson matrix.
                </p>
              </div>
            </div>

            {/* Card 2: Elevated Porcelain White Glass (Mohs 9.0 Hardness - Center Flagship) */}
            <div
              onClick={onExploreClick}
              className="group relative rounded-3xl bg-[#F5F5F7] hover:bg-white text-[#090A0E] p-5 sm:p-6 transition-all duration-300 cursor-pointer shadow-[0_20px_45px_rgba(0,0,0,0.4)] flex flex-col justify-between hover:scale-[1.02]"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-9 h-9 rounded-2xl bg-black/5 border border-black/10 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-crimson" />
                </div>
                <div className="w-6 h-6 rounded-full bg-black/5 flex items-center justify-center">
                  <ArrowUpRight className="w-3.5 h-3.5 text-black/60 group-hover:text-black transition-colors" />
                </div>
              </div>

              <div>
                <div className="text-[10px] font-mono tracking-widest uppercase text-black/45 mb-0.5">
                  Aerospace Grade
                </div>
                <h4 className="font-display font-bold text-sm sm:text-base text-[#050507] tracking-tight mb-1">
                  Mohs 9.0 Hardness
                </h4>
                <p className="text-xs text-black/60 leading-relaxed font-light">
                  Sintered at 1,500°C under vacuum. Extreme scratch resistance.
                </p>
              </div>
            </div>

            {/* Card 3: Translucent Frosted Glass Stat Card (Bespoke Inscription) */}
            <div
              onClick={onExploreClick}
              className="group relative rounded-3xl bg-white/[0.04] hover:bg-white/[0.07] backdrop-blur-2xl border border-white/[0.08] hover:border-white/20 p-5 sm:p-6 transition-all duration-300 cursor-pointer shadow-[0_15px_35px_rgba(0,0,0,0.3)] flex flex-col justify-between"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="font-display font-light text-3xl sm:text-4xl text-white tracking-tight">
                  1,500°C
                </div>
                <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
              </div>

              <div>
                <h4 className="font-display font-semibold text-sm sm:text-base text-white tracking-tight mb-1">
                  Bespoke Inscription
                </h4>
                <p className="text-xs text-white/50 leading-relaxed font-light">
                  Complimentary fiber laser engraving tailored to your commission.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
