
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";

const navItems = [
  { to: "/hub", label: "Hub" },
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

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
      <motion.header
        className="fixed left-0 right-0 top-0 z-50 px-4 py-4 sm:px-6"
        initial={shouldReduceMotion ? false : { y: -100 }}
        animate={shouldReduceMotion ? false : { y: 0 }}
        transition={shouldReduceMotion ? false : { duration: 0.6, ease: "easeOut" }}
      >
        <nav
          className={`mx-auto flex max-w-7xl items-center justify-between rounded-full border px-4 py-3 transition-all duration-300 ${
            isScrolled
              ? "border-white/10 bg-[#07100d]/85 shadow-2xl shadow-black/30 backdrop-blur-xl"
              : "border-white/0 bg-transparent"
          }`}
          aria-label="Primary navigation"
        >
          <Link
            to="/"
            className="brand-gradient rounded-full pr-2 text-xl font-bold transition-all duration-300"
          >
            byNolo
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-medium transition ${
                    isActive ? "bg-white/[0.08] text-white" : "text-zinc-400 hover:bg-white/[0.04] hover:text-white"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-green-400 px-4 py-2 text-sm font-semibold text-[#041008] transition hover:bg-green-300"
            >
              Start a build <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="rounded-full border border-white/10 bg-white/[0.04] p-2 text-zinc-200 transition hover:border-green-300/40 hover:text-white md:hidden"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu-panel"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu-panel"
            initial={shouldReduceMotion ? false : { opacity: 0, y: -20 }}
            animate={shouldReduceMotion ? false : { opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? false : { opacity: 0, y: -20 }}
            transition={shouldReduceMotion ? false : { duration: 0.2 }}
            className="fixed left-4 right-4 top-20 z-40 rounded-[1.5rem] border border-white/10 bg-[#07100d]/95 p-3 shadow-2xl shadow-black/40 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="rounded-2xl px-4 py-3 text-base font-medium text-zinc-200 transition hover:bg-white/[0.05] hover:text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/contact"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-green-400 px-4 py-3 text-sm font-semibold text-[#041008]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Start a build <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
