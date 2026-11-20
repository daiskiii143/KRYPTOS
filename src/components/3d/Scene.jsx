import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import StudioLighting from './StudioLighting';
import KryptosRing from './KryptosRing';

export default function Scene({
  scrollProgress = 0,
  activeEdition = 'ignis',
  userRotation = { x: 0, y: 0 }
}) {
  return (
    <div className="fixed inset-0 pointer-events-none z-10 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 4.4], fov: 42 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMappingExposure: 1.15
        }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <StudioLighting />
          <KryptosRing
            scrollProgress={scrollProgress}
            activeEdition={activeEdition}
            userRotation={userRotation}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
