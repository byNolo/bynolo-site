
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-4 transition-all duration-300 ${
        isScrolled
          ? 'bg-gray-950/80 backdrop-blur-md border-b border-gray-800'
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="flex items-center space-x-8">
        <Link to="/" className="text-xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent hover:from-green-500 hover:to-green-700 transition-all duration-300">
          byNolo
        </Link>
        <div className="hidden md:flex space-x-6">
          <Link 
            to="/about" 
            className="text-gray-300 hover:text-green-400 transition-colors duration-200 font-medium"
          >
            About
          </Link>
          <Link 
            to="/projects" 
            className="text-gray-300 hover:text-green-400 transition-colors duration-200 font-medium"
          >
            Projects
          </Link>
          <Link 
            to="/contact" 
            className="text-gray-300 hover:text-green-400 transition-colors duration-200 font-medium"
          >
            Contact
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
