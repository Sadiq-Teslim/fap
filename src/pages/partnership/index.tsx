import { Layout } from '../../app/components/Layout';
import { Card, Button } from '../../shared/ui';
import { COMPANY, ROADMAP_PHASES } from '../../shared/constants';
import { CheckCircle, Clock, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../shared/constants';

const PartnershipPage: React.FC = () => {
  return (
    <Layout>
      <section className="bg-gradient-dark text-white py-20">
        <div className="container-max">
          <h1 className="text-5xl font-bold mb-6">Our Partnership Alliance</h1>
          <p className="text-xl opacity-90">Excellence is built on partnership</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container-max">
          <Card variant="elevated" padding="lg" className="mb-12">
            <div className="flex items-start gap-6">
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-4">Powered by Sable Assents Coin Corporation</h2>
                <p className="text-lg text-neutral-dark opacity-80 mb-4">
                  With a ${COMPANY.INVESTMENT_AMOUNT.toLocaleString()}.00 USD investment commitment, Sable Assents Coin Corporation is the cornerstone of FAP's financial and technical stability.
                </p>
              </div>
            </div>
          </Card>

          <h2 className="section-title mb-12">Institutional Backing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                title: 'Financial Stability',
                items: ['$2M USD commitment', 'Multi-year support', 'Growth capital available'],
              },
              {
                title: 'Technical Foundation',
                items: ['99.9% uptime', 'Near-zero gas fees', 'Instant finality'],
              },
              {
                title: 'Continental Vision',
                items: ['Pan-African scope', 'Economic sovereignty', 'Digital innovation'],
              },
            ].map((feature, index) => (
              <Card key={index}>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <ul className="space-y-2">
                  {feature.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-neutral-dark">
                      <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>

          <Card variant="outlined" padding="lg" className="mb-12">
            <h3 className="text-2xl font-bold mb-4">Partnership Opportunities</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-bold mb-2">For Players</h4>
                <p className="text-neutral-dark opacity-80">Join our Episode One Alpha list and be among the first Pioneers</p>
              </div>
              <div>
                <h4 className="font-bold mb-2">For Developers</h4>
                <p className="text-neutral-dark opacity-80">Participate in the FAP Pioneers Internship Program</p>
              </div>
              <div>
                <h4 className="font-bold mb-2">For Partners</h4>
                <p className="text-neutral-dark opacity-80">Inquire about SAC1 POS merchant integration</p>
              </div>
            </div>
          </Card>

          <div className="text-center">
            <Link to={ROUTES.CONTACT}>
              <Button size="lg">Become a Partner</Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

const RoadmapPage: React.FC = () => {
  return (
    <Layout>
      <section className="bg-gradient-dark text-white py-20">
        <div className="container-max">
          <h1 className="text-5xl font-bold mb-6">Our Path to Continental Transformation</h1>
          <p className="text-xl opacity-90">Milestones and Objectives</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container-max">
          <div className="space-y-8">
            {Object.entries(ROADMAP_PHASES).map(([key, phase]) => (
              <Card key={key} variant="elevated" padding="lg">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    {phase.status === 'in_progress' && <CheckCircle className="w-8 h-8 text-success" />}
                    {phase.status === 'upcoming' && <Clock className="w-8 h-8 text-warning" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-2xl font-bold text-primary">{phase.name}</h3>
                      <span className="badge badge-primary text-xs">{phase.status}</span>
                    </div>
                    <h4 className="text-xl font-semibold mb-2">{phase.title}</h4>
                    <p className="text-neutral-dark opacity-80">{phase.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary text-white">
        <div className="container-max text-center">
          <Target className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-4">Building Africa's Digital Future</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            The FAP roadmap represents a continental commitment to digital innovation and economic transformation.
          </p>
          <Link to={ROUTES.CONTACT}>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary-dark">
              Join the Journey
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export { PartnershipPage as default, RoadmapPage };
