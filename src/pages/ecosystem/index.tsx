import { Layout } from '../../app/components/Layout';
import { Card } from '../../shared/ui';
import { Zap, Database, CreditCard, BarChart } from 'lucide-react';

export const EcosystemPage: React.FC = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-dark text-white py-20">
        <div className="container-max">
          <h1 className="text-5xl font-bold mb-6">A Closed-Loop Digital Economy</h1>
          <p className="text-xl opacity-90 max-w-3xl">
            FAP is built on a "Triangle of Utility" that ensures value never leaves the hands of our community.
          </p>
        </div>
      </section>

      {/* Triangle of Utility */}
      <section className="py-20">
        <div className="container-max">
          <h2 className="section-title text-center mb-12">The Triangle of Utility</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: <BarChart className="w-12 h-12" />,
                title: 'The Game Engine',
                description:
                  'High-performance strategy and resource management where every action is recorded on the ledger.',
                details: [
                  'Real-time progress tracking',
                  'Blockchain-verified achievements',
                  'Transparent reward distribution',
                  'Multi-player capabilities',
                ],
              },
              {
                icon: <Database className="w-12 h-12" />,
                title: 'The SAC1 Ledger',
                description:
                  'Utilizing the high-speed, secure blockchain protocols of Sable Assents Coin Corporation.',
                details: [
                  'Instant transaction finality',
                  'Near-zero gas fees',
                  '99.9% uptime guarantee',
                  'Enterprise-grade security',
                ],
              },
              {
                icon: <CreditCard className="w-12 h-12" />,
                title: 'The POS Integration',
                description:
                  'The final bridge connecting digital rewards to physical vendor points across the continent.',
                details: [
                  'SAC1 POS terminal integration',
                  'Real-world merchant network',
                  'Instant fund settlement',
                  'Pan-African coverage',
                ],
              },
            ].map((component, index) => (
              <Card key={index} variant="elevated" padding="lg">
                <div className="text-primary mb-4">{component.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{component.title}</h3>
                <p className="text-neutral-dark opacity-80 mb-6">{component.description}</p>
                <ul className="space-y-2">
                  {component.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Zap className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>

          {/* Flow Diagram */}
          <div className="bg-neutral-light rounded-xl p-8 text-center">
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <div className="bg-white rounded-lg p-4 font-semibold text-primary min-w-[150px]">Achievement</div>
              <div className="text-3xl text-primary">→</div>
              <div className="bg-white rounded-lg p-4 font-semibold text-primary min-w-[150px]">Tokenization</div>
              <div className="text-3xl text-primary">→</div>
              <div className="bg-white rounded-lg p-4 font-semibold text-primary min-w-[150px]">Utilization</div>
            </div>
            <p className="text-neutral-dark opacity-70 mt-4">
              A seamless flow from in-game achievements to real-world value
            </p>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-neutral-light">
        <div className="container-max">
          <h2 className="section-title text-center mb-12">Ecosystem Benefits</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Transparent Value Flow',
                description: 'Every transaction is recorded and verified on the blockchain, ensuring complete transparency.',
              },
              {
                title: 'Zero Intermediaries',
                description: 'Direct connection between players, game engine, and merchants eliminates unnecessary fees.',
              },
              {
                title: 'Instant Settlement',
                description: 'SAC1 blockchain enables real-time transaction settlement with near-zero latency.',
              },
              {
                title: 'Community Ownership',
                description: 'Players own their assets and rewards, with full control over their digital wealth.',
              },
              {
                title: 'Scalability',
                description: 'Enterprise-grade infrastructure supports millions of concurrent players and transactions.',
              },
              {
                title: 'Equity for All',
                description: 'Economic incentives are fairly distributed among all ecosystem participants.',
              },
            ].map((benefit, index) => (
              <Card key={index}>
                <h3 className="text-xl font-bold mb-3 text-primary">{benefit.title}</h3>
                <p className="text-neutral-dark opacity-80">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container-max">
          <h2 className="text-4xl font-bold text-center mb-12">Ecosystem Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '99.9%', label: 'Network Uptime' },
              { number: '<1ms', label: 'Transaction Finality' },
              { number: '~0', label: 'Gas Fees' },
              { number: '∞', label: 'Scalability' },
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-5xl font-bold mb-2">{stat.number}</div>
                <p className="opacity-90">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default EcosystemPage;
