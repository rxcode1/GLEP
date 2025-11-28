"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function MinerScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Transform scroll progress to control animations
  const textOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const textScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.5, 1, 1, 0.5]);
  const textY = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [100, 0, 0, -100]);

  // Generate diamonds that rain down from the top
  const diamondCount = 50;
  const diamonds = Array.from({ length: diamondCount }, (_, i) => {
    // Start from random X positions at the top, spread across screen
    const startX = (i * 13) % 100; // Distribute across width
    const startY = -20; // Start above screen
    const endY = 120; // End below screen
    
    // Add slight horizontal drift for more natural rain effect
    const driftAmount = (i % 5) - 2; // -2 to +2
    const endX = startX + driftAmount;

    // Stagger each diamond's start position based on scroll
    const individualProgress = useTransform(
      scrollYProgress,
      [0, 1],
      [0 - (i * 0.05), 1 - (i * 0.05)]
    );
    
    // Diamonds rain down from top to bottom
    const startXTransform = useTransform(individualProgress, [0, 1], [`${startX}%`, `${endX}%`]);
    const startYTransform = useTransform(individualProgress, [0, 1], [`${startY}%`, `${endY}%`]);
    
    // Opacity: invisible at start, visible as they enter, invisible as they exit
    const opacity = useTransform(individualProgress, [-0.2, 0, 0.3, 0.7, 1, 1.2], [0, 0, 0.8, 1, 0.8, 0]);
    
    // Scale: small at top, full size in middle, small at bottom
    const scale = useTransform(individualProgress, [0, 0.2, 0.5, 0.8, 1], [0.3, 0.7, 1.2, 0.7, 0.3]);
    
    // Rotate as they fall
    const rotate = useTransform(individualProgress, [0, 1], [0, 360 * (i % 2 === 0 ? 1 : -1)]);

    return { startX: startXTransform, startY: startYTransform, opacity, scale, rotate };
  });

  return (
    <section
      ref={containerRef}
      className="relative min-h-[150vh] bg-gradient-to-b from-dirt-800 via-dirt-700 to-dirt-800 overflow-hidden"
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
        {[...Array(25)].map((_, i) => {
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

      {/* Diamonds raining down from the top */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {diamonds.map((diamond, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl md:text-4xl lg:text-5xl"
            style={{
              x: diamond.startX,
              y: diamond.startY,
              opacity: diamond.opacity,
              scale: diamond.scale,
              rotate: diamond.rotate,
            }}
          >
            💎
          </motion.div>
        ))}
      </div>

      {/* THE MINER text that pops up */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <motion.div
          style={{
            opacity: textOpacity,
            scale: textScale,
            y: textY,
          }}
          className="text-center px-4"
        >
          <motion.h2
            className="text-7xl md:text-9xl lg:text-[12rem] font-black text-gold-400 text-shadow-lg"
            style={{
              textShadow: "0 0 40px rgba(255, 215, 0, 0.5), 0 0 80px rgba(255, 215, 0, 0.3)",
            }}
          >
            THE MINER
          </motion.h2>
        </motion.div>
      </div>

      {/* Additional decorative elements */}
      <div className="absolute bottom-20 left-0 right-0 z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto"
        >
          <p className="text-2xl md:text-3xl text-diamond-300 font-semibold text-shadow">
            Keep digging. The breakthrough is coming.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

