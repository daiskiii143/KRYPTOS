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
        camera={{ position: [0, 0, 5.2], fov: 38 }}
        gl={{
          powerPreference: 'high-performance',
          antialias: true,
          stencil: false,
          alpha: true,
          toneMappingExposure: 1.15
        }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <StudioLighting activeEdition={activeEdition} />
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
