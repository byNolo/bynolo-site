import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, CheckCircle2, Code2, Loader2, Mail, Send } from "lucide-react";
import PageShell from "../components/PageShell";
import Section from "../components/Section";
import apiClient from "../services/api";

const contactMethods = [
  {
    title: "Email",
    description: "Best for project ideas, collaboration, and anything with context.",
    value: "hello@bynolo.ca",
    href: "mailto:hello@bynolo.ca",
    Icon: Mail,
  },
  {
    title: "GitHub",
    description: "See public code, repos, and ongoing project work.",
    value: "github.com/byNolo",
    href: "https://github.com/byNolo",
    Icon: Code2,
  },
];

const inputClass =
  "w-full rounded-2xl border border-white/10 bg-zinc-950/80 px-4 py-3 text-white placeholder:text-zinc-600 transition focus:border-green-300/50 focus:outline-none focus:ring-2 focus:ring-green-300/15";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleChange = (event) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    try {
      await apiClient.submitContactForm(formData);
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      timeoutRef.current = setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      console.error("Failed to submit contact form:", err);
      setError("The form could not send right now. Email hello@bynolo.ca directly and I will still get it.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageShell>
      <section className="px-5 pb-12 pt-32 sm:px-8 lg:px-12 lg:pt-40">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <h1 className="text-5xl font-semibold leading-[0.98] text-white sm:text-6xl lg:text-7xl">Tell me what you want to build.</h1>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-zinc-300">
            A good first message does not need a perfect brief. Send the goal, the rough shape, the audience, and what would make the project feel like a win.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="space-y-4">
            {contactMethods.map(({ title, description, value, href, Icon }) => (
              <a
                key={title}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group block rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 transition hover:border-green-300/30 hover:bg-white/[0.06]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="grid h-11 w-11 place-items-center rounded-full bg-green-300/10 text-green-300">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-zinc-500 transition group-hover:text-green-300" aria-hidden="true" />
                </div>
                <h2 className="mt-5 text-xl font-semibold text-white">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-zinc-400">{description}</p>
                <p className="mt-4 break-all text-sm font-medium text-green-300">{value}</p>
              </a>
            ))}

            <div className="rounded-[1.5rem] border border-green-300/20 bg-green-300/[0.06] p-5">
              <p className="text-sm font-semibold text-green-200">Good fit projects</p>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-zinc-300">
                <li>Portfolio or business sites that need a stronger point of view.</li>
                <li>Small web apps, dashboards, tools, and API-backed workflows.</li>
                <li>Self-hosted systems, automations, and practical integrations.</li>
              </ul>
            </div>
          </aside>

          <div className="rounded-[2rem] border border-white/10 bg-zinc-950/70 p-5 shadow-2xl shadow-black/25 backdrop-blur sm:p-8">
            {submitted ? (
              <div className="grid min-h-96 place-items-center text-center">
                <div>
                  <CheckCircle2 className="mx-auto mb-5 h-12 w-12 text-green-300" aria-hidden="true" />
                  <h2 className="text-3xl font-semibold text-white">Message sent.</h2>
                  <p className="mt-3 max-w-md text-zinc-400">Thanks for reaching out. I’ll reply as soon as I can with next steps or a few useful questions.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && <div className="rounded-2xl border border-red-300/20 bg-red-500/10 p-4 text-sm text-red-100">{error}</div>}

                <div className="grid gap-5 md:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-zinc-300">Name</span>
                    <input className={inputClass} type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Your name" />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-zinc-300">Email</span>
                    <input className={inputClass} type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="you@example.com" />
                  </label>
                </div>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-zinc-300">Subject</span>
                  <input className={inputClass} type="text" name="subject" value={formData.subject} onChange={handleChange} required placeholder="Website redesign, app idea, automation..." />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-zinc-300">Message</span>
                  <textarea className={`${inputClass} min-h-44 resize-y`} name="message" value={formData.message} onChange={handleChange} required placeholder="What are you trying to build, fix, or improve?" />
                </label>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-green-400 px-5 py-3 text-sm font-semibold text-[#041008] transition hover:bg-green-300 disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-400"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending
                    </>
                  ) : (
                    <>
                      Send message <Send className="h-4 w-4" aria-hidden="true" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
