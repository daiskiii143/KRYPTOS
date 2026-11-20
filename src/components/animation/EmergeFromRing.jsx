import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

/**
 * EmergeFromRing
 * Signature scroll-driven animation: As each element enters the viewport,
 * it originates from the docked left-rail ring's screen coordinates (compressed & blurred),
 * arcs smoothly rightward into the page layout, and locks crisply into its final position.
 * Scrolling back up smoothly pulls elements back toward the ring.
 */
export default function EmergeFromRing({
  children,
  className = '',
  originX = -260,
  originY = 30,
  rotation = -2.5,
  blur = 6,
  springConfig = { stiffness: 90, damping: 20, mass: 0.7 }
}) {
  const containerRef = useRef(null);

  // Track scroll position of this element entering the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start 0.70']
  });

  // Physics spring smoothing for tactile momentum
  const smoothProgress = useSpring(scrollYProgress, springConfig);

  // Transforms: from compressed inside ring to full editorial slot
  const scale = useTransform(smoothProgress, [0, 1], [0.25, 1]);
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.9, 1], [0.05, 0.65, 1, 1]);
  
  // Responsive translation arc: originates from docked left-rail ring coordinates
  const x = useTransform(smoothProgress, [0, 0.45, 1], [originX, originX * 0.2, 0]);
  const y = useTransform(smoothProgress, [0, 0.5, 1], [originY, originY * -0.15, 0]);
  const rotate = useTransform(smoothProgress, [0, 1], [rotation, 0]);
  
  const filter = useTransform(smoothProgress, (val) => {
    const clamped = Math.min(Math.max(val, 0), 1);
    const b = (1 - clamped) * blur;
    return `blur(${b.toFixed(1)}px)`;
  });

  return (
    <motion.div
      ref={containerRef}
      style={{
        scale,
        opacity,
        x,
        y,
        rotate,
        filter,
        transformOrigin: 'left center'
      }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}
