import React from 'react';

interface CoderSVGProps {
  className?: string;
}

const CoderSVG: React.FC<CoderSVGProps> = ({ className = "w-full h-full" }) => {
  return (
    <svg 
      className={className} 
      viewBox="0 0 400 300" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Desk */}
      <rect x="50" y="200" width="300" height="15" fill="#4b5563" rx="2" />
      <rect x="60" y="215" width="10" height="85" fill="#374151" />
      <rect x="330" y="215" width="10" height="85" fill="#374151" />
      
      {/* Monitor */}
      <rect x="120" y="100" width="160" height="100" fill="#1f2937" rx="4" />
      <rect x="130" y="110" width="140" height="80" fill="#0f172a" rx="2" />
      
      {/* Code on screen - animated */}
      <g opacity="0.9">
        <line x1="140" y1="120" x2="200" y2="120" stroke="#8b5cf6" strokeWidth="2">
          <animate attributeName="x2" values="140;200;140" dur="3s" repeatCount="indefinite" />
        </line>
        <line x1="140" y1="130" x2="220" y2="130" stroke="#3b82f6" strokeWidth="2">
          <animate attributeName="x2" values="140;220;140" dur="3.5s" repeatCount="indefinite" />
        </line>
        <line x1="140" y1="140" x2="180" y2="140" stroke="#10b981" strokeWidth="2">
          <animate attributeName="x2" values="140;180;140" dur="2.5s" repeatCount="indefinite" />
        </line>
        <line x1="140" y1="150" x2="240" y2="150" stroke="#8b5cf6" strokeWidth="2">
          <animate attributeName="x2" values="140;240;140" dur="4s" repeatCount="indefinite" />
        </line>
        <line x1="140" y1="160" x2="190" y2="160" stroke="#3b82f6" strokeWidth="2">
          <animate attributeName="x2" values="140;190;140" dur="3.2s" repeatCount="indefinite" />
        </line>
        <line x1="140" y1="170" x2="210" y2="170" stroke="#10b981" strokeWidth="2">
          <animate attributeName="x2" values="140;210;140" dur="2.8s" repeatCount="indefinite" />
        </line>
      </g>
      
      {/* Monitor stand */}
      <rect x="185" y="200" width="30" height="15" fill="#374151" />
      
      {/* Keyboard */}
      <rect x="130" y="220" width="140" height="40" fill="#374151" rx="4" />
      <g fill="#1f2937">
        <rect x="140" y="230" width="8" height="8" rx="1" />
        <rect x="152" y="230" width="8" height="8" rx="1" />
        <rect x="164" y="230" width="8" height="8" rx="1" />
        <rect x="176" y="230" width="8" height="8" rx="1" />
        <rect x="188" y="230" width="8" height="8" rx="1" />
        <rect x="200" y="230" width="8" height="8" rx="1" />
        <rect x="212" y="230" width="8" height="8" rx="1" />
        <rect x="224" y="230" width="8" height="8" rx="1" />
        <rect x="236" y="230" width="8" height="8" rx="1" />
        <rect x="248" y="230" width="8" height="8" rx="1" />
        
        <rect x="140" y="242" width="8" height="8" rx="1" />
        <rect x="152" y="242" width="8" height="8" rx="1" />
        <rect x="164" y="242" width="8" height="8" rx="1" />
        <rect x="176" y="242" width="20" height="8" rx="1" />
        <rect x="200" y="242" width="8" height="8" rx="1" />
        <rect x="212" y="242" width="8" height="8" rx="1" />
        <rect x="224" y="242" width="8" height="8" rx="1" />
        <rect x="236" y="242" width="8" height="8" rx="1" />
        <rect x="248" y="242" width="8" height="8" rx="1" />
      </g>
      
      {/* Coffee mug */}
      <ellipse cx="310" cy="240" rx="15" ry="8" fill="#374151" />
      <rect x="295" y="215" width="30" height="25" fill="#6b7280" rx="2" />
      <path d="M325 220 Q335 225 325 230" stroke="#6b7280" strokeWidth="3" fill="none" />
      
      {/* Steam from coffee - animated */}
      <g opacity="0.6">
        <path d="M305 210 Q307 200 305 190" stroke="#9ca3af" strokeWidth="1.5" fill="none">
          <animate attributeName="opacity" values="0.6;0.2;0.6" dur="2s" repeatCount="indefinite" />
        </path>
        <path d="M315 210 Q313 200 315 190" stroke="#9ca3af" strokeWidth="1.5" fill="none">
          <animate attributeName="opacity" values="0.4;0.6;0.4" dur="2.5s" repeatCount="indefinite" />
        </path>
      </g>
      
      {/* Floating code symbols */}
      <text x="80" y="80" fill="#8b5cf6" fontSize="24" fontFamily="monospace" opacity="0.3">
        {`{}`}
        <animate attributeName="y" values="80;70;80" dur="3s" repeatCount="indefinite" />
      </text>
      <text x="300" y="70" fill="#3b82f6" fontSize="20" fontFamily="monospace" opacity="0.3">
        {`</>`}
        <animate attributeName="y" values="70;60;70" dur="3.5s" repeatCount="indefinite" />
      </text>
      <text x="70" y="150" fill="#10b981" fontSize="18" fontFamily="monospace" opacity="0.3">
        {`()`}
        <animate attributeName="y" values="150;140;150" dur="2.5s" repeatCount="indefinite" />
      </text>
    </svg>
  );
};

export default CoderSVG;