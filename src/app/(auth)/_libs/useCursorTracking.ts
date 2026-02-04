import { useState, useEffect, useRef } from "react";

export function useCursorTracking() {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      setCursor({
        x: (e.clientX - cx) / (window.innerWidth * 0.4),
        y: (e.clientY - cy) / (window.innerHeight * 0.4),
      });
    }

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return { cursor, ref };
}
