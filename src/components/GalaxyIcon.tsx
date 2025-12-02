import React from 'react';
interface GalaxyIconProps {
  className?: string;
}

const GalaxyIcon: React.FC<GalaxyIconProps> = ({ className = "w-8 h-8" }) => {
  return (
    <svg 
      className={className} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer glow */}
      <circle cx="50" cy="50" r="45" fill="url(#galaxyGlow)" opacity="0.3" />
      
      {/* Main galaxy spiral */}
      <path 
        d="M50 20 Q65 30 70 50 Q65 70 50 80 Q35 70 30 50 Q35 30 50 20Z" 
        fill="url(#galaxyGradient)" 
        opacity="0.8"
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
      
      {/* Inner spiral */}
      <path 
        d="M50 30 Q60 35 63 50 Q60 65 50 70 Q40 65 37 50 Q40 35 50 30Z" 
        fill="url(#innerGradient)" 
        opacity="0.9"
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
      
      {/* Stars */}
      <circle cx="25" cy="25" r="1.5" fill="#fff">
        <animate attributeName="opacity" values="0.3;1;0.3" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="75" cy="30" r="1" fill="#fff">
        <animate attributeName="opacity" values="0.5;1;0.5" dur="2.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="70" cy="75" r="1.5" fill="#fff">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="3.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="30" cy="70" r="1" fill="#fff">
        <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="85" cy="50" r="1" fill="#fff">
        <animate attributeName="opacity" values="0.3;1;0.3" dur="4s" repeatCount="indefinite" />
      </circle>
      <circle cx="15" cy="50" r="1" fill="#fff">
        <animate attributeName="opacity" values="0.7;1;0.7" dur="2.8s" repeatCount="indefinite" />
      </circle>
      
      {/* Center bright core */}
      <circle cx="50" cy="50" r="8" fill="url(#coreGradient)">
        <animate attributeName="r" values="8;10;8" dur="4s" repeatCount="indefinite" />
      </circle>
      
      {/* Gradients */}
      <defs>
        <radialGradient id="galaxyGlow">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
        </radialGradient>
        
        <linearGradient id="galaxyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
        
        <linearGradient id="innerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c4b5fd" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        
        <radialGradient id="coreGradient">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="#ddd6fe" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </radialGradient>
      </defs>
    </svg>
  );
};

export default GalaxyIcon;