import React, { useRef, useState } from 'react';
import { Rotate3d, Sparkles, Check, ChevronRight, Shield, Layers, Eye } from 'lucide-react';
import { RING_EDITIONS } from '../data/rings';

export default function ConfiguratorOverlay({
  activeEdition = 'ignis',
  onSelectEdition,
  onOpenInspect,
  onAddToVault,
  userRotation,
  onRotationChange
}) {
  const current = RING_EDITIONS.find((r) => r.id === activeEdition) || RING_EDITIONS[0];
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  // Handle pointer drag for 3D ring rotation
  const handlePointerDown = (e) => {
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e) => {
    if (!isDragging || !onRotationChange) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    dragStart.current = { x: e.clientX, y: e.clientY };

    onRotationChange((prev) => ({
      x: prev.x + dx * 0.008,
      y: Math.max(-1.2, Math.min(1.2, prev.y + dy * 0.008))
    }));
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const handleAnglePreset = (x, y) => {
    if (onRotationChange) {
      onRotationChange({ x, y });
    }
  };

  return (
    <section
      id="configurator"
      className="relative min-h-screen w-full flex flex-col justify-center py-20 px-6 md:px-12 pointer-events-auto"
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Interactive 3D Turntable Pad / Drag Area */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start justify-center relative min-h-[460px] md:min-h-[580px]">
          {/* Subtle Ambient Radial Highlight */}
          <div
            className="absolute -top-12 -left-12 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none transition-colors duration-700"
            style={{
              backgroundColor:
                activeEdition === 'ignis'
                  ? '#DC2626'
                  : activeEdition === 'aether'
                  ? '#059669'
                  : '#52525B'
            }}
          />

          {/* Interactive Drag Zone Area */}
          <div
            onPointerDown={handlePointerDown}
            className={`w-full max-w-lg aspect-square rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.02] to-transparent p-6 flex flex-col justify-between cursor-grab transition-all ${
              isDragging ? 'cursor-grabbing border-white/20' : 'hover:border-white/10'
            }`}
          >
            {/* Top Bar inside Canvas Pad */}
            <div className="flex items-center justify-between text-xs font-mono text-porcelain-muted">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>3D ATELIER ENGINE</span>
              </span>
              <span className="uppercase tracking-widest text-[11px] text-porcelain-dark">
                DRAG 360° · REALTIME PBR
              </span>
            </div>

            {/* Middle Drag Cue */}
            <div className="self-center flex flex-col items-center gap-2 text-center pointer-events-none opacity-40 hover:opacity-80 transition-opacity">
              <Rotate3d className="w-6 h-6 text-porcelain-muted animate-spin-slow" />
              <span className="text-[10px] font-mono tracking-widest uppercase text-porcelain-muted">
                Drag to inspect filigree & bevels
              </span>
            </div>

            {/* Camera Angle Quick Presets */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-white/[0.06]">
              <span className="text-[10px] font-mono uppercase tracking-widest text-porcelain-dark">
                Angles:
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleAnglePreset(0, 0)}
                  className="px-2.5 py-1 text-[11px] font-mono rounded bg-white/[0.04] hover:bg-white/10 text-porcelain-muted hover:text-porcelain transition-colors"
                >
                  Hero 3/4
                </button>
                <button
                  type="button"
                  onClick={() => handleAnglePreset(1.57, -0.2)}
                  className="px-2.5 py-1 text-[11px] font-mono rounded bg-white/[0.04] hover:bg-white/10 text-porcelain-muted hover:text-porcelain transition-colors"
                >
                  Filigree Relief
                </button>
                <button
                  type="button"
                  onClick={() => handleAnglePreset(3.14, 0.4)}
                  className="px-2.5 py-1 text-[11px] font-mono rounded bg-white/[0.04] hover:bg-white/10 text-porcelain-muted hover:text-porcelain transition-colors"
                >
                  Comfort Bore
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Studio Configurator Controls */}
        <div className="lg:col-span-5 flex flex-col gap-6 z-20">
          {/* Edition Header Badge */}
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-mono tracking-widest bg-white/[0.05] border border-white/10 text-porcelain">
              EDITION {current.editionNumber}
            </span>
            <span className="text-xs font-mono tracking-widest uppercase text-emerald-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Available to Forge
            </span>
          </div>

          {/* Title & Price */}
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-porcelain">
              {current.name}
            </h2>
            <p className="mt-1 text-sm font-sans text-porcelain-muted font-light">
              {current.subtitle}
            </p>
            <div className="mt-3 flex items-baseline gap-3">
              <span className="font-mono text-2xl font-bold text-porcelain tracking-tight">
                ${current.price}
              </span>
              <span className="text-xs font-mono text-porcelain-dark uppercase">
                USD · Bespoke Sizing Included
              </span>
            </div>
          </div>

          {/* Material & Edition Switcher Pills */}
          <div className="flex flex-col gap-2.5">
            <label className="text-[11px] font-mono uppercase tracking-widest text-porcelain-muted">
              Select Metallurgy & Core Inlay:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {RING_EDITIONS.slice(0, 3).map((edition) => {
                const isSelected = activeEdition === edition.id;
                return (
                  <button
                    key={edition.id}
                    onClick={() => onSelectEdition(edition.id)}
                    className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden group ${
                      isSelected
                        ? 'border-crimson bg-crimson/10 shadow-lg shadow-crimson/10'
                        : 'border-white/[0.08] bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono tracking-widest text-porcelain-muted">
                        {edition.editionNumber}
                      </span>
                      <div
                        className="w-3 h-3 rounded-full border border-white/30"
                        style={{ backgroundColor: edition.accentColor }}
                      />
                    </div>
                    <div className="font-display text-xs font-bold text-porcelain group-hover:text-white transition-colors">
                      {edition.name.split(' ')[0]}
                    </div>
                    <div className="text-[10px] font-mono text-porcelain-muted truncate mt-0.5">
                      {edition.name.split(' ').slice(1).join(' ')}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Precision Metallurgy Specs Sheet */}
          <div className="p-4 rounded-xl glass-panel border border-white/[0.08] flex flex-col gap-3">
            <div className="flex items-center justify-between text-xs font-mono border-b border-white/[0.06] pb-2 text-porcelain-muted">
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-crimson" />
                <span>Base Alloy</span>
              </span>
              <span className="text-porcelain font-medium">{current.alloy.split('(')[0]}</span>
            </div>

            <div className="flex items-center justify-between text-xs font-mono border-b border-white/[0.06] pb-2 text-porcelain-muted">
              <span className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-rhodium-light" />
                <span>Filigree Relief</span>
              </span>
              <span className="text-porcelain font-medium">0.018m Rhodium 3D Knot</span>
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-porcelain-muted">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Hardness / Weight</span>
              </span>
              <span className="text-porcelain font-medium">Mohs 9.0 · 14.2g</span>
            </div>
          </div>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => onOpenInspect(current)}
              className="w-full sm:flex-1 py-3.5 px-6 rounded-xl bg-porcelain text-[#050507] hover:bg-white font-mono text-xs uppercase tracking-widest font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-white/5 group"
            >
              <span>Configure Sizing & Inscribe</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={() => onAddToVault(current, 'US 10', '')}
              className="w-full sm:w-auto py-3.5 px-5 rounded-xl border border-white/20 hover:border-crimson hover:bg-crimson/10 font-mono text-xs uppercase tracking-widest text-porcelain transition-all flex items-center justify-center gap-2"
            >
              <Check className="w-3.5 h-3.5 text-crimson" />
              <span>Quick Vault</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
