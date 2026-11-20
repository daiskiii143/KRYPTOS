import React from 'react';
import { Environment, Lightformer } from '@react-three/drei';

export default function StudioLighting({ activeEdition = 'sovereign' }) {
  // Determine accent rim color based on active edition
  const isEmerald = activeEdition === 'aether';
  const isEclipse = activeEdition === 'eclipse' || activeEdition === 'chronos';
  
  const accentRimColor = isEmerald ? '#10B981' : isEclipse ? '#CBD5E1' : '#DC2626';
  const accentRimDeep = isEmerald ? '#047857' : isEclipse ? '#64748B' : '#8B0015';

  return (
    <>
      {/* Soft neutral ambient fill */}
      <ambientLight intensity={0.4} color="#F8FAFC" />

      {/* Main Sharp Studio Key Light (Cool Silver highlight) */}
      <directionalLight
        position={[3, 5, 4]}
        intensity={2.8}
        color="#FFFFFF"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.1}
        shadow-camera-far={20}
        shadow-normalBias={0.03}
      />

      {/* Subtle fill on opposing rim */}
      <directionalLight
        position={[-4, -1, 3]}
        intensity={1.4}
        color="#E2E8F0"
      />

      {/* High-Precision Luxury Studio Procedural Environment */}
      <Environment resolution={256}>
        {/* Overhead soft white linear strip for continuous glossy clear resin reflection */}
        <Lightformer
          form="rect"
          intensity={3.2}
          color="#FFFFFF"
          scale={[14, 1.4, 1]}
          position={[0, 4.5, 2]}
          rotation={[Math.PI / 4, 0, 0]}
        />

        {/* 1. Left Narrow Cool-White / Silver Edge Reflector (Cuts razor-crisp 45° chamfer highlight) */}
        <Lightformer
          form="rect"
          intensity={4.2}
          color="#F8FAFC"
          scale={[0.5, 10, 1]}
          position={[-3.8, 0, 1.2]}
          rotation={[0, Math.PI / 4, 0]}
        />

        {/* 2. Right Narrow Cool-White / Silver Edge Reflector (Cuts opposing 45° chamfer highlight) */}
        <Lightformer
          form="rect"
          intensity={4.2}
          color="#F8FAFC"
          scale={[0.5, 10, 1]}
          position={[3.8, 0, 1.2]}
          rotation={[0, -Math.PI / 4, 0]}
        />

        {/* 3. Warm Crimson Signature Rim Reflector 1 (Back left edge) */}
        <Lightformer
          form="rect"
          intensity={3.6}
          color={accentRimColor}
          scale={[1.2, 8, 1]}
          position={[-2.8, 2.5, -2.5]}
          rotation={[0, Math.PI / 3, 0]}
        />

        {/* 4. Warm Crimson Signature Rim Reflector 2 (Back bottom right edge) */}
        <Lightformer
          form="rect"
          intensity={3.0}
          color={accentRimDeep}
          scale={[1.0, 6, 1]}
          position={[2.8, -2.2, -2.0]}
          rotation={[0, -Math.PI / 3, 0]}
        />

        {/* Front-facing soft fill card */}
        <Lightformer
          form="rect"
          intensity={1.2}
          color="#E2E8F0"
          scale={[7, 3.5, 1]}
          position={[0, -2, 4]}
        />

        {/* Dark studio negative fill to keep obsidian metal deep and scratch-contrast high */}
        <Lightformer
          form="rect"
          intensity={0.1}
          color="#050507"
          scale={[25, 25, 1]}
          position={[0, 0, -8]}
        />
      </Environment>
    </>
  );
}
