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
    <div className="flex flex-col min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-white border-b border-neutral-light shadow-sm">
        <div className="container-max flex items-center justify-between py-4">
          {/* Logo */}
          <Link to={ROUTES.HOME} className="flex items-center gap-2">
            <div className="text-2xl font-bold text-gradient">FAP</div>
            <div className="hidden sm:block text-sm text-neutral-dark opacity-70">
              Future Africa Project
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-semibold transition-colors ${
                  isActive(link.path)
                    ? "text-primary"
                    : "text-neutral-dark hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
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
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-neutral-light bg-white">
            <div className="container-max flex flex-col gap-4 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-semibold transition-colors ${
                    isActive(link.path)
                      ? "text-primary"
                      : "text-neutral-dark hover:text-primary"
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
      <footer className="border-t border-neutral-light bg-neutral-dark text-white">
        <div className="container-max py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* About */}
            <div>
              <h3 className="font-bold text-lg mb-4">FAP</h3>
              <p className="text-sm opacity-80">
                Future Africa Project - Bridging virtual achievements and
                real-world prosperity.
              </p>
            </div>

            {/* Company Info */}
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="text-sm space-y-2 opacity-80">
                <li>
                  <a
                    href={ROUTES.PARTNERSHIP}
                    className="hover:text-primary transition"
                  >
                    Partnership
                  </a>
                </li>
                <li>
                  <a
                    href={ROUTES.CONTACT}
                    className="hover:text-primary transition"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <span>{COMPANY.HEADQUARTERS}</span>
                </li>
                <li>
                  <a
                    href={`mailto:${COMPANY.EMAIL}`}
                    className="hover:text-primary transition"
                  >
                    {COMPANY.EMAIL}
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="text-sm space-y-2 opacity-80">
                <li>
                  <Link
                    to={LEGAL_LINKS.PRIVACY_POLICY}
                    className="hover:text-primary transition"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to={LEGAL_LINKS.TERMS_OF_SERVICE}
                    className="hover:text-primary transition"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    to={LEGAL_LINKS.NDPA_COMPLIANCE}
                    className="hover:text-primary transition"
                  >
                    NDPA Compliance
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <a
                  href={SOCIAL_LINKS.TWITTER}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition"
                >
                  Twitter
                </a>
                <a
                  href={SOCIAL_LINKS.DISCORD}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition"
                >
                  Discord
                </a>
                <a
                  href={SOCIAL_LINKS.TELEGRAM}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition"
                >
                  Telegram
                </a>
              </div>
            </div>
          </div>

          {/* Trust Bar */}
          <div className="border-t border-white border-opacity-20 pt-8">
            <div className="text-center text-sm opacity-70">
              <p>
                Lead Partner:{" "}
                <span className="font-semibold text-primary">
                  {COMPANY.PARTNER_NAME}
                </span>{" "}
                | Funded:{" "}
                <span className="font-semibold">
                  {COMPANY.INVESTMENT_AMOUNT.toLocaleString()}{" "}
                  {COMPANY.INVESTMENT_CURRENCY}
                </span>
              </p>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center text-xs opacity-60 mt-4">
            <p>
              © {new Date().getFullYear()} {COMPANY.NAME}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
