import React from 'react';

const DeveloperThinking: React.FC = () => {
  return (
    <svg viewBox="0 0 600 500" className="w-full h-auto">
      {/* Person - Head */}
      <circle cx="300" cy="200" r="40" fill="#4299e1" opacity="0.9" />
      
      {/* Body */}
      <rect x="270" y="240" width="60" height="100" rx="8" fill="#3182ce" opacity="0.9" />
      
      {/* Arms */}
      <rect x="220" y="260" width="50" height="15" rx="7" fill="#3182ce" opacity="0.9">
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="-20 270 267; -25 270 267; -20 270 267"
          dur="3s"
          repeatCount="indefinite"
        />
      </rect>
      <rect x="330" y="260" width="50" height="15" rx="7" fill="#3182ce" opacity="0.9">
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="20 330 267; 25 330 267; 20 330 267"
          dur="3s"
          repeatCount="indefinite"
        />
      </rect>
      
      {/* Legs */}
      <rect x="275" y="340" width="20" height="80" rx="5" fill="#2c5282" opacity="0.9" />
      <rect x="305" y="340" width="20" height="80" rx="5" fill="#2c5282" opacity="0.9" />
      
      {/* Thought bubble */}
      <circle cx="380" cy="140" r="50" fill="#4a5568" opacity="0.8" />
      <circle cx="420" cy="120" r="40" fill="#4a5568" opacity="0.8" />
      <circle cx="430" cy="160" r="35" fill="#4a5568" opacity="0.8" />
      
      <circle cx="340" cy="170" r="8" fill="#4a5568" opacity="0.6">
        <animate attributeName="opacity" values="0.6;0.3;0.6" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="355" cy="160" r="12" fill="#4a5568" opacity="0.7">
        <animate attributeName="opacity" values="0.7;0.4;0.7" dur="2s" repeatCount="indefinite" begin="0.2s" />
      </circle>
      
      {/* Code in thought bubble */}
      <g opacity="0.9">
        <text x="370" y="130" fontSize="24" fill="#a78bfa" fontFamily="monospace" fontWeight="bold">
          {'if'}
        </text>
        <text x="395" y="130" fontSize="20" fill="#60a5fa" fontFamily="monospace">
          {'('}
        </text>
        <text x="360" y="155" fontSize="18" fill="#06b6d4" fontFamily="monospace">
          {'code'}
        </text>
        <text x="395" y="155" fontSize="20" fill="#60a5fa" fontFamily="monospace">
          {')'}
        </text>
        <text x="420" y="145" fontSize="20" fill="#a78bfa" fontFamily="monospace">
          {'{'}
        </text>
      </g>
      
      {/* Laptop on ground */}
      <rect x="180" y="400" width="100" height="60" rx="5" fill="#2d3748" opacity="0.9" />
      <rect x="185" y="405" width="90" height="50" rx="3" fill="#1a202c" />
      
      {/* Laptop screen glow */}
      <g className="screen-lines">
        <rect x="195" y="415" width="40" height="3" rx="2" fill="#a78bfa" opacity="0.8">
          <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite" />
        </rect>
        <rect x="195" y="425" width="55" height="3" rx="2" fill="#60a5fa" opacity="0.7">
          <animate attributeName="opacity" values="0.7;0.3;0.7" dur="2.5s" repeatCount="indefinite" />
        </rect>
        <rect x="195" y="435" width="45" height="3" rx="2" fill="#06b6d4" opacity="0.8">
          <animate attributeName="opacity" values="0.8;0.4;0.8" dur="2.2s" repeatCount="indefinite" />
        </rect>
      </g>
      
      {/* Books stack */}
      <rect x="380" y="390" width="80" height="15" rx="2" fill="#5a67d8" opacity="0.8" />
      <rect x="385" y="375" width="75" height="15" rx="2" fill="#667eea" opacity="0.8" />
      <rect x="390" y="360" width="70" height="15" rx="2" fill="#764ba2" opacity="0.8" />
      
      {/* Book labels */}
      <text x="395" y="383" fontSize="8" fill="white" fontFamily="sans-serif">ALGORITHMS</text>
      <text x="400" y="398" fontSize="8" fill="white" fontFamily="sans-serif">DATA STRUCT</text>
      
      {/* Floating mathematical symbols */}
      <g opacity="0.6">
        <text x="140" y="180" fontSize="24" fill="#a78bfa" fontFamily="monospace">
          {'∑'}
          <animate attributeName="y" values="180;170;180" dur="3s" repeatCount="indefinite" />
        </text>
        <text x="500" y="200" fontSize="22" fill="#60a5fa" fontFamily="monospace">
          {'∫'}
          <animate attributeName="y" values="200;190;200" dur="3.5s" repeatCount="indefinite" />
        </text>
        <text x="480" y="300" fontSize="20" fill="#06b6d4" fontFamily="monospace">
          {'√'}
          <animate attributeName="y" values="300;290;300" dur="2.8s" repeatCount="indefinite" />
        </text>
        <text x="120" y="280" fontSize="18" fill="#a78bfa" fontFamily="monospace">
          {'≠'}
          <animate attributeName="y" values="280;270;280" dur="3.2s" repeatCount="indefinite" />
        </text>
      </g>
      
      {/* Light bulb - idea moment */}
      <g className="lightbulb" opacity="0.9">
        <ellipse cx="450" cy="80" rx="15" ry="20" fill="#fbbf24" opacity="0.8">
          <animate attributeName="opacity" values="0.8;0.4;0.8" dur="1.5s" repeatCount="indefinite" />
        </ellipse>
        <rect x="445" y="95" width="10" height="8" rx="2" fill="#78716c" />
        
        {/* Light rays */}
        <line x1="430" y1="70" x2="420" y2="60" stroke="#fbbf24" strokeWidth="2" opacity="0.6">
          <animate attributeName="opacity" values="0.6;0.2;0.6" dur="1.5s" repeatCount="indefinite" />
        </line>
        <line x1="470" y1="70" x2="480" y2="60" stroke="#fbbf24" strokeWidth="2" opacity="0.6">
          <animate attributeName="opacity" values="0.6;0.2;0.6" dur="1.5s" repeatCount="indefinite" />
        </line>
        <line x1="425" y1="85" x2="410" y2="85" stroke="#fbbf24" strokeWidth="2" opacity="0.6">
          <animate attributeName="opacity" values="0.6;0.2;0.6" dur="1.5s" repeatCount="indefinite" />
        </line>
        <line x1="475" y1="85" x2="490" y2="85" stroke="#fbbf24" strokeWidth="2" opacity="0.6">
          <animate attributeName="opacity" values="0.6;0.2;0.6" dur="1.5s" repeatCount="indefinite" />
        </line>
      </g>
    </svg>
  );
};

export default DeveloperThinking;