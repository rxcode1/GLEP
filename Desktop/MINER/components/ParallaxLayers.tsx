"use client";

import { motion } from "framer-motion";

interface ParallaxLayersProps {
  scrollProgress: number;
}

export default function ParallaxLayers({ scrollProgress }: ParallaxLayersProps) {
  const calculateParallax = (progress: number, speed: number) => progress * speed * 100;
  
  const dirtY = calculateParallax(scrollProgress, 0.2);
  const rocksY = calculateParallax(scrollProgress, 0.4);
  const diamondsY = calculateParallax(scrollProgress, 0.6);

  return (
    <section className="relative min-h-[400vh] bg-dirt-900">
      {/* Dirt Layer */}
      <motion.div
        style={{ y: dirtY }}
        className="absolute inset-0 bg-gradient-to-b from-dirt-800 via-dirt-700 to-dirt-800"
      >
        <div className="absolute inset-0 opacity-30">
          <div className="h-full w-full bg-[radial-gradient(circle_at_50%_50%,rgba(139,111,71,0.3)_1px,transparent_1px)] bg-[length:40px_40px]"></div>
        </div>
      </motion.div>

      {/* Rocks Layer */}
      <motion.div
        style={{ y: rocksY }}
        className="absolute inset-0 bg-gradient-to-b from-dirt-700 via-dirt-600 to-dirt-700 pt-[100vh]"
      >
        <div className="absolute inset-0 opacity-40">
          <div className="h-full w-full bg-[radial-gradient(ellipse_at_center,rgba(100,100,100,0.4)_2px,transparent_2px)] bg-[length:60px_60px]"></div>
        </div>
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-dirt-500 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-dirt-400 rounded-full opacity-15 blur-xl"></div>
      </motion.div>

      {/* Diamonds Layer */}
      <motion.div
        style={{ y: diamondsY }}
        className="absolute inset-0 bg-gradient-to-b from-dirt-600 via-diamond-900 to-diamond-800 pt-[200vh]"
      >
        <div className="absolute inset-0">
          {/* Sparkling diamonds */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${(i * 7) % 100}%`,
                top: `${(i * 11) % 100}%`,
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 2 + (i % 3),
                repeat: Infinity,
                delay: i * 0.1,
              }}
            >
              <div className="text-2xl">💎</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Text overlay */}
      <div className="absolute top-[300vh] left-0 right-0 z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-gold-400 mb-4 text-shadow-lg">
            Keep Digging
          </h2>
          <p className="text-xl md:text-2xl text-diamond-300 text-shadow">
            Every swing brings you closer to your breakthrough
          </p>
        </motion.div>
      </div>
    </section>
  );
}

