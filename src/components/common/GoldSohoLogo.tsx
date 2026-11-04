import React from 'react';

interface GoldSohoLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'gold' | 'white' | 'dark';
  subtitle?: string;
  showEmblemOnly?: boolean;
  spinning?: boolean;
  spinSpeed?: number;
  renderPart?: 'all' | 'base' | 'words';
}

export const GoldSohoLogo: React.FC<GoldSohoLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'gold',
  subtitle,
  showEmblemOnly = false,
  spinning = false,
  spinSpeed = 10,
  renderPart = 'all'
}) => {
  const sizeMap = {
    xs: { dimension: 56, text: 'text-[10px]' },
    sm: { dimension: 84, text: 'text-xs' },
    md: { dimension: 140, text: 'text-sm' },
    lg: { dimension: 210, text: 'text-base' },
    xl: { dimension: 280, text: 'text-lg' }
  };

  const currentSize = sizeMap[size] || sizeMap.md;
  const gradientId = `sohoRingGrad-${size}-${variant}`;
  const textGradId = `sohoTextGrad-${size}-${variant}`;
  const popOutFilterId = `soho3DPopOut-${size}-${variant}`;

  const isWhite = variant === 'white';
  const isDark = variant === 'dark';

  // EXACT ORIGINAL Soho Brand Color Palette
  const ringPrimary = isWhite ? '#FFFFFF' : isDark ? '#27272A' : `url(#${gradientId})`;
  const textPrimary = isWhite ? '#FFFFFF' : isDark ? '#18181B' : `url(#${textGradId})`;
  const sublineColor = isWhite ? '#E5E5E5' : isDark ? '#3F3F46' : '#FCE7A1';
  const dividerStroke = isWhite ? '#FFFFFF' : isDark ? '#3F3F46' : '#F6C466';

  const showBase = renderPart === 'all' || renderPart === 'base';
  const showWords = renderPart === 'all' || renderPart === 'words';

  return (
    <div
      className={`inline-flex flex-col items-center justify-center select-none text-center ${className}`}
      style={spinning ? { perspective: '1200px' } : undefined}
    >
      {/* Official Soho Lounge Circular Logo - 3D Words */}
      <svg
        viewBox="0 0 300 300"
        width={currentSize.dimension}
        height={currentSize.dimension}
        className={`overflow-visible ${spinning ? 'soho-spinning-logo' : ''}`}
        style={
          spinning
            ? {
                animation: `sohoSpin3D ${spinSpeed}s linear infinite`,
                transformStyle: 'preserve-3d'
              }
            : undefined
        }
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* ORIGINAL Warm Gold Gradient for Ring */}
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF1B8" />
            <stop offset="35%" stopColor="#F6C466" />
            <stop offset="70%" stopColor="#E5A63B" />
            <stop offset="100%" stopColor="#F7CD77" />
          </linearGradient>

          {/* ORIGINAL Warm Gold Gradient for Typography */}
          <linearGradient id={textGradId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFF4D0" />
            <stop offset="45%" stopColor="#FDE397" />
            <stop offset="85%" stopColor="#F5BF5B" />
            <stop offset="100%" stopColor="#EAA738" />
          </linearGradient>

          {/* 3D Pop-Out Raised Letter Filter */}
          <filter id={popOutFilterId} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="-1.5" stdDeviation="0.5" floodColor="#FFFFFF" floodOpacity="0.65" />
            <feDropShadow dx="0" dy="4.5" stdDeviation="2" floodColor="#000000" floodOpacity="0.95" />
          </filter>
        </defs>

        <style>{`
          @keyframes sohoSpin3D {
            0% { transform: rotateY(0deg); }
            100% { transform: rotateY(360deg); }
          }
          .soho-brand-mark-${size}-${variant} {
            font-family: 'Antonio', 'Bebas Neue', 'Alternate Gothic', 'Arial Narrow', sans-serif;
            font-weight: 700;
            letter-spacing: 6px;
            text-anchor: middle;
            fill: ${textPrimary};
            filter: url(#${popOutFilterId});
          }
          .soho-brand-sub-${size}-${variant} {
            font-family: 'Montserrat', 'Antonio', sans-serif;
            font-size: 11.5px;
            font-weight: 600;
            letter-spacing: 6.5px;
            text-anchor: middle;
            fill: ${sublineColor};
            filter: url(#${popOutFilterId});
          }
        `}</style>

        {/* Clean Soho Circular Ring (Strictly Single Circle, No Extra Frame) */}
        {showBase && (
          <circle
            cx="150"
            cy="150"
            r="132"
            fill={isDark ? '#121217' : '#070709'}
            stroke={ringPrimary}
            strokeWidth="2.2"
          />
        )}

        {/* 3D Raised Words: "SO" over "HO" with Multi-facet Pop-Out Geometry */}
        {showWords && (
          <g>
            {/* SO 3D Stepped Extrusion Facets */}
            <text x="153" y="136" fontSize="94" fontFamily="'Antonio', 'Bebas Neue', sans-serif" fontWeight="700" letterSpacing="6px" textAnchor="middle" fill="#4D2E04">SO</text>
            <text x="153" y="135" fontSize="94" fontFamily="'Antonio', 'Bebas Neue', sans-serif" fontWeight="700" letterSpacing="6px" textAnchor="middle" fill="#6E4407">SO</text>
            <text x="153" y="134" fontSize="94" fontFamily="'Antonio', 'Bebas Neue', sans-serif" fontWeight="700" letterSpacing="6px" textAnchor="middle" fill="#996312">SO</text>
            <text x="153" y="133" fontSize="94" fontFamily="'Antonio', 'Bebas Neue', sans-serif" fontWeight="700" letterSpacing="6px" textAnchor="middle" fill="#C4861F">SO</text>
            {/* SO Raised Front Face with Original Gold Gradient */}
            <text x="153" y="132" fontSize="94" className={`soho-brand-mark-${size}-${variant}`}>SO</text>

            {/* HO 3D Stepped Extrusion Facets */}
            <text x="153" y="222" fontSize="94" fontFamily="'Antonio', 'Bebas Neue', sans-serif" fontWeight="700" letterSpacing="6px" textAnchor="middle" fill="#4D2E04">HO</text>
            <text x="153" y="221" fontSize="94" fontFamily="'Antonio', 'Bebas Neue', sans-serif" fontWeight="700" letterSpacing="6px" textAnchor="middle" fill="#6E4407">HO</text>
            <text x="153" y="220" fontSize="94" fontFamily="'Antonio', 'Bebas Neue', sans-serif" fontWeight="700" letterSpacing="6px" textAnchor="middle" fill="#996312">HO</text>
            <text x="153" y="219" fontSize="94" fontFamily="'Antonio', 'Bebas Neue', sans-serif" fontWeight="700" letterSpacing="6px" textAnchor="middle" fill="#C4861F">HO</text>
            {/* HO Raised Front Face with Original Gold Gradient */}
            <text x="153" y="218" fontSize="94" className={`soho-brand-mark-${size}-${variant}`}>HO</text>

            {/* Subtitle Line: — LOUNGE — 3D Popping Out */}
            <line
              x1="74"
              y1="237"
              x2="98"
              y2="237"
              stroke={dividerStroke}
              strokeWidth="1.5"
              strokeLinecap="round"
              filter={`url(#${popOutFilterId})`}
            />

            <text x="153" y="243" fontFamily="'Montserrat', 'Antonio', sans-serif" fontSize="11.5px" fontWeight="600" letterSpacing="6.5px" textAnchor="middle" fill="#6E4407">LOUNGE</text>
            <text x="153" y="242" fontFamily="'Montserrat', 'Antonio', sans-serif" fontSize="11.5px" fontWeight="600" letterSpacing="6.5px" textAnchor="middle" fill="#A87319">LOUNGE</text>
            <text x="153" y="241" className={`soho-brand-sub-${size}-${variant}`}>LOUNGE</text>

            <line
              x1="202"
              y1="237"
              x2="226"
              y2="237"
              stroke={dividerStroke}
              strokeWidth="1.5"
              strokeLinecap="round"
              filter={`url(#${popOutFilterId})`}
            />
          </g>
        )}
      </svg>

      {/* Optional contextual subtitle for sections or portal headers */}
      {!showEmblemOnly && subtitle && (
        <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.3em] text-amber-400/90 uppercase mt-2">
          {subtitle}
        </span>
      )}
    </div>
  );
};
