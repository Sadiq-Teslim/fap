import { Link } from "react-router-dom";
import { ROUTES, COMPANY } from "../../shared/constants";
import { Button } from "../../shared/ui";
import { Layout } from "../../app/components/Layout";
import {
  Zap,
  TrendingUp,
  Shield,
  Globe,
  Sparkles,
  ArrowRight,
  Wallet,
  Gamepad2,
  Landmark,
  CreditCard,
  BarChart3,
  Users,
  Clock,
  Lock,
  ChevronRight,
} from "lucide-react";

/* ── Wavy SVG section divider ── */
const WaveDivider: React.FC<{ fill?: string; flip?: boolean }> = ({
  fill = "#111927",
  flip,
}) => (
  <div
    className={`w-full overflow-hidden leading-[0] ${flip ? "rotate-180" : ""}`}
  >
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

export const HomePage: React.FC = () => {
  return (
    <Layout>
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* BG effects */}
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] animate-pulse-soft" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-[80px] animate-float" />
        <div className="absolute bottom-20 left-10 w-60 h-60 bg-accent/8 rounded-full blur-[80px] animate-float-delayed" />

        <div className="container-max relative z-10 py-20">
          <div className="max-w-4xl mx-auto text-center">
            {/* Pill */}
            <div className="inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full border border-accent/20 bg-accent/5">
              <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
              <span className="text-accent-light font-medium text-sm">
                Powered by SAC1 Blockchain
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-8 leading-[1.05] tracking-tight">
              <span className="text-white">Bridging</span>
              <br />
              <span className="text-gradient">Virtual Achievements</span>
              <br />
              <span className="text-white">&amp; Real-World Prosperity</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              A revolutionary Web3 ecosystem powered by the SAC1 Blockchain and
              the ${COMPANY.INVESTMENT_AMOUNT.toLocaleString()} investment of{" "}
              {COMPANY.PARTNER_NAME}.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link to={ROUTES.EPISODE_ONE}>
                <button className="btn-glow px-8 py-4 text-base font-semibold inline-flex items-center gap-2">
                  Explore Episode One
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <Link to={ROUTES.ECOSYSTEM}>
                <button className="btn-outline-glow px-8 py-4 text-base font-semibold inline-flex items-center gap-2">
                  <Wallet className="w-4 h-4" />
                  Connect SAC1 Wallet
                </button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-xl mx-auto">
              {[
                { value: "10K+", label: "Active Pioneers" },
                { value: "$2M+", label: "Capital Invested" },
                { value: "99.9%", label: "Network Uptime" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-2xl md:text-3xl font-bold text-white">
                    {stat.value}
                  </p>
                  <p className="text-xs md:text-sm text-slate-500 mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ MILESTONE ═══════════════ */}
      <WaveDivider fill="#111927" />
      <section className="bg-navy-light pb-24 pt-8">
        <div className="container-max">
          <div className="relative rounded-3xl overflow-hidden border border-navy-border/60">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5" />
            <div className="absolute top-0 right-0 w-80 h-80 bg-accent/8 rounded-full blur-[100px]" />

            <div className="relative p-10 md:p-16 text-center">
              <p className="text-accent-light text-sm font-semibold tracking-wider uppercase mb-4">
                The Milestone
              </p>
              <p className="text-5xl md:text-6xl font-extrabold text-white mb-2">
                ${COMPANY.INVESTMENT_AMOUNT.toLocaleString()}
                <span className="text-accent-light">.00 USD</span>
              </p>
              <p className="text-slate-400 text-lg mt-4 max-w-lg mx-auto">
                Capital injection by {COMPANY.PARTNER_NAME} for the
                implementation of FAP Episode One.
              </p>
              <div className="flex items-center justify-center gap-3 mt-8">
                <Link to={ROUTES.PARTNERSHIP}>
                  <button className="btn-glow px-6 py-3 text-sm font-semibold inline-flex items-center gap-2">
                    View Partnership
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ THE MISSION ═══════════════ */}
      <WaveDivider fill="#0B1121" />
      <section className="bg-navy pb-24 pt-8">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left — copy */}
            <div>
              <p className="text-accent-light font-semibold text-sm tracking-wider uppercase mb-4">
                The Mission
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 leading-tight">
                We are not just building a game — we are{" "}
                <span className="text-gradient">coding the future</span> of
                African commerce.
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                By merging high-fidelity gaming with the SAC1 POS
                infrastructure, in-game triumphs become real-world assets.
                Achievement → Tokenization → Utilization.
              </p>
              <Link to={ROUTES.ECOSYSTEM}>
                <button className="btn-glow px-6 py-3 text-sm font-semibold inline-flex items-center gap-2">
                  Explore Ecosystem
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>

            {/* Right — value props */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                {
                  icon: <Gamepad2 className="w-5 h-5" />,
                  title: "Play & Earn",
                  desc: "Every action recorded on the SAC1 ledger with instant reward payouts.",
                },
                {
                  icon: <CreditCard className="w-5 h-5" />,
                  title: "POS Bridge",
                  desc: "Spend digital rewards at physical merchant terminals across Africa.",
                },
                {
                  icon: <Shield className="w-5 h-5" />,
                  title: "Bank-Grade Security",
                  desc: "AES-256 encryption with blockchain-verified session integrity.",
                },
                {
                  icon: <TrendingUp className="w-5 h-5" />,
                  title: "Zero Hidden Fees",
                  desc: "Near-zero gas, transparent economics, on-chain audits.",
                },
              ].map((card, i) => (
                <div key={i} className="card-premium group">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent-light mb-4 group-hover:bg-accent/20 group-hover:border-accent/40 transition-all duration-300">
                    {card.icon}
                  </div>
                  <h3 className="font-bold text-white mb-1.5">{card.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ WHAT WE OFFER ═══════════════ */}
      <WaveDivider fill="#111927" />
      <section className="bg-navy-light pb-24 pt-8">
        <div className="container-max">
          <div className="text-center mb-16">
            <p className="text-accent-light font-semibold text-sm tracking-wider uppercase mb-4">
              What We Offer
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
              Built for the Future
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              Enterprise-grade Web3 gaming infrastructure with real-world
              utility and institutional backing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Zap className="w-6 h-6" />,
                title: "High-Performance Engine",
                description:
                  "Lightning-fast gaming with real-time blockchain settlement and 99.9 % uptime.",
                link: ROUTES.EPISODE_ONE,
              },
              {
                icon: <Globe className="w-6 h-6" />,
                title: "Real-World Utility",
                description:
                  "Convert digital achievements into tangible assets through our POS bridge network.",
                link: ROUTES.SAC1_POS_BRIDGE,
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: "Bank-Grade Security",
                description:
                  "Military-grade encryption with immutable on-chain verification for every transaction.",
                link: ROUTES.ECOSYSTEM,
              },
              {
                icon: <TrendingUp className="w-6 h-6" />,
                title: "Transparent Economics",
                description:
                  "Real-time market data, on-chain audits, and zero hidden fees across the platform.",
                link: ROUTES.DIGITAL_ASSETS,
              },
              {
                icon: <Users className="w-6 h-6" />,
                title: "Community Driven",
                description:
                  "Built by and for the African tech renaissance with open governance and shared rewards.",
                link: ROUTES.PARTNERSHIP,
              },
              {
                icon: <CreditCard className="w-6 h-6" />,
                title: "Seamless POS Integration",
                description:
                  "Connect wallets and redeem at physical SAC1 POS merchant terminals.",
                link: ROUTES.SAC1_POS_BRIDGE,
              },
            ].map((feature, index) => (
              <Link key={index} to={feature.link} className="group">
                <div className="card-premium h-full flex flex-col">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent-light mb-5 group-hover:bg-accent/20 group-hover:border-accent/40 transition-all duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="font-bold text-lg mb-3 text-white group-hover:text-accent-light transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed flex-grow">
                    {feature.description}
                  </p>
                  <div className="mt-5 text-accent-light font-medium text-sm flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                    Learn more
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ HOW IT WORKS ═══════════════ */}
      <WaveDivider fill="#0B1121" />
      <section className="bg-navy pb-24 pt-8">
        <div className="container-max">
          <div className="text-center mb-16">
            <p className="text-accent-light font-semibold text-sm tracking-wider uppercase mb-4">
              How It Works
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
              From Sign-Up to Real Value
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              A streamlined process to get you earning and spending in the FAP
              ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                icon: <Users className="w-6 h-6" />,
                title: "Create Account",
                desc: "Sign up and verify your identity to join the Pioneer network.",
              },
              {
                step: "02",
                icon: <Gamepad2 className="w-6 h-6" />,
                title: "Play & Earn",
                desc: "Enter Episode One and earn SAC1 tokens through strategic gameplay.",
              },
              {
                step: "03",
                icon: <BarChart3 className="w-6 h-6" />,
                title: "Trade Assets",
                desc: "Trade NFTs and tokens on the marketplace with near-zero gas fees.",
              },
              {
                step: "04",
                icon: <Landmark className="w-6 h-6" />,
                title: "Redeem Value",
                desc: "Cash out at any partner SAC1 POS terminal or transfer to your wallet.",
              },
            ].map((item, i) => (
              <div key={i} className="group relative">
                {/* Ghost number */}
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
        </div>
      </section>

      {/* ═══════════════ EXPLORE ECOSYSTEM ═══════════════ */}
      <WaveDivider fill="#111927" />
      <section className="bg-navy-light pb-24 pt-8">
        <div className="container-max">
          <div className="text-center mb-16">
            <p className="text-accent-light font-semibold text-sm tracking-wider uppercase mb-4">
              Explore
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
              The FAP Ecosystem
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              Dive into the components that power the Future Africa Project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                path: ROUTES.ECOSYSTEM,
                title: "The Ecosystem",
                description:
                  "A closed-loop digital economy with the Triangle of Utility.",
                icon: <Globe className="w-5 h-5" />,
              },
              {
                path: ROUTES.EPISODE_ONE,
                title: "Episode One",
                description:
                  "Immersive strategy gaming with blockchain-settled rewards.",
                icon: <Gamepad2 className="w-5 h-5" />,
              },
              {
                path: ROUTES.SAC1_POS_BRIDGE,
                title: "SAC1 POS Bridge",
                description:
                  "The bridge from digital achievements to real-world merchant value.",
                icon: <CreditCard className="w-5 h-5" />,
              },
              {
                path: ROUTES.DIGITAL_ASSETS,
                title: "Digital Assets",
                description:
                  "Create, trade, and own verifiable NFTs on the SAC1 blockchain.",
                icon: <Sparkles className="w-5 h-5" />,
              },
              {
                path: ROUTES.PARTNERSHIP,
                title: "Our Partnership",
                description:
                  "Powered by $2M institutional capital from SableAssent.",
                icon: <Landmark className="w-5 h-5" />,
              },
              {
                path: ROUTES.ROADMAP,
                title: "The Roadmap",
                description:
                  "Multi-year vision for continental transformation.",
                icon: <BarChart3 className="w-5 h-5" />,
              },
            ].map((item, index) => (
              <Link key={index} to={item.path} className="group">
                <div className="card-premium h-full flex flex-col">
                  <div className="w-10 h-10 rounded-lg bg-navy-mid border border-navy-border flex items-center justify-center text-accent-light mb-5 group-hover:bg-accent/10 group-hover:border-accent/30 transition-all duration-300">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-white group-hover:text-accent-light transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed flex-grow">
                    {item.description}
                  </p>
                  <div className="mt-5 text-accent-light font-medium text-sm flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                    Explore
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ TRUST + CTA (combined, compact) ═══════════════ */}
      <WaveDivider fill="#0B1121" />
      <section className="bg-navy pb-24 pt-8">
        <div className="container-max">
          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-16">
            {[
              {
                icon: <Users className="w-5 h-5" />,
                value: "10K+",
                label: "Pioneers",
              },
              {
                icon: <TrendingUp className="w-5 h-5" />,
                value: "$2M+",
                label: "Assets Traded",
              },
              {
                icon: <Clock className="w-5 h-5" />,
                value: "99.9%",
                label: "Uptime",
              },
              {
                icon: <Lock className="w-5 h-5" />,
                value: "5/5",
                label: "Audits Passed",
              },
            ].map((stat, i) => (
              <div key={i} className="card-premium text-center group">
                <div className="w-10 h-10 rounded-xl bg-navy-mid border border-navy-border flex items-center justify-center text-accent-light mx-auto mb-3 group-hover:bg-accent/10 group-hover:border-accent/30 transition-all duration-300">
                  {stat.icon}
                </div>
                <p className="text-2xl md:text-3xl font-extrabold text-white">
                  {stat.value}
                </p>
                <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* CTA card */}
          <div className="relative rounded-3xl overflow-hidden border border-accent/15">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/8 via-navy-mid to-primary/8" />
            <div className="absolute top-0 left-1/3 w-80 h-80 bg-accent/8 rounded-full blur-[120px]" />

            <div className="relative px-8 py-14 md:py-16 text-center">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
                Ready to Join the Future?
              </h2>
              <p className="text-slate-400 mb-8 max-w-md mx-auto">
                Be part of the Web3 ecosystem transforming Africa's digital
                economy.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to={ROUTES.CONTACT}>
                  <button className="btn-glow px-8 py-3.5 text-sm font-semibold inline-flex items-center gap-2">
                    Get Started <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
                <Link to={ROUTES.PARTNERSHIP}>
                  <button className="btn-outline-glow px-8 py-3.5 text-sm font-semibold">
                    Our Partnership
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export const NotFoundPage: React.FC = () => {
  return (
    <Layout>
      <section className="min-h-[600px] flex items-center py-20">
        <div className="container-max text-center">
          <h1 className="text-8xl font-extrabold text-gradient mb-4">404</h1>
          <h2 className="text-3xl font-bold text-white mb-4">Page Not Found</h2>
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
