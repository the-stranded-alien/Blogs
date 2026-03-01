import { Link } from 'react-router-dom';
import { getFeaturedPosts, getRecentPosts, CATEGORIES } from '../data/posts';
import PostCard from '../components/PostCard';

export default function Home() {
  const featured = getFeaturedPosts();
  const recent   = getRecentPosts(6);

  return (
    <div className="py-10 space-y-20">

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative">
        {/* Editorial masthead line — full width */}
        <div className="flex items-center gap-4 mb-10">
          <span className="text-[0.58rem] font-mono font-bold uppercase tracking-[0.28em] text-ink-400 dark:text-ink-600 shrink-0">
            Est. 2026
          </span>
          <span className="flex-1 h-px bg-parchment-300 dark:bg-ink-800" />
          <span className="text-[0.58rem] font-mono font-bold uppercase tracking-[0.28em] text-ink-400 dark:text-ink-600 shrink-0">
            Vol. I
          </span>
        </div>

        {/* Large headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold font-serif
                       text-ink-900 dark:text-parchment-100
                       leading-[1.05] tracking-tight mb-8">
          Engineering,{' '}
          <span className="italic text-ink-400 dark:text-ink-500">design,</span>
          <br />
          <span className="italic text-ink-400 dark:text-ink-500">&amp; everything</span>
          <br />
          between.
        </h1>

        {/* Gold ornamental divider */}
        <div className="flex items-center gap-3 mb-8">
          <span className="h-px w-12 bg-[#C4A04A]" />
          <span className="text-[#C4A04A] text-base select-none animate-float">✦</span>
          <span className="h-px w-12 bg-[#C4A04A]" />
        </div>

        <p className="text-lg text-ink-500 dark:text-ink-300 max-w-xl leading-relaxed mb-8">
          A personal blog by Sahil Gupta — software engineering, technology,
          design, and the occasional life reflection.
        </p>

        <div className="flex items-center gap-3">
          <Link to="/blog"
            className="px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-200
                       bg-ink-900 hover:bg-ink-800 hover:shadow-lg
                       dark:bg-parchment-100 dark:hover:bg-parchment-200
                       text-parchment-100 dark:text-ink-900">
            Read the blog
          </Link>
          <Link to="/about"
            className="px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-200
                       border border-parchment-300 dark:border-ink-700
                       hover:border-parchment-400 dark:hover:border-ink-600
                       hover:bg-parchment-100 dark:hover:bg-ink-800
                       text-ink-700 dark:text-ink-300">
            About me
          </Link>
        </div>
      </section>

      {/* ── Featured ─────────────────────────────────────────────── */}
      {featured.length > 0 && (
        <section className="space-y-6">
          <SectionLabel>Featured</SectionLabel>
          <div className="grid sm:grid-cols-2 gap-5">
            {featured.map((post) => <PostCard key={post.slug} post={post} featured />)}
          </div>
        </section>
      )}

      {/* ── Topics ───────────────────────────────────────────────── */}
      <section className="space-y-5">
        <SectionLabel>Browse by topic</SectionLabel>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {CATEGORIES.map((cat) => (
            <Link key={cat} to={`/blog?category=${cat}`}
              className="group flex items-center justify-between px-4 py-3 rounded-xl
                         bg-parchment-100 dark:bg-ink-900
                         border border-parchment-300 dark:border-ink-800
                         hover:border-parchment-400 dark:hover:border-ink-700
                         transition-all duration-200 hover:-translate-y-0.5
                         shadow-[0_1px_4px_rgba(0,0,0,0.04)]
                         hover:shadow-[0_6px_16px_rgba(0,0,0,0.08)]
                         dark:shadow-none">
              <span className="text-sm font-medium text-ink-700 dark:text-ink-300
                               group-hover:text-ink-900 dark:group-hover:text-ink-100 transition-colors">
                {cat}
              </span>
              <span className="text-ink-400 dark:text-ink-600 text-sm
                               group-hover:translate-x-0.5 transition-transform">
                →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Recent posts ─────────────────────────────────────────── */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-ink-400 dark:text-ink-600">
            Recent posts
          </span>
          <span className="flex-1 h-px bg-parchment-300 dark:bg-ink-800" />
          <Link to="/blog"
            className="text-xs font-medium text-ink-400 dark:text-ink-500
                       hover:text-ink-800 dark:hover:text-ink-100 transition-colors shrink-0">
            View all →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {recent.map((post) => <PostCard key={post.slug} post={post} />)}
        </div>
      </section>

    </div>
  );
}


function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-ink-400 dark:text-ink-600 shrink-0">
        {children}
      </span>
      <span className="flex-1 h-px bg-parchment-300 dark:bg-ink-800" />
    </div>
  );
}
