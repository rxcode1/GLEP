"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative py-16 bg-gradient-to-b from-dirt-900 to-black overflow-hidden">
      {/* Sparkling diamonds background */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${(i * 13) % 100}%`,
              top: `${(i * 7) % 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [0.5, 1.5, 0.5],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 3 + (i % 4),
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeInOut",
            }}
          >
            <span className="text-2xl md:text-3xl">💎</span>
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-3xl md:text-4xl font-bold text-gold-400 mb-4 text-shadow-lg">
            Keep Digging
          </h3>
          <p className="text-lg text-gray-400 mb-6 text-shadow">
            The Meme Miner - Because success is just one more swing away
          </p>

          <div className="flex justify-center gap-6 mb-8">
            <motion.a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              className="text-3xl"
            >
              🐦
            </motion.a>
            <motion.a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: -5 }}
              className="text-3xl"
            >
              📘
            </motion.a>
            <motion.a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              className="text-3xl"
            >
              📷
            </motion.a>
          </div>

          <div className="border-t border-dirt-700 pt-8">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} The Meme Miner. Made with 💎 and determination.
            </p>
            <p className="text-gray-600 text-xs mt-2">
              Remember: The diamonds are closer than you think. Don't stop now.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

