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
    <div className="py-12 space-y-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold font-serif text-ink-900 dark:text-parchment-100 tracking-tight">
          Blog
        </h1>
        <p className="text-ink-400 dark:text-ink-500">
          {allVisible.length} posts on engineering, design, and life.
        </p>
      </div>

      {searchQuery && (
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm
                        bg-amber-50 dark:bg-amber-950/30
                        border border-amber-200 dark:border-amber-800/50">
          <span className="text-amber-900 dark:text-amber-200">
            Showing results for <strong>"{searchQuery}"</strong> — {filtered.length} found
          </span>
          <button onClick={clearSearch}
            className="ml-auto text-amber-700 dark:text-amber-400 hover:underline">
            Clear
          </button>
        </div>
      )}

      {/* Category pills */}
      <div className="flex flex-wrap gap-2">
        {([null, ...CATEGORIES] as (Category | null)[]).map((cat) => (
          <button
            key={cat ?? '__all'}
            onClick={() => setCategory(cat === selectedCategory ? null : cat)}
            className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors
              border ${
              (cat === null && !selectedCategory) || cat === selectedCategory
                ? 'bg-ink-900 text-parchment-100 border-ink-900 dark:bg-parchment-100 dark:text-ink-900 dark:border-parchment-100'
                : 'bg-parchment-50 text-ink-600 border-parchment-300 hover:bg-parchment-200 dark:bg-ink-900 dark:text-ink-300 dark:border-ink-700 dark:hover:bg-ink-800'
            }`}
          >
            {cat ?? 'All'}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="grid sm:grid-cols-2 gap-4">
          {filtered.map((post) => <PostCard key={post.slug} post={post} />)}
        </div>
      ) : (
        <div className="text-center py-20 space-y-3">
          <p className="text-4xl">📖</p>
          <p className="font-medium text-ink-600 dark:text-ink-300">No posts found</p>
          <p className="text-sm text-ink-400 dark:text-ink-500">Try a different category or search term.</p>
          <Link to="/blog" className="inline-block mt-2 text-amber-700 dark:text-amber-400 hover:underline text-sm">
            Clear all filters
          </Link>
        </div>
      )}
    </div>
  );
}
