// pages/Hub.jsx
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import GradientMesh from '../components/GradientMesh';
import AnimatedBackground from '../components/AnimatedBackground';


// Category configuration
const categories = {
  service: {
    id: 'service',
    name: 'Services',
    description: 'Core infrastructure and APIs',
    color: 'from-blue-500 to-blue-600'
  },
  app: {
    id: 'app', 
    name: 'Applications',
    description: 'Full-featured web applications',
    color: 'from-purple-500 to-purple-600'
  },
  site: {
    id: 'site',
    name: 'Websites',
    description: 'Marketing and portfolio sites',
    color: 'from-green-500 to-green-600'
  },
  tool: {
    id: 'tool',
    name: 'Tools',
    description: 'Development and utility tools',
    color: 'from-yellow-500 to-yellow-600'
  }
};

const hubItems = [
  {
    id: 1,
    title: "Vinyl Vote",
    description: "Weekly album voting platform",
    icon: "🎵",
    iconType: "emoji",
    iconLabel: "Musical note",
    link: "https://vinylvote.bynolo.com",
    status: "Live",
    categories: ["app", "service"],
    color: "from-[#1DB954] to-[#1ED760]"
  },
  {
    id: 2,
    title: "KeyN Authentication",
    description: "Secure authentication system powering all byNolo projects",
    icon: "🔐",
    iconType: "emoji",
    iconLabel: "Lock representing security",
    link: "https://keyn.bynolo.com",
    status: "Live",
    categories: ["service"],
    color: "from-blue-500 to-blue-600"
  },
  {
    id: 3,
    title: "Portfolio",
    description: "This site - showcasing projects and serving as the central hub",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    iconType: "image",
    iconLabel: "React logo",
    link: "/",
    status: "Active",
    categories: ["site"],
    color: "from-green-500 to-green-600"
  },
  {
    id: 4,
    title: "SideQuest",
    description: "Gamified daily adventures and local discovery platform",
    icon: "🗺️",
    iconType: "emoji",
    iconLabel: "Map representing adventure",
    link: "https://sidequest.bynolo.com",
    status: "Planning",
    categories: ["app", "tool"],
    color: "from-purple-500 to-purple-600"
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

const HubCard = ({ item }) => {
  const isExternal = item.link.startsWith('http://') || item.link.startsWith('https://');
  const statusColors = {
    Live: 'bg-green-500', 
    Beta: 'bg-blue-500',
    Active: 'bg-purple-500',
    Development: 'bg-yellow-500',
    Planning: 'bg-gray-500'
  };

  const cardContent = (
    <motion.div
      variants={itemVariants}
      whileHover={{ rotateX: 4, rotateY: -4, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="group relative cursor-pointer h-full"
      style={{ perspective: '1000px' }}
    >
      {/* Glow halo */}
      <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500 bg-gradient-to-r ${item.color}`} />
      
      <div className="relative bg-gray-900/60 backdrop-blur-md border border-gray-800 rounded-xl p-6 h-full shadow-lg flex flex-col">
        {/* Status pulse */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full ${
              item.status !== 'Planning' ? 'animate-pulse' : ''
            } ${statusColors[item.status]}`}
          ></span>
          <span className="text-xs text-gray-400">{item.status}</span>
        </div>

        {/* Icon */}
        <div className="mb-4">
          <div className={`w-14 h-14 rounded-lg bg-gradient-to-r ${item.color} flex items-center justify-center shadow-md p-2`}>
            {item.iconType === 'image' ? (
              <img
                src={item.icon}
                alt={item.iconLabel}
                className="w-full h-full object-contain filter brightness-0 invert"
                loading="lazy"
              />
            ) : (
              <span role="img" aria-label={item.iconLabel} className="text-2xl">
                {item.icon}
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="mb-4 flex-1">
          <h3 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors mb-2">
            {item.title}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
        </div>

        {/* Bottom section with categories and launch button */}
        <div className="mt-auto space-y-3">
          {/* Minimal category tags */}
          <div className="flex flex-wrap gap-1">
            {item.categories.map(categoryId => (
              <span 
                key={categoryId}
                className="px-2 py-0.5 text-xs rounded bg-gray-800/50 text-gray-300 border border-gray-700/50"
              >
                {categories[categoryId].name}
              </span>
            ))}
          </div>

          {/* Launch button visual only */}
          <div>
            <div 
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r ${item.color} text-white font-medium hover:shadow-lg transition-all duration-300`}
              aria-hidden="true"
            >
              {isExternal ? 'Launch' : 'Visit'}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isExternal ? "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" : "M9 5l7 7-7 7"} />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  // Wrap the entire card with appropriate link component
  if (isExternal) {
    return (
      <a
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-gray-950 rounded-xl"
      >
        {cardContent}
      </a>
    );
  } else {
    return (
      <Link 
        to={item.link} 
        className="block h-full focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-gray-950 rounded-xl"
      >
        {cardContent}
      </Link>
    );
  }
};

export default function Hub() {
  const [filter, setFilter] = useState('all');
  
  const filteredItems = useMemo(() => {
    return filter === 'all' ? hubItems : hubItems.filter(i => i.categories.includes(filter));
  }, [filter]);

  const categoryCountMap = useMemo(() => {
    const countMap = {};
    
    // Initialize all categories with 0
    Object.values(categories).forEach(category => {
      countMap[category.id] = 0;
    });
    
    // Count items for each category
    hubItems.forEach(item => {
      item.categories.forEach(categoryId => {
        if (countMap.hasOwnProperty(categoryId)) {
          countMap[categoryId]++;
        }
      });
    });
    
    return countMap;
  }, []);

  return (
    <div className="relative min-h-screen text-white pt-20 overflow-hidden">
      {/* Background effects */}
      <GradientMesh />
      <AnimatedBackground />

      {/* Hero */}
      <motion.div
        className="text-center mb-12 relative z-10 px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4">
          Hub{' - '}
          <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
            byNolo
          </span>
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Your central command center for all byNolo services, tools, and projects.
        </p>
      </motion.div>

      {/* Filter */}
      <motion.div
        className="flex flex-wrap justify-center gap-3 mb-12 relative z-10 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {/* All filter */}
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            filter === 'all'
              ? 'bg-green-500 text-white shadow-lg'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
          aria-pressed={filter === 'all'}
        >
          All
        </button>

        {/* Category filters */}
        {Object.values(categories).map(category => {
          const categoryCount = categoryCountMap[category.id];
          
          return (
            <button
              key={category.id}
              onClick={() => setFilter(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === category.id
                  ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
              title={category.description}
              aria-pressed={filter === category.id}
            >
              {category.name} ({categoryCount})
            </button>
          );
        })}
      </motion.div>

      {/* Grid */}
      <motion.div
        className="max-w-7xl mx-auto px-4 pb-20 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {filteredItems.map(item => (
            <HubCard key={item.id} item={item} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
