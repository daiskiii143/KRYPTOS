import React, { useState } from 'react';
import { SIZING_DATA } from '../data/rings';
import EmergeFromRing from './animation/EmergeFromRing';

export default function SizingSection() {
  const [sliderDiameterMm, setSliderDiameterMm] = useState(19.8); // US 10 default

  // Find closest US size
  const closestSize = SIZING_DATA.reduce((prev, curr) => {
    return Math.abs(curr.insideDiameterMm - sliderDiameterMm) < Math.abs(prev.insideDiameterMm - sliderDiameterMm)
      ? curr
      : prev;
  });

  return (
    <section id="sizing" className="py-24 border-b border-white/[0.06]">
      <EmergeFromRing originX={-350} originY={30} rotation={-3}>
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-6 h-px bg-crimson" />
            <span className="font-mono text-xs uppercase tracking-[0.28em] text-porcelain-muted">
              Fit Protocol · Chapter III
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-porcelain">
            Sizing & Comfort Geometry
          </h2>

          <p className="mt-4 font-serif text-lg sm:text-xl font-light text-porcelain-muted max-w-xl leading-relaxed italic">
            Tungsten carbide cannot be annealed or stretched. Precision sizing ensures lifetime comfort
            across our 8.0 mm comfort-fit radial profiles.
          </p>
        </div>
      </EmergeFromRing>

      {/* 1. Interactive Visual Ring-Diameter Matcher */}
      <EmergeFromRing originX={-320} originY={40} rotation={-2}>
        <div className="bg-[#08090C] border border-white/[0.08] p-8 sm:p-10 mb-14 space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-crimson font-medium block mb-1">
                Caliber Gauge
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-normal text-porcelain">
                Interactive Diameter Matcher
              </h3>
              <p className="font-sans text-xs text-porcelain-muted mt-1 max-w-md">
                Place an existing ring flat against your screen and adjust the slider until the perimeter matches your ring's inner edge.
              </p>
            </div>

            <div className="text-right sm:border-l sm:border-white/10 sm:pl-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-porcelain-dark block">
                Detected Fit
              </span>
              <div className="font-display text-3xl sm:text-4xl text-porcelain font-normal">
                US {closestSize.us}
              </div>
              <span className="font-mono text-xs text-porcelain-muted">
                {sliderDiameterMm.toFixed(1)} mm · {(sliderDiameterMm / 25.4).toFixed(3)} in
              </span>
            </div>
          </div>

          {/* Visual Circle Display */}
          <div className="flex flex-col items-center justify-center py-8 bg-[#040405] border border-white/[0.04]">
            <div
              style={{
                width: `${sliderDiameterMm * 4.8}px`,
                height: `${sliderDiameterMm * 4.8}px`
              }}
              className="rounded-full border border-dashed border-porcelain/60 flex items-center justify-center transition-all duration-150 relative shadow-[0_0_20px_rgba(255,255,255,0.05)]"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-crimson" />
              <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 border-t border-white/20" />
              <span className="absolute -bottom-6 font-mono text-[10px] text-porcelain-dark tracking-widest">
                {sliderDiameterMm.toFixed(1)} MM
              </span>
            </div>
          </div>

          {/* Slider Control */}
          <div className="space-y-3">
            <div className="flex items-center justify-between font-mono text-xs text-porcelain-dark">
              <span>US 6 (16.5 mm)</span>
              <span className="text-porcelain font-medium">{sliderDiameterMm.toFixed(1)} mm</span>
              <span>US 12 (21.4 mm)</span>
            </div>
            <input
              type="range"
              min="16.0"
              max="22.0"
              step="0.1"
              value={sliderDiameterMm}
              onChange={(e) => setSliderDiameterMm(parseFloat(e.target.value))}
              className="w-full accent-white bg-white/10 h-1 rounded-none cursor-pointer"
            />
          </div>
        </div>
      </EmergeFromRing>

      {/* 2. Comprehensive Sizing Chart */}
      <EmergeFromRing originX={-300} originY={50} rotation={-2}>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="font-display text-xl font-normal text-porcelain">
              Standard Metric & Imperial Index
            </h4>
            <span className="font-mono text-xs text-porcelain-dark">
              ISO 8653 Certified
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/15 text-porcelain-dark uppercase tracking-[0.18em] text-[10px]">
                  <th className="py-3 px-3">US Size</th>
                  <th className="py-3 px-3">Inner Diameter (mm)</th>
                  <th className="py-3 px-3">Inner Diameter (in)</th>
                  <th className="py-3 px-3">Circumference (mm)</th>
                  <th className="py-3 px-3 text-right">Band Match</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06] text-porcelain-muted">
                {SIZING_DATA.map((row) => {
                  const isCurrent = closestSize.us === row.us;
                  return (
                    <tr
                      key={row.us}
                      className={`transition-colors ${
                        isCurrent ? 'bg-white/[0.04] text-porcelain font-medium' : 'hover:bg-white/[0.02]'
                      }`}
                    >
                      <td className="py-3.5 px-3 font-medium text-porcelain">
                        US {row.us}
                      </td>
                      <td className="py-3.5 px-3">{row.insideDiameterMm} mm</td>
                      <td className="py-3.5 px-3">{row.insideDiameterIn} in</td>
                      <td className="py-3.5 px-3">{row.insideCircumferenceMm} mm</td>
                      <td className="py-3.5 px-3 text-right">
                        {isCurrent ? (
                          <span className="text-crimson font-medium">Selected</span>
                        ) : (
                          <span className="text-white/20">8.0 mm Comfort</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Wide Band Guidance Note */}
          <div className="p-4 bg-white/[0.02] border border-white/[0.06] font-sans text-xs text-porcelain-muted leading-relaxed font-light">
            <strong className="text-porcelain font-medium">Wide 8.0 mm Band Sizing Advisory: </strong>
            Because our rings feature an 8.0 mm wide comfort-fit profile, they cover a wider skin surface than delicate 3–4mm bands. If your standard measurement falls between two sizes, we advise selecting the larger size for optimal airflow and effortless removal.
          </div>
        </div>
      </EmergeFromRing>
    </section>
  );
}
