"use client";

import { motion } from "framer-motion";

const memeVariations = [
  {
    caption: "One more swing...",
    description: "When you're about to give up but decide to try just one more time",
  },
  {
    caption: "So close yet so far",
    description: "The diamonds are right there, just a few more swings away",
  },
  {
    caption: "The overnight success that took 10 years",
    description: "Everyone sees the breakthrough, nobody saw the digging",
  },
  {
    caption: "99% complete, 100% to go",
    description: "The last 1% takes as much effort as the first 99%",
  },
  {
    caption: "Just before the breakthrough",
    description: "This is where most people stop. Don't be most people.",
  },
];

export default function MemeVariations() {
  return (
    <section className="relative py-32 bg-gradient-to-b from-dirt-900 to-dirt-800">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-gold-400 mb-4 text-shadow-lg">
            The Meme Variations
          </h2>
          <p className="text-xl text-gray-300 text-shadow">
            Different captions, same powerful message
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {memeVariations.map((meme, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-dirt-800/50 backdrop-blur-sm border-2 border-dirt-600 rounded-lg p-6 hover:border-gold-500 transition-all duration-300"
            >
              {/* Meme visual representation */}
              <div className="relative mb-4 h-48 bg-gradient-to-b from-dirt-700 to-dirt-600 rounded-lg overflow-hidden">
                {/* Miner silhouette */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                  <div className="w-16 h-16 bg-dirt-500 rounded-full mb-2"></div>
                  <div className="w-12 h-20 bg-dirt-400 rounded-t-full mx-auto"></div>
                </div>
                
                {/* Pickaxe */}
                <div className="absolute bottom-8 right-1/3 w-2 h-12 bg-dirt-600 rotate-45"></div>
                <div className="absolute bottom-12 right-1/3 w-8 h-2 bg-gray-400 rotate-45"></div>

                {/* Diamonds in the distance */}
                <div className="absolute top-4 left-1/4 text-3xl opacity-60">💎</div>
                <div className="absolute top-8 right-1/4 text-2xl opacity-40">💎</div>
                <div className="absolute top-12 left-1/3 text-2xl opacity-50">💎</div>
              </div>

              <h3 className="text-2xl font-bold text-gold-400 mb-2 text-shadow">
                {meme.caption}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {meme.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

