"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function KeepDiggingSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Multiple "KEEP DIGGING" texts that pop out at different scroll positions
  const textVariants = [
    {
      opacity: useTransform(scrollYProgress, [0, 0.15, 0.3, 0.45], [0, 1, 1, 0]),
      scale: useTransform(scrollYProgress, [0, 0.15, 0.3, 0.45], [0.3, 1.2, 1, 0.3]),
      y: useTransform(scrollYProgress, [0, 0.15, 0.3, 0.45], [100, 0, 0, -100]),
      z: useTransform(scrollYProgress, [0, 0.15, 0.3, 0.45], [-200, 0, 0, -200]),
    },
    {
      opacity: useTransform(scrollYProgress, [0.2, 0.35, 0.5, 0.65], [0, 1, 1, 0]),
      scale: useTransform(scrollYProgress, [0.2, 0.35, 0.5, 0.65], [0.3, 1.2, 1, 0.3]),
      y: useTransform(scrollYProgress, [0.2, 0.35, 0.5, 0.65], [100, 0, 0, -100]),
      z: useTransform(scrollYProgress, [0.2, 0.35, 0.5, 0.65], [-200, 0, 0, -200]),
    },
    {
      opacity: useTransform(scrollYProgress, [0.4, 0.55, 0.7, 0.85], [0, 1, 1, 0]),
      scale: useTransform(scrollYProgress, [0.4, 0.55, 0.7, 0.85], [0.3, 1.2, 1, 0.3]),
      y: useTransform(scrollYProgress, [0.4, 0.55, 0.7, 0.85], [100, 0, 0, -100]),
      z: useTransform(scrollYProgress, [0.4, 0.55, 0.7, 0.85], [-200, 0, 0, -200]),
    },
    {
      opacity: useTransform(scrollYProgress, [0.6, 0.75, 0.9, 1], [0, 1, 1, 0]),
      scale: useTransform(scrollYProgress, [0.6, 0.75, 0.9, 1], [0.3, 1.2, 1, 0.3]),
      y: useTransform(scrollYProgress, [0.6, 0.75, 0.9, 1], [100, 0, 0, -100]),
      z: useTransform(scrollYProgress, [0.6, 0.75, 0.9, 1], [-200, 0, 0, -200]),
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative min-h-[200vh] bg-gradient-to-b from-dirt-800 via-dirt-700 to-dirt-800 overflow-hidden"
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
        {[...Array(30)].map((_, i) => {
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

      {/* KEEP DIGGING texts that pop out */}
      <div className="absolute inset-0 flex items-center justify-center">
        {textVariants.map((variant, index) => (
          <motion.div
            key={index}
            className="absolute text-center px-4"
            style={{
              opacity: variant.opacity,
              scale: variant.scale,
              y: variant.y,
              z: variant.z,
            }}
          >
            <motion.h2
              className="text-6xl md:text-8xl lg:text-[10rem] font-black text-gold-400 text-shadow-lg"
              style={{
                textShadow: "0 0 40px rgba(255, 215, 0, 0.6), 0 0 80px rgba(255, 215, 0, 0.4), 0 0 120px rgba(255, 215, 0, 0.2)",
                transform: "perspective(1000px) translateZ(0)",
              }}
            >
              KEEP DIGGING
            </motion.h2>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

