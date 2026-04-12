import { useRef, useCallback, useEffect, useState } from "react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = "",
  maxTilt = 8,
}) => {
  const innerRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isTouchDevice) return;
      const el = innerRef.current;
      const shine = shineRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      const tiltX = (0.5 - y) * maxTilt;
      const tiltY = (x - 0.5) * maxTilt;

      el.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;

      if (shine) {
        shine.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(52,211,153,0.12) 0%, transparent 60%)`;
      }
    },
    [maxTilt, isTouchDevice],
  );

  const handleMouseLeave = useCallback(() => {
    if (isTouchDevice) return;
    const el = innerRef.current;
    if (el) {
      el.style.transform = "rotateX(0) rotateY(0) scale3d(1, 1, 1)";
    }
  }, [isTouchDevice]);

  return (
    <div
      className={`tilt-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={innerRef} className="tilt-card-inner h-full">
        {!isTouchDevice && (
          <div ref={shineRef} className="tilt-shine rounded-2xl" />
        )}
        {children}
      </div>
    </div>
  );
};
