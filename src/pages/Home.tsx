import { Link } from 'react-router-dom';
import { getFeaturedPosts, getRecentPosts, CATEGORIES } from '../data/posts';
import PostCard from '../components/PostCard';

export default function Home() {
  const featured = getFeaturedPosts();
  const recent   = getRecentPosts(6);

  return (
    <div className="py-12 space-y-16">

      {/* Hero */}
      <section className="space-y-5 pt-4">
        <div className="inline-flex items-center gap-2
                        bg-amber-100/70 dark:bg-amber-950/40
                        text-amber-800 dark:text-amber-400
                        border border-amber-200/80 dark:border-amber-800/40
                        px-3 py-1 rounded-full text-xs font-medium tracking-wide">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
          Writing about things I find interesting
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold font-serif
                       text-ink-900 dark:text-parchment-100
                       leading-tight tracking-tight">
          Engineering, design,
          <br />
          <span className="italic text-ink-400 dark:text-ink-500">and everything between.</span>
        </h1>

        <p className="text-lg text-ink-500 dark:text-ink-300 max-w-lg leading-relaxed">
          A personal blog by Sahil Gupta — software engineering, technology,
          design, and the occasional life reflection.
        </p>

        <div className="flex items-center gap-3 pt-1">
          <Link to="/blog"
            className="px-5 py-2.5 rounded-full font-medium text-sm transition-colors
                       bg-ink-900 hover:bg-ink-800
                       dark:bg-parchment-100 dark:hover:bg-parchment-200
                       text-parchment-100 dark:text-ink-900">
            Read the blog
          </Link>
          <Link to="/about"
            className="px-5 py-2.5 rounded-full font-medium text-sm transition-colors
                       border border-parchment-300 dark:border-ink-700
                       hover:bg-parchment-200 dark:hover:bg-ink-800
                       text-ink-700 dark:text-ink-300">
            About me
          </Link>
        </div>
      </section>

      {/* Featured */}
      {featured.length > 0 && (
        <section className="space-y-5">
          <SectionLabel>Featured</SectionLabel>
          <div className="grid sm:grid-cols-2 gap-4">
            {featured.map((post) => <PostCard key={post.slug} post={post} featured />)}
          </div>
        </section>
      )}

      {/* Topics */}
      <section className="space-y-4">
        <SectionLabel>Browse by topic</SectionLabel>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <Link key={cat} to={`/blog?category=${cat}`}
              className="px-4 py-1.5 rounded-full text-sm font-medium transition-colors
                         bg-parchment-200 hover:bg-parchment-300
                         dark:bg-ink-800 dark:hover:bg-ink-700
                         text-ink-700 dark:text-ink-300
                         border border-parchment-300 dark:border-ink-700">
              {cat}
            </Link>
          ))}
        </div>
      </section>

      {/* Recent */}
      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <SectionLabel>Recent posts</SectionLabel>
          <Link to="/blog"
            className="text-sm text-ink-400 dark:text-ink-500 hover:text-ink-800 dark:hover:text-ink-100 transition-colors">
            View all →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recent.map((post) => <PostCard key={post.slug} post={post} />)}
        </div>
      </section>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-ink-400 dark:text-ink-500">
      {children}
    </h2>
  );
}
