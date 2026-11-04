import React from 'react';
import { motion } from 'motion/react';
import { GoldSohoLogo } from './GoldSohoLogo';
import { SohoNeonLogo } from './SohoNeonLogo';

interface RotatingSohoLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  variant?: 'gold' | 'white' | 'dark';
  speed?: number; // duration in seconds for full 360 rotation
  className?: string;
  showGlow?: boolean;
  reverse?: boolean;
  useNeonLogo?: boolean;
}

export const RotatingSohoLogo: React.FC<RotatingSohoLogoProps> = ({
  size = 'md',
  variant = 'gold',
  speed = 10,
  className = '',
  reverse = false,
  showGlow = true,
  useNeonLogo = true
}) => {
  // If useNeonLogo is active (default), display the official glowing neon 3D logo in the middle
  if (useNeonLogo) {
    return (
      <SohoNeonLogo
        size={size}
        className={className}
        showGlow={showGlow}
      />
    );
  }

  const sizeMap: Record<
    string,
    { dimension: number; logoSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl'; depth: number }
  > = {
    xs: { dimension: 56, logoSize: 'xs', depth: 2 },
    sm: { dimension: 84, logoSize: 'sm', depth: 2.5 },
    md: { dimension: 140, logoSize: 'md', depth: 3 },
    lg: { dimension: 210, logoSize: 'lg', depth: 4 },
    xl: { dimension: 280, logoSize: 'xl', depth: 5 },
    '2xl': { dimension: 320, logoSize: 'xl', depth: 6 }
  };

  const current = sizeMap[size] || sizeMap.md;
  const halfDepth = current.depth;
  const wordsElevation = halfDepth + 6;

  return (
    <div
      className={`relative inline-flex flex-col items-center justify-center select-none ${className}`}
      style={{
        width: current.dimension,
        height: current.dimension,
        perspective: '1200px'
      }}
    >
      <motion.div
        className="relative w-full h-full flex items-center justify-center"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{
          rotateY: reverse ? [360, 0] : [0, 360],
          rotateX: [8, 14, 8]
        }}
        transition={{
          rotateY: { repeat: Infinity, ease: 'linear', duration: speed },
          rotateX: { repeat: Infinity, ease: 'easeInOut', duration: speed / 2 }
        }}
      >
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transform: `translateZ(${halfDepth}px)`,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transformStyle: 'preserve-3d'
          }}
        >
          <GoldSohoLogo size={current.logoSize} variant={variant} showEmblemOnly renderPart="base" />
        </div>

        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            transform: `translateZ(${wordsElevation}px)`,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transformStyle: 'preserve-3d'
          }}
        >
          <GoldSohoLogo size={current.logoSize} variant={variant} showEmblemOnly renderPart="words" />
        </div>

        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transform: `rotateY(180deg) translateZ(${halfDepth}px)`,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transformStyle: 'preserve-3d'
          }}
        >
          <GoldSohoLogo size={current.logoSize} variant={variant} showEmblemOnly renderPart="base" />
        </div>

        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            transform: `rotateY(180deg) translateZ(${wordsElevation}px)`,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transformStyle: 'preserve-3d'
          }}
        >
          <GoldSohoLogo size={current.logoSize} variant={variant} showEmblemOnly renderPart="words" />
        </div>
      </motion.div>
    </div>
  );
};
