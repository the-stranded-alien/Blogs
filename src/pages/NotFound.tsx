import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="py-20 text-center space-y-6">
      <div className="text-8xl font-black font-serif select-none text-parchment-300 dark:text-ink-800">
        404
      </div>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold font-serif text-ink-900 dark:text-parchment-100">
          Page not found
        </h1>
        <p className="text-ink-400 dark:text-ink-500">
          This page doesn't exist or was moved.
        </p>
      </div>
      <div className="flex items-center justify-center gap-3">
        <Link to="/"
          className="px-5 py-2.5 rounded-full text-sm font-medium transition-colors bg-ink-900 hover:bg-ink-800 dark:bg-parchment-100 dark:hover:bg-parchment-200 text-parchment-100 dark:text-ink-900">
          Go home
        </Link>
        <Link to="/blog"
          className="px-5 py-2.5 rounded-full text-sm font-medium transition-colors border border-parchment-300 dark:border-ink-700 hover:bg-parchment-200 dark:hover:bg-ink-800 text-ink-700 dark:text-ink-300">
          Browse posts
        </Link>
      </div>
    </div>
  );
}
