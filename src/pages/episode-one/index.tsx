import { Layout } from "../../app/components/Layout";
import { Button } from "../../shared/ui";
import { Link } from "react-router-dom";
import { ROUTES } from "../../shared/constants";
import {
  Zap,
  Map,
  Trophy,
  Gem,
  Shield,
  ArrowRight,
  Lock,
  Gamepad2,
  QrCode,
  CreditCard,
} from "lucide-react";

/* ── Wave divider ── */
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

/* ═════════════════════════════════════════════════
   PAGE 3 — EPISODE ONE: THE AWAKENING
   ═════════════════════════════════════════════════ */
const EpisodeOnePageComp: React.FC = () => {
  return (
    <Layout>
      {/* ═══ HERO ═══ */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute bottom-10 right-20 w-96 h-96 bg-accent/5 rounded-full blur-[120px] animate-float" />
        <div className="container-max relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5">
              <Gamepad2 className="w-4 h-4 text-accent-light" />
              <span className="text-accent-light font-medium text-sm">
                Episode One
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
              Step into <span className="text-gradient">Future Africa</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
              Africa has evolved. You are a Pioneer tasked with building the
              first decentralized digital hubs. Manage resources, claim
              territory, and secure your legacy.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ NARRATIVE ═══ */}
      <WaveDivider fill="#111927" />
      <section className="bg-navy-light pb-24 pt-8">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-accent-light font-semibold text-sm tracking-wider uppercase mb-4">
                The Narrative
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 leading-tight">
                Build, Compete &amp;{" "}
                <span className="text-gradient">Earn Real Value</span>
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-6">
                In Episode One, every action you take — from mining resources to
                expanding your territory — is recorded on the SAC1 blockchain.
                Your achievements trigger instant smart-contract payouts to your
                wallet.
              </p>
              <Link to={ROUTES.CONTACT}>
                <button className="btn-glow px-6 py-3 text-sm font-semibold inline-flex items-center gap-2">
                  Join the Alpha List <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>

            {/* Visual placeholder */}
            <div className="relative rounded-3xl overflow-hidden border border-navy-border/60 aspect-video flex items-center justify-center bg-gradient-to-br from-accent/5 via-transparent to-primary/5">
              <div className="absolute inset-0 bg-navy-mid/40" />
              <p className="relative text-slate-500 font-medium text-sm tracking-wider uppercase">
                3D Afrofuturism Concept Art
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ GAME MECHANICS ═══ */}
      <WaveDivider fill="#0B1121" />
      <section className="bg-navy pb-24 pt-8">
        <div className="container-max">
          <div className="text-center mb-16">
            <p className="text-accent-light font-semibold text-sm tracking-wider uppercase mb-4">
              Gameplay
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
              Game Mechanics
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Zap className="w-6 h-6" />,
                title: "Resource Mining",
                description:
                  "Extract digital raw materials represented as on-chain assets with real SAC1 value.",
              },
              {
                icon: <Map className="w-6 h-6" />,
                title: "Strategic Expansion",
                description:
                  "Build infrastructure that generates passive SAC1 rewards and extends your territory.",
              },
              {
                icon: <Trophy className="w-6 h-6" />,
                title: "Proof of Achievement",
                description:
                  "Our proprietary oracle verifies your wins and triggers instant smart-contract payouts.",
              },
            ].map((mechanic, index) => (
              <div key={index} className="card-premium group h-full">
                <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent-light mb-5 group-hover:bg-accent/20 group-hover:border-accent/40 transition-all duration-300">
                  {mechanic.icon}
                </div>
                <h3 className="text-lg font-bold mb-3 text-white group-hover:text-accent-light transition-colors">
                  {mechanic.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {mechanic.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button size="lg">Start Your Journey</Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};
const EpisodeOnePage: React.FC = EpisodeOnePageComp;

/* ═════════════════════════════════════════════════
   PAGE 4 — SAC1 POS BRIDGE
   ═════════════════════════════════════════════════ */
const SAC1POSBridgePageComp: React.FC = () => {
  return (
    <Layout>
      {/* ═══ HERO ═══ */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute top-10 left-20 w-80 h-80 bg-primary/5 rounded-full blur-[100px] animate-float" />
        <div className="container-max relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5">
              <CreditCard className="w-4 h-4 text-accent-light" />
              <span className="text-accent-light font-medium text-sm">
                POS Bridge
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
              Beyond the Screen:{" "}
              <span className="text-gradient">Real-World Liquidity</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
              Most Web3 projects fail because their tokens have no "real-world"
              exit. FAP solves this through our Lead Partner's SAC1 POS
              infrastructure.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <WaveDivider fill="#111927" />
      <section className="bg-navy-light pb-24 pt-8">
        <div className="container-max">
          <div className="text-center mb-16">
            <p className="text-accent-light font-semibold text-sm tracking-wider uppercase mb-4">
              The Process
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
              How It Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                step: "00",
                icon: <Gamepad2 className="w-6 h-6" />,
                title: "Earn",
                desc: "Accumulate SAC1 tokens through gameplay achievements and trading.",
              },
              {
                step: "01",
                icon: <QrCode className="w-6 h-6" />,
                title: "Generate",
                desc: "Create a secure, dynamic pay-code within the FAP app.",
              },
              {
                step: "02",
                icon: <CreditCard className="w-6 h-6" />,
                title: "Transact",
                desc: "Scan your code at any partner SAC1 POS terminal to pay for services.",
              },
            ].map((item, i) => (
              <div key={i} className="group relative">
                <div className="absolute -top-4 -left-2 text-8xl font-extrabold text-white/[0.03] select-none pointer-events-none leading-none">
                  {item.step}
                </div>
                <div className="card-premium relative h-full">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-accent/20 bg-accent/8 mb-5">
                    <span className="text-accent-light font-bold text-xs">
                      STEP {item.step}
                    </span>
                  </div>
                  <div className="w-11 h-11 rounded-xl bg-navy-mid border border-navy-border flex items-center justify-center text-accent-light mb-4 group-hover:bg-accent/10 group-hover:border-accent/30 transition-all duration-300">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-white text-lg mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Security */}
          <div className="card-premium flex flex-col md:flex-row gap-6 items-start">
            <div className="w-14 h-14 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent-light flex-shrink-0">
              <Lock className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3 text-white">
                Security Features
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Multi-layer AES-256 encryption ensures that your game-earned
                wealth is as secure as a traditional bank account, but with the
                freedom of decentralization. All sessions are
                blockchain-verified.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
const SAC1POSBridgePage: React.FC = SAC1POSBridgePageComp;

/* ═════════════════════════════════════════════════
   PAGE 5 — DIGITAL ASSETS & NFT MARKETPLACE
   ═════════════════════════════════════════════════ */
const DigitalAssetsPageComp: React.FC = () => {
  const rarityColors = [
    "text-slate-400 border-slate-600/30 bg-slate-600/10",
    "text-green-400 border-green-500/30 bg-green-500/10",
    "text-blue-400 border-blue-500/30 bg-blue-500/10",
    "text-purple-400 border-purple-500/30 bg-purple-500/10",
    "text-amber-400 border-amber-500/30 bg-amber-500/10",
  ];

  return (
    <Layout>
      {/* ═══ HERO ═══ */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-accent/5 rounded-full blur-[100px] animate-float-delayed" />
        <div className="container-max relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5">
              <Gem className="w-4 h-4 text-accent-light" />
              <span className="text-accent-light font-medium text-sm">
                Digital Assets
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
              True Ownership.{" "}
              <span className="text-gradient">Immutable Value.</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
              In FAP, your items are yours. Period. Every piece of land, tool,
              or skin is a unique NFT minted on the SAC1 blockchain.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ ASSET TYPES ═══ */}
      <WaveDivider fill="#111927" />
      <section className="bg-navy-light pb-24 pt-8">
        <div className="container-max">
          <div className="text-center mb-16">
            <p className="text-accent-light font-semibold text-sm tracking-wider uppercase mb-4">
              NFT Utility
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
              Asset Classes
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              Trade, sell, or lease your assets to other pioneers. As the
              ecosystem grows, so does the rarity and value of your
              early-episode holdings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              {
                icon: <Map className="w-6 h-6" />,
                title: "Land",
                desc: "Digital territories with unique properties and passive generation.",
              },
              {
                icon: <Zap className="w-6 h-6" />,
                title: "Tools",
                desc: "Specialized equipment that boosts mining speed and rewards.",
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: "Skins",
                desc: "Character customization NFTs that signal your Pioneer status.",
              },
            ].map((asset, index) => (
              <div key={index} className="card-premium group h-full">
                <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent-light mb-5 group-hover:bg-accent/20 group-hover:border-accent/40 transition-all duration-300">
                  {asset.icon}
                </div>
                <h3 className="font-bold text-lg mb-2 text-white group-hover:text-accent-light transition-colors">
                  {asset.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {asset.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Rarity Tiers */}
          <div className="text-center mb-8">
            <p className="text-accent-light font-semibold text-sm tracking-wider uppercase mb-4">
              Scarcity
            </p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">
              Rarity Tiers
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {["Common", "Uncommon", "Rare", "Epic", "Legendary"].map(
              (rarity, index) => (
                <div
                  key={index}
                  className={`rounded-2xl border p-5 text-center transition-all duration-300 hover:-translate-y-1 ${rarityColors[index]}`}
                >
                  <p className="font-bold text-lg">{rarity}</p>
                </div>
              ),
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};
const DigitalAssetsPage: React.FC = DigitalAssetsPageComp;

export { EpisodeOnePage, SAC1POSBridgePage, DigitalAssetsPage };
