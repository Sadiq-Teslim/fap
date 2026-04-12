import { useState, useEffect } from "react";

export const LoadingScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const start = performance.now();
    const duration = 1800;

    const tick = () => {
      const elapsed = performance.now() - start;
      const p = Math.min((elapsed / duration) * 100, 100);
      setProgress(Math.round(p));

      if (p < 100) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(() => setFading(true), 200);
        setTimeout(() => setVisible(false), 700);
      }
    };

    requestAnimationFrame(tick);
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center transition-opacity duration-500 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
      style={{ backgroundColor: "#0b1121" }}
    >
      {/* Logo */}
      <div className="text-4xl sm:text-5xl font-extrabold text-gradient mb-8 tracking-tight">
        FAPGAME
      </div>

      {/* Progress bar */}
      <div className="w-48 sm:w-64 h-1.5 rounded-full bg-white/10 overflow-hidden mb-4">
        <div
          className="h-full rounded-full transition-all duration-100"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(90deg, #059669, #34d399)",
            boxShadow: "0 0 12px rgba(52,211,153,0.6)",
          }}
        />
      </div>

      {/* Percentage */}
      <p className="text-accent-light font-mono text-sm tracking-widest">
        LOADING {progress}%
      </p>

      {/* Tagline */}
      <p className="text-slate-600 text-xs mt-6 tracking-wider uppercase">
        Entering Future Africa
      </p>
    </div>
  );
};
