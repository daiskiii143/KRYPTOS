import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

// The headline characters to peel off and lock into editorial positions
const HEADLINE_LINE_1 = "FORGED IN SHADOW.";
const HEADLINE_LINE_2 = "WORN IN LIGHT.";

export default function FlyingGlyphs({ scrollProgress = 0, ringRotation = [0, 0, 0] }) {
  const groupRef = useRef();

  // Pre-calculate origin positions on the ring perimeter and target editorial positions in 3D
  const letterNodes = useMemo(() => {
    const nodes = [];

    // Line 1: "FORGED IN SHADOW."
    const chars1 = HEADLINE_LINE_1.split('');
    const totalW1 = chars1.length * 0.18;
    const startX1 = -totalW1 / 2;

    chars1.forEach((char, idx) => {
      if (char === ' ') return; // Skip spaces for 3D meshes
      // Angle on ring perimeter (radius 1.00m)
      const ringAngle = (idx / chars1.length) * Math.PI * 2.0;
      const ringZ = ((idx % 3) - 1) * 0.08;
      
      // Target position in editorial space
      const targetX = startX1 + idx * 0.18 + 0.09;
      const targetY = 0.55;
      const targetZ = 0.2;

      // Arc peak trajectory control point
      const midAngle = ringAngle + 0.6;
      const arcRadius = 2.4 + (idx % 4) * 0.3;
      const arcMid = [
        Math.cos(midAngle) * arcRadius,
        Math.sin(midAngle) * arcRadius * 0.6 + 0.3,
        1.5 + (idx % 3) * 0.5
      ];

      nodes.push({
        char,
        ringAngle,
        ringZ,
        target: [targetX, targetY, targetZ],
        arcMid,
        delay: (idx / (chars1.length + 14)) * 0.25, // Staggered peel-off
        fontSize: 0.14
      });
    });

    // Line 2: "WORN IN LIGHT."
    const chars2 = HEADLINE_LINE_2.split('');
    const totalW2 = chars2.length * 0.18;
    const startX2 = -totalW2 / 2;

    chars2.forEach((char, idx) => {
      if (char === ' ') return;
      const ringAngle = (idx / chars2.length) * Math.PI * 2.0 + Math.PI * 0.5;
      const ringZ = ((idx % 3) - 1) * 0.08;

      const targetX = startX2 + idx * 0.18 + 0.09;
      const targetY = 0.32;
      const targetZ = 0.2;

      const midAngle = ringAngle - 0.5;
      const arcRadius = 2.6 + (idx % 3) * 0.4;
      const arcMid = [
        Math.cos(midAngle) * arcRadius,
        Math.sin(midAngle) * arcRadius * 0.6 - 0.2,
        1.8 + (idx % 2) * 0.6
      ];

      nodes.push({
        char,
        ringAngle,
        ringZ,
        target: [targetX, targetY, targetZ],
        arcMid,
        delay: 0.15 + (idx / (chars2.length + 17)) * 0.25,
        fontSize: 0.14
      });
    });

    return nodes;
  }, []);

  // Ambient floating rune sparks peeling off
  const sparkParticles = useMemo(() => {
    const sparks = [];
    for (let i = 0; i < 24; i++) {
      const angle = (i / 24) * Math.PI * 2;
      sparks.push({
        angle,
        speed: 0.8 + Math.random() * 1.2,
        radius: 1.02 + Math.random() * 0.15,
        z: (Math.random() - 0.5) * 0.3,
        glyph: ['ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚱ', 'ᚲ', 'ᚷ', 'ᚹ', 'ᚺ', 'ᚾ', 'ᛁ', 'ᛃ'][i % 12]
      });
    }
    return sparks;
  }, []);

  const letterRefs = useRef([]);
  const sparkRefs = useRef([]);

  useFrame((state) => {
    // Scroll progress normalized for Act 1: 0% -> 35%
    const act1Progress = THREE.MathUtils.clamp((scrollProgress - 0.02) / 0.33, 0, 1);
    const ringRotY = ringRotation[1] || 0;
    const ringRotX = ringRotation[0] || 0;
    const ringRotZ = ringRotation[2] || 0;

    letterNodes.forEach((node, i) => {
      const mesh = letterRefs.current[i];
      if (!mesh) return;

      // Local letter progress with individual stagger delay
      const p = THREE.MathUtils.clamp((act1Progress - node.delay) / (1 - node.delay), 0, 1);
      // Smooth cubic ease out
      const easeP = 1 - Math.pow(1 - p, 3);

      if (easeP <= 0.001) {
        // Seated on the ring's outer perimeter (spinning with it)
        const currentAngle = node.ringAngle + ringRotY;
        const x = Math.cos(currentAngle) * 1.00;
        const y = Math.sin(currentAngle) * 1.00;
        const z = node.ringZ;

        // Apply ring tilt transform roughly
        mesh.position.set(x, y * Math.cos(ringRotX) - z * Math.sin(ringRotX), y * Math.sin(ringRotX) + z * Math.cos(ringRotX));
        mesh.scale.setScalar(0.01);
        mesh.material.opacity = 0.0;
      } else if (easeP >= 0.999) {
        // Fully locked into editorial position
        mesh.position.set(...node.target);
        mesh.rotation.set(0, 0, 0);
        mesh.scale.setScalar(1.0);
        mesh.material.opacity = 1.0;
        mesh.material.color.set('#F5F5F7');
        mesh.material.emissive.set('#FF1E38');
        mesh.material.emissiveIntensity = 0.15;
      } else {
        // Flying along 3D Bezier curve from ring to target
        // P0: current ring surface point
        const currentAngle = node.ringAngle + ringRotY * (1 - easeP);
        const p0x = Math.cos(currentAngle) * 1.00;
        const p0y = Math.sin(currentAngle) * 1.00;
        const p0z = node.ringZ;

        const p1x = node.arcMid[0];
        const p1y = node.arcMid[1];
        const p1z = node.arcMid[2];

        const p2x = node.target[0];
        const p2y = node.target[1];
        const p2z = node.target[2];

        // Quadratic Bezier interpolation: B(t) = (1-t)^2 P0 + 2(1-t)t P1 + t^2 P2
        const oneMinus = 1 - easeP;
        const bx = oneMinus * oneMinus * p0x + 2 * oneMinus * easeP * p1x + easeP * easeP * p2x;
        const by = oneMinus * oneMinus * p0y + 2 * oneMinus * easeP * p1y + easeP * easeP * p2y;
        const bz = oneMinus * oneMinus * p0z + 2 * oneMinus * easeP * p1z + easeP * easeP * p2z;

        mesh.position.set(bx, by, bz);

        // Dynamic 3D tumble settling to flat orientation
        mesh.rotation.set(
          (1 - easeP) * Math.sin(i * 1.5 + state.clock.elapsedTime * 4.0) * 1.2,
          (1 - easeP) * Math.cos(i * 2.0 + state.clock.elapsedTime * 4.0) * 1.2,
          (1 - easeP) * Math.sin(i * 0.8) * 0.8
        );

        // Scale up and glow
        mesh.scale.setScalar(THREE.MathUtils.lerp(0.05, 1.0, easeP));
        mesh.material.opacity = THREE.MathUtils.clamp(easeP * 3.0, 0.2, 1.0);

        // Hot molten rune emissive transitioning to porcelain white
        const glowHeat = Math.sin(easeP * Math.PI) * 2.5;
        mesh.material.emissive.set('#FF1E38');
        mesh.material.emissiveIntensity = 0.3 + glowHeat;
        mesh.material.color.lerpColors(new THREE.Color('#FF3B56'), new THREE.Color('#F5F5F7'), easeP);
      }
    });

    // Animate ambient rune spark filaments peeling off
    sparkParticles.forEach((spark, i) => {
      const sparkMesh = sparkRefs.current[i];
      if (!sparkMesh) return;

      if (act1Progress > 0.05 && act1Progress < 0.95) {
        const spiralT = (state.clock.elapsedTime * spark.speed + i * 0.2) % 1.0;
        const r = spark.radius + spiralT * 1.8;
        const theta = spark.angle + ringRotY * 1.2 + spiralT * Math.PI * 1.5;
        sparkMesh.position.set(
          Math.cos(theta) * r,
          Math.sin(theta) * r * 0.7,
          spark.z + spiralT * 0.8
        );
        sparkMesh.scale.setScalar(THREE.MathUtils.lerp(0.08, 0.01, spiralT));
        sparkMesh.material.opacity = (1 - spiralT) * 0.8;
      } else {
        sparkMesh.scale.setScalar(0.001);
      }
    });
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Editorial Flying Characters */}
      {letterNodes.map((node, i) => (
        <Text
          key={i}
          ref={(el) => (letterRefs.current[i] = el)}
          fontSize={node.fontSize}
          anchorX="center"
          anchorY="middle"
          characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ."
        >
          {node.char}
          <meshStandardMaterial
            color="#F5F5F7"
            metalness={0.9}
            roughness={0.12}
            emissive="#FF1E38"
            emissiveIntensity={0.2}
            transparent
            opacity={0}
            toneMapped={false}
          />
        </Text>
      ))}

      {/* Sinuous rune sparks */}
      {sparkParticles.map((spark, i) => (
        <Text
          key={`spark-${i}`}
          ref={(el) => (sparkRefs.current[i] = el)}
          fontSize={0.06}
          anchorX="center"
          anchorY="middle"
        >
          {spark.glyph}
          <meshBasicMaterial
            color="#FF1E38"
            transparent
            opacity={0}
            toneMapped={false}
          />
        </Text>
      ))}
    </group>
  );
}
