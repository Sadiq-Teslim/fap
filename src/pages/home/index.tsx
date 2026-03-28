import { Link } from "react-router-dom";
import { ROUTES, COMPANY } from "../../shared/constants";
import { Button } from "../../shared/ui";
import { Layout } from "../../app/components/Layout";
import { Zap, TrendingUp, Shield, Globe, Sparkles, ArrowRight } from "lucide-react";

export const HomePage: React.FC = () => {
  return (
    <Layout>
      {/* Premium Hero Section - Blue Gradient */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-hero">
        {/* Animated Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-glow"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-glow" style={{animationDelay: '2s'}}></div>
        
        <div className="container-max relative z-10 py-20">
          <div className="max-w-5xl mx-auto text-center animate-slideInUp">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-8">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span className="text-white font-medium tracking-widest text-sm uppercase">Premium Web3 Platform</span>
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>

            {/* Main Title */}
            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight text-white">
              Explore the<br/>
              <span className="text-accent-light">Largest NFT</span><br/>
              Marketplace
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-white opacity-90 mb-12 max-w-2xl mx-auto leading-relaxed">
              Buy, Sell & Trade Cryptocurrency with enterprise-grade security. 
              The Future Africa Project merges gaming with blockchain utility.
            </p>

            {/* Milestone Card */}
            <div className="mb-12 p-8 border border-white/30 bg-white/10 backdrop-blur-md max-w-2xl mx-auto rounded-xl">
              <p className="text-white text-sm mb-2 opacity-90">INVESTMENT MILESTONE</p>
              <p className="text-4xl font-bold text-white">
                ${COMPANY.INVESTMENT_AMOUNT.toLocaleString()}<span className="text-accent-light font-light">.00 USD</span>
              </p>
              <p className="text-sm text-white opacity-80 mt-3">
                Capital injection by Sable Assents Coin Corporation for FAP Episode One
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link to={ROUTES.EPISODE_ONE}>
                <button className="btn-glow px-10 py-4 text-lg">
                  Explore Now
                  <ArrowRight className="w-5 h-5 inline ml-2" />
                </button>
              </Link>
              <Link to={ROUTES.PARTNERSHIP}>
                <button className="px-10 py-4 text-lg font-semibold text-white border-2 border-white hover:bg-white hover:text-primary-dark transition-all duration-300 rounded-lg">
                  Learn More
                </button>
              </Link>
            </div>

            {/* Stats Line */}
            <div className="flex items-center justify-center gap-8 pt-8 border-t border-white/20">
              <div className="text-center">
                <p className="text-white font-bold text-2xl">10K+</p>
                <p className="text-white text-xs opacity-70 mt-1">Active Pioneers</p>
              </div>
              <div className="w-px h-8 bg-white/20"></div>
              <div className="text-center">
                <p className="text-white font-bold text-2xl">$2M+</p>
                <p className="text-white text-xs opacity-70 mt-1">Assets Traded</p>
              </div>
              <div className="w-px h-8 bg-white/20"></div>
              <div className="text-center">
                <p className="text-white font-bold text-2xl">99.9%</p>
                <p className="text-white text-xs opacity-70 mt-1">Uptime</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose FAP - Teal Gradient */}
      <section className="py-24 bg-gradient-teal">
        <div className="container-max">
          <div className="max-w-2xl mx-auto mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6">Why Choose FAP</h2>
            <p className="text-lg text-white opacity-90">
              Enterprise-grade Web3 gaming infrastructure with real-world utility and institutional backing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-6 h-6" />,
                title: "High-Performance",
                description: "Lightning-fast gaming with real-time blockchain settlement",
              },
              {
                icon: <Globe className="w-6 h-6" />,
                title: "Real-World Utility",
                description: "Convert digital achievements into tangible assets instantly",
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: "Bank-Grade Security",
                description: "Military-grade encryption with immutable verification",
              },
              {
                icon: <TrendingUp className="w-6 h-6" />,
                title: "Transparent Economics",
                description: "Real-time market data with zero hidden fees",
              },
              {
                icon: <Sparkles className="w-6 h-6" />,
                title: "Community Driven",
                description: "Built by and for the African tech renaissance",
              },
              {
                icon: <ArrowRight className="w-6 h-6" />,
                title: "Seamless Integration",
                description: "Connect wallets and start trading in seconds",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group p-8 border border-white/20 bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300 rounded-xl"
              >
                <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center text-white mb-4 group-hover:bg-white group-hover:text-primary-dark transition-colors">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-lg mb-2 text-white">
                  {feature.title}
                </h3>
                <p className="text-white opacity-80 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem Explorer - Indigo/Slate */}
      <section className="py-24 bg-gradient-indigo">
        <div className="container-max">
          <div className="mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6">Explore the Ecosystem</h2>
            <div className="w-20 h-1 bg-white"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                path: ROUTES.ECOSYSTEM,
                title: "The Ecosystem",
                description:
                  "A closed-loop digital economy with the Triangle of Utility",
              },
              {
                path: ROUTES.EPISODE_ONE,
                title: "Episode One",
                description: "Immersive gaming experience with real value creation",
              },
              {
                path: ROUTES.SAC1_POS_BRIDGE,
                title: "SAC1 POS Bridge",
                description:
                  "Seamless conversion from digital to real-world liquidity",
              },
              {
                path: ROUTES.DIGITAL_ASSETS,
                title: "Digital Assets",
                description:
                  "Create, trade, and own verifiable blockchain assets",
              },
              {
                path: ROUTES.PARTNERSHIP,
                title: "Our Partnership",
                description: "Powered by institutional capital and expertise",
              },
              {
                path: ROUTES.ROADMAP,
                title: "The Roadmap",
                description: "Multi-year vision for continental transformation",
              },
            ].map((item, index) => (
              <Link key={index} to={item.path}>
                <div className="p-8 border border-white/20 bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300 group cursor-pointer h-full flex flex-col rounded-xl">
                  <div className="flex-grow">
                    <h3 className="font-bold text-xl mb-2 text-white group-hover:text-accent-light transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-white opacity-80 text-sm">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-6 text-white font-semibold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                    Explore
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section - Violet Gradient */}
      <section className="py-32 bg-gradient-violet relative overflow-hidden">
        <div className="container-max relative z-10 text-center">
          <h2 className="text-5xl md:text-6xl font-black mb-8 text-white">
            Ready to Transform Your Future?
          </h2>
          <p className="text-lg opacity-90 mb-12 max-w-2xl mx-auto text-white">
            Join thousands of pioneers building the Web3 economy in Africa. 
            Your digital achievements are worth real value.
          </p>
          <Link to={ROUTES.CONTACT}>
            <button className="bg-white hover:bg-accent-light text-primary hover:text-primary-dark px-10 py-4 text-lg font-semibold transition-all duration-300 inline-flex items-center gap-2 rounded-lg shadow-lg">
              Get Started
              <Sparkles className="w-5 h-5" />
            </button>
          </Link>
        </div>
      </section>

      {/* Trust Metrics - Warm Gradient */}
      <section className="py-20 bg-gradient-warm">
        <div className="container-max">
          <p className="text-center text-white opacity-90 mb-12 font-medium">
            Trusted by institutional investors and powered by cutting-edge blockchain technology
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Players Active", value: "10K+" },
              { label: "Assets Traded", value: "$2M+" },
              { label: "Uptime", value: "99.9%" },
              { label: "Security Audits", value: "5/5" },
            ].map((stat, index) => (
              <div key={index} className="p-4">
                <p className="text-white font-bold text-3xl mb-2">{stat.value}</p>
                <p className="text-sm text-white opacity-80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export const NotFoundPage: React.FC = () => {
  return (
    <Layout>
      <section className="min-h-[600px] flex items-center py-20 bg-neutral-light">
        <div className="container-max text-center">
          <h1 className="text-6xl font-bold text-neutral-dark mb-4">404</h1>
          <h2 className="text-3xl font-bold text-neutral-dark mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-neutral-dark opacity-70 mb-8">
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
