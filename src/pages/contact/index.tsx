import { Layout } from '../../app/components/Layout';
import { Input, Button, Textarea, Select, useToast, ToastContainer } from '../../shared/ui';
import { COMPANY } from '../../shared/constants';
import { Mail, MapPin, Phone, ArrowRight } from 'lucide-react';
import { useFormValidation } from '../../shared/hooks';

/* ── Wave divider ── */
const WaveDivider: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`w-full overflow-hidden leading-[0] ${className}`}>
    <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full h-[60px] md:h-[80px]">
      <path d="M0,40 C240,100 480,0 720,50 C960,100 1200,0 1440,40 L1440,100 L0,100 Z" className="fill-current" />
    </svg>
  </div>
);

export const ContactPage: React.FC = () => {
  const { toasts, showToast } = useToast();
  const { values, handleChange, handleSubmit } = useFormValidation(
    { name: '', email: '', category: '', message: '' },
    (values) => {
      showToast({ type: 'success', title: 'Message Sent!', message: 'We\'ll get back to you soon.' });
      console.log('Form submitted:', values);
    },
  );

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    handleChange({ target: { name, value } } as any);
  };

  return (
    <Layout>
      {/* ═══ HERO ═══ */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute top-20 left-20 w-72 h-72 bg-accent/5 rounded-full blur-[100px] animate-float" />
        <div className="container-max relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5">
              <Mail className="w-4 h-4 text-accent-light" />
              <span className="text-accent-light font-medium text-sm">Contact</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
              Be Part of the <span className="text-gradient">Future</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
              {COMPANY.NAME} is open to strategic collaborations that align with the FAP mission.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ CONTACT CARDS ═══ */}
      <WaveDivider className="text-navy-light" />
      <section className="bg-navy-light pb-24 pt-8">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              {
                icon: <Mail className="w-6 h-6" />,
                title: 'Email',
                content: <a href={`mailto:${COMPANY.EMAIL}`} className="text-accent-light hover:text-white transition-colors">{COMPANY.EMAIL}</a>,
              },
              {
                icon: <MapPin className="w-6 h-6" />,
                title: 'Headquarters',
                content: <span className="text-slate-400">{COMPANY.HEADQUARTERS}</span>,
              },
              {
                icon: <Phone className="w-6 h-6" />,
                title: 'Support',
                content: <span className="text-slate-400">Monday – Friday, 9 AM – 5 PM WAT</span>,
              },
            ].map((card, i) => (
              <div key={i} className="card-premium group">
                <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent-light mb-5 group-hover:bg-accent/20 group-hover:border-accent/40 transition-all duration-300">
                  {card.icon}
                </div>
                <h3 className="font-bold text-lg mb-2 text-white">{card.title}</h3>
                <div className="text-sm">{card.content}</div>
              </div>
            ))}
          </div>

          {/* ═══ FORM ═══ */}
          <div className="max-w-2xl mx-auto">
            <div className="card-premium !p-8 md:!p-10">
              <h2 className="text-2xl font-extrabold mb-8 text-white">Send Us a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <Input label="Full Name" name="name" value={values.name} onChange={handleChange} placeholder="Your name" required />
                <Input label="Email" type="email" name="email" value={values.email} onChange={handleChange} placeholder="your@email.com" required />
                <Select
                  label="Category"
                  name="category"
                  value={values.category}
                  onChange={handleSelectChange}
                  options={[
                    { value: 'player', label: 'Sign up for Episode One Alpha' },
                    { value: 'developer', label: 'Join FAP Pioneers Internship' },
                    { value: 'partner', label: 'SAC1 POS Merchant Integration' },
                    { value: 'other', label: 'Other' },
                  ]}
                  placeholder="Select a category"
                  required
                />
                <Textarea label="Message" name="message" value={values.message} onChange={handleChange} placeholder="Tell us more..." rows={5} required />

                <Button type="submit" size="lg" className="w-full">
                  Send Message <ArrowRight className="w-4 h-4 ml-2 inline" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <ToastContainer toasts={toasts} />
    </Layout>
  );
};

export default ContactPage;
