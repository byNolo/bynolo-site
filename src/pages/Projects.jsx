
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ProjectCard } from '../components/ProjectCard';
import apiClient from '../services/api';

const MotionLink = motion(Link);

const projects = [
  {
    id: 1,
    title: "byNolo Portfolio",
    description: "A sleek, modern personal site to showcase all my projects. Built with Vite, Tailwind, and React, with dark mode and smooth animations.",
    icon: "🧑‍💻",
    iconLabel: "Person coding",
    link: "https://github.com/byNolo/bynolo-site",
    tags: ["React", "Vite", "Tailwind", "Framer Motion"],
    status: "Active"
  },
  {
    id: 2,
    title: "KeyN Authentication",
    description: "Custom authentication system powering login across all byNolo projects. Secure, self-hosted, with session and JWT support.",
    icon: "🔐",
    iconLabel: "Lock representing security",
    link: "https://github.com/byNolo/keyn",
    tags: ["Auth", "JWT", "OAuth2", "Flask", "Security"],
    status: "Active"
  },
  {
    id: 3,
    title: "SideQuest",
    description: "Gamified daily side quest generator. Personalized quests based on location, preferences, and community ratings.",
    icon: "🗺️",
    iconLabel: "Map representing side quests",
    link: "#",
    tags: ["Flask", "Gamification", "Geo", "Automation"],
    status: "Planning"
  },
  {
    id: 4,
    title: "Vinyl Vote",
    description: "A weekly album rating platform for my friend group. Features user login, stats, charts, and admin dashboard.",
    icon: "🎵",
    iconLabel: "Music note for album voting",
    link: "https://github.com/byNolo/vinyl-vote",
    tags: ["Flask", "Music", "Voting", "Charts"],
    status: "Active"
  },
  // {
  //   id: 5,
  //   title: "The Problemed Child",
  //   description: "A multipurpose Discord bot with games, gambling, pets, and AI memory analytics. Custom-coded for our private server.",
  //   icon: "🤖",
  //   iconLabel: "Robot for Discord bot",
  //   link: "https://github.com/byNolo/problemed-child",
  //   tags: ["Py-Cord", "Games", "AI", "Bot"],
  //   status: "Active"
  // }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

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
        console.error('Failed to fetch projects:', err);
        setError('Failed to load projects. Please try again later.');
        // Fallback to static data if API fails
        setProjects([
          {
            id: 1,
            title: "byNolo Portfolio",
            description: "A sleek, modern personal site to showcase all my projects. Built with Vite, Tailwind, and React, with dark mode and smooth animations.",
            tech_stack: ["React", "Vite", "Tailwind", "Framer Motion"],
            github_url: "https://github.com/byNolo/bynolo-site",
            live_url: "https://bynolo.com",
            status: "Active"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero Section */}
      <motion.div 
        className="relative overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-green-950"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div 
            className="text-center"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-white">Projects</span>{' - '}
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                byNolo
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Explore our collection of public projects, open source contributions, and innovative solutions. 
              Each project represents our commitment to quality, creativity, and community impact.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.section 
        className="py-16 bg-gray-900/50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-center">
            {[
              { label: "Active Projects", value: "5+" },
              { label: "Technologies", value: "15+" },
              // { label: "Contributors", value: "Growing" },
              { label: "Open Source", value: "Always" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm md:text-base">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Projects Grid */}
      <motion.section 
        className="py-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px", amount: 0.1 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            variants={itemVariants}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Featured <span className="text-green-400">Projects</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              From innovative web applications to developer tools, here's what we're building
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                icon={project.icon || "🚀"}
                iconType={project.iconType || 'emoji'}
                iconLabel={project.iconLabel || `${project.title} project`}
                link={project.github_url || '#'}
                tags={project.tech_stack || []}
                status={project.status}
                variants={itemVariants}
              />
            ))}
          </div>
        </div>
      </motion.section>

      {/* Hub CTA Section */}
      <motion.section 
        className="py-20 bg-gradient-to-r from-green-950/20 to-blue-950/20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Access <span className="text-green-400">Live Services</span>
            </h2>
            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              Many of these projects are live and available to use right now. 
              Visit the byNolo Hub to access all active services, tools, and applications.
            </p>
            <MotionLink
              to="/hub"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Launch Hub
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
                role="img"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </MotionLink>
          </motion.div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section 
        className="py-20 bg-gradient-to-r from-green-500/10 to-blue-500/10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to <span className="text-green-400">Collaborate?</span>
            </h2>
            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              We're always looking for new opportunities to create amazing projects. 
              Whether you have an idea or want to contribute to existing work, let's connect!
            </p>
            <MotionLink
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-green-500 hover:bg-green-400 text-white font-medium rounded-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
                role="img"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </MotionLink>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
