import React, { useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useTexture } from '@react-three/drei';
import * as THREE from 'three';

// Configure local Draco decoder path
useGLTF.setDecoderPath('/draco/');

export default function KryptosRing({
  scrollProgress = 0,
  activeEdition = 'ignis',
  userRotation = { x: 0, y: 0 }
}) {
  // Nested two-group architecture to fix the Tumbling Euler Bug
  const outerGroupRef = useRef();
  const innerSpinRef = useRef();

  // Load the GLTF model
  const { scene } = useGLTF('/models/kryptos-ring.glb');

  // Load textures for editions
  const [texCrimson, texEclipse, texAether] = useTexture([
    '/models/Tex_CrimsonPearloid.png',
    '/models/Tex_EclipseObsidian.png',
    '/models/Tex_AetherEmerald.png'
  ]);

  useMemo(() => {
    [texCrimson, texEclipse, texAether].forEach((tex) => {
      if (tex) {
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.ClampToEdgeWrapping;
        tex.flipY = false;
        tex.needsUpdate = true;
      }
    });
  }, [texCrimson, texEclipse, texAether]);

  // Clone scene on first mount to ensure isolated instance
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  // Material references
  const materialsRef = useRef({});

  // Initialize and isolate materials for realistic dark metal PBR
  useEffect(() => {
    clonedScene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        if (child.material) {
          child.material = child.material.clone();
          materialsRef.current[child.name] = child.material;
        }

        // Apply realistic jewelry PBR properties
        if (child.name.includes('ResinOvercoat')) {
          child.material.transmission = 0.98;
          child.material.roughness = 0.015;
          child.material.ior = 1.54;
          child.material.transparent = true;
          child.material.depthWrite = false;
        } else if (child.name.includes('TungstenFrame')) {
          child.material.metalness = 1.0;
          child.material.roughness = 0.04;
          child.material.color.set('#060709');
        } else if (child.name.includes('FiligreeRelief')) {
          child.material.metalness = 1.0;
          child.material.roughness = 0.09;
          child.material.color.set('#D8D8DC');
          child.material.emissive.set('#000000');
          child.material.emissiveIntensity = 0.0;
        }
      }
    });
  }, [clonedScene]);

  // Update materials when activeEdition changes (Strictly subtle, dark-luxury PBR)
  useEffect(() => {
    const coreMat = materialsRef.current['Ring_CrimsonCore'];
    const filigreeMat = materialsRef.current['Ring_FiligreeRelief'];
    const frameMat = materialsRef.current['Ring_TungstenFrame'];

    if (!coreMat || !filigreeMat) return;

    if (activeEdition === 'eclipse' || activeEdition === 'chronos') {
      // ECLIPSE / CHRONOS OBSIDIAN (Monochromatic stealth carbon)
      coreMat.map = texEclipse;
      coreMat.color.set('#CCCCCC');
      coreMat.emissive.set('#18181B');
      coreMat.emissiveIntensity = 0.04;
      coreMat.roughness = 0.32;
      coreMat.metalness = 0.2;
      coreMat.needsUpdate = true;

      filigreeMat.color.set('#64646E');
      filigreeMat.roughness = 0.16;
      filigreeMat.metalness = 0.96;
      filigreeMat.emissive.set('#000000');
      filigreeMat.emissiveIntensity = 0.0;

      if (frameMat) frameMat.color.set('#040405');
    } else if (activeEdition === 'aether') {
      // AETHER EMERALD (Deep imperial emerald relic)
      coreMat.map = texAether;
      coreMat.color.set('#FFFFFF');
      coreMat.emissive.set('#064E3B');
      coreMat.emissiveIntensity = 0.08;
      coreMat.roughness = 0.20;
      coreMat.metalness = 0.4;
      coreMat.needsUpdate = true;

      filigreeMat.color.set('#E4E4E7');
      filigreeMat.roughness = 0.09;
      filigreeMat.metalness = 1.0;
      filigreeMat.emissive.set('#000000');
      filigreeMat.emissiveIntensity = 0.0;

      if (frameMat) frameMat.color.set('#06070A');
    } else if (activeEdition === 'nocturne') {
      // NOCTURNE DAMASCUS (Dark Damascus steel with silver rune filigree)
      coreMat.map = texEclipse;
      coreMat.color.set('#8E9099');
      coreMat.emissive.set('#101217');
      coreMat.emissiveIntensity = 0.03;
      coreMat.roughness = 0.28;
      coreMat.metalness = 0.85;
      coreMat.needsUpdate = true;

      filigreeMat.color.set('#C0C0C8');
      filigreeMat.roughness = 0.12;
      filigreeMat.metalness = 0.95;
      filigreeMat.emissive.set('#000000');
      filigreeMat.emissiveIntensity = 0.0;

      if (frameMat) frameMat.color.set('#0D0E12');
    } else if (activeEdition === 'vespera') {
      // VESPERA BLOOD RUBY (Mirror black tungsten with blood ruby channel)
      coreMat.map = texCrimson;
      coreMat.color.set('#B91C1C');
      coreMat.emissive.set('#7F1D1D');
      coreMat.emissiveIntensity = 0.10;
      coreMat.roughness = 0.15;
      coreMat.metalness = 0.3;
      coreMat.needsUpdate = true;

      filigreeMat.color.set('#E11D48');
      filigreeMat.roughness = 0.10;
      filigreeMat.metalness = 0.9;
      filigreeMat.emissive.set('#450A0A');
      filigreeMat.emissiveIntensity = 0.05;

      if (frameMat) frameMat.color.set('#020203');
    } else {
      // SOVEREIGN / IGNIS TUNGSTEN (Signature deep blood-crimson pearloid)
      coreMat.map = texCrimson;
      coreMat.color.set('#FFFFFF');
      coreMat.emissive.set('#8B0015'); // Deep ruby blood, zero neon
      coreMat.emissiveIntensity = 0.08;
      coreMat.roughness = 0.18;
      coreMat.metalness = 0.4;
      coreMat.needsUpdate = true;

      filigreeMat.color.set('#D8D8DC'); // Crisp brushed rhodium silver
      filigreeMat.roughness = 0.09;
      filigreeMat.metalness = 1.0;
      filigreeMat.emissive.set('#000000');
      filigreeMat.emissiveIntensity = 0.0;

      if (frameMat) frameMat.color.set('#060709');
    }
  }, [activeEdition, texCrimson, texEclipse, texAether]);

  // Frame update: Strict Single-Axis Spin + Docking Scale & Coordinates
  useFrame((state) => {
    if (!outerGroupRef.current || !innerSpinRef.current) return;

    const isMobile = window.innerWidth < 1024;

    if (scrollProgress <= 0.14) {
      // -------------------------------------------------------------------
      // HERO PHASE (scroll = 0% – 14%): Bold Large Macro View of the Ring (scale: 1.55)
      // -------------------------------------------------------------------
      const targetScale = isMobile ? 1.25 : 1.55;
      const targetX = 0;
      const targetY = isMobile ? -0.12 : 0;
      const targetZ = 0;

      outerGroupRef.current.position.x = THREE.MathUtils.lerp(outerGroupRef.current.position.x, targetX, 0.1);
      outerGroupRef.current.position.y = THREE.MathUtils.lerp(outerGroupRef.current.position.y, targetY, 0.1);
      outerGroupRef.current.position.z = THREE.MathUtils.lerp(outerGroupRef.current.position.z, targetZ, 0.1);
      outerGroupRef.current.scale.setScalar(THREE.MathUtils.lerp(outerGroupRef.current.scale.x, targetScale, 0.1));

      // Fixed subtle hero tilt that stays calm and consistent: [0.32, 0, -0.15]
      outerGroupRef.current.rotation.set(0.32, 0, -0.15);

      // Spin ONLY on its single local axis (rotation.y) + subtle idle drift + user drag
      const idleSpin = state.clock.elapsedTime * 0.18;
      const targetRotY = idleSpin + (userRotation?.x || 0) * 1.5;

      innerSpinRef.current.rotation.y = THREE.MathUtils.lerp(innerSpinRef.current.rotation.y, targetRotY, 0.1);
      innerSpinRef.current.rotation.x = 0;
      innerSpinRef.current.rotation.z = 0;
    } else {
      // -------------------------------------------------------------------
      // LEFT-RAIL SCROLL DIAL PHASE (scroll > 14%):
      // Docks to left rail (scale = 0.52, X = -2.2 on desktop)
      // -------------------------------------------------------------------
      const dockProgress = THREE.MathUtils.clamp((scrollProgress - 0.14) / 0.10, 0, 1);
      const easeDock = 1 - Math.pow(1 - dockProgress, 3);

      const targetX = isMobile ? 0 : THREE.MathUtils.lerp(0, -2.2, easeDock);
      const targetY = isMobile ? 1.3 : 0;
      const targetZ = 0;
      const targetScale = isMobile
        ? THREE.MathUtils.lerp(1.25, 0.40, easeDock)
        : THREE.MathUtils.lerp(1.55, 0.52, easeDock);

      outerGroupRef.current.position.x = THREE.MathUtils.lerp(outerGroupRef.current.position.x, targetX, 0.1);
      outerGroupRef.current.position.y = THREE.MathUtils.lerp(outerGroupRef.current.position.y, targetY, 0.1);
      outerGroupRef.current.position.z = THREE.MathUtils.lerp(outerGroupRef.current.position.z, targetZ, 0.1);
      outerGroupRef.current.scale.setScalar(THREE.MathUtils.lerp(outerGroupRef.current.scale.x, targetScale, 0.1));

      // Outer tilt stays completely locked at [0.32, 0, -0.15]
      outerGroupRef.current.rotation.set(0.32, 0, -0.15);

      // Inner spin: Spin ONLY on its single local axis mapped smoothly to scroll progress + subtle idle drift
      const scrollSpin = ((scrollProgress - 0.14) / 0.86) * Math.PI * 5.0;
      const idleDrift = state.clock.elapsedTime * 0.08;
      const targetRotY = scrollSpin + idleDrift + (userRotation?.x || 0) * 1.5;

      innerSpinRef.current.rotation.y = THREE.MathUtils.lerp(innerSpinRef.current.rotation.y, targetRotY, 0.12);
      innerSpinRef.current.rotation.x = 0;
      innerSpinRef.current.rotation.z = 0;
    }
  });

  return (
    <group ref={outerGroupRef} rotation={[0.32, 0, -0.15]} position={[0, 0, 0]} scale={1.55}>
      <group ref={innerSpinRef}>
        <primitive object={clonedScene} scale={0.01} />
      </group>
    </group>
  );
}
