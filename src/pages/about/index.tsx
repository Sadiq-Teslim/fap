import { Layout } from "../../app/components/Layout";
import { ROUTES } from "../../shared/constants";
import { Link } from "react-router-dom";
import { Gamepad2, Globe, Users, Sparkles, Shield, TrendingUp, ArrowRight } from "lucide-react";
import characterGrid from "../../assets/materials/character-grid.jpg";
import worldScene from "../../assets/materials/world-dunga-progress.jpg";

/* ── Wave divider ── */
const WaveDivider: React.FC<{ fill?: string }> = ({ fill = "#111927" }) => (
  <div className="w-full overflow-hidden leading-[0]">
    <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full h-[60px] md:h-[80px]">
      <path d="M0,40 C240,100 480,0 720,50 C960,100 1200,0 1440,40 L1440,100 L0,100 Z" fill={fill} />
    </svg>
  </div>
);

export const AboutPage: React.FC = () => {
  return (
    <Layout>
      {/* ═══ HERO ═══ */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute top-20 right-20 w-80 h-80 bg-accent/5 rounded-full blur-[120px] animate-float" />
        <div className="container-max relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5">
                <Users className="w-4 h-4 text-accent-light" />
                <span className="text-accent-light font-medium text-sm">About Us</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
                The Future of
                <br />
                <span className="text-gradient">African Gaming</span>
              </h1>
              <p className="text-lg text-slate-400 leading-relaxed mb-8">
                FAPGAME is an innovative episodic open-world action-adventure video game
                that draws inspiration from Africa's profound cultural heritage, abundant
                mineral resources, and contemporary leadership challenges.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to={ROUTES.EPISODE_ONE}>
                  <button className="btn-glow px-6 py-3 text-sm font-semibold inline-flex items-center gap-2">
                    Explore Episode One <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
                <Link to={ROUTES.CONTACT}>
                  <button className="btn-outline-glow px-6 py-3 text-sm font-semibold">
                    Contact Us
                  </button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden border border-navy-border/60 shadow-card">
                <img src={worldScene} alt="FAPGAME World" className="w-full h-auto object-cover" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-accent/10 rounded-full blur-[40px]" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ MISSION ═══ */}
      <WaveDivider fill="#111927" />
      <section className="bg-navy-light pb-24 pt-8">
        <div className="container-max">
          <div className="text-center mb-16">
            <p className="text-accent-light font-semibold text-sm tracking-wider uppercase mb-4">Our Mission</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
              More Than a Game
            </h2>
            <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Modeled after the immersive gameplay of titles like Grand Theft Auto (GTA),
              FAPGAME weaves African cultural elements into a compelling narrative designed
              to captivate a global audience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Gamepad2 className="w-6 h-6" />,
                title: "Immersive Gaming",
                desc: "An open-world action-adventure experience with episodic storytelling rooted in African narratives.",
              },
              {
                icon: <TrendingUp className="w-6 h-6" />,
                title: "Real-World Rewards",
                desc: "Blockchain-powered progressive economic rewards that let players earn as they advance in the game.",
              },
              {
                icon: <Globe className="w-6 h-6" />,
                title: "Cultural Heritage",
                desc: "Deep exploration of African identity, history, and cultural diversity — essential for Pan-African solidarity.",
              },
              {
                icon: <Users className="w-6 h-6" />,
                title: "Youth Empowerment",
                desc: "A transformative platform for positive engagement with Africa's youth through interactive storytelling.",
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: "Web3 Ecosystem",
                desc: "Built on blockchain technology with the SAC1 token, ensuring true digital ownership and transparency.",
              },
              {
                icon: <Sparkles className="w-6 h-6" />,
                title: "Global Stage",
                desc: "Showcasing Africa's richness to a worldwide audience through authentic stories, traditions, and modern realities.",
              },
            ].map((item, i) => (
              <div key={i} className="card-premium group">
                <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent-light mb-5 group-hover:bg-accent/20 group-hover:border-accent/40 transition-all duration-300">
                  {item.icon}
                </div>
                <h3 className="font-bold text-lg mb-2 text-white">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WHO WE ARE ═══ */}
      <WaveDivider fill="#0B1121" />
      <section className="bg-navy pb-24 pt-8">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="rounded-2xl overflow-hidden border border-navy-border/60 shadow-card">
              <img src={characterGrid} alt="FAPGAME Characters" className="w-full h-auto object-cover" />
            </div>
            <div>
              <p className="text-accent-light font-semibold text-sm tracking-wider uppercase mb-4">Who We Are</p>
              <h2 className="text-4xl font-extrabold text-white mb-6">
                Professionals & Innovators
              </h2>
              <p className="text-lg text-slate-400 leading-relaxed mb-6">
                FAPGAME is made up of professionals and innovators dedicated to African
                stories and solutions. Our team of developers, storytellers, and blockchain
                experts creates platforms that educate, inspire, and reward our audience.
              </p>
              <p className="text-lg text-slate-400 leading-relaxed mb-8">
                We combine immersive storytelling, advanced gaming systems, and
                blockchain-powered economic infrastructure to build experiences that extend
                beyond entertainment into empowerment and digital prosperity.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "10+", label: "Team Members" },
                  { value: "Web3", label: "Technology" },
                  { value: "Africa", label: "Heritage" },
                  { value: "Global", label: "Audience" },
                ].map((stat, i) => (
                  <div key={i} className="p-4 rounded-xl border border-navy-border bg-navy-light/50">
                    <p className="text-2xl font-extrabold text-accent-light">{stat.value}</p>
                    <p className="text-sm text-slate-400">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <WaveDivider fill="#111927" />
      <section className="bg-navy-light pb-24 pt-8">
        <div className="container-max">
          <div className="card-premium !p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
                Ready to Enter the World of FAPGAME?
              </h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">
                Join thousands of pioneers exploring Africa's future through gaming, blockchain, and cultural storytelling.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link to={ROUTES.EPISODE_ONE}>
                  <button className="btn-glow px-8 py-3.5 text-sm font-semibold inline-flex items-center gap-2">
                    Explore Episode One <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
                <Link to={ROUTES.ECOSYSTEM}>
                  <button className="btn-outline-glow px-8 py-3.5 text-sm font-semibold">
                    View Ecosystem
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

export default AboutPage;
