import { motion } from 'framer-motion';

export function ProjectCard({ 
  title, 
  description, 
  icon, 
  iconType = 'emoji',
  iconLabel,
  link, 
  tags = [], 
  status = "Active",
  variants 
}) {
  return (
    <motion.div
      variants={variants}
      className="group"
    >
      <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-green-500/30 transition-all duration-300 h-full flex flex-col items-start">
        {/* Project Icon (emoji or image) above the text, left-aligned */}
        <div
          className="text-6xl group-hover:scale-110 transition-transform duration-300 flex items-center justify-start mb-4"
          aria-label={iconLabel}
          role="img"
        >
          {iconType === 'image' && icon ? (
            <img src={icon} alt={iconLabel || title} className="w-14 h-14 object-contain" />
          ) : (
            icon
          )}
        </div>

        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            status === 'Active' ? 'bg-green-500/20 text-green-400' :
            status === 'In Development' ? 'bg-yellow-500/20 text-yellow-400' :
            status === 'Planning' ? 'bg-blue-500/20 text-blue-400' :
            'bg-gray-500/20 text-gray-400'
          }`}>
            {status}
          </span>
        </div>

        <h3 className="text-2xl font-bold mb-4 group-hover:text-green-400 transition-colors">
          {title}
        </h3>
        <p className="text-gray-400 mb-6 leading-relaxed">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag) => (
            <span 
              key={tag}
              className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA Button */}
        <motion.a
          href={link}
          target={link !== '#' ? "_blank" : undefined}
          rel={link !== '#' ? "noopener noreferrer" : undefined}
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
            link !== '#' 
              ? 'bg-green-500 hover:bg-green-400 text-white hover:scale-105' 
              : 'bg-gray-700 text-gray-400 cursor-not-allowed'
          }`}
          whileHover={link !== '#' ? { scale: 1.05 } : {}}
          whileTap={link !== '#' ? { scale: 0.95 } : {}}
        >
          {link !== '#' ? 'View Project' : 'Coming Soon'}
          {link !== '#' ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </motion.a>
      </div>
    </motion.div>
  );
}
