import { useState, useEffect, useRef } from "react";

/**
 * Animates a number from 0 to `end` when the element scrolls into view.
 * Returns [ref, displayValue].
 */
export function useCountUp(
  end: number,
  duration = 2000,
  suffix = "",
  prefix = "",
): [React.RefObject<HTMLElement | null>, string] {
  const ref = useRef<HTMLElement | null>(null);
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * end));

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  }, [started, end, duration]);

  return [ref, `${prefix}${value}${suffix}`];
}
