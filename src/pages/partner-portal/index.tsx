import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Input, Button, Alert } from '../../shared/ui';
import { ROUTES, COMPANY } from '../../shared/constants';
import { useFormValidation } from '../../shared/hooks';
import { Lock, AlertCircle } from 'lucide-react';

const PartnerLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const { values, errors, handleChange, handleSubmit: handleFormSubmit } = useFormValidation(
    {
      email: '',
      password: '',
      twoFACode: '',
    },
    async (values) => {
      setIsLoading(true);
      setLoginError(null);

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // For demo, accept any non-empty credentials
        if (values.email && values.password) {
          // In production, this would be a real API call
          localStorage.setItem('partnerToken', 'demo-token-' + Date.now());
          navigate(ROUTES.PARTNER_DASHBOARD);
        } else {
          setLoginError('Invalid credentials');
        }
      } catch (error) {
        setLoginError('Login failed. Please try again.');
      } finally {
        setIsLoading(false);
      }
    },
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleFormSubmit(e as any);
  };

  return (
    <div className="min-h-screen bg-gradient-dark flex items-center justify-center p-4">
      <Card variant="elevated" className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-4xl font-bold text-gradient mb-4">FAP</div>
          <h1 className="text-2xl font-bold text-neutral-dark mb-2">Partner Portal</h1>
          <p className="text-neutral-dark opacity-70">Strategic Transparency for the Future of Africa</p>
        </div>

        {/* Alert */}
        {loginError && (
          <Alert type="error" title="Login Failed" closeable onClose={() => setLoginError(null)} className="mb-6">
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
            error={errors.email}
            placeholder="partner@company.com"
            icon={<AlertCircle className="w-4 h-4" />}
            required
            disabled={isLoading}
          />

          <div className="relative">
            <Input
              label="Encrypted Access Key"
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={values.password}
              onChange={handleChange}
              error={errors.password}
              placeholder="••••••••••••"
              icon={<Lock className="w-4 h-4" />}
              required
              disabled={isLoading}
            />
            <button
              type="button"
              className="absolute right-3 top-10 text-sm text-primary hover:opacity-70"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 'Hide' : 'Show'}
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
            required
            disabled={isLoading}
          />

          <Button type="submit" size="lg" className="w-full" isLoading={isLoading} disabled={isLoading}>
            Sign In
          </Button>
        </form>

        {/* Footer Note */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-xs text-blue-700">
            <strong>Note:</strong> This portal is strictly reserved for Authorized Lead Partners. All access is logged and encrypted via the SAC1 Blockchain Security Protocol.
          </p>
        </div>

        {/* Company Info */}
        <div className="mt-6 pt-6 border-t border-neutral-light text-center text-xs text-neutral-dark opacity-60">
          <p>{COMPANY.NAME}</p>
          <p>Lead Partner: {COMPANY.PARTNER_NAME}</p>
        </div>
      </Card>
    </div>
  );
};

const PartnerDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'investment' | 'metrics' | 'reports'>('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'investment', label: 'Investment Tracking' },
    { id: 'metrics', label: 'Metrics' },
    { id: 'reports', label: 'Reports' },
  ];

  return (
    <div className="min-h-screen bg-neutral-light">
      {/* Header */}
      <div className="bg-white border-b border-neutral-light sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-neutral-dark">Partner Dashboard</h1>
              <p className="text-neutral-dark opacity-70 mt-1">Real-Time Oversight of the $2M FAP Implementation</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-neutral-dark opacity-70">Lead Partner</p>
                <p className="font-semibold text-neutral-dark">{COMPANY.PARTNER_NAME}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                SA
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-t border-neutral-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-neutral-dark opacity-70 hover:opacity-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'investment' && <InvestmentTab />}
        {activeTab === 'metrics' && <MetricsTab />}
        {activeTab === 'reports' && <ReportsTab />}
      </div>
    </div>
  );
};

const OverviewTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <Alert type="success" title="Project Status" className="mb-6">
        <p>FAP Episode One implementation is on track. Current completion: 35%</p>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Investment', value: '$2,000,000', status: 'active' },
          { label: 'Disbursed to Date', value: '$700,000', status: 'pending' },
          { label: 'POS Terminals', value: '50 Active', status: 'active' },
          { label: 'Registered Pioneers', value: '2,500+', status: 'active' },
        ].map((stat, index) => (
          <Card key={index} variant="elevated">
            <p className="text-sm text-neutral-dark opacity-70 mb-2">{stat.label}</p>
            <p className="text-2xl font-bold text-primary mb-3">{stat.value}</p>
            <span className={`badge ${stat.status === 'active' ? 'badge-success' : 'badge-warning'} text-xs`}>
              {stat.status}
            </span>
          </Card>
        ))}
      </div>

      <Card variant="elevated">
        <h3 className="font-bold text-lg mb-4">Key Milestones</h3>
        <div className="space-y-4">
          {[
            { milestone: 'Alpha Build Complete', date: 'February 2026', status: 'complete' },
            { milestone: 'SAC1 Integration', date: 'March 2026', status: 'in_progress' },
            { milestone: 'POS Terminal Setup', date: 'April 2026', status: 'pending' },
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between pb-4 border-b border-neutral-light last:border-0">
              <div>
                <p className="font-semibold">{item.milestone}</p>
                <p className="text-sm text-neutral-dark opacity-70">{item.date}</p>
              </div>
              <span className={`badge text-xs ${item.status === 'complete' ? 'badge-success' : item.status === 'in_progress' ? 'badge-warning' : 'badge-primary'}`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

const InvestmentTab: React.FC = () => {
  return (
    <Card variant="elevated">
      <h3 className="font-bold text-lg mb-6">Investment Disbursement Tracking</h3>
      <div className="space-y-4">
        {[
          { category: 'Development', amount: 500000, allocated: 2000000 },
          { category: 'Infrastructure', amount: 150000, allocated: 2000000 },
          { category: 'Marketing', amount: 50000, allocated: 2000000 },
        ].map((item, index) => (
          <div key={index}>
            <div className="flex justify-between mb-2">
              <p className="font-semibold">{item.category}</p>
              <p className="text-primary font-bold">${item.amount.toLocaleString()}</p>
            </div>
            <div className="w-full bg-neutral-light rounded-full h-2">
              <div
                className="bg-primary rounded-full h-2 transition-all"
                style={{ width: `${(item.amount / item.allocated) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

const MetricsTab: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card variant="elevated">
        <h3 className="font-bold text-lg mb-4">SAC1 Network Metrics</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-neutral-dark">Transaction Volume</span>
            <span className="font-bold text-primary">125,430</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-dark">POS Velocity</span>
            <span className="font-bold text-success">High</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-dark">Liquidity Health</span>
            <span className="font-bold text-success">97%</span>
          </div>
        </div>
      </Card>

      <Card variant="elevated">
        <h3 className="font-bold text-lg mb-4">Community Growth</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-neutral-dark">SAC1 Wallets</span>
            <span className="font-bold text-primary">2,500</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-dark">NFTs Minted</span>
            <span className="font-bold text-primary">12,340</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-dark">Growth Rate</span>
            <span className="font-bold text-success">+25% MoM</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

const ReportsTab: React.FC = () => {
  return (
    <Card variant="elevated">
      <h3 className="font-bold text-lg mb-6">Monthly Progress Reports</h3>
      <div className="space-y-3">
        {[
          { month: 'March 2026', status: 'Available', link: '#' },
          { month: 'February 2026', status: 'Available', link: '#' },
          { month: 'January 2026', status: 'Available', link: '#' },
        ].map((report, index) => (
          <div key={index} className="flex items-center justify-between p-4 border border-neutral-light rounded-lg hover:border-primary transition-colors">
            <div>
              <p className="font-semibold">{report.month}</p>
              <p className="text-sm text-neutral-dark opacity-70">Financial & Technical Report</p>
            </div>
            <Button variant="outline" size="sm">
              Download
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
};

export { PartnerLoginPage, PartnerDashboardPage };
