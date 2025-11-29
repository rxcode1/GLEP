"use client";

import Image from "next/image";

interface CloutGlassesLogoProps {
  size?: number;
  className?: string;
}

export default function CloutGlassesLogo({ size = 100, className = "" }: CloutGlassesLogoProps) {
  // Calculate aspect ratio (assuming glasses image is roughly 2:1 width:height)
  const aspectRatio = 1.67; // approximate
  const height = size / aspectRatio;
  
  return (
    <div 
      className={`inline-block ${className}`}
      style={{ width: size, height: height }}
    >
      <Image
        src="/glasses.png"
        alt="Clout Glasses"
        width={size}
        height={height}
        className="object-contain w-full h-full"
        style={{ filter: 'brightness(0) invert(1)' }} // Make it white
      />
    </div>
  );
}

