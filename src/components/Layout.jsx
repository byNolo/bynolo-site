import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import NavBar from "./NavBar";
import Footer from "./Footer";
import { ThemeToggle } from "./ThemeToggle";

export default function Layout() {
  const [theme, setTheme] = useState(
    () =>
      localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
  );
  
  return (
    <motion.div
      key={theme}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-white transition-colors duration-500"
    >
      <NavBar>
        <ThemeToggle theme={theme} setTheme={setTheme} />
      </NavBar>
      <main className="flex-grow px-6 md:px-12 py-12">
        <Outlet />
      </main>
      <Footer />
    </motion.div>
  );
}
