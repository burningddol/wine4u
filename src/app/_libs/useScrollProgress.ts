'use client';

import { useState, useEffect, useCallback } from 'react';

type ScrollHeight = number;

export function useScrollProgress(
  containerRef: React.RefObject<HTMLDivElement | null>,
  scrollHeight: ScrollHeight,
) {
  const [progress, setProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const totalScrollDistance =
      (scrollHeight / 100) * windowHeight - windowHeight;
    const scrolled = -rect.top;
    const rawProgress =
      Math.round((scrolled / totalScrollDistance) * 1000) / 1000; //3째자리에서 반올림, 성능구려져서

    setProgress(Math.max(0, Math.min(1, rawProgress)));
  }, [containerRef, scrollHeight]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return { progress, isComplete: progress >= 1 };
}
