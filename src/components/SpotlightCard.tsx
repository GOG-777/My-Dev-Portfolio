import React, { useState, useRef, MouseEvent, ReactNode } from 'react';

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({ children, className = '', onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/30 overflow-hidden transition-colors ${className}`}
    >
      {/* ─── Radial Spotlight Ambient Fill ─── */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(168, 85, 247, 0.07), transparent 45%)`
        }}
      />

      {/* ─── Hairline Border Highlight (Linear Style) ─── */}
      <div
        className="pointer-events-none absolute -inset-px rounded-xl transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          border: '1px solid rgba(168, 85, 247, 0.45)',
          maskImage: `radial-gradient(180px circle at ${position.x}px ${position.y}px, black, transparent)`,
          WebkitMaskImage: `radial-gradient(180px circle at ${position.x}px ${position.y}px, black, transparent)`
        }}
      />

      {/* Card Content */}
      <div className="relative z-10 h-full flex flex-col justify-between p-6 md:p-8">
        {children}
      </div>
    </div>
  );
};

export default SpotlightCard;
