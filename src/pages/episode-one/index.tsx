import { Layout } from '../../app/components/Layout';
import { Card, Button } from '../../shared/ui';
import { Map, Zap, Trophy, Gem } from 'lucide-react';

const EpisodeOnePageComp: React.FC = () => {
  return (
    <Layout>
      <section className="bg-gradient-dark text-white py-20">
        <div className="container-max">
          <h1 className="text-5xl font-bold mb-6">Episode One: The Awakening</h1>
          <p className="text-xl opacity-90">Step into Future Africa</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container-max">
          <div className="card mb-12">
            <h2 className="text-3xl font-bold mb-6">The Narrative</h2>
            <p className="text-lg text-neutral-dark opacity-80 mb-4">
              Africa has evolved. In Episode One, you are a Pioneer tasked with building the first decentralized digital hubs. Manage resources, claim territory, and secure your legacy.
            </p>
          </div>

          <h2 className="section-title mb-12">Game Mechanics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-12 h-12" />,
                title: 'Resource Mining',
                description: 'Extract digital raw materials represented as on-chain assets.',
              },
              {
                icon: <Map className="w-12 h-12" />,
                title: 'Strategic Expansion',
                description: 'Build infrastructure that generates passive SAC1 rewards.',
              },
              {
                icon: <Trophy className="w-12 h-12" />,
                title: 'Proof of Achievement',
                description: 'Our proprietary oracle system verifies your wins and triggers smart contract payouts.',
              },
            ].map((mechanic, index) => (
              <Card key={index} variant="elevated">
                <div className="text-primary mb-4">{mechanic.icon}</div>
                <h3 className="text-xl font-bold mb-3">{mechanic.title}</h3>
                <p className="text-neutral-dark opacity-80">{mechanic.description}</p>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button size="lg">Start Your Journey</Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

const EpisodeOnePage: React.FC = EpisodeOnePageComp;

const SAC1POSBridgePageComp: React.FC = () => {
  return (
    <Layout>
      <section className="bg-gradient-dark text-white py-20">
        <div className="container-max">
          <h1 className="text-5xl font-bold mb-6">The SAC1 POS Bridge</h1>
          <p className="text-xl opacity-90">Beyond the Screen: Real-World Liquidity</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container-max">
          <div className="card mb-12 bg-primary bg-opacity-10">
            <p className="text-lg text-neutral-dark">
              Most Web3 projects fail because their tokens have no "real-world" exit. FAP solves this through our Lead Partner's technology with direct integration into physical merchant networks.
            </p>
          </div>

          <h2 className="section-title mb-12">How It Works</h2>
          <div className="space-y-4 mb-12">
            {[
              { step: '0', title: 'Earn', desc: 'Accumulate SAC1 tokens through gameplay' },
              { step: '1', title: 'Generate', desc: 'Create a secure, dynamic pay-code within the FAP app' },
              { step: '2', title: 'Transact', desc: 'Scan your code at any partner SAC1 POS terminal' },
            ].map((item, index) => (
              <div key={index} className="card flex gap-6 items-center">
                <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center font-bold flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className="text-neutral-dark opacity-70">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <Card variant="elevated">
            <h3 className="text-xl font-bold mb-4">Security Features</h3>
            <p className="text-neutral-dark opacity-80">
              Multi-layer encryption ensures that your game-earned wealth is as secure as a traditional bank account, but with the freedom of decentralization.
            </p>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

const SAC1POSBridgePage: React.FC = SAC1POSBridgePageComp;

const DigitalAssetsPageComp: React.FC = () => {
  return (
    <Layout>
      <section className="bg-gradient-dark text-white py-20">
        <div className="container-max">
          <h1 className="text-5xl font-bold mb-6">Digital Assets & NFT Marketplace</h1>
          <p className="text-xl opacity-90">True Ownership. Immutable Value.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container-max">
          <div className="card mb-12 bg-success bg-opacity-10">
            <h2 className="text-2xl font-bold mb-3 text-success">In FAP, your items are yours. Period.</h2>
            <p className="text-neutral-dark opacity-80">
              Every piece of land, specialized tool, or character skin is a unique NFT minted on the SAC1 blockchain.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { title: 'Land', desc: 'Digital territories with unique properties' },
              { title: 'Tools', desc: 'Specialized equipment for gameplay' },
              { title: 'Skins', desc: 'Character customization NFTs' },
            ].map((asset, index) => (
              <Card key={index}>
                <Gem className="w-12 h-12 text-primary mb-4" />
                <h3 className="font-bold text-lg mb-2">{asset.title}</h3>
                <p className="text-neutral-dark opacity-70">{asset.desc}</p>
              </Card>
            ))}
          </div>

          <h2 className="section-title mb-12">Rarity Tiers</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary'].map((rarity, index) => (
              <div key={index} className="card text-center">
                <p className="font-bold">{rarity}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

const DigitalAssetsPage: React.FC = DigitalAssetsPageComp;

export { EpisodeOnePage, SAC1POSBridgePage, DigitalAssetsPage };
