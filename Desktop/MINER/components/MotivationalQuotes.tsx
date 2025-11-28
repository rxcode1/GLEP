"use client";

import { motion } from "framer-motion";

const quotes = [
  {
    quote: "The difference between a successful person and others is not a lack of strength, not a lack of knowledge, but rather a lack in will.",
    author: "Vince Lombardi",
    mining: "Keep swinging that pickaxe.",
  },
  {
    quote: "Success is the sum of small efforts repeated day in and day out.",
    author: "Robert Collier",
    mining: "Every swing counts.",
  },
  {
    quote: "The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle.",
    author: "Steve Jobs",
    mining: "Dig deeper until you find your passion.",
  },
  {
    quote: "It's not about how hard you hit. It's about how hard you can get hit and keep moving forward.",
    author: "Rocky Balboa",
    mining: "One more swing, even when it hurts.",
  },
  {
    quote: "The cave you fear to enter holds the treasure you seek.",
    author: "Joseph Campbell",
    mining: "The diamonds are in the deepest part.",
  },
  {
    quote: "Perseverance is not a long race; it is many short races one after the other.",
    author: "Walter Elliott",
    mining: "One swing at a time.",
  },
];

export default function MotivationalQuotes() {
  return (
    <section className="relative py-32 bg-gradient-to-b from-dirt-800 via-dirt-900 to-dirt-800 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 text-6xl rotate-12">⛏️</div>
        <div className="absolute bottom-20 right-10 text-6xl -rotate-12">💎</div>
        <div className="absolute top-1/2 left-1/4 text-4xl">⛏️</div>
        <div className="absolute top-1/3 right-1/4 text-5xl">💎</div>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-gold-400 mb-4 text-shadow-lg">
            Words to Dig By
          </h2>
          <p className="text-xl text-gray-300 text-shadow">
            Motivation for when the going gets tough
          </p>
        </motion.div>

        <div className="space-y-8">
          {quotes.map((quote, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-dirt-800/50 backdrop-blur-sm border-l-4 border-gold-500 rounded-lg p-6 md:p-8 hover:border-gold-400 transition-all duration-300"
            >
              <p className="text-xl md:text-2xl text-gray-200 mb-4 italic leading-relaxed">
                "{quote.quote}"
              </p>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <p className="text-gold-400 font-semibold">— {quote.author}</p>
                <p className="text-diamond-300 text-sm md:text-base font-medium">
                  💎 {quote.mining}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

