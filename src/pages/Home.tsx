import { Link } from 'react-router-dom';
import { getFeaturedPosts, getRecentPosts, CATEGORIES } from '../data/posts';
import PostCard from '../components/PostCard';

export default function Home() {
  const featured = getFeaturedPosts();
  const recent = getRecentPosts(6);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-16">
      {/* Hero */}
      <section className="text-center space-y-5 pt-4">
        <div className="inline-flex items-center gap-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-full text-sm font-medium">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
          Writing about things I find interesting
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white leading-tight">
          Thoughts on{' '}
          <span className="text-indigo-500">engineering</span>,{' '}
          <span className="text-violet-500">design</span>
          {' '}& more
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
          A personal blog by Sahil Gupta. I write about software engineering,
          technology, design, and the occasional life reflection.
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <Link
            to="/blog"
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium text-sm transition-colors shadow-sm"
          >
            Read the blog
          </Link>
          <Link
            to="/about"
            className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-medium text-sm transition-colors"
          >
            About me
          </Link>
        </div>
      </section>

      {/* Featured posts */}
      {featured.length > 0 && (
        <section className="space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Featured
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {featured.map((post) => (
              <PostCard key={post.id} post={post} featured />
            ))}
          </div>
        </section>
      )}

      {/* Browse by category */}
      <section className="space-y-5">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Browse by topic
        </h2>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              to={`/blog?category=${cat}`}
              className="px-4 py-2 rounded-xl text-sm font-medium bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>

      {/* Recent posts */}
      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Recent posts
          </h2>
          <Link
            to="/blog"
            className="text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
          >
            View all →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recent.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
