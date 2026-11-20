import React from 'react';
import { Environment, Lightformer } from '@react-three/drei';

export default function StudioLighting() {
  return (
    <>
      {/* Soft neutral ambient fill */}
      <ambientLight intensity={0.35} color="#F8FAFC" />

      {/* Main Sharp Studio Key Light (Cool Silver highlight) */}
      <directionalLight
        position={[3, 5, 4]}
        intensity={2.4}
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
        intensity={1.0}
        color="#E2E8F0"
      />

      {/* High-Precision Luxury Studio Environment */}
      <Environment resolution={256}>
        {/* Overhead soft white linear strip for continuous glossy clear resin reflection */}
        <Lightformer
          form="rect"
          intensity={2.8}
          color="#FFFFFF"
          scale={[12, 1.2, 1]}
          position={[0, 4.5, 2]}
          rotation={[Math.PI / 4, 0, 0]}
        />

        {/* 1. Left Narrow Cool-White Edge Reflector (Cuts razor-crisp 45° chamfer highlight) */}
        <Lightformer
          form="rect"
          intensity={3.6}
          color="#F8FAFC"
          scale={[0.4, 9, 1]}
          position={[-3.6, 0, 1.2]}
          rotation={[0, Math.PI / 4, 0]}
        />

        {/* 2. Right Narrow Cool-White Edge Reflector (Cuts opposing 45° chamfer highlight) */}
        <Lightformer
          form="rect"
          intensity={3.6}
          color="#F8FAFC"
          scale={[0.4, 9, 1]}
          position={[3.6, 0, 1.2]}
          rotation={[0, -Math.PI / 4, 0]}
        />

        {/* Front-facing soft fill card */}
        <Lightformer
          form="rect"
          intensity={1.0}
          color="#E2E8F0"
          scale={[6, 3, 1]}
          position={[0, -2, 4]}
        />

        {/* Dark studio negative fill to keep obsidian metal deep and scratch-contrast high */}
        <Lightformer
          form="rect"
          intensity={0.1}
          color="#050507"
          scale={[20, 20, 1]}
          position={[0, 0, -8]}
        />
      </Environment>
    </>
  );
}
