
import React from "react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";

export default function NavBar({ children }) {
  return (
    <nav className="flex justify-between items-center p-4 bg-[var(--color-bg)] text-[var(--color-text)] border-b border-gray-300 dark:border-gray-700">
      <div className="flex items-center space-x-8">
        <Link to="/" className="text-xl font-bold">byNolo</Link>
        <div className="space-x-4">
          <Link to="/about" className="hover:text-accent">About</Link>
          <Link to="/projects" className="hover:text-accent">Projects</Link>
          <Link to="/contact" className="hover:text-accent">Contact</Link>
        </div>
      </div>
      {children}
    </nav>
  );
}