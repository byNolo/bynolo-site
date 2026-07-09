export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-[#050806] px-5 py-8 text-sm text-zinc-500 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="uppercase tracking-[0.16em]">
          &copy; {new Date().getFullYear()} <span className="font-semibold text-zinc-300">byNolo</span>. Created <span className="font-bold normal-case text-green-400">byNolo</span>
        </p>
        <div className="flex flex-wrap gap-4">
          <a href="/privacy" className="transition hover:text-green-300">Privacy</a>
          <a href="/terms" className="transition hover:text-green-300">Terms</a>
          <a href="https://github.com/byNolo" target="_blank" rel="noopener noreferrer" className="transition hover:text-green-300">GitHub</a>
        </div>
      </div>
    </footer>
  );
}
