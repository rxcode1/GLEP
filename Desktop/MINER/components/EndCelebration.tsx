"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export default function EndCelebration() {
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationCount, setCelebrationCount] = useState(0);
  const lastTriggerRef = useRef(0);
  const lastScrollPositionRef = useRef(0);
  const totalScrollDepthRef = useRef(0);
  const infiniteSectionStartRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      
      // Find the start of the infinite digging section (after DiamondsSection)
      if (infiniteSectionStartRef.current === null) {
        const infiniteSection = document.getElementById('infinite-digging');
        if (infiniteSection) {
          const rect = infiniteSection.getBoundingClientRect();
          const scrollY = window.scrollY || document.documentElement.scrollTop;
          infiniteSectionStartRef.current = rect.top + scrollY - 100; // Start slightly before to catch it
          
          // Reset scroll tracking when we first enter infinite section
          if (scrollTop >= infiniteSectionStartRef.current) {
            lastScrollPositionRef.current = scrollTop;
            totalScrollDepthRef.current = 0;
          }
        }
      }

      // Only trigger celebration if we're past the infinite section start
      if (infiniteSectionStartRef.current === null || scrollTop < infiniteSectionStartRef.current) {
        // Reset tracking if we scroll back up
        if (infiniteSectionStartRef.current !== null && scrollTop < infiniteSectionStartRef.current) {
          lastScrollPositionRef.current = scrollTop;
          totalScrollDepthRef.current = 0;
        }
        return; // Don't trigger if we're not in the infinite section yet
      }

      const scrollDelta = scrollTop - lastScrollPositionRef.current;
      
      // Track total scroll depth only in infinite section
      if (scrollDelta > 0) {
        totalScrollDepthRef.current += scrollDelta;
      }
      lastScrollPositionRef.current = scrollTop;

      // Trigger celebration periodically based on scroll depth in infinite section
      // Every ~3000px of scrolling (approximately 3 viewport heights)
      const celebrationInterval = 3000;
      const scrollDepthSinceLastCelebration = totalScrollDepthRef.current - (celebrationCount * celebrationInterval);
      
      if (scrollDepthSinceLastCelebration >= celebrationInterval) {
        const now = Date.now();
        // 5 second cooldown between celebrations
        if (now - lastTriggerRef.current > 5000) {
          setShowCelebration(true);
          setCelebrationCount(prev => prev + 1);
          lastTriggerRef.current = now;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Check on mount and after a short delay to find the section
    setTimeout(() => {
      handleScroll();
    }, 100);
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [celebrationCount]);

  // Generate realistic confetti items
  const confettiItems = Array.from({ length: 150 }, (_, i) => {
    const type = i % 3; // 0: diamond, 1: gold coin, 2: money
    const size = 15 + Math.random() * 20;
    return {
      id: i,
      type,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 2,
      rotation: Math.random() * 360,
      size,
    };
  });

  const handleKeepDigging = () => {
    setShowCelebration(false);
    // Add more scrollable content after a delay
    setTimeout(() => {
      const infiniteSection = document.getElementById('infinite-digging');
      if (infiniteSection) {
        const newContent = document.createElement('div');
        newContent.className = 'min-h-[300vh] bg-gradient-to-b from-dirt-800 via-dirt-700 to-dirt-800 relative overflow-hidden';
        
        // Add animated dirt particles
        for (let i = 0; i < 30; i++) {
          const particle = document.createElement('div');
          particle.className = 'absolute bg-dirt-600 opacity-20 rounded-full';
          particle.style.width = `${2 + (i % 3)}px`;
          particle.style.height = `${2 + (i % 3)}px`;
          particle.style.left = `${(i * 5) % 100}%`;
          particle.style.top = `${(i * 7) % 100}%`;
          newContent.appendChild(particle);
        }
        
        infiniteSection.appendChild(newContent);
      }
    }, 500);
  };

  return (
    <AnimatePresence>
      {showCelebration && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setShowCelebration(false)}
        >
          {/* Realistic confetti falling */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {confettiItems.map((item) => {
              if (item.type === 0) {
                // Diamond shape
                return (
                  <motion.div
                    key={item.id}
                    className="absolute"
                    style={{
                      left: `${item.left}%`,
                      top: "-10%",
                      width: `${item.size}px`,
                      height: `${item.size}px`,
                    }}
                    initial={{ y: 0, rotate: 0, opacity: 1 }}
                    animate={{
                      y: "110vh",
                      rotate: item.rotation + 720,
                      opacity: [1, 1, 0],
                    }}
                    transition={{
                      duration: item.duration,
                      delay: item.delay,
                      ease: "easeIn",
                    }}
                  >
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <path
                        d="M50 10 L70 40 L50 70 L30 40 Z"
                        fill="#4da5ff"
                        stroke="#0070e6"
                        strokeWidth="2"
                      />
                      <path
                        d="M50 10 L60 30 L50 50 L40 30 Z"
                        fill="#80bfff"
                        stroke="#0070e6"
                        strokeWidth="1"
                      />
                      <circle cx="50" cy="40" r="3" fill="#b3d9ff" />
                    </svg>
                  </motion.div>
                );
              } else if (item.type === 1) {
                // Gold coin
                return (
                  <motion.div
                    key={item.id}
                    className="absolute"
                    style={{
                      left: `${item.left}%`,
                      top: "-10%",
                      width: `${item.size}px`,
                      height: `${item.size}px`,
                    }}
                    initial={{ y: 0, rotate: 0, opacity: 1 }}
                    animate={{
                      y: "110vh",
                      rotate: item.rotation + 720,
                      opacity: [1, 1, 0],
                    }}
                    transition={{
                      duration: item.duration,
                      delay: item.delay,
                      ease: "easeIn",
                    }}
                  >
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <circle cx="50" cy="50" r="45" fill="#ffd700" stroke="#ccac00" strokeWidth="3" />
                      <circle cx="50" cy="50" r="35" fill="#ffed4e" />
                      <text x="50" y="60" textAnchor="middle" fontSize="40" fill="#ccac00" fontWeight="bold">$</text>
                    </svg>
                  </motion.div>
                );
              } else {
                // Money bill
                return (
                  <motion.div
                    key={item.id}
                    className="absolute"
                    style={{
                      left: `${item.left}%`,
                      top: "-10%",
                      width: `${item.size * 1.6}px`,
                      height: `${item.size}px`,
                    }}
                    initial={{ y: 0, rotate: 0, opacity: 1 }}
                    animate={{
                      y: "110vh",
                      rotate: item.rotation + 360,
                      opacity: [1, 1, 0],
                    }}
                    transition={{
                      duration: item.duration,
                      delay: item.delay,
                      ease: "easeIn",
                    }}
                  >
                    <svg viewBox="0 0 160 100" className="w-full h-full">
                      <rect width="160" height="100" rx="5" fill="#85bb65" stroke="#5a8a3f" strokeWidth="2" />
                      <rect x="5" y="5" width="150" height="90" rx="3" fill="#9dd67a" />
                      <text x="80" y="55" textAnchor="middle" fontSize="50" fill="#ffffff" fontWeight="bold">$</text>
                      <text x="20" y="25" fontSize="20" fill="#5a8a3f" fontWeight="bold">100</text>
                      <text x="120" y="80" fontSize="20" fill="#5a8a3f" fontWeight="bold">100</text>
                    </svg>
                  </motion.div>
                );
              }
            })}
          </div>

          {/* Main popup */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="relative z-10 text-center px-4 max-w-4xl mx-auto"
          >
            <motion.h1
              className="text-6xl md:text-8xl lg:text-[10rem] font-black mb-8"
              animate={{
                scale: [1, 1.1, 1],
                textShadow: [
                  "0 0 20px rgba(255, 215, 0, 0.8)",
                  "0 0 40px rgba(255, 215, 0, 1), 0 0 60px rgba(255, 215, 0, 0.8)",
                  "0 0 20px rgba(255, 215, 0, 0.8)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                color: "#ffd700",
                textShadow: "0 0 40px rgba(255, 215, 0, 1), 0 0 80px rgba(255, 215, 0, 0.8)",
              }}
            >
              YOU'VE FOUND DIAMOND!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-xl md:text-2xl text-gray-300 mb-8"
            >
              You kept digging and found your treasure!
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleKeepDigging}
              className="px-8 py-4 bg-gold-500 hover:bg-gold-400 text-dirt-900 font-bold text-xl rounded-lg transition-colors"
            >
              Keep Digging! ⛏️
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

