import React from 'react';
import { Environment, Lightformer } from '@react-three/drei';

export default function StudioLighting({ edition = 'ignis' }) {
  // Accent color adapts subtly to active edition
  const accentLight = edition === 'eclipse' 
    ? '#71717A' 
    : edition === 'aether' 
    ? '#10B981' 
    : '#FF1E38';

  return (
    <>
      {/* Studio ambient fill */}
      <ambientLight intensity={0.4} color="#F5F5F7" />

      {/* Main Sharp Rim Key Light (Cool Silver highlight for tungsten chamfers) */}
      <directionalLight
        position={[4, 6, 4]}
        intensity={2.8}
        color="#F8FAFC"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.1}
        shadow-camera-far={20}
        shadow-normalBias={0.03}
      />

      {/* Fill Rim Light (Opposite side silhouette) */}
      <directionalLight
        position={[-5, -2, 3]}
        intensity={1.4}
        color="#E2E8F0"
      />

      {/* Dramatic Warm / Inlay Rim Accent Light */}
      <spotLight
        position={[2, -4, 2]}
        intensity={2.2}
        color={accentLight}
        angle={0.6}
        penumbra={0.8}
      />

      {/* Procedural High-End Studio Environment with Lightformers */}
      <Environment resolution={256}>
        {/* Overhead soft white linear strip for continuous glossy resin reflection */}
        <Lightformer
          form="rect"
          intensity={3.5}
          color="#FFFFFF"
          scale={[10, 1.2, 1]}
          position={[0, 5, 2]}
          rotation={[Math.PI / 4, 0, 0]}
        />

        {/* Crisp cool-silver side reflection card */}
        <Lightformer
          form="rect"
          intensity={2.0}
          color="#E2E8F0"
          scale={[6, 2, 1]}
          position={[5, 0, -2]}
          rotation={[0, -Math.PI / 3, 0]}
        />

        {/* Warm crimson / edition-accent bottom rim reflector */}
        <Lightformer
          form="ring"
          intensity={3.0}
          color={accentLight}
          scale={4}
          position={[-3, -4, 2]}
          rotation={[Math.PI / 3, 0, 0]}
        />

        {/* Dark studio negative fill to prevent washing out deep obsidian metal */}
        <Lightformer
          form="rect"
          intensity={0.2}
          color="#050507"
          scale={[15, 15, 1]}
          position={[0, 0, -8]}
        />
      </Environment>
    </>
  );
}
