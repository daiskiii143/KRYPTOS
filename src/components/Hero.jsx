import React from 'react';
import { motion } from 'framer-motion';

export default function Hero({ scrollProgress = 0, onExploreClick }) {
  // Normalize hero ejection progress from 0% to 18% scroll
  const heroProgress = Math.min(Math.max(scrollProgress / 0.18, 0), 1);
  const fadeOutProgress = Math.min(Math.max((scrollProgress - 0.14) / 0.08, 0), 1);
  const heroOpacity = Math.max(0, 1 - fadeOutProgress);

  // Emerge words from center of ring as scroll starts
  // Word milestones across 0.0 -> 1.0 of heroProgress
  const getEmergeStyle = (start, end, targetDeltaX = 0, targetDeltaY = 0) => {
    const p = Math.min(Math.max((heroProgress - start) / (end - start), 0), 1);
    // Smooth power-out easing
    const eased = 1 - Math.pow(1 - p, 3);
    
    // Starts at ring center (scale 0.1, blurred, transparent) and arcs out to final slot
    const scale = 0.1 + eased * 0.9;
    const opacity = p === 0 ? 0 : Math.min(p * 1.5, 1);
    const blur = (1 - eased) * 8;
    const x = (1 - eased) * -targetDeltaX;
    const y = (1 - eased) * targetDeltaY;

    return {
      transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
      opacity,
      filter: `blur(${blur.toFixed(1)}px)`
    };
  };

  return (
    <section
      id="hero"
      className="relative min-h-[140vh] w-full flex flex-col items-center justify-start pt-28 px-6 pointer-events-none select-none"
    >
      {/* Sticky Hero Viewport Container */}
      <div
        style={{ opacity: heroOpacity }}
        className="sticky top-0 h-screen w-full flex flex-col items-center justify-between py-12 transition-opacity duration-300"
      >
        {/* Top Space below Navigation */}
        <div className="h-6" />

        {/* 1. KRYPTOS Display Brand Mark (Cinzel Decorative) */}
        <div className="text-center flex flex-col items-center z-20 pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.38em] text-porcelain-muted block mb-3">
              Subterranean High Jewelry Atelier
            </span>
            <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-normal tracking-[0.24em] text-porcelain uppercase drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)]">
              KRYPTOS
            </h1>
          </motion.div>
        </div>

        {/* 2. Center Ring Manifestation Arena: Words Literally Emerge Out of the Ring */}
        <div className="relative w-full max-w-4xl h-44 sm:h-52 flex items-center justify-center pointer-events-auto">
          {/* Emerged Word Arc 1: Left Flank */}
          <div
            style={getEmergeStyle(0.08, 0.55, 180, 20)}
            className="absolute left-4 sm:left-12 lg:left-20 top-1/2 -translate-y-1/2 text-left"
          >
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.28em] text-crimson block font-medium">
              Origin 01
            </span>
            <p className="font-serif text-lg sm:text-2xl text-porcelain italic font-light tracking-wide leading-tight">
              Forged in obsidian.
            </p>
          </div>

          {/* Emerged Word Arc 2: Right Flank */}
          <div
            style={getEmergeStyle(0.18, 0.65, -180, 20)}
            className="absolute right-4 sm:right-12 lg:right-20 top-1/2 -translate-y-1/2 text-right"
          >
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.28em] text-porcelain-muted block">
              Origin 02
            </span>
            <p className="font-serif text-lg sm:text-2xl text-porcelain italic font-light tracking-wide leading-tight">
              Sealed in crimson.
            </p>
          </div>

          {/* Emerged Technical Metrics: Bottom Center Arc */}
          <div
            style={getEmergeStyle(0.32, 0.85, 0, -40)}
            className="absolute bottom-2 left-1/2 -translate-x-1/2 text-center whitespace-nowrap"
          >
            <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-porcelain-dark flex items-center gap-3 bg-[#050507]/60 backdrop-blur-md px-4 py-2 border border-white/[0.06]">
              <span>Mohs 9.0 Sinter</span>
              <span>·</span>
              <span>1,500°C Vacuum Crucible</span>
              <span>·</span>
              <span>Rhodium Relief</span>
            </div>
          </div>
        </div>

        {/* 3. Bottom Subtle Scroll Cue */}
        <div
          onClick={onExploreClick}
          className="flex flex-col items-center gap-2 pointer-events-auto cursor-pointer group transition-opacity duration-300"
        >
          <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.28em] uppercase text-porcelain-muted group-hover:text-porcelain transition-colors">
            Scroll to emerge the archive
          </span>
          <div className="w-px h-7 bg-white/25 group-hover:bg-white/60 transition-colors animate-pulse" />
        </div>
      </div>
    </section>
  );
}
