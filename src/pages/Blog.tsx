import { useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { posts, CATEGORIES, type Category } from '../data/posts';
import PostCard from '../components/PostCard';

export default function Blog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category') as Category | null;
  const searchQuery = searchParams.get('search') ?? '';

  const filtered = useMemo(() => {
    let result = [...posts].sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.category.toLowerCase().includes(q)
      );
    }
    return result;
  }, [selectedCategory, searchQuery]);

  const setCategory = (cat: Category | null) => {
    const params = new URLSearchParams(searchParams);
    if (cat) {
      params.set('category', cat);
    } else {
      params.delete('category');
    }
    setSearchParams(params);
  };

  const clearSearch = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('search');
    setSearchParams(params);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Blog
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          {posts.length} posts on engineering, design, and life.
        </p>
      </div>

      {/* Active search banner */}
      {searchQuery && (
        <div className="flex items-center gap-2 px-4 py-2.5 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl text-sm">
          <span className="text-amber-800 dark:text-amber-200">
            Showing results for{' '}
            <strong>"{searchQuery}"</strong> — {filtered.length} found
          </span>
          <button
            onClick={clearSearch}
            className="ml-auto text-amber-600 dark:text-amber-400 hover:underline"
          >
            Clear
          </button>
        </div>
      )}

      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setCategory(null)}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            !selectedCategory
              ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700'
          }`}
        >
          All
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat === selectedCategory ? null : cat)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === cat
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Posts grid */}
      {filtered.length > 0 ? (
        <div className="grid sm:grid-cols-2 gap-4">
          {filtered.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 space-y-3">
          <p className="text-4xl">🔍</p>
          <p className="text-slate-600 dark:text-slate-400 font-medium">
            No posts found
          </p>
          <p className="text-sm text-slate-400 dark:text-slate-500">
            Try a different category or search term.
          </p>
          <Link
            to="/blog"
            className="inline-block mt-2 text-indigo-500 hover:underline text-sm"
          >
            Clear all filters
          </Link>
        </div>
      )}
    </div>
  );
}
