import { useParams, Link, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokaiSublime } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import {
  getPostBySlug,
  getVisiblePosts,
  getSeriesPosts,
  CATEGORY_COLORS,
} from '../data/posts';
import PostCard from '../components/PostCard';
import { useTheme } from '../context/ThemeContext';

/* ── Reading progress — antique gold ribbon ───────────────────── */
function ReadingProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const scrollable = scrollHeight - clientHeight;
      setPct(scrollable > 0 ? Math.min(100, (scrollTop / scrollable) * 100) : 0);
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[200]">
      <div
        className="h-full transition-[width] duration-75 ease-out"
        style={{
          width: `${pct}%`,
          background: 'linear-gradient(to right, #8C6E2A, #C4A04A, #D4B460, #C4A04A)',
          boxShadow: '0 0 8px rgba(196, 160, 74, 0.5)',
        }}
      />
    </div>
  );
}

/* ── Code block with editor chrome ───────────────────────────── */
function CodeBlock({ language, children }: { language: string; children: string }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isSepia = theme === 'sepia';
  const [copied, setCopied] = useState(false);

  const copy = () => {
    void navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-8 rounded-xl overflow-hidden
                    border border-ink-700 dark:border-ink-800
                    shadow-[0_4px_20px_rgba(0,0,0,0.15)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
      {/* Editor toolbar */}
      <div className="flex items-center justify-between px-4 py-2.5
                      bg-ink-800 dark:bg-ink-900
                      border-b border-ink-700 dark:border-ink-800">
        {/* macOS traffic lights */}
        <div className="flex items-center gap-[6px]">
          <span className="w-[11px] h-[11px] rounded-full bg-[#FF5F56]" />
          <span className="w-[11px] h-[11px] rounded-full bg-[#FFBD2E]" />
          <span className="w-[11px] h-[11px] rounded-full bg-[#27C93F]" />
        </div>
        {/* Language label */}
        <span className="text-[0.65rem] font-mono font-medium tracking-widest uppercase
                         text-ink-400 dark:text-ink-500">
          {language || 'code'}
        </span>
        {/* Copy button */}
        <button
          onClick={copy}
          className="text-[0.65rem] font-medium tracking-wide uppercase
                     text-ink-400 hover:text-ink-200 dark:text-ink-500 dark:hover:text-ink-300
                     transition-colors"
        >
          {copied ? '✓ copied' : 'copy'}
        </button>
      </div>

      {/* Syntax highlighted body */}
      <SyntaxHighlighter
        language={language || 'text'}
        style={isDark ? monokaiSublime : atomOneLight}
        customStyle={{
          margin: 0,
          borderRadius: 0,
          padding: '1.25rem 1.5rem',
          fontSize: '0.84rem',
          lineHeight: '1.7',
          background: isDark ? '#111009' : isSepia ? '#E8DFCB' : '#F8F6F1',
        }}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────────── */
export default function Post() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  useEffect(() => {
    if (post?.externalUrl) window.location.replace(post.externalUrl);
  }, [post]);

  if (!post) return <Navigate to="/blog" replace />;
  if (post.externalUrl) return null;

  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  const formattedUpdated = post.updatedAt
    ? new Date(post.updatedAt).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
      })
    : null;

  const isWip = post.status === 'in-progress';

  const seriesPosts = post.series ? getSeriesPosts(post.series) : [];
  const seriesIndex = seriesPosts.findIndex((p) => p.slug === post.slug);
  const prevInSeries = seriesIndex > 0 ? seriesPosts[seriesIndex - 1] : null;
  const nextInSeries =
    seriesIndex < seriesPosts.length - 1 ? seriesPosts[seriesIndex + 1] : null;

  const related = getVisiblePosts()
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 2);

  return (
    <>
      <ReadingProgress />

      <div className="py-12">
        {/* ── Reading column ─────────────────────────────────────── */}
        <div>

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-ink-400 dark:text-ink-400 mb-10">
            <Link to="/" className="hover:text-ink-800 dark:hover:text-ink-100 transition-colors">Home</Link>
            <span className="text-parchment-400 dark:text-ink-600">/</span>
            <Link to="/blog" className="hover:text-ink-800 dark:hover:text-ink-100 transition-colors">Blog</Link>
            <span className="text-parchment-400 dark:text-ink-600">/</span>
            <span className="text-ink-600 dark:text-ink-300 truncate max-w-[200px]">{post.title}</span>
          </nav>

          {/* WIP banner */}
          {isWip && (
            <div className="mb-10 flex items-start gap-3 px-4 py-3.5
                            bg-amber-50  dark:bg-amber-950/30
                            border border-amber-200 dark:border-amber-800/60
                            rounded-xl text-sm">
              <span className="text-amber-600 mt-0.5 shrink-0">⚠</span>
              <div>
                <p className="font-medium text-amber-900 dark:text-amber-200">Work in progress</p>
                <p className="text-amber-700 dark:text-amber-400 mt-0.5">
                  This post is still being written. Content may be incomplete or change.
                </p>
              </div>
            </div>
          )}

          <article>
            {/* ── Header ──────────────────────────────────────── */}
            <header className="mb-10">
              {/* Badges */}
              <div className="flex items-center gap-2 flex-wrap mb-5">
                <Link
                  to={`/blog?category=${post.category}`}
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${CATEGORY_COLORS[post.category]}`}
                >
                  {post.category}
                </Link>
                {isWip && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
                    In Progress
                  </span>
                )}
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2 py-0.5 rounded-full text-xs
                               bg-parchment-200 dark:bg-ink-800
                               text-ink-500 dark:text-ink-300
                               border border-parchment-300 dark:border-ink-700"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {post.series && (
                <p className="text-sm text-ink-400 dark:text-ink-400 mb-3 font-sans italic">
                  {post.series}{post.part !== undefined ? ` · Part ${post.part}` : ''}
                </p>
              )}

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl font-bold font-serif
                             text-ink-900 dark:text-parchment-100
                             leading-tight tracking-tight mb-5">
                {post.title}
              </h1>

              {/* Excerpt — italic lead paragraph */}
              <p className="text-lg leading-relaxed italic font-serif
                            text-ink-500 dark:text-ink-300 mb-7">
                {post.excerpt}
              </p>

              {/* Byline */}
              <div className="flex items-center gap-3 py-5
                              border-y border-parchment-300 dark:border-ink-800">
                <div className="w-9 h-9 rounded-full shrink-0 flex items-center justify-center
                                bg-gradient-to-br from-amber-400 to-orange-500
                                text-white font-bold text-sm font-serif">
                  S
                </div>
                <div>
                  <p className="text-sm font-medium text-ink-800 dark:text-ink-100">Sahil Gupta</p>
                  <div className="flex items-center gap-2 text-xs text-ink-400 dark:text-ink-400">
                    <time>{formattedDate}</time>
                    {formattedUpdated && (
                      <>
                        <span>·</span>
                        <span>Updated {formattedUpdated}</span>
                      </>
                    )}
                    <span>·</span>
                    <span>{post.readingTime} min read</span>
                  </div>
                </div>
              </div>
            </header>

            {/* ── Body ─────────────────────────────────────────── */}
            <div className="prose-blog">
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkBreaks]}
                components={{
                  code({ className, children }) {
                    const match = /language-(\w+)/.exec(className || '');
                    const raw = String(children).replace(/\n$/, '');
                    if (match) {
                      return <CodeBlock language={match[1]}>{raw}</CodeBlock>;
                    }
                    return <code className={className}>{children}</code>;
                  },
                  // Prevent SyntaxHighlighter's own <pre> from being double-wrapped
                  pre({ children }) {
                    return <>{children}</>;
                  },
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>

            {/* Tags */}
            <div className="mt-12 pt-6 border-t border-parchment-300 dark:border-ink-800">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[0.65rem] font-semibold uppercase tracking-[0.12em]
                                 text-ink-400 dark:text-ink-500 mr-1">Tags</span>
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    to={`/blog?search=${encodeURIComponent(tag)}`}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs
                               bg-parchment-200 hover:bg-parchment-300
                               dark:bg-ink-800 dark:hover:bg-ink-700
                               text-ink-600 dark:text-ink-300
                               border border-parchment-300 dark:border-ink-700
                               transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* Series navigation */}
            {seriesPosts.length > 1 && (
              <div className="mt-8 p-4 rounded-xl space-y-3
                              bg-parchment-50 dark:bg-ink-900
                              border border-parchment-300 dark:border-ink-800">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em]
                               text-ink-400 dark:text-ink-500">
                  {post.series}
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  {prevInSeries && (
                    <Link
                      to={`/blog/${prevInSeries.slug}`}
                      className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg text-sm
                                 bg-white dark:bg-ink-800
                                 border border-parchment-300 dark:border-ink-700
                                 hover:border-parchment-400 dark:hover:border-ink-600
                                 transition-colors"
                    >
                      <span className="text-ink-400">←</span>
                      <span className="text-ink-700 dark:text-ink-200 line-clamp-1 font-serif">
                        {prevInSeries.title}
                      </span>
                    </Link>
                  )}
                  {nextInSeries && (
                    <Link
                      to={`/blog/${nextInSeries.slug}`}
                      className="flex-1 flex items-center justify-end gap-2 px-3 py-2 rounded-lg text-sm
                                 bg-white dark:bg-ink-800
                                 border border-parchment-300 dark:border-ink-700
                                 hover:border-parchment-400 dark:hover:border-ink-600
                                 transition-colors"
                    >
                      <span className="text-ink-700 dark:text-ink-200 line-clamp-1 font-serif">
                        {nextInSeries.title}
                      </span>
                      <span className="text-ink-400">→</span>
                    </Link>
                  )}
                </div>
              </div>
            )}

            {/* Back + copy */}
            <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link
                to="/blog"
                className="flex items-center gap-1.5 text-sm
                           text-ink-400 hover:text-ink-800
                           dark:text-ink-400 dark:hover:text-ink-100
                           transition-colors"
              >
                ← Back to blog
              </Link>
              <button
                onClick={() => { void navigator.clipboard.writeText(window.location.href); }}
                className="flex items-center gap-1.5 text-sm
                           text-ink-400 hover:text-ink-800
                           dark:text-ink-400 dark:hover:text-ink-100
                           transition-colors"
              >
                <LinkIcon />
                Copy link
              </button>
            </div>
          </article>
        </div>

        {/* ── Related posts — full page width ──────────────────── */}
        {related.length > 0 && (
          <section className="mt-16 pt-10 border-t border-parchment-300 dark:border-ink-800 space-y-5">
            <h2 className="text-[0.65rem] font-semibold uppercase tracking-[0.12em]
                           text-ink-400 dark:text-ink-500">
              More in {post.category}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {related.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}

function LinkIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 0 0-5.656 0l-4 4a4 4 0 1 0 5.656 5.656l1.102-1.101m-.758-4.899a4 4 0 0 0 5.656 0l4-4a4 4 0 0 0-5.656-5.656l-1.1 1.1" />
    </svg>
  );
}
