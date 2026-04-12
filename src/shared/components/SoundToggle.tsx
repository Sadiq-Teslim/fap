import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

export const SoundToggle: React.FC = () => {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create a subtle ambient synth tone using Web Audio API
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;

    const ctx = new AudioCtx();
    const gain = ctx.createGain();
    gain.gain.value = 0;
    gain.connect(ctx.destination);

    // Pad oscillators for ambient feel
    const osc1 = ctx.createOscillator();
    osc1.type = "sine";
    osc1.frequency.value = 110; // A2
    osc1.connect(gain);
    osc1.start();

    const osc2 = ctx.createOscillator();
    osc2.type = "sine";
    osc2.frequency.value = 164.81; // E3
    osc2.connect(gain);
    osc2.start();

    const osc3 = ctx.createOscillator();
    osc3.type = "triangle";
    osc3.frequency.value = 220; // A3
    const osc3Gain = ctx.createGain();
    osc3Gain.gain.value = 0.3;
    osc3.connect(osc3Gain);
    osc3Gain.connect(gain);
    osc3.start();

    // Store ref for toggle
    audioRef.current = {
      play: () => {
        if (ctx.state === "suspended") ctx.resume();
        gain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 1);
      },
      pause: () => {
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5);
      },
    } as any;

    return () => {
      osc1.stop();
      osc2.stop();
      osc3.stop();
      ctx.close();
    };
  }, []);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      (audioRef.current as any).pause();
    } else {
      (audioRef.current as any).play();
    }
    setPlaying(!playing);
  };

  return (
    <button
      onClick={toggle}
      className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full border border-navy-border bg-navy-light/90 backdrop-blur-sm flex items-center justify-center text-slate-400 hover:text-accent-light hover:border-accent/40 transition-all duration-300 shadow-lg"
      aria-label={playing ? "Mute ambient sound" : "Play ambient sound"}
      title={playing ? "Mute" : "Play ambient sound"}
    >
      {playing ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
    </button>
  );
};
