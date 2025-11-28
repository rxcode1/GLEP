"use client";

import { useEffect, useRef } from "react";

export default function InfiniteDigging() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add infinite scrolling content
    const addMoreContent = () => {
      if (containerRef.current) {
        const newSection = document.createElement('div');
        newSection.className = 'min-h-[300vh] bg-gradient-to-b from-dirt-800 via-dirt-700 to-dirt-800 relative overflow-hidden';
        
        // Add some animated dirt particles
        for (let i = 0; i < 30; i++) {
          const particle = document.createElement('div');
          particle.className = 'absolute bg-dirt-600 opacity-20 rounded-full';
          particle.style.width = `${2 + (i % 3)}px`;
          particle.style.height = `${2 + (i % 3)}px`;
          particle.style.left = `${(i * 5) % 100}%`;
          particle.style.top = `${(i * 7) % 100}%`;
          newSection.appendChild(particle);
        }
        
        containerRef.current.appendChild(newSection);
      }
    };

    // Add content when user scrolls near bottom
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;
      
      if (scrollTop + clientHeight >= scrollHeight - 1000) {
        addMoreContent();
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Add initial content
    addMoreContent();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return <div id="infinite-digging" ref={containerRef} className="relative" />;
}

