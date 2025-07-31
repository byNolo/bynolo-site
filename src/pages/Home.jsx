import React from "react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.section
      className="flex flex-col items-center justify-center text-center py-24 px-4 sm:px-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white leading-tight mb-4">
        Written, designed, deployed - <span className="text-green-500">byNolo</span>
      </h1>

      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mb-8">
        A collection of and handcrafted web tools, open-source projects, and creative experiments.
      </p>

      <div className="flex gap-4 flex-wrap justify-center">
        <a
          href="/projects"
          className="px-6 py-3 rounded-md text-white bg-green-500 hover:bg-green-600 transition font-medium"
        >
          View Projects
        </a>
        <a
          href="/about"
          className="px-6 py-3 rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:border-green-500 hover:text-green-500 transition font-medium"
        >
          Learn More
        </a>
      </div>
    </motion.section>
  );
}
