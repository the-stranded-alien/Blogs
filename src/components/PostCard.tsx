import { Link } from 'react-router-dom';
import {
  type Post,
  CATEGORY_COLORS,
  ACCENT_BORDER,
  ACCENT_HOVER_TEXT,
  ACCENT_TEXT,
  ACCENT_FEATURED_STYLES,
} from '../data/posts';

interface PostCardProps {
  post: Post;
  featured?: boolean;
}

function ExternalIcon() {
  return (
    <svg
      className="w-3.5 h-3.5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
      />
    </svg>
  );
}

export default function PostCard({ post, featured = false }: PostCardProps) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const accentBorder = ACCENT_BORDER[post.accentColor];
  const accentHoverText = ACCENT_HOVER_TEXT[post.accentColor];
  const accentText = ACCENT_TEXT[post.accentColor];

  const isWip = post.status === 'in-progress';

  if (featured) {
    const { bg, border, hoverBorder } = ACCENT_FEATURED_STYLES[post.accentColor];

    const inner = (
      <>
        <div className={`absolute inset-y-0 left-0 w-1 rounded-l-2xl ${accentBorder} bg-current opacity-60`} />
        <div className="flex items-center gap-2 mb-4 pl-1">
          <span className={`text-xs font-semibold uppercase tracking-widest ${accentText}`}>
            Featured
          </span>
          {isWip && (
            <>
              <span className="text-slate-300 dark:text-slate-600">·</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
                In Progress
              </span>
            </>
          )}
          <span className="text-slate-300 dark:text-slate-600">·</span>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${CATEGORY_COLORS[post.category]}`}
          >
            {post.category}
          </span>
        </div>
        {post.series && (
          <div className="pl-1 mb-2">
            <span className="text-xs text-slate-400 dark:text-slate-500">
              {post.series}{post.part !== undefined ? ` · Part ${post.part}` : ''}
            </span>
          </div>
        )}
        <h2
          className={`text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3 pl-1 transition-colors leading-snug ${accentHoverText}`}
        >
          {post.title}
          {post.externalUrl && (
            <ExternalIcon />
          )}
        </h2>
        <p className="pl-1 text-slate-600 dark:text-slate-400 leading-relaxed mb-5 line-clamp-2">
          {post.excerpt}
        </p>
        <div className="pl-1 flex items-center gap-3 text-sm text-slate-500 dark:text-slate-500">
          <time>{formattedDate}</time>
          <span>·</span>
          <span className="inline-flex items-center gap-1">
            <ClockIcon />
            {post.readingTime} min
          </span>
        </div>
      </>
    );

    const cardClass = `group relative block border ${border} ${hoverBorder} ${bg} rounded-2xl p-6 sm:p-8 transition-all hover:shadow-lg overflow-hidden`;

    if (post.externalUrl) {
      return (
        <a href={post.externalUrl} target="_blank" rel="noopener noreferrer" className={cardClass}>
          {inner}
        </a>
      );
    }

    return (
      <Link to={`/blog/${post.slug}`} className={cardClass}>
        {inner}
      </Link>
    );
  }

  // Regular card
  const cardClass = `group relative block bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md transition-all`;

  const inner = (
    <>
      {/* Accent left strip */}
      <div className={`absolute inset-y-0 left-0 w-1 ${accentBorder} bg-current`} />
      <div className="pl-4 pr-5 py-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${CATEGORY_COLORS[post.category]}`}
            >
              {post.category}
            </span>
            {isWip && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
                In Progress
              </span>
            )}
          </div>
          <span className="inline-flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
            <ClockIcon />
            {post.readingTime} min
          </span>
        </div>
        {post.series && (
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-1.5">
            {post.series}{post.part !== undefined ? ` · Part ${post.part}` : ''}
          </p>
        )}
        <h3
          className={`font-semibold text-slate-900 dark:text-white mb-2 transition-colors leading-snug line-clamp-2 ${accentHoverText}`}
        >
          {post.title}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4 leading-relaxed">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <time className="text-xs text-slate-400 dark:text-slate-500">
            {formattedDate}
          </time>
          {post.externalUrl ? (
            <span className={`flex items-center gap-1 text-xs font-medium ${accentText}`}>
              Read article <ExternalIcon />
            </span>
          ) : (
            <span className={`text-xs font-medium group-hover:underline ${accentText}`}>
              Read more →
            </span>
          )}
        </div>
      </div>
    </>
  );

  if (post.externalUrl) {
    return (
      <a href={post.externalUrl} target="_blank" rel="noopener noreferrer" className={cardClass}>
        {inner}
      </a>
    );
  }

  return (
    <Link to={`/blog/${post.slug}`} className={cardClass}>
      {inner}
    </Link>
  );
}

function ClockIcon() {
  return (
    <svg
      className="w-3 h-3"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <circle cx={12} cy={12} r={9} />
      <path strokeLinecap="round" d="M12 7v5l3 3" />
    </svg>
  );
}
