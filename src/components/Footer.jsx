export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-t border-gray-300 dark:border-gray-800 py-4 px-2 text-center text-xs transition-colors duration-300">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        <p className="text-gray-700 dark:text-gray-300">
          &copy; {new Date().getFullYear()} <span className="font-semibold text-blue-600 dark:text-blue-400">byNolo</span>. All rights reserved.
        </p>
        <div className="flex space-x-2">
          <a href="/privacy" className="hover:underline text-gray-600 dark:text-gray-400">Privacy Policy</a>
          <a href="/terms" className="hover:underline text-gray-600 dark:text-gray-400">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
