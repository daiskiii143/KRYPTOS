import React, { useState } from 'react';
import { SIZING_DATA } from '../data/rings';
import EmergeFromRing from './animation/EmergeFromRing';
import { Ruler, Info } from 'lucide-react';

export default function SizingSection() {
  const [sliderDiameterMm, setSliderDiameterMm] = useState(19.8); // US 10 default

  // Find closest US size
  const closestSize = SIZING_DATA.reduce((prev, curr) => {
    return Math.abs(curr.insideDiameterMm - sliderDiameterMm) < Math.abs(prev.insideDiameterMm - sliderDiameterMm)
      ? curr
      : prev;
  });

  return (
    <section id="sizing" className="py-24 bg-transparent">
      <EmergeFromRing originX={-320} originY={25} rotation={-2}>
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 bg-white/[0.04] border border-white/[0.08] mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-crimson" />
            <span className="text-[11px] font-medium tracking-widest uppercase text-porcelain-muted">
              Sizing & Fit Guide
            </span>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl tracking-tight text-porcelain leading-[1.05]">
            Sizing & Comfort Geometry
          </h2>

          <p className="mt-4 text-sm sm:text-base font-light text-porcelain-muted max-w-xl leading-relaxed">
            Tungsten carbide cannot be annealed or stretched. Precision sizing ensures lifetime comfort across our comfort-fit radial profiles.
          </p>
        </div>
      </EmergeFromRing>

      {/* 1. Interactive Visual Ring-Diameter Matcher */}
      <EmergeFromRing originX={-280} originY={35} rotation={-1.5}>
        <div className="rounded-3xl bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] p-6 sm:p-10 mb-10 space-y-8 shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-white/40 block mb-1">
                Visual Sizer
              </span>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-porcelain">
                Interactive Diameter Matcher
              </h3>
              <p className="text-xs text-porcelain-muted mt-1 max-w-md font-light">
                Place an existing ring flat against your screen and adjust the slider until the circle matches your ring's inner bore.
              </p>
            </div>

            <div className="rounded-2xl bg-white/[0.04] border border-white/10 px-5 py-3 text-left sm:text-right">
              <span className="text-[10px] font-mono uppercase tracking-wider text-porcelain-dark block">
                Detected Fit
              </span>
              <div className="font-display text-2xl sm:text-3xl text-porcelain font-bold">
                US {closestSize.us}
              </div>
              <span className="text-xs font-mono text-porcelain-muted">
                {sliderDiameterMm.toFixed(1)} mm · {(sliderDiameterMm / 25.4).toFixed(3)} in
              </span>
            </div>
          </div>

          {/* Visual Circle Display */}
          <div className="flex flex-col items-center justify-center py-10 rounded-2xl bg-black/40 border border-white/[0.04]">
            <div
              style={{
                width: `${sliderDiameterMm * 4.8}px`,
                height: `${sliderDiameterMm * 4.8}px`
              }}
              className="rounded-full border-2 border-dashed border-porcelain/60 flex items-center justify-center transition-all duration-150 relative shadow-[0_0_25px_rgba(255,255,255,0.08)]"
            >
              <div className="w-2 h-2 rounded-full bg-crimson" />
              <div className="absolute inset-x-3 top-1/2 -translate-y-1/2 border-t border-white/20" />
              <span className="absolute -bottom-7 font-mono text-[11px] text-porcelain-muted tracking-widest">
                {sliderDiameterMm.toFixed(1)} MM
              </span>
            </div>
          </div>

          {/* Slider Control */}
          <div className="space-y-3">
            <div className="flex items-center justify-between font-mono text-xs text-porcelain-dark">
              <span>US 6 (16.5 mm)</span>
              <span className="text-porcelain font-semibold font-display text-sm">
                {sliderDiameterMm.toFixed(1)} mm
              </span>
              <span>US 12 (21.4 mm)</span>
            </div>
            <input
              type="range"
              min="16.0"
              max="22.0"
              step="0.1"
              value={sliderDiameterMm}
              onChange={(e) => setSliderDiameterMm(parseFloat(e.target.value))}
              className="w-full accent-white bg-white/10 h-2 rounded-full cursor-pointer"
            />
          </div>
        </div>
      </EmergeFromRing>

      {/* 2. ISO 8653 Conversion Table & Fit Guidance (Rounded Pill Architecture) */}
      <EmergeFromRing originX={-260} originY={40} rotation={-1.5}>
        <div className="rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="font-display font-semibold text-lg text-porcelain">
              ISO 8653 Metric Sizing Standards
            </h4>
            <span className="text-xs font-mono text-porcelain-dark">
              US 6 – US 12
            </span>
          </div>

          <div className="rounded-2xl overflow-hidden border border-white/[0.06] bg-black/30">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/[0.08] text-porcelain-dark font-mono text-[10px] uppercase tracking-wider bg-white/[0.02]">
                    <th className="py-3 px-4">US Size</th>
                    <th className="py-3 px-4">Inside Diameter</th>
                    <th className="py-3 px-4">Inches</th>
                    <th className="py-3 px-4">Inside Circumference</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {SIZING_DATA.map((row) => {
                    const isMatched = closestSize.us === row.us;
                    return (
                      <tr
                        key={row.us}
                        className={`transition-colors ${
                          isMatched ? 'bg-white/[0.08] font-semibold text-porcelain' : 'text-porcelain-muted hover:bg-white/[0.02]'
                        }`}
                      >
                        <td className="py-3 px-4 font-mono font-medium text-porcelain">
                          US {row.us} {isMatched && '★'}
                        </td>
                        <td className="py-3 px-4 font-mono">{row.insideDiameterMm} mm</td>
                        <td className="py-3 px-4 font-mono">{row.insideDiameterIn}"</td>
                        <td className="py-3 px-4 font-mono">{row.insideCircumferenceMm} mm</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Ergonomic Guidance Box */}
          <div className="rounded-2xl bg-white/[0.02] border border-white/[0.06] p-4 flex items-start gap-3">
            <Info className="w-4 h-4 text-porcelain-muted flex-shrink-0 mt-0.5" />
            <p className="text-xs text-porcelain-muted leading-relaxed font-light">
              <strong className="text-porcelain font-medium">8.0 mm Wide Comfort-Fit Fit Advice:</strong> Because our rings feature a domed interior radial bore, they slide on smoothly over knuckles. If you normally wear a narrow 4mm band, order your true size; if you are between two sizes, we recommend selecting the smaller half-size.
            </p>
          </div>
        </div>
      </EmergeFromRing>
    </section>
  );
}
