import React, { useState } from 'react';

interface GalaxyIconProps {
  className?: string;
  interactive?: boolean;
}

export const GalaxyIcon: React.FC<GalaxyIconProps> = ({ className = "w-8 h-8", interactive = true }) => {
  const [rotations, setRotations] = useState(0);

  const handleInteraction = () => {
    if (!interactive) return;
    setRotations((prev) => prev + 1);
  };

  return (
    <span
      onClick={handleInteraction}
      onMouseEnter={handleInteraction}
      className={`inline-flex items-center justify-center select-none ${
        interactive ? 'cursor-pointer' : ''
      }`}
      style={{
        transform: rotations > 0 ? `rotate(${rotations * 360}deg)` : undefined,
        transition: 'transform 800ms cubic-bezier(0.25, 1, 0.5, 1)'
      }}
      title="GOG 🌌"
      aria-label="GOG Galaxy Mark"
    >
      <svg 
        className={className} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer subtle dark blue glow */}
        <circle cx="50" cy="50" r="45" fill="url(#galaxyBlueGlow)" opacity="0.25" />
        
        {/* Main galaxy spiral - rich dark blue */}
        <path 
          d="M50 20 Q65 30 70 50 Q65 70 50 80 Q35 70 30 50 Q35 30 50 20Z" 
          fill="url(#galaxyBlueGradient)" 
          opacity="0.95"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 50 50"
            to="360 50 50"
            dur="20s"
            repeatCount="indefinite"
          />
        </path>
        
        {/* Inner spiral - deep royal contrast */}
        <path 
          d="M50 30 Q60 35 63 50 Q60 65 50 70 Q40 65 37 50 Q40 35 50 30Z" 
          fill="url(#innerBlueGradient)" 
          opacity="0.95"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 50 50"
            to="-360 50 50"
            dur="15s"
            repeatCount="indefinite"
          />
        </path>
        
        {/* High-visibility stars with dark blue tone for clarity on light mode */}
        <circle cx="25" cy="25" r="1.8" fill="#1e3a8a">
          <animate attributeName="opacity" values="0.4;1;0.4" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="75" cy="30" r="1.5" fill="#1d4ed8">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="70" cy="75" r="1.8" fill="#1e3a8a">
          <animate attributeName="opacity" values="0.4;1;0.4" dur="3.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="30" cy="70" r="1.5" fill="#1d4ed8">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="85" cy="50" r="1.5" fill="#1e3a8a">
          <animate attributeName="opacity" values="0.4;1;0.4" dur="4s" repeatCount="indefinite" />
        </circle>
        <circle cx="15" cy="50" r="1.5" fill="#1d4ed8">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="2.8s" repeatCount="indefinite" />
        </circle>
        
        {/* Center bright core with dark blue rim */}
        <circle cx="50" cy="50" r="8" fill="url(#coreBlueGradient)" stroke="#1e3a8a" strokeWidth="1">
          <animate attributeName="r" values="7.5;9.5;7.5" dur="4s" repeatCount="indefinite" />
        </circle>
        
        {/* High-contrast dark blue gradients */}
        <defs>
          <radialGradient id="galaxyBlueGlow">
            <stop offset="0%" stopColor="#1d4ed8" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
          </radialGradient>
          
          <linearGradient id="galaxyBlueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e3a8a" />
            <stop offset="50%" stopColor="#1d4ed8" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
          
          <linearGradient id="innerBlueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#1d4ed8" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </linearGradient>
          
          <radialGradient id="coreBlueGradient">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#93c5fd" />
            <stop offset="100%" stopColor="#1e40af" />
          </radialGradient>
        </defs>
      </svg>
    </span>
  );
};

export default GalaxyIcon;
