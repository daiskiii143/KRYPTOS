import React from 'react';

export default function Footer({ onNavigate }) {
  const links = [
    { id: 'collection', label: 'Collection' },
    { id: 'atelier', label: 'Atelier' },
    { id: 'sizing', label: 'Sizing' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <footer className="py-16 mt-20 border-t border-[#F2EFE9]/[0.08] text-xs text-[#8E8A82] bg-transparent">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <span className="font-sans font-medium text-sm text-[#F2EFE9] tracking-[0.14em] uppercase block mb-1">
            KRYPTOS
          </span>
          <p className="text-xs text-[#8E8A82] max-w-sm font-normal">
            Sculpted Tungsten Metallurgy · Radial Comfort-Fit Geometry
          </p>
          <p className="text-xs text-[#8E8A82] mt-1">
            atelier@kryptos.store
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs">
          {links.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="text-[#8E8A82] hover:text-[#F2EFE9] transition-colors cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="text-xs text-[#8E8A82] text-left md:text-right">
          <div>© {new Date().getFullYear()} KRYPTOS. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}
