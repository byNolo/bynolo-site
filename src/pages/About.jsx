import { ArrowRight, Cpu, Home, ServerCog, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import PageShell from "../components/PageShell";
import Section from "../components/Section";
import { principles, stack } from "../data/siteContent";

const currentWork = [
  "Turning the hub into a cleaner directory for active services.",
  "Improving auth and shared infrastructure through KeyN.",
  "Building playful tools that make everyday workflows more interesting.",
];

export default function About() {
  return (
    <PageShell>
      <section className="px-5 pb-12 pt-32 sm:px-8 lg:px-12 lg:pt-40">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <h1 className="text-5xl font-semibold leading-[0.98] text-white sm:text-6xl lg:text-7xl">A practical builder with a soft spot for polished systems.</h1>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-zinc-950/70 p-6 shadow-2xl shadow-black/30 backdrop-blur sm:p-8">
            <p className="text-lg leading-8 text-zinc-300">
              I’m Sam, a Computer Science student at the University of Guelph and the person behind byNolo. The label started as a place for my own self-hosted projects, apps, automations, and experiments. It has grown into a studio-style home for the things I build and the client work I want to do more of.
            </p>
            <p className="mt-5 text-lg leading-8 text-zinc-300">
              My favorite projects combine utility with personality: auth that quietly works, dashboards people can understand, music tools friends actually use, and small systems that make life smoother.
            </p>
          </div>
        </div>
      </section>

      <Section eyebrow="Principles" title="The taste is in the decisions you do not outsource.">
        <div className="grid gap-5 md:grid-cols-3">
          {[Wrench, ServerCog, Home].map((Icon, index) => (
            <article key={principles[index].title} className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6">
              <div className="mb-5 grid h-11 w-11 place-items-center rounded-full bg-green-300/10 text-green-300">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-white">{principles[index].title}</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-400">{principles[index].description}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow="Stack" title="Comfortable from interface to deployment." copy="The exact stack changes with the job, but these are the tools that show up most often in byNolo work.">
        <div className="flex flex-wrap gap-3">
          {stack.map((item) => (
            <span key={item} className="rounded-full border border-white/10 bg-zinc-950/70 px-4 py-2 text-sm text-zinc-300">
              {item}
            </span>
          ))}
        </div>
      </Section>

      <Section eyebrow="Currently building" title="The workbench is active.">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-[1.5rem] border border-green-300/20 bg-green-300/[0.06] p-6">
            <Cpu className="h-8 w-8 text-green-300" aria-hidden="true" />
            <h3 className="mt-5 text-2xl font-semibold text-white">byNolo is both portfolio and playground.</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-300">
              That means the site should show the company’s taste while also exposing the live tools, service thinking, and self-hosted habits behind it.
            </p>
          </div>
          <div className="space-y-3">
            {currentWork.map((item, index) => (
              <div key={item} className="flex gap-4 rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-5">
                <span className="text-sm font-semibold text-green-300">0{index + 1}</span>
                <p className="text-sm leading-6 text-zinc-300">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <section className="px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 rounded-[2rem] border border-white/10 bg-zinc-950/70 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-green-300">Want to collaborate?</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">Bring an idea, a messy workflow, or a site that needs more care.</h2>
          </div>
          <Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-green-400 px-5 py-3 text-sm font-semibold text-[#041008] transition hover:bg-green-300">
            Contact byNolo <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
