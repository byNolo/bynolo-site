import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const defaultStats = [
  { value: "5+", label: "Projects", description: "Active projects in development" },
  { value: "100%", label: "Open Source", description: "All projects are open source" },
  { value: "∞", label: "Possibilities", description: "Unlimited possibilities for innovation", ariaLabel: "Infinite possibilities" }
];

export default function HeroSection({ stats = defaultStats }) {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  return (
    <motion.div
      className="relative z-10 flex flex-col items-center justify-center text-center min-h-[80vh] px-4 sm:px-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Main heading with gradient text */}
      <motion.div variants={itemVariants} className="mb-6">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black leading-tight">
          <span className="block text-white mb-2">
            Written, Designed,
          </span>
          <span className="block text-white mb-2">
            Deployed -{' '}
            <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
              byNolo
            </span>
          </span>
        </h1>
      </motion.div>

      {/* Subtitle */}
      <motion.p
        variants={itemVariants}
        className="text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-3xl mb-8 leading-relaxed"
      >
        A collection of handcrafted web tools, open-source projects, and creative experiments.
        <span className="block mt-2 text-green-400 font-medium">
          Building ideas into reality, one project at a time.
        </span>
      </motion.p>

      {/* Call-to-action buttons */}
      <motion.div 
        variants={itemVariants} 
        className="flex gap-4 flex-wrap justify-center mb-12"
        role="group"
        aria-label="Main navigation actions"
      >
        <motion.div
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <Link
            to="/projects"
            className="group relative inline-flex items-center justify-center px-8 py-4 rounded-full text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl overflow-hidden focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-gray-950"
            aria-describedby="projects-button-desc"
          >
            <span className="relative z-10">View Projects</span>
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </Link>
          <span id="projects-button-desc" className="sr-only">
            Navigate to the projects page to view my portfolio of work
          </span>
        </motion.div>

        <motion.div
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <Link
            to="/about"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-gray-600 text-gray-200 hover:border-green-500 hover:text-green-400 transition-all duration-300 font-semibold text-lg backdrop-blur-sm bg-gray-800/10 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-gray-950"
            aria-describedby="about-button-desc"
          >
            Learn More
          </Link>
          <span id="about-button-desc" className="sr-only">
            Navigate to the about page to learn more about my background and experience
          </span>
        </motion.div>
      </motion.div>

      {/* Featured stats or highlights */}
      <motion.section
        variants={itemVariants}
        className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto"
        role="region"
        aria-labelledby="stats-heading"
      >
        <h2 id="stats-heading" className="sr-only">
          Project Statistics
        </h2>
        <dl className="contents">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <dt className="sr-only">{stat.label}</dt>
              <dd 
                className="text-3xl font-bold text-green-500 mb-2"
                aria-label={stat.ariaLabel || `${stat.value} ${stat.label}`}
                title={stat.description}
              >
                {stat.value}
              </dd>
              <dt className="text-sm uppercase tracking-wide text-gray-400">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      </motion.section>
    </motion.div>
  );
}
