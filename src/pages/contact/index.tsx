import { useState } from "react";
import { Layout } from "../../app/components/Layout";
import { Input, Textarea, Select } from "../../shared/ui";
import { COMPANY } from "../../shared/constants";
import { useScrollAnimation } from "../../shared/hooks/useScrollAnimation";
import { Mail, MapPin, Phone, ArrowRight, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

/* ── Wave divider ── */
const WaveDivider: React.FC<{ fill?: string }> = ({
  fill = "#111927",
}) => (
  <div className="w-full overflow-hidden leading-[0]">
    <svg
      viewBox="0 0 1440 100"
      preserveAspectRatio="none"
      className="w-full h-[60px] md:h-[80px]"
    >
      <path
        d="M0,40 C240,100 480,0 720,50 C960,100 1200,0 1440,40 L1440,100 L0,100 Z"
        fill={fill}
      />
    </svg>
  </div>
);

const FORMSPREE_URL = "https://formspree.io/f/xgopjjle";

export const ContactPage: React.FC = () => {
  const scrollRef = useScrollAnimation();

  const [values, setValues] = useState({
    name: "",
    email: "",
    category: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        setStatus("success");
        setValues({ name: "", email: "", category: "", message: "" });
      } else {
        const data = await res.json();
        setErrorMsg(data?.errors?.map((err: { message: string }) => err.message).join(", ") || "Something went wrong.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  };

  return (
    <Layout>
      <div ref={scrollRef}>
        {/* ═══ HERO — centered ═══ */}
        <section className="relative py-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-hero" />
          <div className="absolute top-20 left-20 w-72 h-72 bg-accent/5 rounded-full blur-[100px] animate-float" />
          <div className="container-max relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 animate-on-scroll">
                <Mail className="w-4 h-4 text-accent-light" />
                <span className="text-accent-light font-medium text-sm">
                  Contact
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight animate-on-scroll delay-100">
                Be Part of the <span className="text-gradient">Future</span>
              </h1>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed animate-on-scroll delay-200">
                {COMPANY.NAME} is open to strategic collaborations that align with
                the FAPGAME mission.
              </p>
            </div>
          </div>
        </section>

        {/* ═══ CONTACT CARDS + FORM ═══ */}
        <WaveDivider />
        <section className="bg-navy-light pb-24 pt-8">
          <div className="container-max">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {[
                {
                  icon: <Mail className="w-6 h-6" />,
                  title: "Email",
                  content: (
                    <a
                      href={`mailto:${COMPANY.EMAIL}`}
                      className="text-accent-light hover:text-white transition-colors"
                    >
                      {COMPANY.EMAIL}
                    </a>
                  ),
                },
                {
                  icon: <MapPin className="w-6 h-6" />,
                  title: "Headquarters",
                  content: (
                    <span className="text-slate-400">{COMPANY.HEADQUARTERS}</span>
                  ),
                },
                {
                  icon: <Phone className="w-6 h-6" />,
                  title: "Support",
                  content: (
                    <span className="text-slate-400">
                      Monday – Friday, 9 AM – 5 PM WAT
                    </span>
                  ),
                },
              ].map((card, i) => (
                <div key={i} className={`card-premium group animate-on-scroll delay-${i * 100}`}>
                  <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent-light mb-5 group-hover:bg-accent/20 group-hover:border-accent/40 transition-all duration-300">
                    {card.icon}
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-white">
                    {card.title}
                  </h3>
                  <div className="text-sm">{card.content}</div>
                </div>
              ))}
            </div>

            {/* ═══ FORM ═══ */}
            <div className="max-w-2xl mx-auto animate-on-scroll">
              <div className="card-premium !p-8 md:!p-10">
                <h2 className="text-xl md:text-2xl font-extrabold mb-8 text-white">
                  Send Us a Message
                </h2>

                {/* Success state */}
                {status === "success" ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-5">
                      <CheckCircle className="w-8 h-8 text-accent-light" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-slate-400 mb-6">
                      Thanks for reaching out. We'll get back to you soon.
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="text-accent-light font-semibold text-sm hover:text-white transition-colors"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Error banner */}
                    {status === "error" && (
                      <div className="flex items-start gap-3 p-4 rounded-xl border border-red-500/20 bg-red-500/5">
                        <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-red-400">{errorMsg}</p>
                      </div>
                    )}

                    <Input
                      label="Full Name"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      disabled={status === "submitting"}
                    />
                    <Input
                      label="Email"
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                      disabled={status === "submitting"}
                    />
                    <Select
                      label="Category"
                      name="category"
                      value={values.category}
                      onChange={handleChange}
                      options={[
                        { value: "player", label: "Sign up for Episode One Alpha" },
                        { value: "developer", label: "Join FAPGAME Pioneers Internship" },
                        { value: "partner", label: "SAC1 POS Merchant Integration" },
                        { value: "other", label: "Other" },
                      ]}
                      placeholder="Select a category"
                      required
                      disabled={status === "submitting"}
                    />
                    <Textarea
                      label="Message"
                      name="message"
                      value={values.message}
                      onChange={handleChange}
                      placeholder="Tell us more..."
                      rows={5}
                      required
                      disabled={status === "submitting"}
                    />

                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="btn-glow w-full px-6 py-3.5 text-sm font-semibold inline-flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {status === "submitting" ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ContactPage;
