import { useEffect, useRef } from "react";

/**
 * Applies a subtle parallax translateY to the target element based on scroll.
 * `speed` controls the intensity (0.1 = subtle, 0.5 = strong).
 */
export const useParallax = (speed = 0.15) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip on mobile / reduced motion
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const isTouch =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          const center = rect.top + rect.height / 2;
          const viewCenter = window.innerHeight / 2;
          const offset = (center - viewCenter) * speed;
          ref.current.style.transform = `translateY(${offset}px)`;
        }
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [speed]);

  return ref;
};
