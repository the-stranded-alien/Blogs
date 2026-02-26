import { useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { getVisiblePosts, CATEGORIES, type Category } from '../data/posts';
import PostCard from '../components/PostCard';

export default function Blog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category') as Category | null;
  const searchQuery      = searchParams.get('search') ?? '';
  const allVisible       = getVisiblePosts();

  const filtered = useMemo(() => {
    let result = [...allVisible].sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
    if (selectedCategory) result = result.filter((p) => p.category === selectedCategory);
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
  }, [allVisible, selectedCategory, searchQuery]);

  const setCategory = (cat: Category | null) => {
    const p = new URLSearchParams(searchParams);
    cat ? p.set('category', cat) : p.delete('category');
    setSearchParams(p);
  };

  const clearSearch = () => {
    const p = new URLSearchParams(searchParams);
    p.delete('search');
    setSearchParams(p);
  };

  return (
    <div className="py-10 space-y-10">

      {/* ── Header ───────────────────────────────────────────────── */}
      <div className="pb-8 border-b border-parchment-300 dark:border-ink-800">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold font-serif
                           text-ink-900 dark:text-parchment-100 tracking-tight mb-2">
              The Archive
            </h1>
            <p className="text-ink-400 dark:text-ink-500">
              {allVisible.length} essays on engineering, design, and life.
            </p>
          </div>
          {/* Decorative post count */}
          <span className="text-6xl sm:text-8xl font-black font-serif leading-none select-none
                           text-parchment-200 dark:text-ink-800 shrink-0 tabular-nums">
            {String(allVisible.length).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* ── Search result notice ──────────────────────────────────── */}
      {searchQuery && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm
                        bg-amber-50 dark:bg-amber-950/20
                        border border-amber-200/80 dark:border-amber-800/40">
          <span className="text-amber-900 dark:text-amber-200">
            Results for <strong>"{searchQuery}"</strong> — {filtered.length} found
          </span>
          <button onClick={clearSearch}
            className="ml-auto text-xs font-medium text-amber-700 dark:text-amber-400 hover:underline">
            Clear ×
          </button>
        </div>
      )}

      {/* ── Category filter ──────────────────────────────────────── */}
      <div className="flex flex-wrap gap-2">
        {([null, ...CATEGORIES] as (Category | null)[]).map((cat) => {
          const isActive = (cat === null && !selectedCategory) || cat === selectedCategory;
          return (
            <button
              key={cat ?? '__all'}
              onClick={() => setCategory(cat === selectedCategory ? null : cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider
                transition-all duration-200 border ${
                isActive
                  ? 'bg-ink-900 text-parchment-50 border-ink-900 dark:bg-parchment-100 dark:text-ink-900 dark:border-parchment-100'
                  : 'bg-transparent text-ink-500 border-parchment-300 hover:border-parchment-400 hover:text-ink-800 dark:text-ink-400 dark:border-ink-700 dark:hover:border-ink-600 dark:hover:text-ink-100'
              }`}
            >
              {cat ?? 'All'}
            </button>
          );
        })}
      </div>

      {/* ── Post grid ────────────────────────────────────────────── */}
      {filtered.length > 0 ? (
        <div className="grid sm:grid-cols-2 gap-5">
          {filtered.map((post) => <PostCard key={post.slug} post={post} />)}
        </div>
      ) : (
        <div className="text-center py-24 space-y-3">
          <p className="text-5xl font-serif text-parchment-300 dark:text-ink-700 select-none">∅</p>
          <p className="font-semibold font-serif text-ink-600 dark:text-ink-300">No posts found</p>
          <p className="text-sm text-ink-400 dark:text-ink-500">Try a different category or search term.</p>
          <Link to="/blog" className="inline-block mt-2 text-sm font-medium text-amber-700 dark:text-amber-400 hover:underline">
            Clear all filters
          </Link>
        </div>
      )}
    </div>
  );
}
