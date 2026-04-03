import { Layout } from "../../app/components/Layout";
import { COMPANY, ROADMAP_PHASES } from "../../shared/constants";
import {
  CheckCircle,
  Clock,
  Target,
  ArrowRight,
  Landmark,
  Users,
  Code,
  Handshake,
} from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../shared/constants";

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
   PAGE 6 — STRATEGIC PARTNERSHIP
   ═════════════════════════════════════════════════ */
const PartnershipPage: React.FC = () => {
  return (
    <Layout>
      {/* ═══ HERO ═══ */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute top-10 right-20 w-80 h-80 bg-accent/5 rounded-full blur-[100px] animate-float" />
        <div className="container-max relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5">
              <Landmark className="w-4 h-4 text-accent-light" />
              <span className="text-accent-light font-medium text-sm">
                The Alliance
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
              Powered by{" "}
              <span className="text-gradient">
                SableAssent Coin Corporation
              </span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
              Excellence is built on partnership. With a $
              {COMPANY.INVESTMENT_AMOUNT.toLocaleString()}.00 USD investment
              commitment, SableAssent is the cornerstone of FAP's financial
              and technical stability.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ INSTITUTIONAL BACKING ═══ */}
      <WaveDivider fill="#111927" />
      <section className="bg-navy-light pb-24 pt-8">
        <div className="container-max">
          <div className="text-center mb-16">
            <p className="text-accent-light font-semibold text-sm tracking-wider uppercase mb-4">
              Why It Matters
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
              Institutional Backing
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              This partnership represents a shared belief in the "Future Africa"
              — a continent where digital innovation drives economic
              sovereignty.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Financial Stability",
                items: [
                  "$2M USD commitment",
                  "Multi-year support",
                  "Growth capital available",
                ],
              },
              {
                title: "Technical Foundation",
                items: [
                  "99.9% uptime",
                  "Near-zero gas fees",
                  "Instant finality",
                ],
              },
              {
                title: "Continental Vision",
                items: [
                  "Pan-African scope",
                  "Economic sovereignty",
                  "Digital innovation",
                ],
              },
            ].map((feature, index) => (
              <div key={index} className="card-premium group h-full">
                <h3 className="text-xl font-bold mb-5 text-white group-hover:text-accent-light transition-colors">
                  {feature.title}
                </h3>
                <ul className="space-y-3">
                  {feature.items.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-slate-300"
                    >
                      <CheckCircle className="w-5 h-5 text-accent-light flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PARTNERSHIP OPPORTUNITIES ═══ */}
      <WaveDivider fill="#0B1121" />
      <section className="bg-navy pb-24 pt-8">
        <div className="container-max">
          <div className="text-center mb-16">
            <p className="text-accent-light font-semibold text-sm tracking-wider uppercase mb-4">
              Get Involved
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
              Partnership Opportunities
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: <Users className="w-6 h-6" />,
                title: "For Players",
                desc: "Join our Episode One Alpha list and be among the first Pioneers to earn real value.",
              },
              {
                icon: <Code className="w-6 h-6" />,
                title: "For Developers",
                desc: "Participate in the FAP Pioneers Internship Program and build on the SAC1 blockchain.",
              },
              {
                icon: <Handshake className="w-6 h-6" />,
                title: "For Partners",
                desc: "Inquire about SAC1 POS merchant integration and grow your business with Web3.",
              },
            ].map((opp, i) => (
              <div key={i} className="card-premium group h-full">
                <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent-light mb-5 group-hover:bg-accent/20 group-hover:border-accent/40 transition-all duration-300">
                  {opp.icon}
                </div>
                <h3 className="font-bold text-lg mb-2 text-white group-hover:text-accent-light transition-colors">
                  {opp.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {opp.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to={ROUTES.CONTACT}>
              <button className="btn-glow px-8 py-4 text-base font-semibold inline-flex items-center gap-2">
                Become a Partner <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

/* ═════════════════════════════════════════════════
   PAGE 7 — ROADMAP
   ═════════════════════════════════════════════════ */
const RoadmapPage: React.FC = () => {
  return (
    <Layout>
      {/* ═══ HERO ═══ */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-[100px] animate-float-delayed" />
        <div className="container-max relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5">
              <Target className="w-4 h-4 text-accent-light" />
              <span className="text-accent-light font-medium text-sm">
                Roadmap
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
              Our Path to{" "}
              <span className="text-gradient">Continental Transformation</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
              Milestones and objectives for the Future Africa Project.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ PHASES ═══ */}
      <WaveDivider fill="#111927" />
      <section className="bg-navy-light pb-24 pt-8">
        <div className="container-max">
          <div className="text-center mb-16">
            <p className="text-accent-light font-semibold text-sm tracking-wider uppercase mb-4">
              The Plan
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
              Phased Rollout
            </h2>
          </div>

          <div className="space-y-6">
            {Object.entries(ROADMAP_PHASES).map(([key, phase], i) => (
              <div key={key} className="card-premium group relative">
                {/* Ghost number */}
                <div className="absolute -top-3 -right-2 text-7xl font-extrabold text-white/[0.03] select-none pointer-events-none leading-none">
                  0{i + 1}
                </div>

                <div className="flex items-start gap-5 relative">
                  <div className="flex-shrink-0 mt-1">
                    {phase.status === "in_progress" ? (
                      <div className="w-11 h-11 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-accent-light" />
                      </div>
                    ) : (
                      <div className="w-11 h-11 rounded-xl bg-warning/10 border border-warning/20 flex items-center justify-center">
                        <Clock className="w-6 h-6 text-warning" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="text-xl font-bold text-accent-light">
                        {phase.name}
                      </h3>
                      <span
                        className={`badge text-xs ${phase.status === "in_progress" ? "badge-success" : "badge-warning"}`}
                      >
                        {phase.status === "in_progress"
                          ? "In Progress"
                          : "Upcoming"}
                      </span>
                    </div>
                    <h4 className="text-lg font-semibold mb-2 text-white">
                      {phase.title}
                    </h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {phase.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <WaveDivider fill="#0B1121" />
      <section className="bg-navy pb-24 pt-8">
        <div className="container-max">
          <div className="relative rounded-3xl overflow-hidden border border-accent/15">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/8 via-navy-mid to-primary/8" />
            <div className="absolute top-0 left-1/3 w-80 h-80 bg-accent/8 rounded-full blur-[120px]" />

            <div className="relative px-8 py-14 md:py-16 text-center">
              <Target className="w-12 h-12 text-accent-light mx-auto mb-5" />
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
                Building Africa's Digital Future
              </h2>
              <p className="text-slate-400 mb-8 max-w-lg mx-auto">
                The FAP roadmap represents a continental commitment to digital
                innovation and economic transformation.
              </p>
              <Link to={ROUTES.CONTACT}>
                <button className="btn-glow px-8 py-3.5 text-sm font-semibold inline-flex items-center gap-2">
                  Join the Journey <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export { PartnershipPage as default, RoadmapPage };
