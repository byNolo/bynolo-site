import { useEffect } from 'react';

export function ThemeToggle({ theme, setTheme }) {
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="px-3 py-1 rounded-md border border-transparent hover:border-accent transition-colors duration-300 flex items-center"
    >
      <span className="block md:hidden">
        {theme === 'dark' ? '🌞' : '🌙'}
      </span>
      <span className="hidden md:block">
        {theme === 'dark' ? '🌞 Light Mode' : '🌙 Dark Mode'}
      </span>
    </button>
  );
}
