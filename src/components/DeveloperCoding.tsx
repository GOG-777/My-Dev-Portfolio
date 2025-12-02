import React from 'react';

const DeveloperCoding: React.FC = (): React.JSX.Element => {
  return (
    <svg viewBox="0 0 600 500" className="w-full h-auto">
      {/* Desk */}
      <rect x="100" y="300" width="400" height="20" rx="5" fill="#4a5568" />
      <rect x="120" y="320" width="10" height="150" rx="2" fill="#2d3748" />
      <rect x="470" y="320" width="10" height="150" rx="2" fill="#2d3748" />
      
      {/* Monitor */}
      <rect x="200" y="150" width="200" height="140" rx="8" fill="#1a202c" stroke="#4a5568" strokeWidth="3" />
      <rect x="210" y="160" width="180" height="120" rx="4" fill="#0f1419" />
      
      {/* Monitor stand */}
      <rect x="280" y="290" width="40" height="10" rx="2" fill="#2d3748" />
      <rect x="295" y="270" width="10" height="30" rx="2" fill="#2d3748" />
      
      {/* Code lines on screen with animation */}
      <g className="code-animation">
        <rect x="220" y="170" width="80" height="4" rx="2" fill="#a78bfa" opacity="0.9">
          <animate attributeName="width" values="80;100;80" dur="3s" repeatCount="indefinite" />
        </rect>
        <rect x="220" y="185" width="120" height="4" rx="2" fill="#60a5fa" opacity="0.8">
          <animate attributeName="width" values="120;140;120" dur="2.5s" repeatCount="indefinite" />
        </rect>
        <rect x="220" y="200" width="100" height="4" rx="2" fill="#06b6d4" opacity="0.9">
          <animate attributeName="width" values="100;120;100" dur="2.8s" repeatCount="indefinite" />
        </rect>
        <rect x="220" y="215" width="90" height="4" rx="2" fill="#a78bfa" opacity="0.8">
          <animate attributeName="width" values="90;110;90" dur="3.2s" repeatCount="indefinite" />
        </rect>
        <rect x="220" y="230" width="130" height="4" rx="2" fill="#60a5fa" opacity="0.9">
          <animate attributeName="width" values="130;150;130" dur="2.7s" repeatCount="indefinite" />
        </rect>
        <rect x="220" y="245" width="110" height="4" rx="2" fill="#06b6d4" opacity="0.8">
          <animate attributeName="width" values="110;130;110" dur="3.1s" repeatCount="indefinite" />
        </rect>
        <rect x="220" y="260" width="95" height="4" rx="2" fill="#a78bfa" opacity="0.9">
          <animate attributeName="width" values="95;115;95" dur="2.9s" repeatCount="indefinite" />
        </rect>
      </g>
      
      {/* Cursor blinking */}
      <rect x="315" y="260" width="2" height="4" fill="#06b6d4">
        <animate attributeName="opacity" values="1;0;1" dur="0.8s" repeatCount="indefinite" />
      </rect>
      
      {/* Person sitting - simplified */}
      <circle cx="300" cy="340" r="25" fill="#60a5fa" opacity="0.9" />
      <rect x="280" y="365" width="40" height="60" rx="5" fill="#4299e1" opacity="0.9" />
      
      {/* Arms typing */}
      <g className="arm-left">
        <rect x="250" y="380" width="35" height="12" rx="6" fill="#4299e1" opacity="0.9">
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 285 386; -5 285 386; 0 285 386"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g className="arm-right">
        <rect x="315" y="380" width="35" height="12" rx="6" fill="#4299e1" opacity="0.9">
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 315 386; 5 315 386; 0 315 386"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      
      {/* Keyboard */}
      <rect x="240" y="390" width="120" height="40" rx="5" fill="#2d3748" />
      <rect x="245" y="395" width="110" height="30" rx="3" fill="#1a202c" />
      
      {/* Coffee cup */}
      <ellipse cx="430" cy="285" rx="15" ry="8" fill="#4a5568" />
      <rect x="415" y="265" width="30" height="20" rx="3" fill="#4a5568" />
      <path d="M 445 270 Q 460 270 460 280 Q 460 285 455 285" fill="none" stroke="#4a5568" strokeWidth="3" />
      
      {/* Steam from coffee */}
      <path d="M 425 255 Q 425 245 430 240" fill="none" stroke="#60a5fa" strokeWidth="2" opacity="0.6">
        <animate attributeName="opacity" values="0.6;0.2;0.6" dur="2s" repeatCount="indefinite" />
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0,0; 0,-10; 0,0"
          dur="2s"
          repeatCount="indefinite"
        />
      </path>
      
      {/* Floating code symbols */}
      <text x="150" y="120" fontSize="20" fill="#a78bfa" opacity="0.5" fontFamily="monospace">
        {'</>'}
        <animate attributeName="y" values="120;110;120" dur="3s" repeatCount="indefinite" />
      </text>
      <text x="440" y="100" fontSize="18" fill="#60a5fa" opacity="0.4" fontFamily="monospace">
        {'{}'}
        <animate attributeName="y" values="100;90;100" dur="3.5s" repeatCount="indefinite" />
      </text>
      <text x="480" y="180" fontSize="16" fill="#06b6d4" opacity="0.5" fontFamily="monospace">
        {'()'}
        <animate attributeName="y" values="180;170;180" dur="2.8s" repeatCount="indefinite" />
      </text>
    </svg>
  );
};

export default DeveloperCoding;