import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ROUTES,
  COMPANY,
  SOCIAL_LINKS,
  LEGAL_LINKS,
} from "../../shared/constants";
import { useAuthStore } from "../../features/auth/store";
import { Button } from "../../shared/ui";
import { Menu, X, ChevronDown } from "lucide-react";

/* ── Dropdown wrapper ── */
const NavDropdown: React.FC<{
  label: string;
  items: { label: string; path: string }[];
  isActive: (path: string) => boolean;
}> = ({ label, items, isActive }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timeout = useRef<ReturnType<typeof setTimeout>>(undefined);

  const anyActive = items.some((i) => isActive(i.path));

  const enter = () => {
    clearTimeout(timeout.current);
    setOpen(true);
  };
  const leave = () => {
    timeout.current = setTimeout(() => setOpen(false), 150);
  };

  useEffect(() => () => clearTimeout(timeout.current), []);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={enter}
      onMouseLeave={leave}
    >
      <button
        className={`text-sm font-medium transition-colors duration-200 inline-flex items-center gap-1 ${
          anyActive ? "text-accent-light" : "text-slate-400 hover:text-white"
        }`}
        onClick={() => setOpen(!open)}
      >
        {label}
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 min-w-[180px]">
          <div className="rounded-xl border border-navy-border bg-[#0B1121] shadow-2xl py-1.5">
            {items.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className={`block px-4 py-2 text-sm transition-colors ${
                  isActive(item.path)
                    ? "text-accent-light bg-accent/10"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuthStore();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate(ROUTES.HOME);
  };

  /* Mobile links — flat list */
  const allLinks = [
    { label: "Ecosystem", path: ROUTES.ECOSYSTEM },
    { label: "Episode One", path: ROUTES.EPISODE_ONE },
    { label: "SAC1 POS Bridge", path: ROUTES.SAC1_POS_BRIDGE },
    { label: "Digital Assets", path: ROUTES.DIGITAL_ASSETS },
    { label: "Partnership", path: ROUTES.PARTNERSHIP },
    { label: "Roadmap", path: ROUTES.ROADMAP },
    { label: "Contact", path: ROUTES.CONTACT },
  ];

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

          {/* Desktop Navigation — grouped */}
          <div className="hidden lg:flex items-center gap-6">
            <Link
              to={ROUTES.ECOSYSTEM}
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive(ROUTES.ECOSYSTEM)
                  ? "text-accent-light"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Ecosystem
            </Link>

            <NavDropdown
              label="Products"
              isActive={isActive}
              items={[
                { label: "Episode One", path: ROUTES.EPISODE_ONE },
                { label: "SAC1 POS Bridge", path: ROUTES.SAC1_POS_BRIDGE },
                { label: "Digital Assets", path: ROUTES.DIGITAL_ASSETS },
              ]}
            />

            <NavDropdown
              label="About"
              isActive={isActive}
              items={[
                { label: "Partnership", path: ROUTES.PARTNERSHIP },
                { label: "Roadmap", path: ROUTES.ROADMAP },
              ]}
            />

            <Link
              to={ROUTES.CONTACT}
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive(ROUTES.CONTACT)
                  ? "text-accent-light"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={() => navigate(ROUTES.PARTNER_LOGIN)}
                className="hidden sm:inline-flex"
              >
                Partner Portal
              </Button>
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
              {allLinks.map((link) => (
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
              <div className="pt-3 mt-2 border-t border-navy-border/60">
                <Button
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    navigate(ROUTES.PARTNER_LOGIN);
                    setMobileMenuOpen(false);
                  }}
                >
                  Partner Portal
                </Button>
              </div>
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
                  <Link to={ROUTES.PARTNERSHIP} className="hover:text-accent-light transition-colors">
                    Partnership
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.CONTACT} className="hover:text-accent-light transition-colors">
                    Contact
                  </Link>
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
