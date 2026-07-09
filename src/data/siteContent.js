export const showcase = {
  "Vinyl Vote": {
    image: "/showcase/vinyl-vote.svg",
    kicker: "Social music platform",
    impact: "Weekly album rooms, voting, charts, and a shared reason to listen.",
    accent: "green",
  },
  "KeyN Authentication": {
    image: "/showcase/keyn.svg",
    kicker: "Shared identity layer",
    impact: "A self-hosted auth backbone for the byNolo ecosystem.",
    accent: "emerald",
  },
  SideQuest: {
    image: "/showcase/sidequest.svg",
    kicker: "Location-aware game layer",
    impact: "A planning-stage quest engine for daily adventure and discovery.",
    accent: "lime",
  },
  Portfolio: {
    image: "/showcase/portfolio.svg",
    kicker: "Studio home base",
    impact: "The public front door for work, services, experiments, and contact.",
    accent: "green",
  },
  "byNolo Portfolio": {
    image: "/showcase/portfolio.svg",
    kicker: "Studio home base",
    impact: "The public front door for work, services, experiments, and contact.",
    accent: "green",
  },
};

export const fallbackProjects = [
  {
    id: 1,
    title: "Vinyl Vote",
    description: "A weekly album voting platform for friend groups with listening rooms, rankings, and simple admin tools.",
    tech_stack: ["Flask", "React", "Charts", "Auth"],
    github_url: "https://github.com/byNolo/vinyl-vote",
    live_url: "https://vinylvote.bynolo.com",
    status: "Active",
  },
  {
    id: 2,
    title: "KeyN Authentication",
    description: "A custom authentication service for shared login, sessions, and identity across byNolo projects.",
    tech_stack: ["Flask", "JWT", "OAuth2", "Security"],
    github_url: "https://github.com/byNolo/keyn",
    live_url: "https://keyn.bynolo.com",
    status: "Active",
  },
  {
    id: 3,
    title: "SideQuest",
    description: "A gamified local discovery platform for turning daily routines into small, trackable adventures.",
    tech_stack: ["Flask", "Geolocation", "Gamification", "Automation"],
    github_url: "",
    live_url: "https://sidequest.bynolo.com",
    status: "Planning",
  },
  {
    id: 4,
    title: "byNolo Portfolio",
    description: "A dark-first portfolio and project hub for byNolo work, experiments, and collaboration.",
    tech_stack: ["React", "Vite", "Tailwind", "Framer Motion"],
    github_url: "https://github.com/byNolo/bynolo-site",
    live_url: "https://bynolo.com",
    status: "Active",
  },
];

export const fallbackHubItems = [
  {
    id: 1,
    title: "Vinyl Vote",
    description: "Weekly album voting platform for listening rooms and shared music rituals.",
    icon: "Music",
    iconType: "lucide",
    iconLabel: "Music icon",
    link: "https://vinylvote.bynolo.com",
    status: "Live",
    categories: ["app", "service"],
    color: "from-emerald-400 to-green-500",
  },
  {
    id: 2,
    title: "KeyN Authentication",
    description: "Secure authentication system powering byNolo logins and shared sessions.",
    icon: "ShieldCheck",
    iconType: "lucide",
    iconLabel: "Shield icon",
    link: "https://keyn.bynolo.com",
    status: "Live",
    categories: ["service"],
    color: "from-green-400 to-teal-400",
  },
  {
    id: 3,
    title: "Portfolio",
    description: "The central studio site for projects, services, and contact.",
    icon: "PanelsTopLeft",
    iconType: "lucide",
    iconLabel: "Interface icon",
    link: "/",
    status: "Active",
    categories: ["site"],
    color: "from-lime-300 to-green-500",
  },
  {
    id: 4,
    title: "SideQuest",
    description: "Gamified daily adventures and local discovery platform.",
    icon: "Map",
    iconType: "lucide",
    iconLabel: "Map icon",
    link: "https://sidequest.bynolo.com",
    status: "Planning",
    categories: ["app", "tool"],
    color: "from-green-300 to-emerald-500",
  },
];

export const categoryMeta = {
  service: {
    id: "service",
    name: "Services",
    description: "Infrastructure, APIs, and shared systems",
  },
  app: {
    id: "app",
    name: "Apps",
    description: "Full product experiences and tools",
  },
  site: {
    id: "site",
    name: "Sites",
    description: "Websites, portfolios, and public surfaces",
  },
  tool: {
    id: "tool",
    name: "Tools",
    description: "Utilities, automations, and experiments",
  },
};

export const services = [
  {
    title: "Websites that feel built, not assembled",
    description: "Dark-first portfolios, launch pages, and business sites with real structure, motion, and taste.",
  },
  {
    title: "Apps with practical foundations",
    description: "React front ends, Flask APIs, authentication, dashboards, and workflows designed to keep moving.",
  },
  {
    title: "Self-hosted systems and automations",
    description: "Small infrastructure, homelab-friendly deployments, integrations, bots, and tools that save time.",
  },
];

export const process = [
  "Map the real goal and the audience.",
  "Prototype the interaction before polishing pixels.",
  "Build the core flow, then sharpen the visual system.",
  "Ship with checks, documentation, and room to keep evolving.",
];

export const principles = [
  {
    title: "Useful first",
    description: "A good build should make the next action obvious and remove friction from the person using it.",
  },
  {
    title: "Owned systems",
    description: "I like work that can be understood, hosted, modified, and maintained without mystery.",
  },
  {
    title: "A little personality",
    description: "Polish matters, but so does evidence that a real person cared about the small details.",
  },
];

export const stack = ["React", "Vite", "Tailwind", "Framer Motion", "Flask", "Python", "SQLite", "Docker", "Home Assistant"];
