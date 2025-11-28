"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-dirt-900 via-dirt-800 to-dirt-900">
      {/* Animated background texture - dirt pattern */}
      <motion.div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, rgba(139,111,71,0.4) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
        animate={{
          backgroundPosition: ["0px 0px", "40px 40px"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
      />
      
      {/* Animated mud/rock particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => {
          const size = 3 + (i % 4);
          const isRock = i % 3 === 0;
          return (
            <motion.div
              key={i}
              className={`absolute ${isRock ? 'bg-dirt-500' : 'bg-dirt-600'} opacity-30`}
              style={{
                left: `${(i * 7) % 100}%`,
                top: `${(i * 11) % 100}%`,
                width: `${size}px`,
                height: `${size}px`,
                borderRadius: isRock ? '2px' : '50%',
                transform: isRock ? 'rotate(45deg)' : 'none',
              }}
              animate={{
                y: [0, -20, 0],
                x: [0, Math.sin(i) * 15, 0],
                opacity: [0.2, 0.4, 0.2],
                rotate: isRock ? [45, 50, 45] : 0,
              }}
              transition={{
                duration: 4 + (i % 3),
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </div>
      
      {/* Additional larger rock formations */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`rock-${i}`}
            className="absolute bg-dirt-700 opacity-15"
            style={{
              left: `${(i * 12) % 100}%`,
              top: `${(i * 15) % 100}%`,
              width: `${8 + (i % 5)}px`,
              height: `${8 + (i % 5)}px`,
              borderRadius: '3px',
              transform: `rotate(${i * 22.5}deg)`,
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 5 + (i % 2),
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <motion.div
            animate={{
              rotate: [-10, 10, -10],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="inline-block"
          >
            <Image
              src="/miner.png"
              alt="The Miner"
              width={200}
              height={300}
              className="drop-shadow-2xl"
              priority
            />
          </motion.div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold mb-6 text-shadow-lg"
        >
          <span className="text-gold-400">THE MINER</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-2xl md:text-4xl font-semibold text-gray-200 mb-4 text-shadow"
        >
          Don't Stop Now.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl md:text-2xl text-diamond-300 font-medium text-shadow"
        >
          The Diamonds Are Closer Than You Think.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-12"
        >
          <motion.div
            animate={{ y: [0, 10, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-5xl"
          >
            ⛏️
          </motion.div>
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-sm text-gray-400 mt-2"
          >
            start scrolling
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

