import React from 'react';

interface SohoNeonLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
  showGlow?: boolean;
  alt?: string;
}

export const SohoNeonLogo: React.FC<SohoNeonLogoProps> = ({
  size = 'md',
  className = '',
  showGlow = true,
  alt = 'Soho Lounge Minneapolis'
}) => {
  const sizeMap: Record<string, { px: number; tailwind: string }> = {
    xs: { px: 48, tailwind: 'w-12 h-12' },
    sm: { px: 72, tailwind: 'w-18 h-18' },
    md: { px: 120, tailwind: 'w-28 h-28 sm:w-32 sm:h-32' },
    lg: { px: 180, tailwind: 'w-44 h-44 sm:w-48 sm:h-48' },
    xl: { px: 240, tailwind: 'w-56 h-56 sm:w-64 sm:h-64' },
    '2xl': { px: 320, tailwind: 'w-64 h-64 sm:w-80 sm:h-80 md:w-92 md:h-92' }
  };

  const current = sizeMap[size] || sizeMap.md;
  const imageSrc = '/assets/aistudio/3E0DC485-0338-42BB-A3C1-8F96F4C893F4_31a5725c.jpg';

  return (
    <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
      {/* Ambient Warm Golden Neon Glow Halo */}
      {showGlow && (
        <div className="absolute inset-0 rounded-full bg-amber-500/20 blur-2xl transform scale-95 pointer-events-none" />
      )}

      {/* Official Soho Lounge Neon 3D Emblem */}
      <img
        src={imageSrc}
        alt={alt}
        className={`${current.tailwind} rounded-full object-cover relative z-10 transition-transform duration-500 hover:scale-[1.02] shadow-[0_0_30px_rgba(245,190,90,0.25)]`}
        loading="eager"
      />
    </div>
  );
};
