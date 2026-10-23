import { useState, useEffect, useRef } from 'react';
import { playThunderSound } from '../utils/sfx';

export type Theme = 'dark' | 'light';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme') as Theme | null;
      if (saved === 'dark' || saved === 'light') {
        return saved;
      }
      return 'light'; // Default to light mode for visitors
    }
    return 'light';
  });

  const isTransitioningRef = useRef(false);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('thunder-strike'));
      playThunderSound();
    }

    // Toggle theme state right at the blinding apex of the strike
    setTimeout(() => {
      setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    }, 140);

    setTimeout(() => {
      isTransitioningRef.current = false;
    }, 550);
  };

  return { theme, toggleTheme };
}

export default useTheme;
