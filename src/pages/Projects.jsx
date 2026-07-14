import { useEffect, useState } from "react";
import { ArrowRight, Loader2, MonitorDot } from "lucide-react";
import { Link } from "react-router-dom";
import PageShell from "../components/PageShell";
import Section from "../components/Section";
import { EmptyState, ProjectLinks, ShowcaseCard } from "../components/ui";
import apiClient from "../services/api";

function imageFor(project) {
  return project?.screenshot_url || project?.showcase_image_url || null;
}

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await apiClient.getProjects();
        setProjects(response.projects || []);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
        setError("Project data is temporarily unavailable.");
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const leadProject = projects[0];

  return (
    <PageShell dense>
      <section className="px-5 pb-12 pt-32 sm:px-8 lg:px-12 lg:pt-40">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <h1 className="text-5xl font-semibold leading-[0.98] text-white sm:text-6xl lg:text-7xl">Projects with a reason to exist.</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
                byNolo work usually starts as a real itch: a shared login system, a voting ritual, a better hub, or a playful tool that deserves to become usable.
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5">
              <div className="flex items-center gap-3">
                <MonitorDot className="h-5 w-5 text-green-300" aria-hidden="true" />
                <p className="text-sm font-semibold text-white">A tighter look at the work.</p>
              </div>
              <p className="mt-3 text-sm leading-6 text-zinc-400">
                Live tools, experiments, and product surfaces are grouped with a little more context and a lot less filler.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Section>
        {loading ? (
          <div className="flex items-center gap-3 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6 text-zinc-300">
            <Loader2 className="h-5 w-5 animate-spin text-green-300" aria-hidden="true" /> Loading project index...
          </div>
        ) : (
          <>
            {error && <div className="mb-6 rounded-2xl border border-yellow-300/20 bg-yellow-300/10 p-4 text-sm text-yellow-100">{error}</div>}

            {projects.length === 0 ? (
              <EmptyState title="No projects found" copy="There is no featured work to show right now." />
            ) : (
              <>
                <div className="mb-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                  <ShowcaseCard
                    item={leadProject}
                    href={leadProject.live_url || leadProject.github_url}
                    image={imageFor(leadProject)}
                    kicker={leadProject.kicker}
                    impact={leadProject.impact}
                    tags={leadProject.tech_stack}
                    status={leadProject.status}
                  />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-green-300">Featured build</p>
                    <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">{leadProject.title}</h2>
                    <p className="mt-4 text-base leading-7 text-zinc-300">{leadProject.description}</p>
                    <ProjectLinks github={leadProject.github_url} live={leadProject.live_url} />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  {projects.slice(1).map((project) => (
                    <ShowcaseCard
                      key={project.id || project.title}
                      item={project}
                      href={project.live_url || project.github_url}
                      image={imageFor(project)}
                      kicker={project.kicker}
                      impact={project.impact}
                      tags={project.tech_stack}
                      status={project.status}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </Section>

      <section className="px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-[2rem] border border-white/10 bg-zinc-950/70 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-green-300">Want the live surfaces?</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">The hub connects the usable pieces.</h2>
          </div>
          <Link to="/hub" className="inline-flex items-center justify-center gap-2 rounded-full bg-green-400 px-5 py-3 text-sm font-semibold text-[#041008] transition hover:bg-green-300">
            Open the hub <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
