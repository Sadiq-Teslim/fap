import { useEffect } from "react";

/**
 * Lerp-based smooth scroll — makes scrolling feel slightly heavy / draggy.
 * Only active on desktop (pointer: fine) and when reduced-motion is not preferred.
 */
export const SmoothScroll: React.FC = () => {
  useEffect(() => {
    // Skip on touch devices or reduced motion
    const isTouch =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (isTouch || prefersReduced) return;

    let current = window.scrollY;
    let target = window.scrollY;
    const ease = 0.08; // lower = slower/draggier (0.05–0.12 range)
    let animId: number;
    let running = true;

    // Disable native smooth scroll so we control it
    document.documentElement.style.scrollBehavior = "auto";

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      target += e.deltaY;
      // Clamp
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      target = Math.max(0, Math.min(target, maxScroll));
    };

    const onKeyDown = (e: KeyboardEvent) => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const step = window.innerHeight * 0.4;

      switch (e.key) {
        case "ArrowDown":
          target = Math.min(target + 60, maxScroll);
          break;
        case "ArrowUp":
          target = Math.max(target - 60, 0);
          break;
        case "PageDown":
        case " ":
          if (!e.shiftKey) {
            e.preventDefault();
            target = Math.min(target + step, maxScroll);
          }
          break;
        case "PageUp":
          e.preventDefault();
          target = Math.max(target - step, 0);
          break;
        case "Home":
          target = 0;
          break;
        case "End":
          target = maxScroll;
          break;
      }
    };

    // Sync target when user clicks anchor links or programmatic scroll
    const onScroll = () => {
      // If the gap is too big, it means something else scrolled (anchor, JS)
      if (Math.abs(window.scrollY - current) > 200) {
        current = window.scrollY;
        target = window.scrollY;
      }
    };

    const animate = () => {
      if (!running) return;
      current += (target - current) * ease;

      // Snap when close enough
      if (Math.abs(target - current) < 0.5) {
        current = target;
      }

      window.scrollTo(0, current);
      animId = requestAnimationFrame(animate);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("scroll", onScroll, { passive: true });
    animId = requestAnimationFrame(animate);

    return () => {
      running = false;
      cancelAnimationFrame(animId);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("scroll", onScroll);
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  return null;
};
