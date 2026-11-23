import React, { useRef, useMemo, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Configure local Draco decoder path with Vite base path
useGLTF.setDecoderPath(`${import.meta.env.BASE_URL}draco/`);

// Dedicated Flagship Model Path: The Sovereign (Keeps GPU memory minimal & initial load instant)
const SOVEREIGN_MODEL_PATH = `${import.meta.env.BASE_URL}models/kryptos-ring.glb`;
try {
  useGLTF.preload(SOVEREIGN_MODEL_PATH);
} catch (e) {
  // ignore
}

function SovereignGeometry() {
  const { scene } = useGLTF(SOVEREIGN_MODEL_PATH);

  const normalizedScene = useMemo(() => {
    const clone = scene.clone(true);

    // Reset baked rotation on root node so ring lies flat
    clone.traverse(o => { if (/Root$/.test(o.name)) o.quaternion.identity(); });

    // Compute exact bounding box of the cloned geometry
    const box = new THREE.Box3().setFromObject(clone);
    const center = new THREE.Vector3();
    const size = new THREE.Vector3();
    box.getCenter(center);
    box.getSize(size);

    // Auto-normalize scale so max dimension is exactly 1.0 unit
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = maxDim > 0 ? 1.0 / maxDim : 1.0;
    clone.scale.set(scale, scale, scale);

    // Center cloned geometry cleanly at (0, 0, 0) taking scale factor into account
    clone.position.copy(center).multiplyScalar(-scale);

    // Material enhancement for web luxury PBR
    clone.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        if (child.material) {
          child.material = child.material.clone();
          child.material.needsUpdate = true;

          const name = child.name.toLowerCase();

          // Gemstones & Optical Resins
          if (
            name.includes('resin') ||
            name.includes('gem') ||
            name.includes('crystal') ||
            name.includes('garnet') ||
            name.includes('emerald') ||
            name.includes('pave')
          ) {
            child.material.transparent = true;
            if (!child.material.transmission || child.material.transmission < 0.5) {
              child.material.transmission = 0.92;
            }
            child.material.roughness = Math.min(child.material.roughness || 0.05, 0.08);
            child.material.ior = child.material.ior || 1.6;
            child.material.depthWrite = true;
          }

          // Polished dark metals
          if (
            name.includes('tungsten') ||
            name.includes('frame') ||
            name.includes('chrome') ||
            name.includes('coil') ||
            name.includes('rhodium')
          ) {
            child.material.metalness = Math.max(child.material.metalness || 0.8, 0.95);
            child.material.roughness = Math.min(child.material.roughness || 0.1, 0.08);
          }
        }
      }
    });

    return clone;
  }, [scene]);

  return <primitive object={normalizedScene} />;
}

