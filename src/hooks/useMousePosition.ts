import { useState, useEffect, useRef, useCallback } from 'react';

export const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);

  const updateMousePosition = useCallback((ev: MouseEvent) => {
    if (rafId.current !== null) return; // Skip if a frame is already scheduled

    rafId.current = requestAnimationFrame(() => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
      rafId.current = null;
    });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [updateMousePosition]);

  return mousePosition;
};
