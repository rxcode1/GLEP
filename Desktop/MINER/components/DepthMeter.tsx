"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

interface DepthMeterProps {
  progress: number;
}

export default function DepthMeter({ progress }: DepthMeterProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [totalDepth, setTotalDepth] = useState(0);
  const [baseDepth, setBaseDepth] = useState(0);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      }

      // Calculate actual scroll depth
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollYRef.current;
      
      if (scrollDelta > 0) {
        // Add to total depth (convert pixels to meters, roughly 1px = 0.01m)
        const depthIncrement = scrollDelta * 0.01;
        setTotalDepth(prev => {
          const newDepth = prev + depthIncrement;
          // Update base when we hit a milestone (every 100m)
          const newBase = Math.floor(newDepth / 100) * 100;
          if (newBase > baseDepth) {
            setBaseDepth(newBase);
          }
          return newDepth;
        });
      }
      
      lastScrollYRef.current = currentScrollY;
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [baseDepth]);

  // Use total depth instead of progress-based depth
  const depth = totalDepth;
  const depthText = Math.floor(depth);
  const currentMilestone = depth % 100; // 0-100 within current milestone

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -50 }}
      transition={{ duration: 0.5 }}
      className="fixed left-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block"
    >
      <div className="bg-dirt-800/90 backdrop-blur-sm border-2 border-gold-500 rounded-lg p-4 min-w-[120px]">
        <div className="text-center mb-2">
          <p className="text-xs text-gray-400 uppercase tracking-wider">Depth</p>
          <p className="text-2xl font-bold text-gold-400">{depthText}m</p>
        </div>
        
        {/* Meter container */}
        <div className="relative h-64 w-8 bg-dirt-700 rounded-full border-2 border-dirt-600 overflow-hidden">
          {/* Progress fill - show percentage of current 100m milestone */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-diamond-600 via-diamond-400 to-diamond-300 rounded-full"
            style={{
              height: `${currentMilestone}%`,
            }}
            transition={{ duration: 0.1 }}
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-transparent via-white/30 to-transparent"
              animate={{
                y: ["-100%", "100%"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </motion.div>

          {/* Depth markers - show 0-100m scale */}
          {[0, 25, 50, 75, 100].map((mark) => (
            <div
              key={mark}
              className="absolute left-0 right-0 border-t border-dirt-500/50"
              style={{ bottom: `${mark}%` }}
            >
              <div className="absolute -left-6 text-xs text-gray-500">
                {baseDepth + mark}m
              </div>
            </div>
          ))}

          {/* Diamond icon at top - show when near milestone */}
          {currentMilestone >= 90 && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute top-2 left-1/2 -translate-x-1/2 text-2xl"
            >
              💎
            </motion.div>
          )}
        </div>

        {/* Status text */}
        <div className="text-center mt-2">
          <p className="text-xs text-gray-400">
            {depth < 10 && "Just starting..."}
            {depth >= 10 && depth < 50 && "Getting deeper..."}
            {depth >= 50 && depth < 100 && "Digging deep!"}
            {depth >= 100 && depth < 200 && "Very deep!"}
            {depth >= 200 && depth < 500 && "Extremely deep!"}
            {depth >= 500 && "Legendary depth! 💎"}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

