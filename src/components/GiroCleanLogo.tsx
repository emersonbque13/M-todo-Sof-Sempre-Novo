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

  // Redesign: SSV Double-Circle and "MÉTODO SOFÁ SEMPRE NOVO" with "LIMPAR • CONSERVAR • RESTAURAR"
  const renderIcon = () => (
    <svg
      viewBox="0 0 500 500"
      className="w-full h-full select-none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Double circle monogram at top */}
      <circle cx="250" cy="110" r="60" stroke="#1c3879" strokeWidth="3" fill="white" />
      <circle cx="250" cy="110" r="54" stroke="#1c3879" strokeWidth="1" strokeDasharray="4 4" />
      <text
        x="250"
        y="126"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontWeight="bold"
        fontSize="50"
        fill="#1c3879"
      >
        SSV
      </text>

      {/* MÉTODO */}
      <text
        x="250"
        y="235"
        textAnchor="middle"
        fontFamily="Inter, sans-serif"
        fontWeight="bold"
        fontSize="18"
        letterSpacing="8"
        fill="#505f7d"
      >
        MÉTODO
      </text>

      {/* SOFÁ */}
      <text
        x="250"
        y="325"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontWeight="bold"
        fontSize="90"
        letterSpacing="1"
        fill="#1c3879"
      >
        SOFÁ
      </text>

      {/* SEMPRE NOVO */}
      <text
        x="250"
        y="385"
        textAnchor="middle"
        fontFamily="Inter, sans-serif"
        fontWeight="900"
        fontSize="34"
        letterSpacing="3"
        fill="#1c3879"
      >
        SEMPRE NOVO
      </text>

      {/* Divider */}
      <line x1="150" y1="415" x2="350" y2="415" stroke="#e2e8f0" strokeWidth="2" />

      {/* LIMPAR • CONSERVAR • RESTAURAR */}
      <text
        x="250"
        y="445"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontStyle="italic"
        fontWeight="bold"
        fontSize="15"
        letterSpacing="1"
        fill="#707d95"
      >
        LIMPAR  •  CONSERVAR  •  RESTAURAR
      </text>
    </svg>
  );

  const renderHorizontal = () => (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Mini Double Circle SSV Badge */}
      <div className="w-12 h-12 shrink-0 relative bg-white rounded-full border border-slate-200 shadow-sm flex items-center justify-center">
        <div className="absolute inset-[2.5px] rounded-full border border-dashed border-indigo-900/35"></div>
        <span className="font-serif font-bold text-base text-indigo-950 tracking-tighter">SSV</span>
      </div>
      <div>
        <div className="flex items-center gap-1.5">
          <span className="font-display font-black tracking-tight text-[15px] sm:text-base text-indigo-950 flex items-center">
            <span className="text-indigo-950 font-bold">MÉTODO</span>&nbsp;
            <span className="text-indigo-800 font-extrabold">SOFÁ SEMPRE NOVO</span>
          </span>
          <span className="text-[8px] font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100 shrink-0">
            PRÓ
          </span>
        </div>
        <p className="text-[9px] text-slate-400 font-bold tracking-wider uppercase">LIMPAR  •  CONSERVAR  •  RESTAURAR</p>
      </div>
    </div>
  );

  const renderIconOnly = () => (
    <div className={`aspect-square flex items-center justify-center bg-white rounded-full relative border border-slate-200 shadow-md ${className}`} style={dimensions}>
      <div className="absolute inset-[3px] rounded-full border border-dashed border-indigo-900/40"></div>
      <span className="font-serif font-black text-indigo-950 text-base tracking-tighter">SSV</span>
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
