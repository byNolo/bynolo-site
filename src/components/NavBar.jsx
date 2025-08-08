
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    // Lock body scroll when mobile menu is open
    if (isMobileMenuOpen) {
      // Save the current overflow style
      const originalOverflow = document.body.style.overflow;
      
      // Lock the scroll
      document.body.style.overflow = 'hidden';
      
      // Cleanup function to restore original overflow
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-4 transition-all duration-300 ${
          isScrolled
            ? 'bg-gray-950/80 backdrop-blur-md border-b border-gray-800'
            : 'bg-transparent'
        }`}
        initial={shouldReduceMotion ? false : { y: -100 }}
        animate={shouldReduceMotion ? false : { y: 0 }}
        transition={shouldReduceMotion ? false : { duration: 0.6, ease: "easeOut" }}
      >
        <div className="flex items-center space-x-8">
          <Link to="/" className="text-xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent hover:from-green-500 hover:to-green-700 transition-all duration-300">
            byNolo
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link 
              to="/hub" 
              className="text-gray-300 hover:text-green-400 transition-colors duration-200 font-medium"
            >
              Hub
            </Link>
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
        
        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-gray-300 hover:text-green-400 transition-colors duration-200 p-2"
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu-panel"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu-panel"
            initial={shouldReduceMotion ? false : { opacity: 0, y: -20 }}
            animate={shouldReduceMotion ? false : { opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? false : { opacity: 0, y: -20 }}
            transition={shouldReduceMotion ? false : { duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 bg-gray-950/95 backdrop-blur-md border-b border-gray-800 md:hidden"
          >
            <div className="flex flex-col space-y-4 p-6">
              <Link
                to="/hub"
                className="text-gray-300 hover:text-green-400 transition-colors duration-200 font-medium text-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Hub
              </Link>
              <Link
                to="/about"
                className="text-gray-300 hover:text-green-400 transition-colors duration-200 font-medium text-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/projects"
                className="text-gray-300 hover:text-green-400 transition-colors duration-200 font-medium text-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Projects
              </Link>
              <Link
                to="/contact"
                className="text-gray-300 hover:text-green-400 transition-colors duration-200 font-medium text-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
