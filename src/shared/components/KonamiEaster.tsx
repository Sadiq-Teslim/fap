import { useEffect, useState } from "react";

const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

export const KonamiEaster: React.FC = () => {
  const [triggered, setTriggered] = useState(false);
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    let pos = 0;

    const handler = (e: KeyboardEvent) => {
      if (e.key === KONAMI[pos]) {
        pos++;
        if (pos === KONAMI.length) {
          setTriggered(true);
          pos = 0;
          setTimeout(() => setHiding(true), 3000);
          setTimeout(() => {
            setTriggered(false);
            setHiding(false);
          }, 3500);
        }
      } else {
        pos = 0;
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  if (!triggered) return null;

  return (
    <div
      className={`fixed inset-0 z-[99998] flex items-center justify-center pointer-events-none transition-opacity duration-500 ${
        hiding ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="bg-navy/90 backdrop-blur-xl rounded-3xl border border-accent/30 px-10 py-8 text-center shadow-2xl">
        <p className="text-5xl mb-3">🎮</p>
        <p className="text-accent-light font-extrabold text-2xl mb-1">
          Achievement Unlocked!
        </p>
        <p className="text-slate-400 text-sm">
          You found the secret code. A true Pioneer.
        </p>
      </div>
    </div>
  );
};
