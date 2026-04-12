import { Link } from "react-router-dom";
import { ROUTES, COMPANY } from "../../shared/constants";
import { Button } from "../../shared/ui";
import { Layout } from "../../app/components/Layout";
import { useState, useEffect, useRef } from "react";
import { useScrollAnimation } from "../../shared/hooks/useScrollAnimation";
import { useCountUp } from "../../shared/hooks/useCountUp";
import { GlitchText } from "../../shared/components/GlitchText";
import { TiltCard } from "../../shared/components/TiltCard";
import { FloatingParticles } from "../../shared/components/FloatingParticles";
import { Typewriter } from "../../shared/components/Typewriter";
import { useParallax } from "../../shared/hooks/useParallax";
import {
  ArrowRight,
  Gamepad2,
  Globe,
  Shield,
  TrendingUp,
  CreditCard,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
} from "lucide-react";

/* ── Assets ── */
import worldDunga from "../../assets/materials/world-dunga-progress.jpg";
import worldLiberation from "../../assets/materials/world-liberation.jpg";
import worldTransform from "../../assets/materials/world-city-transform.jpg";
import worldFreedom from "../../assets/materials/world-city-freedom.jpg";

import charElder from "../../assets/materials/char-elder.jpg";
import charKing from "../../assets/materials/char-king-throne.jpg";
import charAngel from "../../assets/materials/char-angel.jpg";
import charRedChief from "../../assets/materials/char-red-chief.jpg";
import charWarrior from "../../assets/materials/char-warrior-lion.jpg";
import charGoldNoble from "../../assets/materials/char-gold-noble.jpg";
import charGreenQueen from "../../assets/materials/char-green-queen.jpg";
import charRedKing from "../../assets/materials/char-red-king.jpg";

import clip1 from "../../assets/materials/gameplay-clip-1.mp4";
import clip2 from "../../assets/materials/gameplay-clip-2.mp4";
import clip3 from "../../assets/materials/gameplay-clip-3.mp4";
import clip4 from "../../assets/materials/gameplay-clip-4.mp4";
import clip5 from "../../assets/materials/gameplay-clip-5.mp4";
import heroClip from "../../assets/materials/gameplay-clip-8.mp4";

/* ── Wavy SVG section divider ── */
const WaveDivider: React.FC<{ fill?: string }> = ({ fill = "#111927" }) => (
  <div className="w-full overflow-hidden leading-[0]">
    <svg
      viewBox="0 0 1440 100"
      preserveAspectRatio="none"
      className="w-full h-[60px] md:h-[80px]"
    >
      <path
        d="M0,40 C240,100 480,0 720,50 C960,100 1200,0 1440,40 L1440,100 L0,100 Z"
        fill={fill}
      />
    </svg>
  </div>
);

/* ── Gameplay Video Carousel ── */
const clips = [
  { src: clip1, title: "Dunga Province" },
  { src: clip2, title: "Liberation Campaign" },
  { src: clip3, title: "Freedom City" },
  { src: clip4, title: "The Uprising" },
  { src: clip5, title: "Continental Grid" },
];

