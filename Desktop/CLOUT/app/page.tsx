"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import CloutGlassesLogo from "@/components/CloutGlassesLogo";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* X Logo Header */}
      <header className="absolute top-0 left-0 right-0 z-50 flex justify-center pt-6">
        <motion.a
          href="https://x.com/Clout1glasses"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-8 h-8 fill-white"
            aria-label="X (formerly Twitter)"
          >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </motion.a>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
        {/* Animated Background Glasses with Depth */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          {/* Multiple layers for depth effect */}
          <motion.div
            className="absolute opacity-5"
            initial={{ y: -200, opacity: 0, scale: 0.8 }}
            animate={{ 
              y: [0, -30, 0],
              opacity: [0.05, 0.08, 0.05],
              scale: [0.8, 0.85, 0.8],
              rotate: [0, 5, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0
            }}
          >
            <CloutGlassesLogo size={500} />
          </motion.div>
          
          <motion.div
            className="absolute opacity-8"
            initial={{ y: -150, opacity: 0, scale: 0.6 }}
            animate={{ 
              y: [0, -25, 0],
              opacity: [0.08, 0.12, 0.08],
              scale: [0.6, 0.65, 0.6],
              rotate: [0, -3, 0]
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          >
            <CloutGlassesLogo size={350} />
          </motion.div>
          
          <motion.div
            className="absolute opacity-10"
            initial={{ y: -100, opacity: 0, scale: 0.4 }}
            animate={{ 
              y: [0, -20, 0],
              opacity: [0.1, 0.15, 0.1],
              scale: [0.4, 0.45, 0.4],
              rotate: [0, 2, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          >
            <CloutGlassesLogo size={250} />
          </motion.div>
        </div>

        {/* Main Content */}
        <motion.div
          className="relative z-10 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Logo */}
          <motion.div
            initial={{ y: -100, opacity: 0, scale: 0.5 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 100,
              damping: 10,
              delay: 0.1
            }}
            className="mb-8"
          >
            <motion.div
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <CloutGlassesLogo size={120} />
            </motion.div>
          </motion.div>

          <motion.h1 
            className="text-7xl md:text-9xl font-black mb-6 tracking-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {["C", "L", "O", "U", "T"].map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 0.4 + i * 0.1,
                  type: "spring",
                  stiffness: 200
                }}
                className="inline-block"
              >
                {letter}
              </motion.span>
            ))}
            <br />
            <motion.span 
              className="text-6xl md:text-8xl"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                delay: 0.9,
                type: "spring",
                stiffness: 100
              }}
            >
              GLASSES
            </motion.span>
          </motion.h1>

          <motion.p 
            className="text-2xl md:text-3xl mb-12 font-bold opacity-90"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 0.9, x: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            ADD CLOUT TO YOUR MEMES
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            whileHover={{ scale: 1.1, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            className="p-4"
          >
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 0px rgba(255,255,255,0)",
                  "0 0 30px rgba(255,255,255,0.8)",
                  "0 0 0px rgba(255,255,255,0)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="inline-block"
            >
              <Link
                href="/editor"
                className="inline-block px-12 py-6 bg-white text-black text-2xl font-black rounded-none border-4 border-white hover:bg-white hover:text-black transition-colors duration-300 uppercase tracking-wider relative"
                style={{ 
                  backgroundColor: 'white',
                  color: 'black',
                }}
              >
                <span className="relative z-10">
                  GET STARTED
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-white rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Sample Memes Section */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <motion.h2 
            className="text-5xl md:text-7xl font-black text-center mb-16 uppercase tracking-tight"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            SAMPLE MEMES
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "Wojak", 
                description: "Classic meme with clout",
                image: "/wojak-clout.png"
              },
              { 
                title: "MR 24 HOURS", 
                description: "he can hold a coin for a whole 24 hours",
                image: "/portrait-clout.png"
              },
              { 
                title: "CUPSEY", 
                description: "mr cupsey",
                image: "/spongebob-clout.png"
              }
            ].map((meme, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30, rotate: -5 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6, 
                  delay: i * 0.15,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.1, 
                  y: -15,
                  rotate: [0, -2, 2, -2, 0],
                  transition: { duration: 0.5 }
                }}
                className="bg-white p-2 border-4 border-white cursor-pointer"
              >
                <motion.div 
                  className="bg-gray-900 aspect-square flex flex-col items-center justify-center relative overflow-hidden"
                  whileHover={{
                    scale: 1.05,
                  }}
                >
                  {/* Sample image */}
                  <div className="absolute inset-0 w-full h-full">
                    <Image
                      src={meme.image}
                      alt={meme.title}
                      fill
                      className="object-cover z-0"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-90 p-3 text-white text-center border-t-2 border-white z-10">
                    <p className="text-base font-black uppercase mb-1">{meme.title}</p>
                    <p className="text-xs opacity-80">{meme.description}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 border-t-4 border-white">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h2 
            className="text-5xl md:text-7xl font-black mb-8 uppercase tracking-tight"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            READY TO GET CLOUT?
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.1, rotate: -2 }}
            whileTap={{ scale: 0.95 }}
            className="p-4"
          >
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 0px rgba(255,255,255,0)",
                  "0 0 30px rgba(255,255,255,0.8)",
                  "0 0 0px rgba(255,255,255,0)",
                ],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="inline-block"
            >
              <Link
                href="/editor"
                className="inline-block px-12 py-6 bg-white text-black text-2xl font-black rounded-none border-4 border-white hover:bg-white hover:text-black transition-colors duration-300 uppercase tracking-wider relative"
                style={{ 
                  backgroundColor: 'white',
                  color: 'black',
                }}
              >
                <span className="relative z-10">
                  CREATE YOUR MEME
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t-4 border-white text-center">
        <p className="text-lg font-bold opacity-70">
          © 2024 CLOUT GLASSES
        </p>
      </footer>
    </main>
  );
}

