"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function MemeScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const memes = [
    {
      src: "/meme-sad.png",
      alt: "Tired miner",
      caption: "When you're about to give up...",
    },
    {
      src: "/meme-smoking.png",
      alt: "Weary miner",
      caption: "Just one more swing...",
    },
    {
      src: "/meme-diamond.png",
      alt: "Successful miner with diamond",
      caption: "But you kept digging!",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative min-h-[300vh] bg-gradient-to-b from-dirt-800 via-dirt-700 to-dirt-800 overflow-hidden"
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

      {/* Meme displays with scroll animations */}
      {memes.map((meme, index) => {
        const sectionProgress = useTransform(
          scrollYProgress,
          [
            index / memes.length,
            (index + 0.3) / memes.length,
            (index + 0.7) / memes.length,
            (index + 1) / memes.length,
          ],
          [0, 1, 1, 0]
        );

        const scale = useTransform(
          scrollYProgress,
          [
            index / memes.length,
            (index + 0.3) / memes.length,
            (index + 0.7) / memes.length,
            (index + 1) / memes.length,
          ],
          [0.5, 1, 1, 0.5]
        );

        const y = useTransform(
          scrollYProgress,
          [
            index / memes.length,
            (index + 0.3) / memes.length,
            (index + 0.7) / memes.length,
            (index + 1) / memes.length,
          ],
          [100, 0, 0, -100]
        );

        return (
          <div
            key={index}
            className="absolute inset-0 flex items-center justify-center"
            style={{
              top: `${(index * 100) / memes.length}%`,
              height: `${100 / memes.length}%`,
            }}
          >
            <motion.div
              className="text-center px-4 max-w-4xl mx-auto"
              style={{
                opacity: sectionProgress,
                scale: scale,
                y: y,
              }}
            >
              <motion.div
                className="relative mb-6"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={meme.src}
                  alt={meme.alt}
                  width={600}
                  height={800}
                  className="rounded-lg shadow-2xl mx-auto w-full h-auto"
                  priority={index === 0}
                />
              </motion.div>
              <motion.p
                className="text-3xl md:text-4xl font-bold text-gold-400 text-shadow-lg"
                style={{
                  opacity: sectionProgress,
                }}
              >
                {meme.caption}
              </motion.p>
            </motion.div>
          </div>
        );
      })}
    </section>
  );
}

