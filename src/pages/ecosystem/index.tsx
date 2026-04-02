import { Layout } from "../../app/components/Layout";
import {
  Zap,
  Database,
  CreditCard,
  BarChart,
  ArrowRight,
  Shield,
  Globe,
  TrendingUp,
  CheckCircle,
  Users,
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

export const EcosystemPage: React.FC = () => {
  return (
    <Layout>
      {/* ═══ HERO ═══ */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute top-20 right-20 w-80 h-80 bg-accent/5 rounded-full blur-[100px] animate-float" />
        <div className="container-max relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5">
              <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
              <span className="text-accent-light font-medium text-sm">
                The Ecosystem
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
              A Closed-Loop{" "}
              <span className="text-gradient">Digital Economy</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
              FAP is built on a "Triangle of Utility" that ensures value never
              leaves the hands of our community.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ TRIANGLE OF UTILITY ═══ */}
      <WaveDivider fill="#111927" />
      <section className="bg-navy-light pb-24 pt-8">
        <div className="container-max">
          <div className="text-center mb-16">
            <p className="text-accent-light font-semibold text-sm tracking-wider uppercase mb-4">
              Core Architecture
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
              The Triangle of Utility
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: <BarChart className="w-7 h-7" />,
                title: "The Game Engine",
                description:
                  "High-performance strategy and resource management where every action is recorded on the ledger.",
                details: [
                  "Real-time progress tracking",
                  "Blockchain-verified achievements",
                  "Transparent reward distribution",
                  "Multi-player capabilities",
                ],
              },
              {
                icon: <Database className="w-7 h-7" />,
                title: "The SAC1 Ledger",
                description:
                  "Utilizing the high-speed, secure blockchain protocols of Sable Assents Coin Corporation.",
                details: [
                  "Instant transaction finality",
                  "Near-zero gas fees",
                  "99.9% uptime guarantee",
                  "Enterprise-grade security",
                ],
              },
              {
                icon: <CreditCard className="w-7 h-7" />,
                title: "The POS Integration",
                description:
                  "The final bridge connecting digital rewards to physical vendor points across the continent.",
                details: [
                  "SAC1 POS terminal integration",
                  "Real-world merchant network",
                  "Instant fund settlement",
                  "Pan-African coverage",
                ],
              },
            ].map((component, index) => (
              <div
                key={index}
                className="card-premium group h-full flex flex-col"
              >
                <div className="w-14 h-14 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent-light mb-6 group-hover:bg-accent/20 group-hover:border-accent/40 transition-all duration-300">
                  {component.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">
                  {component.title}
                </h3>
                <p className="text-slate-400 mb-6 text-sm leading-relaxed">
                  {component.description}
                </p>
                <ul className="space-y-2.5 mt-auto">
                  {component.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm">
                      <Zap className="w-4 h-4 text-accent-light flex-shrink-0 mt-0.5" />
                      <span className="text-slate-300">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Flow Diagram */}
          <div className="card-premium text-center">
            <p className="text-accent-light font-semibold text-sm tracking-wider uppercase mb-6">
              The Result
            </p>
            <div className="flex items-center justify-center gap-3 md:gap-5 flex-wrap">
              {["Achievement", "Tokenization", "Utilization"].map((step, i) => (
                <div key={i} className="flex items-center gap-3 md:gap-5">
                  <div className="bg-navy-mid border border-navy-border rounded-xl px-6 py-4 font-semibold text-accent-light">
                    {step}
                  </div>
                  {i < 2 && (
                    <ArrowRight className="w-5 h-5 text-accent-light flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>
            <p className="text-slate-500 mt-6 text-sm">
              A seamless flow from in-game achievements to real-world value
            </p>
          </div>
        </div>
      </section>

      {/* ═══ ECOSYSTEM BENEFITS ═══ */}
      <WaveDivider fill="#0B1121" />
      <section className="bg-navy pb-24 pt-8">
        <div className="container-max">
          <div className="text-center mb-16">
            <p className="text-accent-light font-semibold text-sm tracking-wider uppercase mb-4">
              Advantages
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
              Ecosystem Benefits
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <TrendingUp className="w-5 h-5" />,
                title: "Transparent Value Flow",
                description:
                  "Every transaction is recorded and verified on the blockchain, ensuring complete transparency.",
              },
              {
                icon: <Users className="w-5 h-5" />,
                title: "Zero Intermediaries",
                description:
                  "Direct connection between players, game engine, and merchants eliminates unnecessary fees.",
              },
              {
                icon: <Zap className="w-5 h-5" />,
                title: "Instant Settlement",
                description:
                  "SAC1 blockchain enables real-time transaction settlement with near-zero latency.",
              },
              {
                icon: <Shield className="w-5 h-5" />,
                title: "Community Ownership",
                description:
                  "Players own their assets and rewards, with full control over their digital wealth.",
              },
              {
                icon: <Globe className="w-5 h-5" />,
                title: "Scalability",
                description:
                  "Enterprise-grade infrastructure supports millions of concurrent players and transactions.",
              },
              {
                icon: <CheckCircle className="w-5 h-5" />,
                title: "Equity for All",
                description:
                  "Economic incentives are fairly distributed among all ecosystem participants.",
              },
            ].map((benefit, index) => (
              <div key={index} className="card-premium group">
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent-light mb-4 group-hover:bg-accent/20 group-hover:border-accent/40 transition-all duration-300">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-bold mb-2 text-white group-hover:text-accent-light transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <WaveDivider fill="#111927" />
      <section className="bg-navy-light pb-24 pt-8">
        <div className="container-max">
          <div className="text-center mb-12">
            <p className="text-accent-light font-semibold text-sm tracking-wider uppercase mb-4">
              Performance
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">
              Ecosystem Statistics
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { number: "99.9%", label: "Network Uptime" },
              { number: "<1ms", label: "Transaction Finality" },
              { number: "~0", label: "Gas Fees" },
              { number: "\u221E", label: "Scalability" },
            ].map((stat, index) => (
              <div key={index} className="card-premium text-center group">
                <p className="text-3xl md:text-4xl font-extrabold text-white mb-1 group-hover:text-accent-light transition-colors">
                  {stat.number}
                </p>
                <p className="text-sm text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default EcosystemPage;
