"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function DiamondsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Generate multipliers
  const multipliers = [
    10, 25, 50, 75, 100, 125, 150, 200, 250, 300, 350, 400, 450, 500,
    600, 700, 800, 900, 1000, 1200, 1500, 2000, 2500, 3000, 5000, 10000
  ];

  // Generate many diamonds with multipliers
  const diamondCount = 800; // Lots of diamonds for scrolling
  const items = Array.from({ length: diamondCount }, (_, i) => {
    const multiplier = multipliers[i % multipliers.length];
    const x = (i * 7.3) % 100; // Distribute across width
    const y = (i * 1.5) % 500; // Spread vertically for much more scrolling
    
    // Stagger animations
    const delay = (i * 0.05) % 2;
    const duration = 2 + (i % 3);
    
    return {
      x,
      y,
      multiplier,
      delay,
      duration,
      index: i,
    };
  });

  return (
    <section
      ref={containerRef}
      className="relative min-h-[500vh] bg-gradient-to-b from-dirt-800 via-dirt-700 to-dirt-800 overflow-hidden"
    >
      {/* Animated dirt background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, rgba(139,111,71,0.4) 1px, transparent 0)",
            backgroundSize: "50px 50px",
          }}
          animate={{
            backgroundPosition: ["0px 0px", "50px 50px"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
        />
      </div>

      {/* Floating dirt particles */}
      <div className="absolute inset-0">
        {[...Array(40)].map((_, i) => {
          const size = 2 + (i % 4);
          const isRock = i % 4 === 0;
          return (
            <motion.div
              key={i}
              className={`absolute ${isRock ? 'bg-dirt-500' : 'bg-dirt-600'} opacity-25`}
              style={{
                left: `${(i * 8) % 100}%`,
                top: `${(i * 9) % 100}%`,
                width: `${size}px`,
                height: `${size}px`,
                borderRadius: isRock ? '2px' : '50%',
              }}
              animate={{
                y: [0, -25, 0],
                x: [0, Math.sin(i) * 20, 0],
                opacity: [0.15, 0.35, 0.15],
              }}
              transition={{
                duration: 4 + (i % 3),
                repeat: Infinity,
                delay: i * 0.12,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </div>

      {/* Diamonds with multipliers */}
      <div className="absolute inset-0" style={{ height: "500%" }}>
        {items.map((item) => {
          const scrollOffset = useTransform(
            scrollYProgress,
            [0, 1],
            [0, -100] // Move up as you scroll
          );

          return (
            <motion.div
              key={item.index}
              className="absolute"
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
                y: scrollOffset,
              }}
              animate={{
                y: [0, -10, 0],
                rotate: [0, 15, -15, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: item.duration,
                repeat: Infinity,
                delay: item.delay,
                ease: "easeInOut",
              }}
            >
              {/* Diamond emoji */}
              <div className="text-2xl md:text-3xl text-center mb-1">💎</div>
              
              {/* Multiplier text with green glow */}
              <motion.div
                className="text-xs md:text-sm font-bold text-gold-400 text-center"
                style={{
                  textShadow: "0 0 10px #00ff00, 0 0 20px #00ff00, 0 0 30px #00ff00",
                  filter: "drop-shadow(0 0 5px #00ff00)",
                }}
                animate={{
                  opacity: [0.7, 1, 0.7],
                  scale: [0.95, 1.05, 0.95],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: item.delay,
                  ease: "easeInOut",
                }}
              >
                {item.multiplier}x
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

