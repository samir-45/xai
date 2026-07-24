"use client";

import { motion } from "framer-motion";

export function AnalyzeDiagram() {
  return (
    <svg viewBox="0 0 320 200" className="w-full max-w-md text-signal">
      {Array.from({ length: 24 }).map((_, i) => {
        const cx = 30 + (i % 8) * 35;
        const cy = 30 + Math.floor(i / 8) * 55;
        return (
          <motion.circle
            key={i}
            cx={cx}
            cy={cy}
            r="3"
            fill="currentColor"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            transition={{ delay: i * 0.02 }}
          />
        );
      })}
      {Array.from({ length: 18 }).map((_, i) => {
        const a = i;
        const b = (i * 7 + 3) % 24;
        const ax = 30 + (a % 8) * 35;
        const ay = 30 + Math.floor(a / 8) * 55;
        const bx = 30 + (b % 8) * 35;
        const by = 30 + Math.floor(b / 8) * 55;
        return (
          <motion.line
            key={i}
            x1={ax}
            y1={ay}
            x2={bx}
            y2={by}
            stroke="currentColor"
            strokeOpacity="0.35"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.3 + i * 0.04, duration: 0.5 }}
          />
        );
      })}
    </svg>
  );
}