const GameplayCarousel: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const next = () => setCurrent((p) => (p + 1) % clips.length);
  const prev = () => setCurrent((p) => (p - 1 + clips.length) % clips.length);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      if (isPlaying) videoRef.current.play().catch(() => {});
    }
  }, [current, isPlaying]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative group">
      <div className="rounded-2xl overflow-hidden border border-navy-border/60 shadow-card aspect-video bg-black">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          muted
          loop
          playsInline
          autoPlay
        >
          <source src={clips[current].src} type="video/mp4" />
        </video>
      </div>

      {/* Overlay controls */}
      <div className="absolute inset-0 flex items-end rounded-2xl">
        <div className="w-full bg-gradient-to-t from-black/80 via-black/30 to-transparent p-6 rounded-b-2xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-bold text-lg">
                {clips[current].title}
              </p>
              <p className="text-slate-400 text-sm">Gameplay Preview</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={togglePlay}
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4 ml-0.5" />
                )}
              </button>
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Progress dots */}
          <div className="flex gap-1.5 mt-3">
            {clips.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-8 bg-accent-light"
                    : "w-4 bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── Animated stat counter component ── */
const StatCounter: React.FC<{
  end: number;
  suffix?: string;
  prefix?: string;
  label: string;
  icon: React.ReactNode;
}> = ({ end, suffix = "", prefix = "", label, icon }) => {
  const [ref, displayValue] = useCountUp(end, 2000, suffix, prefix);

  return (
    <TiltCard>
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="card-premium text-center group"
      >
        <div className="w-10 h-10 rounded-xl bg-navy-mid border border-navy-border flex items-center justify-center text-accent-light mx-auto mb-3 group-hover:bg-accent/10 group-hover:border-accent/30 transition-all duration-300">
          {icon}
        </div>
        <p className="text-2xl md:text-3xl font-extrabold text-white">
          {displayValue}
        </p>
        <p className="text-xs text-slate-500 mt-1">{label}</p>
      </div>
    </TiltCard>
  );
};

/* ── Characters data ── */
const characters = [
  { img: charKing, name: "The Sovereign", role: "Ruler", desc: "Commands the throne with wisdom and strength. His decrees shape the fate of nations." },
  { img: charAngel, name: "The Guardian", role: "Protector", desc: "A celestial force standing between the people and the forces of darkness." },
  { img: charRedChief, name: "The Chief", role: "Warlord", desc: "Leads the resistance with fiery passion and unmatched combat prowess." },
  { img: charWarrior, name: "The Warrior", role: "Champion", desc: "Bonded with the lion spirit, embodying courage and the wild heart of Africa." },
  { img: charGoldNoble, name: "The Noble", role: "Strategist", desc: "Master of trade and diplomacy, weaving alliances that shift the balance of power." },
  { img: charGreenQueen, name: "The Queen", role: "Mystic", desc: "Channels the ancestral magic of the land, bending nature to her will." },
  { img: charElder, name: "The Elder", role: "Oracle", desc: "Keeper of forgotten knowledge and the ancient prophecies that guide the chosen." },
  { img: charRedKing, name: "The Conqueror", role: "Warlord", desc: "An unstoppable force of ambition, forging empires from the ashes of the old world." },
];

/* ── World scenes ── */
const worldScenes = [
  { img: worldDunga, title: "Dunga Province", desc: "Where the journey begins — a land of mineral wealth and ancient power." },
  { img: worldLiberation, title: "Liberation Front", desc: "Navigate the complex politics of continental freedom and sovereignty." },
  { img: worldTransform, title: "The Transformation", desc: "Cities that evolve as you play — your choices shape the landscape." },
  { img: worldFreedom, title: "Freedom City", desc: "The shining hub of commerce, culture, and digital innovation." },
];

export const HomePage: React.FC = () => {
  const scrollRef = useScrollAnimation();
  const parallaxHero = useParallax(0.12);
  const parallaxCta = useParallax(0.1);

  return (
    <Layout>
      <div ref={scrollRef}>
        {/* ═══════════════ HERO — Video background ═══════════════ */}
        <section className="relative min-h-screen flex items-center overflow-hidden">
          {/* Video background */}
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={heroClip} type="video/mp4" />
          </video>
          {/* Dark overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-navy/75 via-navy/60 to-navy" />
          <div className="absolute inset-0 bg-navy/30" />
          <FloatingParticles count={40} />

          <div className="container-max relative z-10 py-20 w-full">
            <div ref={parallaxHero} className="max-w-3xl mx-auto text-center">
              {/* Pill */}
              <div className="inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm animate-on-scroll">
                <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                <span className="text-accent-light font-medium text-sm">
                  Powered by SAC1 Blockchain
                </span>
              </div>

              {/* Glitch headline */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-[1.1] tracking-tight animate-on-scroll delay-100">
                <span className="text-white">Bridging the Gap Between</span>
                <br />
                <GlitchText
                  text="Virtual Achievement"
                  className="text-gradient"
                />
                <br />
                <span className="text-white">&amp; Real-World Prosperity</span>
              </h1>

              <p className="text-base md:text-lg text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed animate-on-scroll delay-200">
                <Typewriter
                  text={`Welcome to FAPGAME. A revolutionary open-world action-adventure video game built on a Web3 ecosystem, powered by ${COMPANY.PARTNER_NAME}'s SAC1.`}
                  speed={25}
                  delay={800}
                />
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-on-scroll delay-300">
                <Link to={ROUTES.EPISODE_ONE}>
                  <button className="btn-glow px-8 py-4 text-base font-semibold inline-flex items-center gap-2">
                    Explore Episode One
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
                <Link to={ROUTES.ABOUT}>
                  <button className="btn-outline-glow px-8 py-4 text-base font-semibold">
                    Learn More
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy to-transparent" />
        </section>

        {/* ═══════════════ STATS — Animated counters ═══════════════ */}
        <WaveDivider fill="#111927" />
        <section className="bg-navy-light pb-16 pt-8">
          <div className="container-max">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              <StatCounter
                end={10}
                suffix="K+"
                label="Active Pioneers"
                icon={<Gamepad2 className="w-5 h-5" />}
              />
              <StatCounter
                end={99}
                suffix=".9%"
                label="Network Uptime"
                icon={<Shield className="w-5 h-5" />}
              />
              <StatCounter
                end={500}
                suffix="+"
                label="POS Terminals"
                icon={<CreditCard className="w-5 h-5" />}
              />
              <StatCounter
                end={5}
                suffix="/5"
                label="Audits Passed"
                icon={<TrendingUp className="w-5 h-5" />}
              />
            </div>
          </div>
        </section>

        {/* ═══════════════ GAMEPLAY CLIPS ═══════════════ */}
        <section className="bg-navy-light pb-24">
          <div className="container-max">
            <div className="text-center mb-12 animate-on-scroll">
              <p className="text-accent-light font-semibold text-sm tracking-wider uppercase mb-4">
                See It In Action
              </p>
              <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-4">
                <GlitchText text="Gameplay Preview" className="text-white" />
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                Experience the immersive world of FAPGAME through cinematic
                gameplay sequences.
              </p>
            </div>

            <div className="max-w-4xl mx-auto animate-on-scroll delay-200">
              <GameplayCarousel />
            </div>
          </div>
        </section>

        {/* ═══════════════ CHARACTERS — with tilt cards ═══════════════ */}
        <WaveDivider fill="#0B1121" />
        <section className="bg-navy pb-24 pt-8">
          <div className="container-max">
            <div className="text-center mb-12 animate-on-scroll">
              <p className="text-accent-light font-semibold text-sm tracking-wider uppercase mb-4">
                Meet The Cast
              </p>
              <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-4">
                Iconic Characters
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                Each character represents a facet of Africa's rich cultural
                heritage — kings, warriors, queens, and visionaries.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
              {characters.map((char, i) => (
                <div
                  key={i}
                  className={`char-flip-card aspect-[3/4] animate-on-scroll delay-${(i % 4) * 100}`}
                  onClick={(e) => {
                    // Toggle flip on tap for mobile
                    const card = e.currentTarget;
                    card.classList.toggle("flipped");
                  }}
                >
                  <div className="char-flip-inner">
                    {/* Front */}
                    <div className="char-flip-front">
                      <img
                        src={char.img}
                        alt={char.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <p className="text-white font-bold text-sm md:text-base">
                          {char.name}
                        </p>
                      </div>
                    </div>
                    {/* Back */}
                    <div className="char-flip-back bg-navy-light border border-navy-border flex flex-col items-center justify-center p-5 text-center">
                      <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center mb-3">
                        <Sparkles className="w-5 h-5 text-accent-light" />
                      </div>
                      <h4 className="text-white font-bold text-base mb-1">{char.name}</h4>
                      <span className="text-accent-light text-xs font-semibold uppercase tracking-wider mb-3">{char.role}</span>
                      <p className="text-slate-400 text-xs leading-relaxed">{char.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-slate-600 text-xs mt-4 sm:hidden">Tap a card to reveal character details</p>
          </div>
        </section>

        {/* ═══════════════ WORLD SCENES ═══════════════ */}
        <WaveDivider fill="#111927" />
        <section className="bg-navy-light pb-24 pt-8">
          <div className="container-max">
            <div className="text-center mb-12 animate-on-scroll">
              <p className="text-accent-light font-semibold text-sm tracking-wider uppercase mb-4">
                Explore The World
              </p>
              <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-4">
                A Continent Reimagined
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                Traverse breathtaking African landscapes — from ancient kingdoms
                to futuristic megacities.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {worldScenes.map((scene, i) => (
                <TiltCard key={i} className={`animate-on-scroll delay-${(i % 2) * 200}`}>
                  <div className="group relative rounded-2xl overflow-hidden border border-navy-border/60 shadow-card">
                    <div className="aspect-video">
                      <img
                        src={scene.img}
                        alt={scene.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-white font-bold text-lg md:text-xl mb-1">
                        {scene.title}
                      </h3>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        {scene.desc}
                      </p>
                    </div>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════ WHY FAPGAME — with tilt cards ═══════════════ */}
        <WaveDivider fill="#0B1121" />
        <section className="bg-navy pb-24 pt-8">
          <div className="container-max">
            <div className="text-center mb-16 animate-on-scroll">
              <p className="text-accent-light font-semibold text-sm tracking-wider uppercase mb-4">
                Why FAPGAME
              </p>
              <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-6">
                Not Just a Game —{" "}
                <GlitchText text="A Movement" className="text-white" />
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                We merge high-fidelity gaming with blockchain infrastructure so
                in-game triumphs become real-world assets.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: <Gamepad2 className="w-6 h-6" />,
                  title: "Play & Earn",
                  desc: "Every achievement is recorded on the SAC1 blockchain with instant token rewards.",
                  link: ROUTES.EPISODE_ONE,
                },
                {
                  icon: <CreditCard className="w-6 h-6" />,
                  title: "POS Bridge",
                  desc: "Spend digital rewards at physical merchant terminals across Africa.",
                  link: ROUTES.SAC1_POS_BRIDGE,
                },
                {
                  icon: <Shield className="w-6 h-6" />,
                  title: "Bank-Grade Security",
                  desc: "AES-256 encryption with blockchain-verified session integrity.",
                  link: ROUTES.ECOSYSTEM,
                },
                {
                  icon: <TrendingUp className="w-6 h-6" />,
                  title: "Transparent Economics",
                  desc: "Near-zero gas fees, on-chain audits, and zero hidden costs.",
                  link: ROUTES.DIGITAL_ASSETS,
                },
                {
                  icon: <Globe className="w-6 h-6" />,
                  title: "African Heritage",
                  desc: "Stories rooted in African culture, history, and contemporary leadership challenges.",
                  link: ROUTES.ABOUT,
                },
                {
                  icon: <Sparkles className="w-6 h-6" />,
                  title: "Digital Ownership",
                  desc: "True NFT ownership — create, trade, and own verifiable digital assets.",
                  link: ROUTES.DIGITAL_ASSETS,
                },
              ].map((feature, index) => (
                <Link key={index} to={feature.link} className={`group animate-on-scroll delay-${(index % 3) * 100}`}>
                  <TiltCard>
                    <div className="card-premium h-full flex flex-col">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent-light mb-5 group-hover:bg-accent/20 group-hover:border-accent/40 transition-all duration-300">
                        {feature.icon}
                      </div>
                      <h3 className="font-bold text-lg mb-3 text-white group-hover:text-accent-light transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-slate-400 text-sm leading-relaxed flex-grow">
                        {feature.desc}
                      </p>
                      <div className="mt-5 text-accent-light font-medium text-sm flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                        Learn more
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </TiltCard>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════ PARTNERSHIP + CTA ═══════════════ */}
        <WaveDivider fill="#111927" />
        <section className="bg-navy-light pb-24 pt-8">
          <div className="container-max">
            <div className="relative rounded-3xl overflow-hidden border border-accent/15 animate-on-scroll">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${worldDunga})` }}
              />
              <div className="absolute inset-0 bg-navy/85 backdrop-blur-sm" />
              <div className="absolute top-0 left-1/3 w-80 h-80 bg-accent/8 rounded-full blur-[120px]" />

              <div ref={parallaxCta} className="relative px-8 py-14 md:py-20 text-center">
                <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-4">
                  Ready to Enter the World of{" "}
                  <GlitchText text="FAPGAME" className="text-accent-light" />
                  ?
                </h2>
                <p className="text-slate-300 mb-8 max-w-lg mx-auto text-lg">
                  Join thousands of pioneers exploring Africa's future through
                  gaming, blockchain, and cultural storytelling.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link to={ROUTES.EPISODE_ONE}>
                    <button className="btn-glow px-8 py-4 text-base font-semibold inline-flex items-center gap-2">
                      Explore Episode One <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                  <Link to={ROUTES.PARTNERSHIP}>
                    <button className="btn-outline-glow px-8 py-4 text-base font-semibold">
                      Our Partnership
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export const NotFoundPage: React.FC = () => {
  return (
    <Layout>
      <section className="min-h-[600px] flex items-center py-20">
        <div className="container-max text-center">
          <h1 className="text-6xl md:text-8xl font-extrabold text-gradient mb-4">
            <GlitchText text="404" className="text-gradient" />
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Page Not Found</h2>
          <p className="text-lg text-slate-400 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link to={ROUTES.HOME}>
            <Button size="lg">Back to Home</Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
