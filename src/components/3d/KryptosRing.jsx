import React, { useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useTexture } from '@react-three/drei';
import * as THREE from 'three';

// Configure local Draco decoder path
useGLTF.setDecoderPath('/draco/');

export default function KryptosRing({
  scrollProgress = 0,
  activeEdition = 'ignis',
  isConfiguring = false,
  userRotation = { x: 0, y: 0 },
  customEngraving = '',
  onRotationChange
}) {
  const groupRef = useRef();
  const lastScroll = useRef(0);
  const scrollVelocity = useRef(0);

  // Load the GLTF model
  const { scene } = useGLTF('/models/kryptos-ring.glb');

  // Load textures for the 3 editions
  const [texCrimson, texEclipse, texAether] = useTexture([
    '/models/Tex_CrimsonPearloid.png',
    '/models/Tex_EclipseObsidian.png',
    '/models/Tex_AetherEmerald.png'
  ]);

  useMemo(() => {
    [texCrimson, texEclipse, texAether].forEach(tex => {
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

  // Initialize and isolate materials for runtime animation
  useEffect(() => {
    clonedScene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        // Clone material so instances don't cross-contaminate
        if (child.material) {
          child.material = child.material.clone();
          materialsRef.current[child.name] = child.material;
        }

        // Identify parts
        if (child.name.includes('ResinOvercoat')) {
          child.material.transmission = 0.98;
          child.material.roughness = 0.015;
          child.material.ior = 1.54;
          child.material.transparent = true;
          child.material.depthWrite = false;
        } else if (child.name.includes('TungstenFrame')) {
          child.material.metalness = 1.0;
          child.material.roughness = 0.06;
          child.material.color.set('#07080A');
        } else if (child.name.includes('FiligreeRelief')) {
          child.material.metalness = 1.0;
          child.material.roughness = 0.08;
        }
      }
    });
  }, [clonedScene]);

  // Update materials when activeEdition changes
  useEffect(() => {
    const coreMat = materialsRef.current['Ring_CrimsonCore'];
    const filigreeMat = materialsRef.current['Ring_FiligreeRelief'];
    const frameMat = materialsRef.current['Ring_TungstenFrame'];

    if (!coreMat || !filigreeMat) return;

    if (activeEdition === 'eclipse') {
      // 02 / ECLIPSE OBSIDIAN
      coreMat.map = texEclipse;
      coreMat.color.set('#FFFFFF');
      coreMat.emissive.set('#52525B');
      coreMat.emissiveIntensity = 0.1;
      coreMat.roughness = 0.30;
      coreMat.needsUpdate = true;

      filigreeMat.color.set('#71717A');
      filigreeMat.roughness = 0.16;
      filigreeMat.emissive.set('#3F3F46');
      filigreeMat.emissiveIntensity = 0.05;

      if (frameMat) frameMat.color.set('#050507');
    } else if (activeEdition === 'aether') {
      // 03 / AETHER EMERALD
      coreMat.map = texAether;
      coreMat.color.set('#FFFFFF');
      coreMat.emissive.set('#059669');
      coreMat.emissiveIntensity = 0.25;
      coreMat.roughness = 0.22;
      coreMat.needsUpdate = true;

      filigreeMat.color.set('#E4E4E7');
      filigreeMat.roughness = 0.10;
      filigreeMat.emissive.set('#10B981');
      filigreeMat.emissiveIntensity = 0.15;

      if (frameMat) frameMat.color.set('#090A0D');
    } else {
      // 01 / IGNIS TUNGSTEN (Default signature)
      coreMat.map = texCrimson;
      coreMat.color.set('#FFFFFF');
      coreMat.emissive.set('#FF1E38');
      coreMat.emissiveIntensity = 0.25;
      coreMat.roughness = 0.20;
      coreMat.needsUpdate = true;

      filigreeMat.color.set('#D4D4D8');
      filigreeMat.roughness = 0.08;
      filigreeMat.emissive.set('#FF1E38');
      filigreeMat.emissiveIntensity = 0.20;

      if (frameMat) frameMat.color.set('#07080A');
    }
  }, [activeEdition, texCrimson, texEclipse, texAether]);

  // Frame update: scroll rotation, velocity-based texture ignition, user drag
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Calculate scroll velocity
    const currentScroll = scrollProgress;
    const diff = (currentScroll - lastScroll.current) / Math.max(delta, 0.001);
    lastScroll.current = currentScroll;
    scrollVelocity.current = THREE.MathUtils.lerp(scrollVelocity.current, Math.abs(diff), 0.1);

    const speed = scrollVelocity.current;

    // 1. Texture Ignition Shader Effect: Emissive pulse driven by scroll speed + traveling wave
    const filigreeMat = materialsRef.current['Ring_FiligreeRelief'];
    const coreMat = materialsRef.current['Ring_CrimsonCore'];

    if (filigreeMat && coreMat) {
      const timeWave = Math.sin(state.clock.elapsedTime * 6.0 + groupRef.current.rotation.y * 3.0) * 0.5 + 0.5;
      // Surge emissive power during fast spin
      const ignitionStrength = Math.min(speed * 3.5 + timeWave * 0.6, 4.5);

      if (activeEdition === 'ignis') {
        filigreeMat.emissiveIntensity = 0.2 + ignitionStrength * 1.2;
        coreMat.emissiveIntensity = 0.25 + ignitionStrength * 0.9;
      } else if (activeEdition === 'aether') {
        filigreeMat.emissiveIntensity = 0.15 + ignitionStrength * 1.0;
        coreMat.emissiveIntensity = 0.2 + ignitionStrength * 0.8;
      } else {
        filigreeMat.emissiveIntensity = 0.05 + ignitionStrength * 0.5;
        coreMat.emissiveIntensity = 0.1 + ignitionStrength * 0.4;
      }
    }

    // 2. Transform & Orbital Spin
    if (scrollProgress < 0.38) {
      // Act 0 & Act 1: Dramatic opening reveal & spin acceleration
      // Smooth reveal entrance at scroll = 0
      const introProgress = Math.min(state.clock.elapsedTime / 1.2, 1.0);
      const easeIntro = 1 - Math.pow(1 - introProgress, 3);

      // Orbital spin accelerates with scroll
      const spinAngle = scrollProgress * Math.PI * 14.0;
      const targetRotY = spinAngle + state.clock.elapsedTime * 0.15;
      const targetRotX = THREE.MathUtils.lerp(-0.95, -0.65, scrollProgress * 2.5);
      const targetRotZ = THREE.MathUtils.lerp(-0.45, 0.25, scrollProgress * 2.5);

      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.1);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.15);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRotZ, 0.1);

      // Ring scale: start slightly smaller in dark and expand into hero presence
      const targetScale = easeIntro * 1.15;
      groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.1));

      // Floating gentle bobbing
      const bob = Math.sin(state.clock.elapsedTime * 1.5) * 0.04;
      groupRef.current.position.set(0, bob, 0);

      if (onRotationChange) {
        onRotationChange([groupRef.current.rotation.x, groupRef.current.rotation.y, groupRef.current.rotation.z]);
      }
    } else {
      // Act 2: Atelier Studio Mode & Interactive 3D Configurator
      // Position shifts slightly right/center for editorial side-by-side
      const studioProgress = THREE.MathUtils.clamp((scrollProgress - 0.38) / 0.2, 0, 1);
      
      const targetPosX = THREE.MathUtils.lerp(0, 0.65, studioProgress);
      const targetPosY = THREE.MathUtils.lerp(0, 0.05, studioProgress);
      const targetPosZ = THREE.MathUtils.lerp(0, 0.2, studioProgress);

      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetPosX, 0.08);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetPosY, 0.08);
      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetPosZ, 0.08);

      // Allow interactive drag rotation or gentle luxury turntable idle
      const idleSpin = state.clock.elapsedTime * 0.2;
      const targetRotX = -0.75 + (userRotation?.y || 0) * 0.8;
      const targetRotY = idleSpin + (userRotation?.x || 0) * 1.5;

      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.1);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.1);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, -0.3, 0.1);

      groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, 1.1, 0.08));

      if (onRotationChange) {
        onRotationChange([groupRef.current.rotation.x, groupRef.current.rotation.y, groupRef.current.rotation.z]);
      }
    }
  });

  return (
    <primitive
      ref={groupRef}
      object={clonedScene}
      scale={0.01} // Initialized small for dark reveal intro
      position={[0, 0, 0]}
    />
  );
}
