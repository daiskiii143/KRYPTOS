import React, { useState } from 'react';
import { SIZING_DATA } from '../data/rings';

export default function SizingSection() {
  const [sliderDiameterMm, setSliderDiameterMm] = useState(19.8); // US 10 default

  // Find closest US size
  const closestSize = SIZING_DATA.reduce((prev, curr) => {
    return Math.abs(curr.insideDiameterMm - sliderDiameterMm) < Math.abs(prev.insideDiameterMm - sliderDiameterMm)
      ? curr
      : prev;
  });

  return (
    <section id="sizing" className="py-20 sm:py-28 bg-transparent">
      {/* Section Header */}
      <div className="mb-12">
        <h2 className="font-serif text-3xl sm:text-5xl text-[#F2EFE9] font-normal tracking-[-0.02em] leading-tight">
          Sizing & Ergonomics
        </h2>
        <p className="mt-3 text-sm text-[#8E8A82] font-normal max-w-xl leading-relaxed">
          Tungsten carbide cannot be resized. Precision sizing ensures effortless knuckle clearance and lifetime comfort across our radial dome bore profiles.
        </p>
      </div>

      {/* 1. Interactive Visual Diameter Matcher (Tactile Surface in #151518) */}
      <div className="rounded-xl bg-[#151518] border border-[#F2EFE9]/[0.08] p-6 sm:p-8 mb-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#F2EFE9]/[0.08] pb-6">
          <div>
            <h3 className="font-sans font-medium text-lg text-[#F2EFE9]">
              Visual Diameter Matcher
            </h3>
            <p className="text-xs text-[#8E8A82] mt-1 max-w-md font-normal leading-relaxed">
              Place an existing ring flat against your screen and adjust the slider until the guide circle matches your ring's inner bore.
            </p>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-[11px] text-[#8E8A82] uppercase tracking-wider block">
              Estimated Size
            </span>
            <div className="font-sans font-medium text-2xl text-[#F2EFE9]">
              US {closestSize.us}
            </div>
            <span className="text-xs text-[#8E8A82]">
              {sliderDiameterMm.toFixed(1)} mm · {(sliderDiameterMm / 25.4).toFixed(3)} in
            </span>
          </div>
        </div>

        {/* Visual Circle Display (Zero Red Dot) */}
        <div className="flex flex-col items-center justify-center py-10 rounded-lg bg-[#0D0D0F] border border-[#F2EFE9]/[0.04]">
          <div
            style={{
              width: `${sliderDiameterMm * 4.6}px`,
              height: `${sliderDiameterMm * 4.6}px`
            }}
            className="rounded-full border border-dashed border-[#F2EFE9]/60 flex items-center justify-center transition-all duration-150 relative"
          >
            {/* Subtle center marker in warm bone #F2EFE9 (Zero Red) */}
            <div className="w-1.5 h-1.5 rounded-full bg-[#F2EFE9]/40" />
            <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 border-t border-[#F2EFE9]/15" />
            <span className="absolute -bottom-6 text-[11px] text-[#8E8A82]">
              {sliderDiameterMm.toFixed(1)} MM
            </span>
          </div>
        </div>

        {/* Slider Control */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between text-xs text-[#8E8A82]">
            <span>US 6 (16.5 mm)</span>
            <span className="text-[#F2EFE9] font-medium">
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
            className="w-full accent-[#F2EFE9] bg-[#F2EFE9]/10 h-1.5 rounded-full cursor-pointer"
          />
        </div>
      </div>

      {/* 2. ISO 8653 Metric Sizing Standards Table */}
      <div className="rounded-xl bg-[#151518] border border-[#F2EFE9]/[0.08] p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <h4 className="font-sans font-medium text-base text-[#F2EFE9]">
            ISO 8653 Metric Sizing Standards
          </h4>
          <span className="text-xs text-[#8E8A82]">
            US 5 – US 13
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#F2EFE9]/[0.08] text-[#8E8A82] text-[11px] uppercase tracking-wider">
                <th className="py-3 px-3">US Size</th>
                <th className="py-3 px-3">Inside Diameter</th>
                <th className="py-3 px-3">Inches</th>
                <th className="py-3 px-3">Circumference</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F2EFE9]/[0.04]">
              {SIZING_DATA.map((row) => {
                const isMatched = closestSize.us === row.us;
                return (
                  <tr
                    key={row.us}
                    className={`transition-colors ${
                      isMatched
                        ? 'bg-[#F2EFE9]/[0.06] text-[#F2EFE9] font-medium'
                        : 'text-[#8E8A82] hover:text-[#F2EFE9]'
                    }`}
                  >
                    <td className="py-2.5 px-3 font-medium text-[#F2EFE9]">
                      US {row.us}
                    </td>
                    <td className="py-2.5 px-3">{row.insideDiameterMm} mm</td>
                    <td className="py-2.5 px-3">{row.insideDiameterIn}″</td>
                    <td className="py-2.5 px-3">{row.insideCircumferenceMm} mm</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Sizing Guidance Note (Clean Hairline Box, Zero Icons) */}
        <div className="border-t border-[#F2EFE9]/[0.08] pt-4">
          <p className="text-xs text-[#8E8A82] leading-relaxed">
            <span className="text-[#F2EFE9] font-medium">Comfort-Fit Sizing Note: </span>
            Our 8.0 mm bands feature an inner convex radial bore that glides over knuckles with reduced friction. If between sizes, we recommend sizing down a half size for optimal seating.
          </p>
        </div>
      </div>
    </section>
  );
}
