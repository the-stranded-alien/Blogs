import { useParams, Link, Navigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import { getPostBySlug, posts, CATEGORY_COLORS } from '../data/posts';
import PostCard from '../components/PostCard';

export default function Post() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) return <Navigate to="/blog" replace />;

  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const related = posts
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, 2);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
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
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
              >
                #{tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white leading-tight">
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
              navigator.clipboard.writeText(window.location.href);
            }}
            className="flex items-center gap-1.5 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
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
              <PostCard key={p.id} post={p} />
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
