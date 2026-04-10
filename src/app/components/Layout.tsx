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
    { label: "About Us", path: ROUTES.ABOUT },
    { label: "Ecosystem", path: ROUTES.ECOSYSTEM },
    { label: "Episode One", path: ROUTES.EPISODE_ONE },
    { label: "SAC1 POS Bridge", path: ROUTES.SAC1_POS_BRIDGE },
    { label: "Digital Assets", path: ROUTES.DIGITAL_ASSETS },
    { label: "Strategic Partnership", path: ROUTES.PARTNERSHIP },
    { label: "Roadmap", path: ROUTES.ROADMAP },
    { label: "Contact & Investor Relations", path: ROUTES.CONTACT },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-navy">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-navy/80 backdrop-blur-xl border-b border-navy-border/60">
        <div className="container-max flex items-center justify-between py-4">
          {/* Logo */}
          <Link to={ROUTES.HOME} className="flex items-center gap-3">
            <div className="text-2xl font-extrabold text-gradient">FAPGAME</div>
            <div className="hidden sm:block text-sm text-slate-500 font-medium">
              Future Africa Project
            </div>
          </Link>

          {/* Desktop Navigation — grouped */}
          <div className="hidden lg:flex items-center gap-6">
            <Link
              to={ROUTES.ABOUT}
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive(ROUTES.ABOUT)
                  ? "text-accent-light"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              About Us
            </Link>

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
              label="More"
              isActive={isActive}
              items={[
                { label: "Strategic Partnership", path: ROUTES.PARTNERSHIP },
                { label: "Roadmap", path: ROUTES.ROADMAP },
                { label: "Contact & Investor Relations", path: ROUTES.CONTACT },
              ]}
            />
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
              <h3 className="font-bold text-xl mb-4 text-gradient">FAPGAME</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                FAPGAME — An innovative open-world action-adventure video game
                bridging virtual achievements and real-world prosperity across Africa.
              </p>
            </div>

            {/* Company Info */}
            <div>
              <h4 className="font-semibold mb-4 text-white text-sm uppercase tracking-wider">Company</h4>
              <ul className="text-sm space-y-3 text-slate-500">
                <li>
                  <Link to={ROUTES.ABOUT} className="hover:text-accent-light transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.PARTNERSHIP} className="hover:text-accent-light transition-colors">
                    Strategic Partnership
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.CONTACT} className="hover:text-accent-light transition-colors">
                    Contact & Investor Relations
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
                <a
                  href={SOCIAL_LINKS.TWITTER}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (Twitter)"
                  className="w-10 h-10 rounded-lg border border-navy-border flex items-center justify-center text-slate-400 hover:text-white hover:border-accent/40 hover:bg-accent/10 transition-all duration-300"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href={SOCIAL_LINKS.INSTAGRAM}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-lg border border-navy-border flex items-center justify-center text-slate-400 hover:text-white hover:border-accent/40 hover:bg-accent/10 transition-all duration-300"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
                <a
                  href={SOCIAL_LINKS.FACEBOOK}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-10 h-10 rounded-lg border border-navy-border flex items-center justify-center text-slate-400 hover:text-white hover:border-accent/40 hover:bg-accent/10 transition-all duration-300"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
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
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
