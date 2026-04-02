import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ROUTES,
  COMPANY,
  SOCIAL_LINKS,
  LEGAL_LINKS,
} from "../../shared/constants";
import { useAuthStore } from "../../features/auth/store";
import { Button } from "../../shared/ui";
import { Menu, X } from "lucide-react";

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuthStore();

  const navLinks = [
    { label: "Ecosystem", path: ROUTES.ECOSYSTEM },
    { label: "Episode One", path: ROUTES.EPISODE_ONE },
    { label: "SAC1 POS Bridge", path: ROUTES.SAC1_POS_BRIDGE },
    { label: "Digital Assets", path: ROUTES.DIGITAL_ASSETS },
    { label: "Partnership", path: ROUTES.PARTNERSHIP },
    { label: "Roadmap", path: ROUTES.ROADMAP },
    { label: "Contact", path: ROUTES.CONTACT },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate(ROUTES.HOME);
  };

  return (
    <div className="flex flex-col min-h-screen bg-navy">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-navy/80 backdrop-blur-xl border-b border-navy-border/60">
        <div className="container-max flex items-center justify-between py-4">
          {/* Logo */}
          <Link to={ROUTES.HOME} className="flex items-center gap-3">
            <div className="text-2xl font-extrabold text-gradient">FAP</div>
            <div className="hidden sm:block text-sm text-slate-500 font-medium">
              Future Africa Project
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive(link.path)
                    ? "text-accent-light"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate(ROUTES.PARTNER_LOGIN)}
                >
                  Partner Login
                </Button>
                <Button
                  size="sm"
                  onClick={() => navigate(ROUTES.PARTNER_LOGIN)}
                >
                  Portal
                </Button>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-navy-border/60 bg-navy-light/95 backdrop-blur-xl">
            <div className="container-max flex flex-col gap-1 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium py-2.5 px-3 rounded-lg transition-colors ${
                    isActive(link.path)
                      ? "text-accent-light bg-accent/10"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t border-navy-border/60 bg-navy-light">
        <div className="container-max py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
            {/* About */}
            <div>
              <h3 className="font-bold text-xl mb-4 text-gradient">FAP</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Future Africa Project — Bridging virtual achievements and
                real-world prosperity across the continent.
              </p>
            </div>

            {/* Company Info */}
            <div>
              <h4 className="font-semibold mb-4 text-white text-sm uppercase tracking-wider">Company</h4>
              <ul className="text-sm space-y-3 text-slate-500">
                <li>
                  <a href={ROUTES.PARTNERSHIP} className="hover:text-accent-light transition-colors">
                    Partnership
                  </a>
                </li>
                <li>
                  <a href={ROUTES.CONTACT} className="hover:text-accent-light transition-colors">
                    Contact
                  </a>
                </li>
                <li><span>{COMPANY.HEADQUARTERS}</span></li>
                <li>
                  <a href={`mailto:${COMPANY.EMAIL}`} className="hover:text-accent-light transition-colors">
                    {COMPANY.EMAIL}
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold mb-4 text-white text-sm uppercase tracking-wider">Legal</h4>
              <ul className="text-sm space-y-3 text-slate-500">
                <li>
                  <Link to={LEGAL_LINKS.PRIVACY_POLICY} className="hover:text-accent-light transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to={LEGAL_LINKS.TERMS_OF_SERVICE} className="hover:text-accent-light transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to={LEGAL_LINKS.NDPA_COMPLIANCE} className="hover:text-accent-light transition-colors">
                    NDPA Compliance
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="font-semibold mb-4 text-white text-sm uppercase tracking-wider">Follow Us</h4>
              <div className="flex gap-4">
                {[
                  { label: "Twitter", href: SOCIAL_LINKS.TWITTER },
                  { label: "Discord", href: SOCIAL_LINKS.DISCORD },
                  { label: "Telegram", href: SOCIAL_LINKS.TELEGRAM },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-slate-500 hover:text-accent-light transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Trust Bar */}
          <div className="border-t border-navy-border/60 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-slate-600">
              <p>
                &copy; {new Date().getFullYear()} {COMPANY.NAME}. All rights reserved.
              </p>
            </div>
            <div className="text-sm text-slate-600">
              Lead Partner:{" "}
              <span className="text-accent-light font-medium">{COMPANY.PARTNER_NAME}</span>
              {" "}&middot;{" "}
              Funded:{" "}
              <span className="text-white font-medium">
                ${COMPANY.INVESTMENT_AMOUNT.toLocaleString()} {COMPANY.INVESTMENT_CURRENCY}
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
