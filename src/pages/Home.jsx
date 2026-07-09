import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Code2, Compass, Layers3, ServerCog, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import PageShell from "../components/PageShell";
import Section from "../components/Section";
import { ButtonLink, Pill, ShowcaseCard } from "../components/ui";
import { fallbackProjects, process, services, showcase } from "../data/siteContent";

export default function Home() {
  const featured = fallbackProjects.slice(0, 3);

  return (
    <PageShell dense>
      <section className="px-5 pb-14 pt-32 sm:px-8 lg:px-12 lg:pb-24 lg:pt-40">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Pill tone="live">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> Founder studio for websites, apps, and self-hosted systems
            </Pill>
            <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[0.96] tracking-normal text-white sm:text-6xl lg:text-7xl">
              Written, designed, and deployed byNolo.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300 sm:text-xl">
              I build polished web products with the practical parts included: front ends, APIs, auth, deployment, and the little details that make a site feel hand-made.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/hub">
                Launch the hub <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href="/projects" variant="secondary">
                See the work <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
            </div>
            <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3">
              {[
                ["5+", "live surfaces"],
                ["Full-stack", "React + Flask"],
                ["Self-hosted", "when it fits"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <div className="text-2xl font-semibold text-green-300">{value}</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.18em] text-zinc-500">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="relative"
          >
            <div className="rounded-[2rem] border border-white/10 bg-zinc-950/70 p-3 shadow-2xl shadow-black/40 backdrop-blur">
              <img src="/showcase/portfolio.svg" alt="byNolo portfolio interface preview" className="rounded-[1.35rem]" />
            </div>
            <div className="absolute -bottom-6 left-6 right-6 rounded-3xl border border-green-300/20 bg-[#07100d]/90 p-5 shadow-2xl shadow-black/40 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-green-300/10 text-green-300">
                  <ServerCog className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">A studio site with working infrastructure behind it.</p>
                  <p className="text-xs text-zinc-500">Hub, projects API, contact intake, and deployment scripts stay intact.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Section
        eyebrow="Selected work"
        title="Concrete projects, not placeholder cards."
        copy="The work should tell you what was built, why it exists, and where it fits in the byNolo ecosystem."
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {featured.map((project) => {
            const meta = showcase[project.title] || showcase.Portfolio;
            return (
              <ShowcaseCard
                key={project.id}
                item={project}
                href={project.live_url || project.github_url}
                image={meta.image}
                kicker={meta.kicker}
                impact={meta.impact}
                tags={project.tech_stack}
                status={project.status}
                compact
              />
            );
          })}
        </div>
      </Section>

      <Section eyebrow="What I build" title="A small studio that can handle the whole product surface.">
        <div className="grid gap-4 lg:grid-cols-3">
          {[Code2, Layers3, Compass].map((Icon, index) => (
            <article key={services[index].title} className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6">
              <div className="mb-5 grid h-11 w-11 place-items-center rounded-full bg-green-300/10 text-green-300">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-white">{services[index].title}</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-400">{services[index].description}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow="Process" title="The work is designed to survive contact with reality.">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {process.map((step, index) => (
            <div key={step} className="rounded-[1.5rem] border border-white/10 bg-zinc-950/60 p-6">
              <span className="text-sm font-semibold text-green-300">0{index + 1}</span>
              <p className="mt-4 text-base font-medium leading-7 text-white">{step}</p>
            </div>
          ))}
        </div>
      </Section>

      <section className="px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-[2rem] border border-green-300/20 bg-green-300/[0.06] p-6 sm:p-8 lg:grid-cols-[0.85fr_1.15fr] lg:p-10">
          <div>
            <Pill tone="live">Hub-first ecosystem</Pill>
            <h2 className="mt-5 text-3xl font-semibold text-white sm:text-4xl">The hub is still the front door to everything live.</h2>
            <p className="mt-4 text-zinc-300">
              V2 keeps the central command-center idea, but presents each app and service with clearer status, purpose, and launch context.
            </p>
            <Link to="/hub" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-green-300 transition hover:text-green-200">
              Open hub <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {fallbackProjects.slice(0, 4).map((project) => (
              <div key={project.title} className="rounded-2xl border border-white/10 bg-[#07100d]/75 p-4">
                <p className="text-sm font-semibold text-white">{project.title}</p>
                <p className="mt-2 line-clamp-2 text-xs leading-5 text-zinc-500">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
