import React, { useState, useEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';
import Scene from './components/3d/Scene';
import Navigation from './components/Navigation';
import HeroOverlay from './components/HeroOverlay';
import ConfiguratorOverlay from './components/ConfiguratorOverlay';
import CollectionSection from './components/CollectionSection';
import AtelierSection from './components/AtelierSection';
import InspectModal from './components/InspectModal';
import VaultDrawer from './components/VaultDrawer';
import Footer from './components/Footer';
import { RING_EDITIONS } from './data/rings';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeEdition, setActiveEdition] = useState('ignis');
  const [userRotation, setUserRotation] = useState({ x: 0, y: 0 });
  const [ringRotation, setRingRotation] = useState([0, 0, 0]);

  // Vault cart state
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

    // Initial check
    handleScroll();

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // Navigation anchor handler
  const handleNavigate = useCallback((sectionId) => {
    if (lenisRef.current) {
      const target = document.getElementById(sectionId);
      if (target) {
        lenisRef.current.scrollTo(target, { offset: -40, duration: 1.4 });
      } else if (sectionId === 'hero') {
        lenisRef.current.scrollTo(0, { duration: 1.4 });
      }
    }
  }, []);

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
    <div className="relative min-h-screen bg-[#050507] text-porcelain selection:bg-crimson selection:text-white overflow-x-hidden font-sans">
      {/* Fixed Navigation Header */}
      <Navigation
        vaultCount={vaultItems.reduce((sum, item) => sum + item.quantity, 0)}
        onOpenVault={() => setIsVaultOpen(true)}
        onNavigate={handleNavigate}
      />

      {/* Fixed 3D WebGL Canvas Layer */}
      <Scene
        scrollProgress={scrollProgress}
        activeEdition={activeEdition}
        userRotation={userRotation}
        ringRotation={ringRotation}
        onRotationChange={setRingRotation}
      />

      {/* Main Editorial Content (Scrollable) */}
      <main className="relative z-20">
        {/* Act 0 & Act 1: The Dark Reveal & Flying Runes */}
        <HeroOverlay
          scrollProgress={scrollProgress}
          onUnlockClick={() => handleNavigate('configurator')}
        />

        {/* Act 2: Interactive 3D Studio Configurator */}
        <ConfiguratorOverlay
          activeEdition={activeEdition}
          onSelectEdition={setActiveEdition}
          onOpenInspect={(ring) => setInspectRing(ring)}
          onAddToVault={handleAddToVault}
          userRotation={userRotation}
          onRotationChange={setUserRotation}
        />

        {/* Curated Collection Grid */}
        <CollectionSection
          activeEdition={activeEdition}
          onSelectEdition={setActiveEdition}
          onOpenInspect={(ring) => setInspectRing(ring)}
        />

        {/* Metallurgy Anatomy Breakdown */}
        <AtelierSection />

        {/* Luxury Hallmarks Footer */}
        <Footer onNavigate={handleNavigate} />
      </main>

      {/* Interactive Quick-Inspect Product Modal */}
      <InspectModal
        ring={inspectRing}
        isOpen={Boolean(inspectRing)}
        onClose={() => setInspectRing(null)}
        onAddToVault={handleAddToVault}
      />

      {/* Slide-Out Vault Bag Drawer */}
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
