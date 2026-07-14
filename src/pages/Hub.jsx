import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Boxes,
  CircleDot,
  Clock3,
  Code2,
  Globe2,
  Loader2,
  Map,
  Music,
  PanelsTopLeft,
  ShieldCheck,
} from "lucide-react";
import PageShell from "../components/PageShell";
import { EmptyState, Pill } from "../components/ui";
import apiClient from "../services/api";
import { categoryMeta, fallbackHubItems, showcase } from "../data/siteContent";

const iconMap = {
  Music,
  ShieldCheck,
  PanelsTopLeft,
  Map,
  Code2,
  Globe2,
  Boxes,
};

function resolveIcon(item) {
  if (item.iconType === "lucide" && iconMap[item.icon]) return iconMap[item.icon];
  const title = item.title?.toLowerCase() || "";
  if (title.includes("vinyl")) return Music;
  if (title.includes("keyn") || title.includes("auth")) return ShieldCheck;
  if (title.includes("sidequest")) return Map;
  if (title.includes("portfolio")) return PanelsTopLeft;
  return Boxes;
}

function statusTone(status) {
  if (status === "Live" || status === "Active") return "live";
  if (status === "Planning") return "muted";
  return "default";
}

function HubCard({ item, categories }) {
  const Icon = resolveIcon(item);
  const isExternal = item.link?.startsWith("http://") || item.link?.startsWith("https://");
  const isDisabled = !item.link || item.link === "#";
  const preview = showcase[item.title] || showcase[item.title === "Portfolio" ? "Portfolio" : "byNolo Portfolio"];
  const previewImage = item.screenshot_url || item.showcase_image_url || preview.image;
  const content = (
    <article className="group h-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-zinc-950/70 shadow-xl shadow-black/20 backdrop-blur transition hover:border-green-300/30 hover:bg-zinc-900/80">
      <div className="aspect-[16/9] overflow-hidden border-b border-white/10 bg-zinc-900">
        <img src={previewImage} alt={`${item.title} preview`} className="h-full w-full object-cover opacity-90 transition duration-700 group-hover:scale-[1.025] group-hover:opacity-100" loading="lazy" />
      </div>
      <div className="p-5">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="grid h-11 w-11 place-items-center rounded-2xl border border-green-300/20 bg-green-300/10 text-green-300">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </div>
          <Pill tone={statusTone(item.status)}>
            {item.status === "Planning" ? <Clock3 className="h-3.5 w-3.5" aria-hidden="true" /> : <CircleDot className="h-3.5 w-3.5" aria-hidden="true" />}
            {item.status}
          </Pill>
        </div>
        <h3 className="text-xl font-semibold text-white">{item.title}</h3>
        <p className="mt-3 min-h-12 text-sm leading-6 text-zinc-400">{item.impact || item.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {item.categories?.map((categoryId) => (
            <span key={categoryId} className="rounded-full bg-white/[0.04] px-3 py-1 text-xs text-zinc-400">
              {categories[categoryId]?.name || categoryId}
            </span>
          ))}
        </div>
        <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-green-300 transition group-hover:text-green-200">
          {isDisabled ? "Coming soon" : isExternal ? "Launch service" : "Visit page"}
          {!isDisabled && <ArrowUpRight className="h-4 w-4" aria-hidden="true" />}
        </div>
      </div>
    </article>
  );

  if (isDisabled) return content;
  if (isExternal) {
    return (
      <a href={item.link} target="_blank" rel="noopener noreferrer" className="block h-full">
        {content}
      </a>
    );
  }
  return (
    <Link to={item.link} className="block h-full">
      {content}
    </Link>
  );
}

export default function Hub() {
  const [hubItems, setHubItems] = useState(fallbackHubItems);
  const [categories, setCategories] = useState(categoryMeta);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const fetchHubData = async () => {
      try {
        setLoading(true);
        const [itemsResponse, categoriesResponse] = await Promise.all([
          apiClient.getHubItems(),
          apiClient.getHubCategories(),
        ]);

        setHubItems(itemsResponse.items?.length ? itemsResponse.items : fallbackHubItems);
        setCategories({ ...categoryMeta, ...(categoriesResponse.categories || {}) });
      } catch (err) {
        console.error("Failed to fetch hub data:", err);
        setError("Live hub data is unavailable, so a curated snapshot is shown.");
        setHubItems(fallbackHubItems);
        setCategories(categoryMeta);
      } finally {
        setLoading(false);
      }
    };

    fetchHubData();
  }, []);

  const counts = useMemo(() => {
    const next = { all: hubItems.length };
    hubItems.forEach((item) => {
      item.categories?.forEach((category) => {
        next[category] = (next[category] || 0) + 1;
      });
    });
    return next;
  }, [hubItems]);

  const filteredItems = useMemo(() => {
    if (selectedCategory === "all") return hubItems;
    return hubItems.filter((item) => item.categories?.includes(selectedCategory));
  }, [hubItems, selectedCategory]);

  return (
    <PageShell dense background="particles">
      <section className="px-5 pb-12 pt-32 sm:px-8 lg:px-12 lg:pt-40">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <div>
              <h1 className="text-5xl font-semibold leading-[0.98] text-white sm:text-6xl lg:text-7xl">The byNolo hub.</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
                A cleaner launch surface for the apps, services, sites, and tools that make up the byNolo ecosystem.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                [hubItems.length, "items"],
                [counts.service || 0, "services"],
                [counts.app || 0, "apps"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <div className="text-2xl font-semibold text-green-300">{value}</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.18em] text-zinc-500">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                selectedCategory === "all" ? "border-green-300/40 bg-green-300/15 text-green-100" : "border-white/10 bg-white/[0.04] text-zinc-400 hover:text-white"
              }`}
            >
              All ({counts.all || 0})
            </button>
            {Object.values(categories).map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setSelectedCategory(category.id)}
                title={category.description}
                aria-pressed={selectedCategory === category.id}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  selectedCategory === category.id ? "border-green-300/40 bg-green-300/15 text-green-100" : "border-white/10 bg-white/[0.04] text-zinc-400 hover:text-white"
                }`}
              >
                {category.name} ({counts[category.id] || category.count || 0})
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex items-center gap-3 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6 text-zinc-300">
              <Loader2 className="h-5 w-5 animate-spin text-green-300" aria-hidden="true" /> Loading hub services...
            </div>
          ) : (
            <>
              {error && <div className="mb-6 rounded-2xl border border-yellow-300/20 bg-yellow-300/10 p-4 text-sm text-yellow-100">{error}</div>}
              {filteredItems.length === 0 ? (
                <EmptyState title="No services in this category" copy="Try a different filter or check back when the next build goes live." />
              ) : (
                <div className="grid auto-rows-fr gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {filteredItems.map((item) => (
                    <HubCard key={item.id || item.title} item={item} categories={categories} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 rounded-[2rem] border border-green-300/20 bg-green-300/[0.06] p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-green-300">Have an idea for the next tile?</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">Let’s make something worth launching.</h2>
          </div>
          <Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-green-400 px-5 py-3 text-sm font-semibold text-[#041008] transition hover:bg-green-300">
            Start a build <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
