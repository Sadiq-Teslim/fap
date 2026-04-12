import { Layout } from "../../app/components/Layout";
import { ROUTES } from "../../shared/constants";
import { Link } from "react-router-dom";
import { Gamepad2, Globe, Users, Sparkles, Shield, TrendingUp, ArrowRight } from "lucide-react";
import { useScrollAnimation } from "../../shared/hooks/useScrollAnimation";
import { GlitchText } from "../../shared/components/GlitchText";
import { TiltCard } from "../../shared/components/TiltCard";
import { FloatingParticles } from "../../shared/components/FloatingParticles";
import { Typewriter } from "../../shared/components/Typewriter";
import { useParallax } from "../../shared/hooks/useParallax";
import characterGrid from "../../assets/materials/character-grid.jpg";

/* ── Wave divider ── */
const WaveDivider: React.FC<{ fill?: string }> = ({ fill = "#111927" }) => (
  <div className="w-full overflow-hidden leading-[0]">
    <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full h-[60px] md:h-[80px]">
      <path d="M0,40 C240,100 480,0 720,50 C960,100 1200,0 1440,40 L1440,100 L0,100 Z" fill={fill} />
    </svg>
  </div>
);

export const AboutPage: React.FC = () => {
  const scrollRef = useScrollAnimation();
  const parallaxHero = useParallax(0.12);

  return (
    <Layout>
      <div ref={scrollRef}>
        {/* ═══ HERO — centered ═══ */}
        <section className="relative py-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-hero" />
          <div className="absolute top-20 right-20 w-80 h-80 bg-accent/5 rounded-full blur-[120px] animate-float" />
          <FloatingParticles count={25} />
          <div className="container-max relative z-10">
            <div ref={parallaxHero} className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 animate-on-scroll">
                <Users className="w-4 h-4 text-accent-light" />
                <span className="text-accent-light font-medium text-sm">About Us</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight animate-on-scroll delay-100">
                The Future of
                <br />
                <GlitchText text="African Gaming" className="text-gradient" />
              </h1>
              <p className="text-lg text-slate-400 leading-relaxed mb-8 animate-on-scroll delay-200">
                <Typewriter
                  text="FAPGAME is an innovative episodic open-world action-adventure video game that draws inspiration from Africa's profound cultural heritage, abundant mineral resources, and contemporary leadership challenges."
                  speed={20}
                  delay={600}
                />
              </p>
              <div className="flex flex-wrap gap-4 justify-center animate-on-scroll delay-300">
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
          </div>
        </section>

        {/* ═══ MISSION ═══ */}
        <WaveDivider fill="#111927" />
        <section className="bg-navy-light pb-24 pt-8">
          <div className="container-max">
            <div className="text-center mb-16 animate-on-scroll">
              <p className="text-accent-light font-semibold text-sm tracking-wider uppercase mb-4">Our Mission</p>
              <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-6">
                <GlitchText text="More Than a Game" className="text-white" />
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
                <TiltCard key={i} className={`animate-on-scroll delay-${(i % 3) * 100}`}>
                  <div className="card-premium group h-full">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent-light mb-5 group-hover:bg-accent/20 group-hover:border-accent/40 transition-all duration-300">
                      {item.icon}
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-white">{item.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ WHO WE ARE ═══ */}
        <WaveDivider fill="#0B1121" />
        <section className="bg-navy pb-24 pt-8">
          <div className="container-max">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <TiltCard className="animate-on-scroll">
                <div className="rounded-2xl overflow-hidden border border-navy-border/60 shadow-card max-h-[500px]">
                  <img src={characterGrid} alt="FAPGAME Characters" className="w-full h-full object-cover" />
                </div>
              </TiltCard>
              <div className="animate-on-scroll delay-200">
                <p className="text-accent-light font-semibold text-sm tracking-wider uppercase mb-4">Who We Are</p>
                <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-6">
                  Professionals & <GlitchText text="Innovators" className="text-white" />
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
            <div className="card-premium !p-12 text-center relative overflow-hidden animate-on-scroll">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5" />
              <div className="relative">
                <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-4">
                  Ready to Enter the World of <GlitchText text="FAPGAME" className="text-accent-light" />?
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
      </div>
    </Layout>
  );
};

export default AboutPage;
