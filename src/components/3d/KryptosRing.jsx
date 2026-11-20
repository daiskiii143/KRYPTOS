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
  const groupRef = useRef();

  // Load the GLTF model
  const { scene } = useGLTF('/models/kryptos-ring.glb');

  // Load textures for the 3 editions
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

    if (activeEdition === 'eclipse') {
      // 02 / ECLIPSE OBSIDIAN (Monochromatic stealth carbon)
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
      // 03 / AETHER EMERALD (Deep imperial emerald relic)
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
    } else {
      // 01 / IGNIS TUNGSTEN (Signature deep blood-crimson pearloid)
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

  // Frame update: Left-Rail Docking & Precision Scroll Dial Rotation
  useFrame((state) => {
    if (!groupRef.current) return;

    // Detect responsive viewport width
    const isMobile = window.innerWidth < 1024;

    if (scrollProgress <= 0.12) {
      // -------------------------------------------------------------------
      // HERO PHASE (scroll = 0% – 12%): Centered Macro View of the Ring
      // -------------------------------------------------------------------
      const targetScale = isMobile ? 0.85 : 1.08;
      const targetX = 0;
      const targetY = isMobile ? -0.1 : 0;
      const targetZ = 0;

      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.1);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.1);
      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, 0.1);
      groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.1));

      // Gentle luxury turntable idle + user rotation
      const idleSpin = state.clock.elapsedTime * 0.15;
      const targetRotX = -0.75 + (userRotation?.y || 0) * 0.8;
      const targetRotY = idleSpin + (userRotation?.x || 0) * 1.5;
      const targetRotZ = -0.32;

      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.1);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.1);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRotZ, 0.1);
    } else {
      // -------------------------------------------------------------------
      // LEFT-RAIL SCROLL DIAL PHASE (scroll > 12%):
      // Smoothly docks to Left Rail (X = -2.15, Y = 0) and scales to 0.46
      // Continuously rotates mapped 1:1 to document scroll progress
      // -------------------------------------------------------------------
      const dockProgress = THREE.MathUtils.clamp((scrollProgress - 0.12) / 0.10, 0, 1);
      const easeDock = 1 - Math.pow(1 - dockProgress, 3);

      const railX = isMobile ? 0 : -state.viewport.width * 0.32;
      const dockedX = railX;
      const dockedY = isMobile ? 1.4 : 0;
      const dockedScale = isMobile ? 0.36 : Math.min(0.46, state.viewport.width * 0.10);

      const targetX = THREE.MathUtils.lerp(0, dockedX, easeDock);
      const targetY = THREE.MathUtils.lerp(0, dockedY, easeDock);
      const targetZ = THREE.MathUtils.lerp(0, 0.25, easeDock);
      const targetScale = THREE.MathUtils.lerp(1.08, dockedScale, easeDock);

      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.1);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.1);
      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, 0.1);
      groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.1));

      // Precision scroll dial rotation: maps continuous 360° rotation across the scroll range
      // plus user manual drag adjustment
      const dialSpin = ((scrollProgress - 0.12) / 0.88) * Math.PI * 4.0;
      const targetRotX = -0.65 + (userRotation?.y || 0) * 0.8;
      const targetRotY = dialSpin + (userRotation?.x || 0) * 1.5;
      const targetRotZ = -0.22;

      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.12);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.15);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRotZ, 0.12);
    }
  });

  return (
    <primitive
      ref={groupRef}
      object={clonedScene}
      scale={0.01}
      position={[0, 0, 0]}
    />
  );
}
