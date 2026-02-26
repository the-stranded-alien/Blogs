import { useParams, Link, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import {
  getPostBySlug,
  getVisiblePosts,
  getSeriesPosts,
  CATEGORY_COLORS,
} from '../data/posts';
import PostCard from '../components/PostCard';

export default function Post() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  // Redirect external-URL posts
  useEffect(() => {
    if (post?.externalUrl) {
      window.location.replace(post.externalUrl);
    }
  }, [post]);

  if (!post) return <Navigate to="/blog" replace />;
  if (post.externalUrl) return null; // being redirected

  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formattedUpdated = post.updatedAt
    ? new Date(post.updatedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  const isWip = post.status === 'in-progress';

  // Series navigation
  const seriesPosts = post.series ? getSeriesPosts(post.series) : [];
  const seriesIndex = seriesPosts.findIndex((p) => p.slug === post.slug);
  const prevInSeries = seriesIndex > 0 ? seriesPosts[seriesIndex - 1] : null;
  const nextInSeries =
    seriesIndex < seriesPosts.length - 1 ? seriesPosts[seriesIndex + 1] : null;

  const related = getVisiblePosts()
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 2);

  return (
    <div className="w-[80%] mx-auto py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-8">
        <Link to="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link to="/blog" className="hover:text-slate-900 dark:hover:text-white transition-colors">
          Blog
        </Link>
        <span>/</span>
        <span className="text-slate-900 dark:text-white truncate max-w-[200px]">
          {post.title}
        </span>
      </nav>

      {/* WIP banner */}
      {isWip && (
        <div className="mb-8 flex items-start gap-3 px-4 py-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl text-sm">
          <span className="text-amber-500 mt-0.5 shrink-0">⚠</span>
          <div>
            <p className="font-medium text-amber-800 dark:text-amber-200">
              Work in progress
            </p>
            <p className="text-amber-700 dark:text-amber-300 mt-0.5">
              This post is still being written. Content may be incomplete or change.
            </p>
          </div>
        </div>
      )}

      <article className="max-w-2xl mx-auto">
        {/* Post header */}
        <header className="mb-10 space-y-4">
          <div className="flex items-center gap-2 flex-wrap">
            <Link
              to={`/blog?category=${post.category}`}
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${CATEGORY_COLORS[post.category]}`}
            >
              {post.category}
            </Link>
            {isWip && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
                In Progress
              </span>
            )}
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
              >
                #{tag}
              </span>
            ))}
          </div>

          {post.series && (
            <p className="text-sm text-slate-400 dark:text-slate-500">
              {post.series}{post.part !== undefined ? ` · Part ${post.part}` : ''}
            </p>
          )}

          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white leading-tight tracking-tight">
            {post.title}
          </h1>

          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            {post.excerpt}
          </p>

          <div className="flex items-center gap-3 pt-2 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
              S
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                Sahil Gupta
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
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

        {/* Post content */}
        <div className="prose-blog">
          <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Tags */}
        <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-slate-500 dark:text-slate-400 mr-1">Tags:</span>
            {post.tags.map((tag) => (
              <Link
                key={tag}
                to={`/blog?search=${encodeURIComponent(tag)}`}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>

        {/* Series navigation */}
        {seriesPosts.length > 1 && (
          <div className="mt-8 p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              {post.series}
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              {prevInSeries && (
                <Link
                  to={`/blog/${prevInSeries.slug}`}
                  className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-colors text-sm"
                >
                  <span className="text-slate-400">←</span>
                  <span className="text-slate-600 dark:text-slate-300 line-clamp-1">
                    {prevInSeries.title}
                  </span>
                </Link>
              )}
              {nextInSeries && (
                <Link
                  to={`/blog/${nextInSeries.slug}`}
                  className="flex-1 flex items-center justify-end gap-2 px-3 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-colors text-sm"
                >
                  <span className="text-slate-600 dark:text-slate-300 line-clamp-1">
                    {nextInSeries.title}
                  </span>
                  <span className="text-slate-400">→</span>
                </Link>
              )}
            </div>
          </div>
        )}

        {/* Share + back */}
        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Link
            to="/blog"
            className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            ← Back to blog
          </Link>
          <button
            onClick={() => {
              void navigator.clipboard.writeText(window.location.href);
            }}
            className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <LinkIcon />
            Copy link
          </button>
        </div>
      </article>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="mt-16 pt-10 border-t border-slate-200 dark:border-slate-800 space-y-5">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
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
  );
}

function LinkIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 0 0-5.656 0l-4 4a4 4 0 1 0 5.656 5.656l1.102-1.101m-.758-4.899a4 4 0 0 0 5.656 0l4-4a4 4 0 0 0-5.656-5.656l-1.1 1.1" />
    </svg>
  );
}
