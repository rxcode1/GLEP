"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ParallaxLayers from "@/components/ParallaxLayers";
import DepthMeter from "@/components/DepthMeter";
import ScrollSpacer from "@/components/ScrollSpacer";
import MinerScrollSection from "@/components/MinerScrollSection";
import KeepDiggingSection from "@/components/KeepDiggingSection";
import MemeScrollSection from "@/components/MemeScrollSection";
import DiamondsSection from "@/components/DiamondsSection";
import InfiniteDigging from "@/components/InfiniteDigging";
import EndCelebration from "@/components/EndCelebration";

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setScrollProgress(latest);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <div ref={containerRef} className="relative min-h-screen">
      <Header />
      <Hero />
      <ParallaxLayers scrollProgress={scrollProgress} />
      <DepthMeter progress={scrollProgress} />
      <ScrollSpacer height="min-h-[50vh]" bgColor="bg-dirt-900" />
      <MinerScrollSection />
      <ScrollSpacer height="min-h-[30vh]" bgColor="bg-dirt-800" />
      <KeepDiggingSection />
      <ScrollSpacer height="min-h-[30vh]" bgColor="bg-dirt-800" />
      <MemeScrollSection />
      <ScrollSpacer height="min-h-[30vh]" bgColor="bg-dirt-800" />
      <DiamondsSection />
      <InfiniteDigging />
      <EndCelebration />
    </div>
  );
}

