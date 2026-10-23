import { useState, useEffect, useCallback } from 'react';

interface BoltPaths {
  trunk: string;
  branches: string[];
}

export const ThunderStrike = () => {
  const [striking, setStriking] = useState(false);
  const [paths, setPaths] = useState<BoltPaths>({ trunk: '', branches: [] });
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });

  const generateLightning = useCallback(() => {
    const w = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const h = typeof window !== 'undefined' ? window.innerHeight : 800;
    setDimensions({ width: w, height: h });

    // Generate main trunk from top to bottom
    const steps = 12;
    let curX = w * (0.45 + Math.random() * 0.1);
    let curY = 0;
    const stepY = h / steps;
    const trunkPoints: [number, number][] = [[curX, curY]];

    // Max horizontal jitter scales proportionally to viewport width
    const jitterMax = Math.min(w * 0.12, 90);

    for (let i = 1; i <= steps; i++) {
      curY = i * stepY;
      // Zigzag jitter
      curX += (Math.random() - 0.5) * jitterMax * 2;
      // Keep within viewport bounds
      curX = Math.max(w * 0.08, Math.min(w * 0.92, curX));
      trunkPoints.push([curX, curY]);
    }

    const trunkPath = trunkPoints.reduce((acc, [x, y], idx) => {
      return idx === 0 ? `M ${x.toFixed(1)} ${y.toFixed(1)}` : `${acc} L ${x.toFixed(1)} ${y.toFixed(1)}`;
    }, '');

    // Generate 3-4 side branches splitting from trunk points
    const branches: string[] = [];
    const branchIndices = [2, 4, 6, 8];

    branchIndices.forEach((idx) => {
      if (idx >= trunkPoints.length - 1) return;
      const [startX, startY] = trunkPoints[idx];
      const dir = Math.random() > 0.5 ? 1 : -1;
      let bx = startX;
      let by = startY;
      const branchPoints: [number, number][] = [[bx, by]];
      const bSteps = 4 + Math.floor(Math.random() * 3);
      const bStepY = (h * 0.05);

      for (let s = 1; s <= bSteps; s++) {
        by += bStepY * (0.8 + Math.random() * 0.4);
        bx += dir * (Math.random() * jitterMax * 0.9 + 15);
        bx = Math.max(w * 0.04, Math.min(w * 0.96, bx));
        branchPoints.push([bx, by]);
      }

      branches.push(
        branchPoints.reduce((acc, [x, y], bIdx) => {
          return bIdx === 0 ? `M ${x.toFixed(1)} ${y.toFixed(1)}` : `${acc} L ${x.toFixed(1)} ${y.toFixed(1)}`;
        }, '')
      );
    });

    return { trunk: trunkPath, branches };
  }, []);

  useEffect(() => {
    const handleStrike = () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }
      const newPaths = generateLightning();
      setPaths(newPaths);
      setStriking(true);

      const timer = setTimeout(() => {
        setStriking(false);
      }, 550);
      return () => clearTimeout(timer);
    };

    window.addEventListener('thunder-strike', handleStrike);
    return () => window.removeEventListener('thunder-strike', handleStrike);
  }, [generateLightning]);

  if (!striking) return null;

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden" 
      aria-hidden="true"
    >
      {/* ─── Sky Flash Overlay ─── */}
      <div 
        className="absolute inset-0 bg-cyan-200/40 dark:bg-cyan-100/30 mix-blend-screen"
        style={{
          animation: 'thunderFlash 500ms ease-out forwards'
        }}
      />

      {/* ─── Responsive Procedural Lightning Bolt ─── */}
      <svg 
        className="absolute inset-0 w-full h-full"
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          animation: 'lightningBolt 500ms cubic-bezier(0.1, 0.9, 0.2, 1) forwards'
        }}
      >
        <defs>
          <filter id="superGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="14" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer electrical blue halo */}
        <g 
          filter="url(#superGlow)" 
          stroke="#38bdf8" 
          strokeWidth="6" 
          strokeLinecap="round" 
          strokeLinejoin="miter" 
          opacity="0.85"
        >
          {paths.trunk && <path d={paths.trunk} />}
          {paths.branches.map((b, i) => (
            <path key={i} d={b} strokeWidth="4" opacity="0.75" />
          ))}
        </g>

        {/* Core blinding white ion channel */}
        <g 
          stroke="#ffffff" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="miter"
        >
          {paths.trunk && <path d={paths.trunk} />}
          {paths.branches.map((b, i) => (
            <path key={i} d={b} strokeWidth="1.8" />
          ))}
        </g>
      </svg>
    </div>
  );
};

export default ThunderStrike;
