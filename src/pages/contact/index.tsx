import { Layout } from '../../app/components/Layout';
import { Card, Input, Button, Textarea, Select, useToast, ToastContainer } from '../../shared/ui';
import { COMPANY } from '../../shared/constants';
import { Mail, MapPin, Phone } from 'lucide-react';
import { useFormValidation } from '../../shared/hooks';

export const ContactPage: React.FC = () => {
  const { toasts, showToast } = useToast();
  const { values, handleChange, handleSubmit } = useFormValidation(
    {
      name: '',
      email: '',
      category: '',
      message: '',
    },
    (values) => {
      // Simulate form submission
      showToast({
        type: 'success',
        title: 'Message Sent!',
        message: 'We\'ll get back to you soon.',
      });
      console.log('Form submitted:', values);
    },
  );

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    // Create a synthetic event that matches the expected type
    const syntheticEvent = {
      target: { name, value },
    } as any;
    handleChange(syntheticEvent);
  };

  return (
    <Layout>
      <section className="bg-gradient-dark text-white py-20">
        <div className="container-max">
          <h1 className="text-5xl font-bold mb-6">Get in Touch</h1>
          <p className="text-xl opacity-90">Be part of the Future</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card>
              <Mail className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-bold mb-2">Email</h3>
              <a href={`mailto:${COMPANY.EMAIL}`} className="text-primary hover:opacity-70">
                {COMPANY.EMAIL}
              </a>
            </Card>
            <Card>
              <MapPin className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-bold mb-2">Headquarters</h3>
              <p className="text-neutral-dark opacity-80">{COMPANY.HEADQUARTERS}</p>
            </Card>
            <Card>
              <Phone className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-bold mb-2">Support</h3>
              <p className="text-neutral-dark opacity-80">Available Monday-Friday, 9 AM - 5 PM WAT</p>
            </Card>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card variant="elevated" padding="lg">
              <h2 className="text-3xl font-bold mb-6">Contact Us</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  label="Full Name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                />

                <Input
                  label="Email"
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                />

                <Select
                  label="Category"
                  name="category"
                  value={values.category}
                  onChange={handleSelectChange}
                  options={[
                    { value: 'player', label: 'Sign up for Alpha' },
                    { value: 'developer', label: 'Join Developer Program' },
                    { value: 'partner', label: 'Partnership Inquiry' },
                    { value: 'other', label: 'Other' },
                  ]}
                  placeholder="Select a category"
                  required
                />

                <Textarea
                  label="Message"
                  name="message"
                  value={values.message}
                  onChange={handleChange}
                  placeholder="Tell us more..."
                  rows={5}
                  required
                />

                <Button type="submit" size="lg" className="w-full">
                  Send Message
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      <ToastContainer toasts={toasts} />
    </Layout>
  );
};

export default ContactPage;
