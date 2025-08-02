import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function GradientMesh() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Main gradient blobs */}
      <motion.div
        className="absolute -top-40 -right-40 w-96 h-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0.05) 50%, transparent 100%)',
          willChange: 'transform',
        }}
        animate={shouldReduceMotion ? undefined : {
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={shouldReduceMotion ? undefined : {
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(34, 197, 94, 0.08) 0%, rgba(34, 197, 94, 0.03) 50%, transparent 100%)',
          willChange: 'transform',
        }}
        animate={shouldReduceMotion ? undefined : {
          x: [0, -30, 0],
          y: [0, 40, 0],
          scale: [1, 1.15, 1],
        }}
        transition={shouldReduceMotion ? undefined : {
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(34, 197, 94, 0.06) 0%, rgba(34, 197, 94, 0.02) 50%, transparent 100%)',
          willChange: 'transform',
        }}
        animate={shouldReduceMotion ? undefined : {
          x: [0, 40, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={shouldReduceMotion ? undefined : {
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Additional smaller blobs for complexity */}
      <motion.div
        className="absolute top-1/2 right-1/3 w-32 h-32 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(34, 197, 94, 0.05) 0%, transparent 70%)',
          willChange: 'transform',
        }}
        animate={shouldReduceMotion ? undefined : {
          x: [0, -20, 0],
          y: [0, 30, 0],
          scale: [1, 1.3, 1],
        }}
        transition={shouldReduceMotion ? undefined : {
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/4 left-1/2 w-48 h-48 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(34, 197, 94, 0.04) 0%, transparent 80%)',
          willChange: 'transform',
        }}
        animate={shouldReduceMotion ? undefined : {
          x: [0, 25, 0],
          y: [0, -25, 0],
          scale: [1, 1.1, 1],
        }}
        transition={shouldReduceMotion ? undefined : {
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Subtle overlay for depth - dark mode optimized */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-green-500/15" />
    </div>
  );
}
