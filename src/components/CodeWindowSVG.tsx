import React from 'react';

interface CodeWindowSVGProps {
  className?: string;
}

const CodeWindowSVG: React.FC<CodeWindowSVGProps> = ({ className = "w-full h-full" }) => {
  return (
    <svg 
      className={className} 
      viewBox="0 0 400 300" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Terminal window */}
      <rect x="30" y="40" width="340" height="240" fill="#1e293b" rx="8" />
      
      {/* Title bar */}
      <rect x="30" y="40" width="340" height="30" fill="#0f172a" rx="8" />
      <rect x="30" y="55" width="340" height="15" fill="#0f172a" />
      
      {/* Window controls */}
      <circle cx="50" cy="55" r="5" fill="#ef4444" />
      <circle cx="70" cy="55" r="5" fill="#f59e0b" />
      <circle cx="90" cy="55" r="5" fill="#10b981" />
      
      {/* File name */}
      <text x="200" y="60" fill="#94a3b8" fontSize="12" textAnchor="middle" fontFamily="monospace">
        app.jsx
      </text>
      
      {/* Line numbers */}
      <g fill="#475569" fontFamily="monospace" fontSize="14">
        <text x="45" y="95">1</text>
        <text x="45" y="115">2</text>
        <text x="45" y="135">3</text>
        <text x="45" y="155">4</text>
        <text x="45" y="175">5</text>
        <text x="45" y="195">6</text>
        <text x="45" y="215">7</text>
        <text x="45" y="235">8</text>
        <text x="45" y="255">9</text>
      </g>
      
      {/* Code content */}
      <g fontFamily="monospace" fontSize="14">
        {/* Line 1 */}
        <text x="65" y="95">
          <tspan fill="#c792ea">import</tspan>
          <tspan fill="#89ddff"> {'{'} </tspan>
          <tspan fill="#82aaff">useState</tspan>
          <tspan fill="#89ddff"> {'}'} </tspan>
          <tspan fill="#c792ea">from</tspan>
          <tspan fill="#c3e88d"> 'react'</tspan>
        </text>
        
        {/* Line 2 - blank */}
        
        {/* Line 3 */}
        <text x="65" y="135">
          <tspan fill="#c792ea">const</tspan>
          <tspan fill="#82aaff"> App </tspan>
          <tspan fill="#89ddff">= () ={'>'} {'{'}</tspan>
        </text>
        
        {/* Line 4 */}
        <text x="80" y="155">
          <tspan fill="#c792ea">const</tspan>
          <tspan fill="#89ddff"> [</tspan>
          <tspan fill="#f07178">data</tspan>
          <tspan fill="#89ddff">, </tspan>
          <tspan fill="#82aaff">setData</tspan>
          <tspan fill="#89ddff">] = </tspan>
          <tspan fill="#82aaff">useState</tspan>
          <tspan fill="#89ddff">([])</tspan>
        </text>
        
        {/* Line 5 - blank */}
        
        {/* Line 6 */}
        <text x="80" y="195">
          <tspan fill="#c792ea">return</tspan>
          <tspan fill="#89ddff"> (</tspan>
        </text>
        
        {/* Line 7 */}
        <text x="95" y="215">
          <tspan fill="#89ddff">{'<'}</tspan>
          <tspan fill="#f07178">div</tspan>
          <tspan fill="#89ddff">{'>'}</tspan>
          <tspan fill="#c3e88d">Hello World</tspan>
          <tspan fill="#89ddff">{'</'}</tspan>
          <tspan fill="#f07178">div</tspan>
          <tspan fill="#89ddff">{'>'}</tspan>
        </text>
        
        {/* Line 8 */}
        <text x="80" y="235">
          <tspan fill="#89ddff">)</tspan>
        </text>
        
        {/* Line 9 */}
        <text x="65" y="255">
          <tspan fill="#89ddff">{'}'}</tspan>
        </text>
      </g>
      
      {/* Cursor blinking */}
      <rect x="130" y="245" width="8" height="15" fill="#82aaff">
        <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite" />
      </rect>
      
      {/* Floating brackets */}
      <text x="360" y="100" fill="#8b5cf6" fontSize="32" opacity="0.2" fontFamily="monospace">
        {'{'}
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0,0; 5,-5; 0,0"
          dur="3s"
          repeatCount="indefinite"
        />
      </text>
      
      <text x="20" y="180" fill="#3b82f6" fontSize="28" opacity="0.2" fontFamily="monospace">
        {'}'}
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0,0; -5,5; 0,0"
          dur="3.5s"
          repeatCount="indefinite"
        />
      </text>
    </svg>
  );
};

export default CodeWindowSVG;