export default function KryptosRing({
  scrollProgress = 0,
  userRotation = { x: 0, y: 0 }
}) {
  const outerGroupRef = useRef();
  const innerSpinRef = useRef();

  // Frame update: Strict Single-Axis Spin + Auto-Normalized Scale & Coordinates
  // Zero-Heat Optimization: Pause when tab is hidden
  useFrame((state) => {
    if (typeof document !== 'undefined' && document.hidden) return;
    if (!outerGroupRef.current || !innerSpinRef.current) return;

    const isMobile = window.innerWidth < 1024;

    if (scrollProgress <= 0.12) {
      // -------------------------------------------------------------------
      // HERO PHASE (scroll = 0% – 12%): Bold, commanding centerpiece
      // targetScale = 2.55 (exact 2.55 world units wide)
      // -------------------------------------------------------------------
      const heroScaleMult = isMobile ? 2.10 : 2.55;
      const targetScale = heroScaleMult;
      const targetX = 0;
      const targetY = isMobile ? -0.10 : 0;
      const targetZ = 0;

      outerGroupRef.current.position.x = THREE.MathUtils.lerp(
        outerGroupRef.current.position.x,
        targetX,
        0.1
      );
      outerGroupRef.current.position.y = THREE.MathUtils.lerp(
        outerGroupRef.current.position.y,
        targetY,
        0.1
      );
      outerGroupRef.current.position.z = THREE.MathUtils.lerp(
        outerGroupRef.current.position.z,
        targetZ,
        0.1
      );
      outerGroupRef.current.scale.setScalar(
        THREE.MathUtils.lerp(outerGroupRef.current.scale.x, targetScale, 0.1)
      );

      // Fixed subtle hero tilt: rotation={[0.92, 0, -0.15]}
      outerGroupRef.current.rotation.set(0.92, 0, -0.15);

      // Spin ONLY on its single local axis (rotation.y) + subtle idle drift + user drag
      const idleSpin = state.clock.elapsedTime * 0.18;
      const targetRotY = idleSpin + (userRotation?.x || 0) * 1.5;

      innerSpinRef.current.rotation.y = THREE.MathUtils.lerp(
        innerSpinRef.current.rotation.y,
        targetRotY,
        0.1
      );
      innerSpinRef.current.rotation.x = 0;
      innerSpinRef.current.rotation.z = 0;
    } else {
      // -------------------------------------------------------------------
      // LEFT-RAIL SCROLL DIAL PHASE (scroll > 12%):
      // Docks to left rail (targetScale = 1.35 at X = -1.85, Y = 0)
      // -------------------------------------------------------------------
      const dockProgress = THREE.MathUtils.clamp(
        (scrollProgress - 0.12) / 0.10,
        0,
        1
      );
      const easeDock = 1 - Math.pow(1 - dockProgress, 3);

      const targetX = isMobile ? 0 : THREE.MathUtils.lerp(0, -1.85, easeDock);
      const targetY = isMobile ? 1.2 : 0;
      const targetZ = 0;
      const dockedScaleMult = isMobile ? 1.05 : 1.35;
      const heroScaleMult = isMobile ? 2.10 : 2.55;
      const currentScaleMult = THREE.MathUtils.lerp(
        heroScaleMult,
        dockedScaleMult,
        easeDock
      );
      const targetScale = currentScaleMult;

      outerGroupRef.current.position.x = THREE.MathUtils.lerp(
        outerGroupRef.current.position.x,
        targetX,
        0.1
      );
      outerGroupRef.current.position.y = THREE.MathUtils.lerp(
        outerGroupRef.current.position.y,
        targetY,
        0.1
      );
      outerGroupRef.current.position.z = THREE.MathUtils.lerp(
        outerGroupRef.current.position.z,
        targetZ,
        0.1
      );
      outerGroupRef.current.scale.setScalar(
        THREE.MathUtils.lerp(outerGroupRef.current.scale.x, targetScale, 0.1)
      );

      // Outer tilt stays completely locked at [0.92, 0, -0.15]
      outerGroupRef.current.rotation.set(0.92, 0, -0.15);

      // Inner spin: Spin ONLY on its single local axis mapped smoothly to scroll progress + subtle idle drift
      const scrollSpin =
        ((scrollProgress - 0.12) / 0.88) * Math.PI * 5.0;
      const idleDrift = state.clock.elapsedTime * 0.08;
      const targetRotY = scrollSpin + idleDrift + (userRotation?.x || 0) * 1.5;

      innerSpinRef.current.rotation.y = THREE.MathUtils.lerp(
        innerSpinRef.current.rotation.y,
        targetRotY,
        0.12
      );
      innerSpinRef.current.rotation.x = 0;
      innerSpinRef.current.rotation.z = 0;
    }
  });

  return (
    <group
      ref={outerGroupRef}
      rotation={[0.92, 0, -0.15]}
      position={[0, 0, 0]}
      scale={1}
    >
      <group ref={innerSpinRef}>
        <Suspense fallback={null}>
          <SovereignGeometry />
        </Suspense>
      </group>
    </group>
  );
}
