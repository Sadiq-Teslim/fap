import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button, Alert } from "../../shared/ui";
import { ROUTES, COMPANY } from "../../shared/constants";
import { useAuthStore } from "../../features/auth/store";
import { authService } from "../../shared/api";
import {
  Lock,
  AlertCircle,
  TrendingUp,
  DollarSign,
  CreditCard,
  Users,
  CheckCircle,
  Clock,
  BarChart3,
  Activity,
  Wallet,
  FileText,
  Download,
  Shield,
} from "lucide-react";

/* ═════════════════════════════════════════════════
   PARTNER LOGIN PAGE
   ═════════════════════════════════════════════════ */
const PartnerLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { setUser, setToken } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [values, setValues] = useState({
    email: "",
    password: "",
    twoFACode: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (loginError) setLoginError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError(null);

    // Client-side validation
    if (!values.email || !values.password) {
      setLoginError("Email and password are required.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await authService.login({
        email: values.email,
        password: values.password,
        twoFACode: values.twoFACode || undefined,
      });

      if (response.success && response.data) {
        // Update global auth state
        setUser(response.data.user);
        setToken(response.data.token);
        navigate(ROUTES.PARTNER_DASHBOARD);
      } else {
        setLoginError(
          response.error?.message || "Login failed. Please try again.",
        );
      }
    } catch {
      setLoginError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-20 left-20 w-80 h-80 bg-accent/5 rounded-full blur-[120px] animate-float" />
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-primary/5 rounded-full blur-[100px] animate-float-delayed" />

      <div className="card-premium w-full max-w-md !p-8 relative">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-4xl font-bold text-gradient mb-4">FAPGAME</div>
          <h1 className="text-2xl font-extrabold text-white mb-2">
            Partner Portal
          </h1>
          <p className="text-slate-400">
            Strategic Transparency for the Future of Africa
          </p>
        </div>

        {/* Alert */}
        {loginError && (
          <Alert
            type="error"
            title="Authentication Failed"
            closeable
            onClose={() => setLoginError(null)}
            className="mb-6"
          >
            {loginError}
          </Alert>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Institutional Email"
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            placeholder="partner@company.com"
            icon={<AlertCircle className="w-4 h-4" />}
            required
            disabled={isLoading}
          />

          <div className="relative">
            <Input
              label="Encrypted Access Key"
              type={showPassword ? "text" : "password"}
              name="password"
              value={values.password}
              onChange={handleChange}
              placeholder="••••••••••••"
              icon={<Lock className="w-4 h-4" />}
              required
              disabled={isLoading}
            />
            <button
              type="button"
              className="absolute right-3 top-10 text-sm text-accent-light hover:text-white transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <Input
            label="Two-Factor Authentication Code"
            type="text"
            name="twoFACode"
            value={values.twoFACode}
            onChange={handleChange}
            placeholder="000000"
            helperText="Enter your 6-digit code from your authenticator app"
            disabled={isLoading}
          />

          <Button
            type="submit"
            size="lg"
            className="w-full"
            isLoading={isLoading}
            disabled={isLoading}
          >
            Sign In
          </Button>
        </form>

        {/* Footer Note */}
        <div className="mt-8 p-4 rounded-xl border border-accent/20 bg-accent/5">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-accent-light flex-shrink-0 mt-0.5" />
            <p className="text-xs text-accent-light/80">
              <strong className="text-accent-light">Note:</strong> This portal
              is strictly reserved for Authorized Lead Partners. All access is
              logged and encrypted via the SAC1 Blockchain Security Protocol.
            </p>
          </div>
        </div>

        {/* Company Info */}
        <div className="mt-6 pt-6 border-t border-navy-border text-center text-xs text-slate-500">
          <p>{COMPANY.NAME}</p>
          <p>Lead Partner: {COMPANY.PARTNER_NAME}</p>
        </div>
      </div>
    </div>
  );
};

/* ═════════════════════════════════════════════════
   PARTNER DASHBOARD PAGE
   ═════════════════════════════════════════════════ */
const PartnerDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "overview" | "investment" | "metrics" | "reports"
  >("overview");
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.PARTNER_LOGIN);
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: <BarChart3 className="w-4 h-4" /> },
    { id: "investment", label: "Investment", icon: <DollarSign className="w-4 h-4" /> },
    { id: "metrics", label: "Metrics", icon: <Activity className="w-4 h-4" /> },
    { id: "reports", label: "Reports", icon: <FileText className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-navy">
      {/* Header */}
      <div className="bg-navy-light border-b border-navy-border sticky top-0 z-10 backdrop-blur-md bg-navy-light/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-extrabold text-white">
                Partner Dashboard
              </h1>
              <p className="text-slate-400 mt-1">
                Real-Time Oversight of the FAPGAME Implementation
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm text-slate-400">Lead Partner</p>
                <p className="font-semibold text-white">
                  {user?.fullName || COMPANY.PARTNER_NAME}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent-light font-bold">
                SA
              </div>
              <button
                onClick={handleLogout}
                className="text-sm text-slate-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg border border-navy-border hover:border-accent/30"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-t border-navy-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as "overview" | "investment" | "metrics" | "reports")}
                className={`py-4 px-4 font-semibold transition-all duration-300 inline-flex items-center gap-2 text-sm ${
                  activeTab === tab.id
                    ? "text-accent-light border-b-2 border-accent"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "overview" && <OverviewTab />}
        {activeTab === "investment" && <InvestmentTab />}
        {activeTab === "metrics" && <MetricsTab />}
        {activeTab === "reports" && <ReportsTab />}
      </div>
    </div>
  );
};

/* ── Overview Tab ── */
const OverviewTab: React.FC = () => {
  const statIcons = [
    <DollarSign className="w-6 h-6" />,
    <TrendingUp className="w-6 h-6" />,
    <CreditCard className="w-6 h-6" />,
    <Users className="w-6 h-6" />,
  ];

  return (
    <div className="space-y-6">
      <Alert type="success" title="Project Status" className="mb-6">
        <p>
          FAPGAME Episode One implementation is on track. Current completion: 35%
        </p>
      </Alert>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: "Investment Status", value: "Active", status: "active" },
          { label: "Disbursed to Date", value: "$700,000", status: "pending" },
          { label: "POS Terminals", value: "50 Active", status: "active" },
          { label: "Registered Pioneers", value: "2,500+", status: "active" },
        ].map((stat, index) => (
          <div key={index} className="card-premium group">
            <div className="flex items-start justify-between mb-4">
              <div className="w-11 h-11 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent-light group-hover:bg-accent/20 group-hover:border-accent/40 transition-all duration-300">
                {statIcons[index]}
              </div>
              <span
                className={`badge text-xs ${stat.status === "active" ? "badge-success" : "badge-warning"}`}
              >
                {stat.status}
              </span>
            </div>
            <p className="text-sm text-slate-400 mb-1">{stat.label}</p>
            <p className="text-2xl font-extrabold text-white group-hover:text-accent-light transition-colors">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="card-premium">
        <h3 className="font-bold text-lg mb-6 text-white">Key Milestones</h3>
        <div className="space-y-4">
          {[
            {
              milestone: "Alpha Build Complete",
              date: "February 2026",
              status: "complete",
            },
            {
              milestone: "SAC1 Integration",
              date: "March 2026",
              status: "in_progress",
            },
            {
              milestone: "POS Terminal Setup",
              date: "April 2026",
              status: "pending",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between pb-4 border-b border-navy-border last:border-0 last:pb-0"
            >
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  {item.status === "complete" ? (
                    <CheckCircle className="w-5 h-5 text-accent-light" />
                  ) : (
                    <Clock className="w-5 h-5 text-warning" />
                  )}
                </div>
                <div>
                  <p className="font-semibold text-white">{item.milestone}</p>
                  <p className="text-sm text-slate-400">{item.date}</p>
                </div>
              </div>
              <span
                className={`badge text-xs ${item.status === "complete" ? "badge-success" : item.status === "in_progress" ? "badge-warning" : "badge-primary"}`}
              >
                {item.status === "complete"
                  ? "Complete"
                  : item.status === "in_progress"
                    ? "In Progress"
                    : "Pending"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ── Investment Tab ── */
const InvestmentTab: React.FC = () => {
  const items = [
    { category: "Development", percent: 65 },
    { category: "Infrastructure", percent: 20 },
    { category: "Marketing", percent: 15 },
  ];

  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="card-premium group">
          <p className="text-sm text-slate-400 mb-1">Commitment</p>
          <p className="text-2xl font-extrabold text-white">Institutional</p>
        </div>
        <div className="card-premium group">
          <p className="text-sm text-slate-400 mb-1">Disbursement Status</p>
          <p className="text-2xl font-extrabold text-accent-light">On Track</p>
        </div>
        <div className="card-premium group">
          <p className="text-sm text-slate-400 mb-1">Utilization</p>
          <p className="text-2xl font-extrabold text-white">35%</p>
        </div>
      </div>

      {/* Breakdown */}
      <div className="card-premium">
        <h3 className="font-bold text-lg mb-6 text-white">
          Investment Allocation Breakdown
        </h3>
        <div className="space-y-6">
          {items.map((item, index) => (
            <div key={index}>
              <div className="flex justify-between mb-2">
                <p className="font-semibold text-white">{item.category}</p>
                <p className="text-accent-light font-bold">
                  {item.percent}%
                </p>
              </div>
              <div className="w-full bg-navy-mid rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-accent to-primary rounded-full h-2.5 transition-all duration-500"
                  style={{ width: `${item.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ── Metrics Tab ── */
const MetricsTab: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="card-premium">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent-light">
            <Activity className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-lg text-white">SAC1 Network Metrics</h3>
        </div>
        <div className="space-y-4">
          {[
            { label: "Transaction Volume", value: "125,430", color: "text-accent-light" },
            { label: "POS Velocity", value: "High", color: "text-green-400" },
            { label: "Liquidity Health", value: "97%", color: "text-green-400" },
          ].map((metric, i) => (
            <div
              key={i}
              className="flex justify-between items-center pb-4 border-b border-navy-border last:border-0 last:pb-0"
            >
              <span className="text-slate-300">{metric.label}</span>
              <span className={`font-bold ${metric.color}`}>{metric.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card-premium">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent-light">
            <Wallet className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-lg text-white">Community Growth</h3>
        </div>
        <div className="space-y-4">
          {[
            { label: "SAC1 Wallets", value: "2,500", color: "text-accent-light" },
            { label: "NFTs Minted", value: "12,340", color: "text-accent-light" },
            { label: "Growth Rate", value: "+25% MoM", color: "text-green-400" },
          ].map((metric, i) => (
            <div
              key={i}
              className="flex justify-between items-center pb-4 border-b border-navy-border last:border-0 last:pb-0"
            >
              <span className="text-slate-300">{metric.label}</span>
              <span className={`font-bold ${metric.color}`}>{metric.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ── Reports Tab ── */
const ReportsTab: React.FC = () => {
  return (
    <div className="card-premium">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent-light">
          <FileText className="w-5 h-5" />
        </div>
        <h3 className="font-bold text-lg text-white">Monthly Progress Reports</h3>
      </div>
      <div className="space-y-3">
        {[
          { month: "March 2026", status: "Available" },
          { month: "February 2026", status: "Available" },
          { month: "January 2026", status: "Available" },
        ].map((report, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 rounded-xl border border-navy-border bg-navy-mid/40 hover:border-accent/30 hover:bg-navy-mid/60 transition-all duration-300 group"
          >
            <div>
              <p className="font-semibold text-white group-hover:text-accent-light transition-colors">
                {report.month}
              </p>
              <p className="text-sm text-slate-400">
                Financial & Technical Report
              </p>
            </div>
            <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-accent/20 bg-accent/5 text-accent-light text-sm font-semibold hover:bg-accent/10 hover:border-accent/40 transition-all duration-300">
              <Download className="w-4 h-4" />
              Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export { PartnerLoginPage, PartnerDashboardPage };
