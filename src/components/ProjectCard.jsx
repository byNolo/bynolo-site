import { motion } from 'framer-motion';

export function ProjectCard({ title, description, icon, link }) {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group rounded-xl p-6 border border-zinc-700 hover:border-brand"
      whileHover={{ scale: 1.02 }}
    >
      <div className="text-4xl mb-4 group-hover:text-brand">{icon}</div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-zinc-400">{description}</p>
    </motion.a>
  );
}
