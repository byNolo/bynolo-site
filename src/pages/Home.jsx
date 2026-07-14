import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Code2, Compass, Layers3, ServerCog } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageShell from "../components/PageShell";
import Section from "../components/Section";
import { ButtonLink, InterfacePreview, ShowcaseCard } from "../components/ui";
import { process, services } from "../data/siteContent";
import apiClient from "../services/api";

function imageFor(item) {
  return item?.screenshot_url || item?.showcase_image_url || null;
}

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [hubItems, setHubItems] = useState([]);

  useEffect(() => {
    let cancelled = false;

    const fetchHomeData = async () => {
      try {
        const [projectsResponse, hubResponse] = await Promise.all([
          apiClient.getProjects(),
          apiClient.getHubItems(),
        ]);
        if (!cancelled) {
          setFeatured(projectsResponse.projects?.slice(0, 3) || []);
          setHubItems(hubResponse.items?.slice(0, 4) || []);
        }
      } catch (error) {
        console.error("Failed to fetch home data:", error);
        if (!cancelled) {
          setFeatured([]);
          setHubItems([]);
        }
      }
    };

    fetchHomeData();

    return () => {
      cancelled = true;
    };
  }, []);

  const heroProject = featured[0];

  return (
    <PageShell dense background="particles">
      <section className="px-5 pb-14 pt-32 sm:px-8 lg:px-12 lg:pb-24 lg:pt-40">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="max-w-4xl text-5xl font-semibold leading-[0.96] tracking-normal text-white sm:text-6xl lg:text-7xl">
              Written, designed, and deployed <span className="brand-gradient">byNolo</span>.
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
              <div className="aspect-[16/10] overflow-hidden rounded-[1.35rem] bg-zinc-900">
                <InterfacePreview image={imageFor(heroProject)} title={heroProject?.title || "byNolo portfolio"} />
              </div>
            </div>
            <div className="absolute -bottom-6 left-6 right-6 rounded-3xl border border-green-300/20 bg-[#07100d]/90 p-5 shadow-2xl shadow-black/40 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-green-300/10 text-green-300">
                  <ServerCog className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">A studio site with a real ecosystem behind it.</p>
                  <p className="text-xs text-zinc-500">Apps, services, experiments, and contact all in one place.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Section
        eyebrow="Selected work"
        title="Current work with context."
        copy="The work should tell you what was built, why it exists, and where it fits in the byNolo ecosystem."
      >
        {featured.length > 0 ? (
          <div className="grid gap-6 lg:grid-cols-3">
            {featured.map((project) => (
                <ShowcaseCard
                  key={project.id}
                  item={project}
                  href={project.live_url || project.github_url}
                  image={imageFor(project)}
                  kicker={project.kicker}
                  impact={project.impact}
                  tags={project.tech_stack}
                  status={project.status}
                  compact
                />
            ))}
          </div>
        ) : (
          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6 text-zinc-300">
            Portfolio work is being curated in the CMS.
          </div>
        )}
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
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">The hub is still the front door to everything live.</h2>
            <p className="mt-4 text-zinc-300">
              The command-center idea stays, now with clearer status, purpose, and launch context for each app and service.
            </p>
            <Link to="/hub" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-green-300 transition hover:text-green-200">
              Open hub <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {(hubItems.length ? hubItems : featured).slice(0, 4).map((item) => (
              <div key={item.id || item.title} className="rounded-2xl border border-white/10 bg-[#07100d]/75 p-4">
                <p className="text-sm font-semibold text-white">{item.title}</p>
                <p className="mt-2 line-clamp-2 text-xs leading-5 text-zinc-500">{item.impact || item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
