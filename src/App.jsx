import React, { useState, useEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';
import Scene from './components/3d/Scene';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import AtelierSection from './components/AtelierSection';
import CollectionSection from './components/CollectionSection';
import SizingSection from './components/SizingSection';
import ContactSection from './components/ContactSection';
import InspectModal from './components/InspectModal';
import VaultDrawer from './components/VaultDrawer';
import Footer from './components/Footer';
import { RING_EDITIONS } from './data/rings';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeEdition, setActiveEdition] = useState('sovereign');
  const [userRotation, setUserRotation] = useState({ x: 0, y: 0 });

  // Vault state
  const [vaultItems, setVaultItems] = useState([
    {
      ring: RING_EDITIONS[0],
      size: 'US 10',
      engraving: 'KRYPTOS · TUNGSTEN CARBIDE',
      quantity: 1
    }
  ]);
  const [isVaultOpen, setIsVaultOpen] = useState(false);

  // Inspect modal state
  const [inspectRing, setInspectRing] = useState(null);

  const lenisRef = useRef(null);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5
    });
    lenisRef.current = lenis;

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const progress = Math.min(Math.max(window.scrollY / totalScroll, 0), 1);
        setScrollProgress(progress);
      }
    };

    lenis.on('scroll', handleScroll);

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);
    handleScroll();

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // Smooth navigation handler
  const handleNavigate = useCallback((sectionId) => {
    if (lenisRef.current) {
      if (sectionId === 'hero') {
        lenisRef.current.scrollTo(0, { duration: 1.2 });
      } else {
        const target = document.getElementById(sectionId);
        if (target) {
          lenisRef.current.scrollTo(target, { offset: -70, duration: 1.2 });
        }
      }
    }
  }, []);

  // Left-Rail Drag Interaction to rotate ring 360° on its spin axis
  const handlePointerDown = (e) => {
    isDragging.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    dragStart.current = { x: e.clientX, y: e.clientY };

    setUserRotation((prev) => ({
      x: prev.x + dx * 0.008,
      y: Math.max(-1.0, Math.min(1.0, prev.y + dy * 0.008))
    }));
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  // Vault actions
  const handleAddToVault = (ring, size = 'US 10', engraving = '') => {
    setVaultItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.ring.id === ring.id && item.size === size && item.engraving === engraving
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += 1;
        return updated;
      }
      return [...prev, { ring, size, engraving, quantity: 1 }];
    });
    setIsVaultOpen(true);
  };

  const handleUpdateQuantity = (index, qty) => {
    setVaultItems((prev) => {
      const updated = [...prev];
      updated[index].quantity = qty;
      return updated;
    });
  };

  const handleRemoveItem = (index) => {
    setVaultItems((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleClearVault = () => {
    setVaultItems([]);
  };

  return (
    <div
      className="relative min-h-screen bg-transparent text-porcelain selection:bg-crimson selection:text-white overflow-x-hidden font-sans"
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* 1. Minimal Fixed Top Header */}
      <Navigation
        vaultCount={vaultItems.reduce((sum, item) => sum + item.quantity, 0)}
        onOpenVault={() => setIsVaultOpen(true)}
        onNavigate={handleNavigate}
      />

      {/* 2. Persistent 3D WebGL Layer (Centered in Hero -> Left Rail Docked Dial) */}
      <Scene
        scrollProgress={scrollProgress}
        activeEdition={activeEdition}
        userRotation={userRotation}
      />

      {/* 3. Left Rail Interactive Touch Surface (Active when docked on desktop) */}
      <div
        onPointerDown={handlePointerDown}
        className={`hidden lg:flex fixed left-0 top-0 bottom-0 w-[34%] z-20 flex-col justify-end p-10 select-none cursor-grab active:cursor-grabbing transition-opacity duration-500 ${
          scrollProgress > 0.14 ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-porcelain-dark flex items-center justify-between border-t border-white/[0.08] pt-4">
          <span>Mechanical Scroll Dial</span>
          <span>{Math.round(scrollProgress * 100)}%</span>
        </div>
      </div>

      {/* 4. Natural Document Flow Content */}
      <div className="relative z-20 bg-transparent">
        {/* Hero Section: Centered macro ring view + wordmark (0% – 14%) */}
        <Hero
          scrollProgress={scrollProgress}
          onExploreClick={() => handleNavigate('atelier')}
        />

        {/* Right-Hand Content Column (ml-[34%] on desktop with pt-28 top clearance) */}
        <main className="w-full lg:ml-[34%] lg:w-[66%] max-w-4xl px-6 sm:px-10 md:px-14 bg-transparent pt-28">
          {/* Section 01: Ejected Headline + Sovereign Configurator */}
          <AtelierSection
            onAddToVault={handleAddToVault}
            onOpenSizing={() => handleNavigate('sizing')}
          />

          {/* Section 02: Full 9-Ring Curated Editions Gallery */}
          <CollectionSection
            onOpenInspect={(ring) => setInspectRing(ring)}
            onAddToVault={handleAddToVault}
            onSelectEdition={setActiveEdition}
          />

          {/* Section 03: Sizing Protocol & Interactive Caliber Matcher */}
          <SizingSection />

          {/* Section 04: Bespoke Commission Form & Direct Atelier Concierge */}
          <ContactSection />

          {/* Minimal Hallmarks Footer */}
          <Footer onNavigate={handleNavigate} />
        </main>
      </div>

      {/* Sleek Sizing & Laser Engraving Modal */}
      <InspectModal
        ring={inspectRing}
        isOpen={Boolean(inspectRing)}
        onClose={() => setInspectRing(null)}
        onAddToVault={handleAddToVault}
        onOpenSizing={() => {
          setInspectRing(null);
          handleNavigate('sizing');
        }}
      />

      {/* Minimal Slide-Out Vault Bag Drawer */}
      <VaultDrawer
        isOpen={isVaultOpen}
        onClose={() => setIsVaultOpen(false)}
        items={vaultItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearVault={handleClearVault}
      />
    </div>
  );
}
