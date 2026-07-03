import React from "react";

interface GiroCleanLogoProps {
  className?: string;
  size?: number | string;
  showText?: boolean;
  variant?: "full" | "icon-only" | "horizontal";
}

export default function GiroCleanLogo({
  className = "",
  size,
  showText = true,
  variant = "full"
}: GiroCleanLogoProps) {
  // Dimension handling
  const dimensions = size ? { width: size, height: size } : {};

  // G Icon Swirls and Drops Only
  const renderIcon = () => (
    <svg
      viewBox="0 0 500 500"
      className="w-full h-full select-none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Main Blue Gradients */}
        <linearGradient id="giroGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1054E3" />
          <stop offset="100%" stopColor="#2CB3F7" />
        </linearGradient>
        <linearGradient id="giroGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0B3AA1" />
          <stop offset="100%" stopColor="#1054E3" />
        </linearGradient>
        <linearGradient id="cleanGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2CB3F7" />
          <stop offset="100%" stopColor="#7CD3FD" />
        </linearGradient>
        {/* Circle Gradient */}
        <linearGradient id="circleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1054E3" />
          <stop offset="50%" stopColor="#2CB3F7" />
          <stop offset="100%" stopColor="#1054E3" />
        </linearGradient>
      </defs>

      {/* ⭕ Outer Circle (Ring) */}
      <circle
        cx="250"
        cy="250"
        r="225"
        stroke="url(#circleGrad)"
        strokeWidth="8"
        fill="white"
        fillOpacity="0.95"
      />

      {/* 🌊 The Swirling "G" Water Structure */}
      <g transform="translate(250, 185) scale(0.68) translate(-250, -250)">
        {/* Deep blue back wave */}
        <path
          d="M 240,130 
             C 320,130 380,180 380,250 
             C 380,320 310,380 240,380 
             C 170,380 140,320 140,260 
             C 140,220 160,190 190,175 
             C 200,170 210,185 205,195 
             C 185,210 170,230 170,260 
             C 170,305 200,350 240,350 
             C 285,350 345,305 345,250 
             C 345,195 300,160 240,160 
             C 210,160 195,170 195,170 
             C 185,175 180,160 190,152
             C 205,140 222,130 240,130 Z"
          fill="url(#giroGrad2)"
          opacity="0.95"
        />

        {/* Medium/Cyan overlay wave forming the main "G" curve */}
        <path
          d="M 230,140 
             C 290,140 360,185 360,250 
             C 360,310 300,360 240,360 
             C 190,360 160,320 160,270 
             C 160,250 168,230 180,215
             C 190,205 202,215 195,225
             C 188,235 185,250 185,270
             C 185,305 205,335 240,335
             C 280,335 330,295 330,250
             C 330,205 285,170 230,170
             C 200,170 185,182 185,182
             C 175,188 170,175 180,166
             C 195,152 212,140 230,140 Z"
          fill="url(#giroGrad1)"
        />

        {/* Dynamic Inner Swirl to complete the "G" shape */}
        <path
          d="M 240,200
             C 275,200 305,225 305,260
             C 305,295 270,315 240,315
             C 215,315 200,300 200,280
             C 200,265 210,255 220,255
             C 225,255 230,260 230,268
             C 230,278 235,285 242,285
             C 255,285 275,275 275,260
             C 275,240 255,225 240,225
             C 225,225 215,235 215,235
             C 208,242 198,232 205,222
             C 215,210 228,200 240,200 Z"
          fill="url(#cleanGrad)"
        />

        {/* 💧 Water Drops Left Splash */}
        <path d="M 125,215 C 120,205 110,208 115,218 C 120,228 130,225 125,215 Z" fill="#2CB3F7" />
        <path d="M 145,190 C 140,175 125,180 135,195 C 140,202 150,205 145,190 Z" fill="#1054E3" />
        <path d="M 110,240 C 105,235 100,242 105,247 C 110,252 115,245 110,240 Z" fill="#2CB3F7" />

        {/* 💧 Water Drops Right Splash */}
        <path d="M 355,180 C 362,175 365,185 360,190 C 355,195 350,185 355,180 Z" fill="#2CB3F7" />
        <path d="M 370,205 C 378,198 385,208 378,215 C 372,220 365,212 370,205 Z" fill="#1054E3" />

        {/* ✨ Sparkles / Stars */}
        {/* Left sparkle */}
        <path d="M 85,220 Q 95,220 95,210 Q 95,220 105,220 Q 95,220 95,230 Q 95,220 85,220 Z" fill="#2CB3F7" />
        {/* Right sparkle */}
        <path d="M 390,220 Q 400,220 400,210 Q 400,220 410,220 Q 400,220 400,230 Q 400,220 390,220 Z" fill="#2CB3F7" />
        {/* Center-left minor sparkle */}
        <path d="M 130,270 Q 136,270 136,264 Q 136,270 142,270 Q 136,270 136,276 Q 136,270 130,270 Z" fill="#1054E3" />
      </g>

      {/* ✍️ BRAND NAME "GIRO CLEAN" */}
      <g id="brand-text">
        {/* GIRO in deep blue, CLEAN in sky blue */}
        <text
          x="250"
          y="320"
          textAnchor="middle"
          fontFamily="Outfit, sans-serif"
          fontWeight="900"
          fontSize="48"
          letterSpacing="-1"
        >
          <tspan fill="#1054E3">GIRO </tspan>
          <tspan fill="#2CB3F7">CLEAN</tspan>
        </text>

        {/* Beautiful wave line separator beneath the text */}
        <path
          d="M 120,340 Q 250,360 380,340"
          stroke="#1054E3"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        {/* Secondary wave shadow */}
        <path
          d="M 130,346 Q 250,365 370,346"
          stroke="#2CB3F7"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          opacity="0.6"
        />
      </g>

      {/* 🏷️ SUBTITLES */}
      <g id="subtitles">
        <text
          x="250"
          y="380"
          textAnchor="middle"
          fontFamily="Inter, sans-serif"
          fontWeight="800"
          fontSize="17"
          letterSpacing="2.5"
          fill="#1054E3"
        >
          LIMPEZA E HIGIENIZAÇÃO
        </text>
        <text
          x="250"
          y="405"
          textAnchor="middle"
          fontFamily="Inter, sans-serif"
          fontWeight="800"
          fontSize="19"
          letterSpacing="2.5"
          fill="#2CB3F7"
        >
          DE ESTOFADO
        </text>
      </g>

      {/* 🛋️🛡️🚿 BOTTOM ICONS SECTION */}
      <g id="bottom-icons" transform="translate(0, 58)">
        {/* 🛋️ Couch Icon (Left) */}
        <g transform="translate(195, 362) scale(0.65)">
          <path
            d="M5,18 C5,15 8,12 12,12 L36,12 C40,12 43,15 43,18 L43,26 C43,28 41,30 39,30 L9,30 C7,30 5,28 5,26 Z"
            stroke="#1054E3"
            strokeWidth="3.5"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M9,12 L9,7 C9,5 11,3 13,3 L35,3 C37,3 39,5 39,7 L39,12"
            stroke="#1054E3"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M3,18 L3,32 C3,34 5,36 7,36 L41,36 C43,36 45,34 45,32 L45,18"
            stroke="#1054E3"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Sparkles on the couch */}
          <path d="M 12,6 Q 15,6 15,3 Q 15,6 18,6 Q 15,6 15,9 Q 15,6 12,6 Z" fill="#2CB3F7" />
          <path d="M 33,8 Q 35,8 35,6 Q 35,8 37,8 Q 35,8 35,10 Q 35,8 33,8 Z" fill="#2CB3F7" />
        </g>

        {/* 🛡️ Shield Check Icon (Center) */}
        <g transform="translate(255, 362) scale(0.65)">
          <path
            d="M12,3 L36,3 C36,3 42,15 42,22 C42,33 30,39 24,41 C18,39 6,33 6,22 C6,15 12,3 12,3 Z"
            stroke="#1054E3"
            strokeWidth="3.5"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M15,20 L21,26 L33,14"
            stroke="#1054E3"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>

        {/* 🚿 Extractor Nozzle Spray (Right) */}
        <g transform="translate(315, 362) scale(0.65)">
          {/* Nozzle head */}
          <path
            d="M14,3 L34,3 L30,17 L38,27 C39,29 37,31 35,31 L13,31 C11,31 9,29 10,27 L18,17 Z"
            stroke="#1054E3"
            strokeWidth="3.5"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Inner tube */}
          <path d="M24,3 L24,15" stroke="#1054E3" strokeWidth="3" />
          {/* Spray droplets */}
          <line x1="14" y1="36" x2="16" y2="41" stroke="#2CB3F7" strokeWidth="3" strokeLinecap="round" />
          <line x1="20" y1="37" x2="21" y2="43" stroke="#2CB3F7" strokeWidth="3" strokeLinecap="round" />
          <line x1="28" y1="37" x2="27" y2="43" stroke="#2CB3F7" strokeWidth="3" strokeLinecap="round" />
          <line x1="34" y1="36" x2="32" y2="41" stroke="#2CB3F7" strokeWidth="3" strokeLinecap="round" />
        </g>
      </g>
    </svg>
  );

  const renderHorizontal = () => (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Mini Circular Wave Icon */}
      <div className="w-12 h-12 shrink-0 relative bg-white rounded-full p-1 border border-brand-light/20 shadow-sm flex items-center justify-center">
        <svg
          viewBox="0 0 100 100"
          className="w-10 h-10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Mini G Wave Swirl */}
          <path
            d="M50,15 C70,15 85,30 85,50 C85,70 70,85 50,85 C30,85 15,70 15,50 C15,35 30,20 50,35 C65,45 65,55 50,65 C40,55 45,45 50,45"
            stroke="url(#miniGGrad)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient id="miniGGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1054E3" />
              <stop offset="100%" stopColor="#2CB3F7" />
            </linearGradient>
          </defs>
        </svg>
        {/* Tiny water droplet element */}
        <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-brand-light rounded-full border border-white animate-pulse-soft"></span>
      </div>
      <div>
        <div className="flex items-center gap-1.5">
          <span className="font-display font-black tracking-tight text-xl text-brand-dark flex items-center">
            <span className="text-brand-deep">GIRO</span>&nbsp;
            <span className="text-brand-light">CLEAN</span>
          </span>
          <span className="text-[9px] font-bold uppercase tracking-widest text-brand-deep bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
            MÉTODO PRÓ
          </span>
        </div>
        <p className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">Método Sofá Sempre Novo®</p>
      </div>
    </div>
  );

  const renderIconOnly = () => (
    <div className={`aspect-square flex items-center justify-center bg-white rounded-full p-2 border border-brand-light/30 shadow-md ${className}`} style={dimensions}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M50,15 C70,15 85,30 85,50 C85,70 70,85 50,85 C30,85 15,70 15,50 C15,35 30,20 50,35 C65,45 65,55 50,65 C40,55 45,45 50,45"
          stroke="url(#iconOnlyGrad)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="50" cy="50" r="43" stroke="#1054E3" strokeWidth="2" strokeDasharray="4 4" opacity="0.5" />
        <defs>
          <linearGradient id="iconOnlyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1054E3" />
            <stop offset="100%" stopColor="#2CB3F7" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );

  // Return appropriate variant
  if (variant === "horizontal") {
    return renderHorizontal();
  }

  if (variant === "icon-only") {
    return renderIconOnly();
  }

  return (
    <div className={`w-full max-w-sm mx-auto p-4 ${className}`} style={dimensions}>
      {renderIcon()}
    </div>
  );
}
