"use client";

import { motion } from "framer-motion";

interface ScrollSpacerProps {
  height: string;
  bgColor?: string;
}

export default function ScrollSpacer({ height, bgColor = "bg-dirt-900" }: ScrollSpacerProps) {
  return (
    <div className={`relative ${height} ${bgColor} overflow-hidden`}>
      {/* Subtle texture */}
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full bg-[radial-gradient(circle_at_50%_50%,rgba(139,111,71,0.2)_1px,transparent_1px)] bg-[length:50px_50px]"></div>
      </div>
      
      {/* Floating dirt particles */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-dirt-600 opacity-20"
          style={{
            left: `${(i * 10) % 100}%`,
            top: `${(i * 12) % 100}%`,
            width: `${2 + (i % 3)}px`,
            height: `${2 + (i % 3)}px`,
            borderRadius: '50%',
          }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 3 + (i % 2),
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

