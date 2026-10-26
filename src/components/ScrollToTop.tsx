import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      });
      return;
    }
    // Use instant scroll instead of smooth for faster navigation
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;