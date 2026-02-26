import { Link } from 'react-router-dom';
import { getFeaturedPosts, getRecentPosts, CATEGORIES } from '../data/posts';
import PostCard from '../components/PostCard';

export default function Home() {
  const featured = getFeaturedPosts();
  const recent = getRecentPosts(6);

  return (
    <div className="w-[80%] mx-auto py-12 space-y-16">
      {/* Hero */}
      <section className="space-y-5 pt-4">
        <div className="inline-flex items-center gap-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-3 py-1 rounded-full text-xs font-medium tracking-wide">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Writing about things I find interesting
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white leading-tight tracking-tight">
          Engineering, design,
          <br />
          <span className="text-slate-400 dark:text-slate-500">and everything between.</span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-lg leading-relaxed">
          A personal blog by Sahil Gupta — software engineering, technology, design, and the
          occasional life reflection.
        </p>
        <div className="flex items-center gap-3 pt-1">
          <Link
            to="/blog"
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-700 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 rounded-full font-medium text-sm transition-colors"
          >
            Read the blog
          </Link>
          <Link
            to="/about"
            className="px-5 py-2.5 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full font-medium text-sm transition-colors"
          >
            About me
          </Link>
        </div>
      </section>

      {/* Featured posts */}
      {featured.length > 0 && (
        <section className="space-y-5">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Featured
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {featured.map((post) => (
              <PostCard key={post.slug} post={post} featured />
            ))}
          </div>
        </section>
      )}

      {/* Browse by category */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
          Browse by topic
        </h2>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              to={`/blog?category=${cat}`}
              className="px-4 py-1.5 rounded-full text-sm font-medium bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>

      {/* Recent posts */}
      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Recent posts
          </h2>
          <Link
            to="/blog"
            className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            View all →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recent.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
