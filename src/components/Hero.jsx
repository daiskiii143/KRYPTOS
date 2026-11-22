import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { RING_EDITIONS } from '../data/rings';

const FEATURED_HERO_RINGS = [
  {
    id: 'sovereign',
    name: 'The Sovereign',
    price: '$480',
    subtitle: 'Men · Crimson Filigree',
    image: `${import.meta.env.BASE_URL}images/rings/sovereign-dock.webp`,
    accentColor: '#DC2626',
    glowClass: 'shadow-[0_0_25px_rgba(220,38,38,0.25)]'
  },
  {
    id: 'eclipse',
    name: 'The Eclipse',
    price: '$440',
    subtitle: 'Men · Faceted Obsidian',
    image: `${import.meta.env.BASE_URL}images/rings/eclipse-dock.webp`,
    accentColor: '#94A3B8',
    glowClass: 'shadow-[0_0_25px_rgba(148,163,184,0.25)]'
  },
  {
    id: 'chronos',
    name: 'The Chronos',
    price: '$540',
    subtitle: 'Men · Octagonal Signet',
    image: `${import.meta.env.BASE_URL}images/rings/chronos-dock.webp`,
    accentColor: '#38BDF8',
    glowClass: 'shadow-[0_0_25px_rgba(56,189,248,0.25)]'
  },
  {
    id: 'nyx-thorn',
    name: 'The Nyx Thorn',
    price: '$470',
    subtitle: "Women · Briar & Garnet",
    image: `${import.meta.env.BASE_URL}images/rings/nyx-thorn-dock.webp`,
    accentColor: '#F43F5E',
    glowClass: 'shadow-[0_0_25px_rgba(244,63,94,0.25)]'
  }
];

export default function Hero({
  scrollProgress = 0,
  activeEdition = 'sovereign',
  onSelectEdition,
  onExploreClick
}) {
  // Hero sticky fade out as user scrolls past 14%
  const fadeOutProgress = Math.min(Math.max((scrollProgress - 0.12) / 0.08, 0), 1);
  const heroOpacity = Math.max(0, 1 - fadeOutProgress);

  const activeRing =
    RING_EDITIONS.find((r) => r.id === activeEdition || r.modelEdition === activeEdition) ||
    RING_EDITIONS[0];

  const watermarkText = activeRing.name ? activeRing.name.replace('The ', '').toUpperCase() : 'KRYPTOS';

  return (
    <section
      id="hero"
      className="relative min-h-[140vh] w-full flex flex-col justify-start bg-transparent pointer-events-none select-none"
    >
      {/* Sticky Hero Viewport Container */}
      <div
        style={{ opacity: heroOpacity }}
        className="sticky top-0 h-screen w-full flex flex-col justify-between pt-24 pb-8 sm:pb-12 px-6 sm:px-10 md:px-14 transition-opacity duration-300"
      >
        {/* 1. Giant Watermark Layer (Poster Depth Behind 3D Ring) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0">
          <motion.div
            key={activeRing.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display font-bold text-[18vw] leading-none tracking-tighter text-white/[0.03] select-none uppercase whitespace-nowrap"
          >
            {watermarkText}
          </motion.div>
        </div>

        {/* 2. Top Editorial Eyebrow */}
        <div className="relative z-20 pointer-events-auto flex items-center justify-between">
          <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 bg-white/[0.04] backdrop-blur-xl border border-white/[0.08]">
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse bg-crimson"
            />
            <span className="text-[11px] font-medium tracking-widest uppercase text-porcelain-muted">
              Subterranean Atelier · 9 Bespoke Formations
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-xs text-porcelain-dark font-mono">
            <span>MOHS 9.0</span>
            <span>·</span>
            <span>DRACO COMPRESSED</span>
            <span>·</span>
            <span>AUTO-NORMALIZED</span>
          </div>
        </div>

        {/* 3. Left Editorial Headline & Pill CTA */}
        <div className="relative z-20 pointer-events-auto max-w-xl my-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="font-display font-bold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter text-porcelain leading-[0.96] mb-5">
              KRYPTOS <span className="block text-white/50 text-3xl sm:text-5xl md:text-6xl font-light">Forged in Obsidian.</span>
            </h1>

            <p className="text-sm sm:text-base text-porcelain-muted max-w-md font-light leading-relaxed mb-8">
              Nine bespoke sculptural rings for Men, Women, and Unisex. Sintered in subterranean vacuum crucibles with cryogenic gemstone stabilization.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreClick}
                className="rounded-full bg-[#F5F5F7] text-[#050507] hover:bg-white hover:scale-105 active:scale-95 transition-all duration-300 px-7 py-3.5 font-medium text-xs sm:text-sm tracking-wide shadow-[0_10px_30px_rgba(255,255,255,0.15)] flex items-center gap-2.5 cursor-pointer group"
              >
                <span>Explore 9 Editions</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <div className="hidden md:flex items-center gap-2 text-xs text-porcelain-muted px-4 py-2 rounded-full bg-white/[0.02] border border-white/[0.05]">
                <Sparkles className="w-3.5 h-3.5 text-crimson" />
                <span>Complimentary custom fiber laser engraving</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 4. Bottom Floating Ring Switcher Dock */}
        <div className="relative z-20 pointer-events-auto flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div className="w-full sm:w-auto">
            <span className="text-[10px] font-mono tracking-widest uppercase text-porcelain-dark block mb-2 px-1">
              Live 3D Specimen Dock
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full sm:max-w-2xl">
              {FEATURED_HERO_RINGS.map((ring) => {
                const isActive = activeRing.id === ring.id;
                return (
                  <div
                    key={ring.id}
                    onClick={() => onSelectEdition && onSelectEdition(ring.id)}
                    className={`rounded-2xl backdrop-blur-xl border p-2.5 sm:p-3 flex items-center gap-2.5 transition-all duration-300 cursor-pointer group ${
                      isActive
                        ? `bg-white/[0.12] border-white/40 shadow-[0_10px_30px_rgba(0,0,0,0.6)] ${ring.glowClass}`
                        : 'bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.06] hover:border-white/20'
                    }`}
                  >
                    {/* Ring Photo breaking slightly above / left */}
                    <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 -mt-1 -ml-1 transition-transform group-hover:scale-110">
                      <img
                        src={ring.image}
                        alt={ring.name}
                        className="w-full h-full object-contain drop-shadow-[0_6px_12px_rgba(0,0,0,0.8)]"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="font-display font-semibold text-xs text-porcelain truncate">
                          {ring.name}
                        </h4>
                      </div>
                      <p className="text-[10px] text-porcelain-dark truncate">
                        {ring.subtitle}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Minimal Scroll Cue */}
          <div
            onClick={onExploreClick}
            className="hidden lg:flex flex-col items-center gap-2 cursor-pointer group pb-2"
          >
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-porcelain-dark group-hover:text-porcelain transition-colors">
              Scroll to launch archive
            </span>
            <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1">
              <div className="w-1 h-2 rounded-full bg-white/60 animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
