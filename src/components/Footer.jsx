export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-300 dark:border-gray-800 py-6 text-center text-sm transition-colors duration-300">
      <p>&copy; {new Date().getFullYear()} byNolo. All rights reserved.</p>
    </footer>
  );
}
