import { Link } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 mt-auto">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-slate-500 dark:text-slate-500">
          © {year} Sahil Gupta. All rights reserved.
        </div>
        <nav className="flex items-center gap-4 text-sm">
          <Link
            to="/"
            className="text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Home
          </Link>
          <Link
            to="/blog"
            className="text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Blog
          </Link>
          <Link
            to="/about"
            className="text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            About
          </Link>
          <a
            href="https://github.com/sahilgupta"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  );
}
