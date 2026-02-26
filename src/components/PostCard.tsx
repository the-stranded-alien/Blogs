import { Link } from 'react-router-dom';
import { type Post, CATEGORY_COLORS } from '../data/posts';

interface PostCardProps {
  post: Post;
  featured?: boolean;
}

export default function PostCard({ post, featured = false }: PostCardProps) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  if (featured) {
    return (
      <Link
        to={`/blog/${post.slug}`}
        className="group block bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-950/30 dark:to-violet-950/30 border border-indigo-100 dark:border-indigo-900/50 rounded-2xl p-6 sm:p-8 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all hover:shadow-lg hover:shadow-indigo-100 dark:hover:shadow-indigo-950/50"
      >
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-indigo-500 dark:text-indigo-400">
            Featured
          </span>
          <span className="text-slate-300 dark:text-slate-600">·</span>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${CATEGORY_COLORS[post.category]}`}
          >
            {post.category}
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug">
          {post.title}
        </h2>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-5 line-clamp-2">
          {post.excerpt}
        </p>
        <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-500">
          <time>{formattedDate}</time>
          <span>·</span>
          <span>{post.readingTime} min read</span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group block bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-md transition-all"
    >
      <div className="flex items-center justify-between mb-3">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${CATEGORY_COLORS[post.category]}`}
        >
          {post.category}
        </span>
        <span className="text-xs text-slate-400 dark:text-slate-500">
          {post.readingTime} min read
        </span>
      </div>
      <h3 className="font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug line-clamp-2">
        {post.title}
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4 leading-relaxed">
        {post.excerpt}
      </p>
      <div className="flex items-center justify-between">
        <time className="text-xs text-slate-400 dark:text-slate-500">
          {formattedDate}
        </time>
        <span className="text-xs font-medium text-indigo-500 dark:text-indigo-400 group-hover:underline">
          Read more →
        </span>
      </div>
    </Link>
  );
}
