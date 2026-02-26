import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="py-20 text-center space-y-6">
      <div className="text-7xl font-black text-slate-200 dark:text-slate-800 select-none">
        404
      </div>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Page not found
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          This page doesn't exist or was moved.
        </p>
      </div>
      <div className="flex items-center justify-center gap-3">
        <Link
          to="/"
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium transition-colors"
        >
          Go home
        </Link>
        <Link
          to="/blog"
          className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-sm font-medium transition-colors"
        >
          Browse posts
        </Link>
      </div>
    </div>
  );
}
