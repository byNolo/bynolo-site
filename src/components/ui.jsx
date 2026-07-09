import { ArrowUpRight, Code2, RadioTower } from "lucide-react";

export function Pill({ children, tone = "default" }) {
  const tones = {
    default: "border-white/10 bg-white/[0.04] text-zinc-300",
    live: "border-green-300/30 bg-green-300/10 text-green-200",
    muted: "border-zinc-700 bg-zinc-900/80 text-zinc-400",
  };

  return (
    <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${tones[tone] || tones.default}`}>
      {children}
    </span>
  );
}

export function ButtonLink({ href, to, children, variant = "primary", className = "", ...props }) {
  const Component = to ? "a" : "a";
  const targetProps = href?.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {};
  const variants = {
    primary: "bg-green-400 text-[#041008] hover:bg-green-300",
    secondary: "border border-white/12 bg-white/[0.04] text-white hover:border-green-300/40 hover:bg-green-300/10",
    ghost: "text-zinc-300 hover:text-white",
  };

  return (
    <Component
      href={to || href}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition ${variants[variant]} ${className}`}
      {...targetProps}
      {...props}
    >
      {children}
    </Component>
  );
}

export function ShowcaseCard({ item, href, image, kicker, impact, tags = [], status, compact = false }) {
  const resolvedHref = href || item?.live_url || item?.github_url || "#";
  const disabled = resolvedHref === "#";

  return (
    <article className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-zinc-950/70 shadow-2xl shadow-black/25 backdrop-blur">
      <a
        href={disabled ? undefined : resolvedHref}
        target={!disabled && resolvedHref.startsWith("http") ? "_blank" : undefined}
        rel={!disabled && resolvedHref.startsWith("http") ? "noopener noreferrer" : undefined}
        className={disabled ? "block cursor-default" : "block"}
        aria-disabled={disabled}
      >
        <div className="aspect-[16/10] overflow-hidden border-b border-white/10 bg-zinc-900">
          <img
            src={image}
            alt={`${item.title} interface preview`}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.025]"
            loading="lazy"
          />
        </div>
        <div className={compact ? "p-5" : "p-6 sm:p-7"}>
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {kicker && <Pill>{kicker}</Pill>}
            {status && <Pill tone={status === "Live" || status === "Active" ? "live" : "muted"}>{status}</Pill>}
          </div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold text-white sm:text-2xl">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-400">{impact || item.description}</p>
            </div>
            <span className="rounded-full border border-white/10 bg-white/[0.04] p-2 text-green-300 transition group-hover:border-green-300/40 group-hover:bg-green-300/10">
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </div>
          {tags.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {tags.slice(0, compact ? 3 : 5).map((tag) => (
                <span key={tag} className="rounded-full bg-white/[0.04] px-3 py-1 text-xs text-zinc-400">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </a>
    </article>
  );
}

export function EmptyState({ title, copy }) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-8 text-center">
      <RadioTower className="mx-auto mb-4 h-8 w-8 text-green-300" aria-hidden="true" />
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm text-zinc-400">{copy}</p>
    </div>
  );
}

export function ProjectLinks({ github, live }) {
  return (
    <div className="mt-5 flex flex-wrap gap-3">
      {live && (
        <ButtonLink href={live} variant="primary">
          Visit live <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </ButtonLink>
      )}
      {github && (
        <ButtonLink href={github} variant="secondary">
          <Code2 className="h-4 w-4" aria-hidden="true" /> Code
        </ButtonLink>
      )}
    </div>
  );
}
