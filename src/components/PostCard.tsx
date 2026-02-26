import { Link } from 'react-router-dom';
import {
  type Post,
  CATEGORY_COLORS,
  ACCENT_BORDER,
  ACCENT_HOVER_TEXT,
  ACCENT_TEXT,
  ACCENT_FEATURED_STYLES,
} from '../data/posts';

function ExternalIcon() {
  return (
    <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <circle cx={12} cy={12} r={9} />
      <path strokeLinecap="round" d="M12 7v5l3 3" />
    </svg>
  );
}

interface PostCardProps { post: Post; featured?: boolean; }

export default function PostCard({ post, featured = false }: PostCardProps) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  });

  const accentBorder    = ACCENT_BORDER[post.accentColor];
  const accentHoverText = ACCENT_HOVER_TEXT[post.accentColor];
  const accentText      = ACCENT_TEXT[post.accentColor];
  const isWip = post.status === 'in-progress';

  /* ── Featured card ── */
  if (featured) {
    const { bg, border, hoverBorder } = ACCENT_FEATURED_STYLES[post.accentColor];
    const inner = (
      <>
        <div className={`absolute inset-y-0 left-0 w-1 rounded-l-2xl ${accentBorder} bg-current opacity-50`} />
        <div className="flex items-center gap-2 mb-4 pl-1">
          <span className={`text-xs font-semibold uppercase tracking-widest ${accentText}`}>Featured</span>
          {isWip && (
            <>
              <span className="text-parchment-400 dark:text-ink-600">·</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
                In Progress
              </span>
            </>
          )}
          <span className="text-parchment-400 dark:text-ink-600">·</span>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${CATEGORY_COLORS[post.category]}`}>
            {post.category}
          </span>
        </div>
        {post.series && (
          <p className="pl-1 mb-2 text-xs text-ink-400 dark:text-ink-500 italic font-serif">
            {post.series}{post.part !== undefined ? ` · Part ${post.part}` : ''}
          </p>
        )}
        <h2 className={`text-xl sm:text-2xl font-bold font-serif pl-1 mb-3
                        leading-snug transition-colors
                        text-ink-900 dark:text-parchment-100
                        ${accentHoverText}`}>
          {post.title}
        </h2>
        <p className="pl-1 mb-5 text-sm leading-relaxed line-clamp-2 text-ink-500 dark:text-ink-300">
          {post.excerpt}
        </p>
        <div className="pl-1 flex items-center gap-3 text-xs text-ink-400 dark:text-ink-500">
          <time>{formattedDate}</time>
          <span>·</span>
          <span className="inline-flex items-center gap-1"><ClockIcon />{post.readingTime} min</span>
        </div>
      </>
    );

    const cls = `group relative block border ${border} ${hoverBorder} ${bg}
                 rounded-2xl p-6 sm:p-8 overflow-hidden transition-all hover:shadow-lg
                 shadow-[0_2px_12px_rgba(0,0,0,0.07)] dark:shadow-none`;

    return post.externalUrl
      ? <a href={post.externalUrl} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
      : <Link to={`/blog/${post.slug}`} className={cls}>{inner}</Link>;
  }

  /* ── Regular card ── */
  const cls = `group relative block overflow-hidden rounded-xl transition-all
               bg-parchment-50 dark:bg-ink-900
               border border-parchment-300 dark:border-ink-800
               hover:border-parchment-400 dark:hover:border-ink-700
               shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.10)]
               dark:shadow-none`;

  const inner = (
    <>
      <div className={`absolute inset-y-0 left-0 w-1 ${accentBorder} bg-current`} />
      <div className="pl-4 pr-5 py-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${CATEGORY_COLORS[post.category]}`}>
              {post.category}
            </span>
            {isWip && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
                In Progress
              </span>
            )}
          </div>
          <span className="inline-flex items-center gap-1 text-xs text-ink-400 dark:text-ink-500">
            <ClockIcon />{post.readingTime} min
          </span>
        </div>

        {post.series && (
          <p className="text-xs italic font-serif text-ink-400 dark:text-ink-500 mb-1.5">
            {post.series}{post.part !== undefined ? ` · Part ${post.part}` : ''}
          </p>
        )}

        <h3 className={`font-semibold font-serif mb-2 leading-snug line-clamp-2 transition-colors
                        text-ink-900 dark:text-parchment-100 ${accentHoverText}`}>
          {post.title}
        </h3>
        <p className="text-sm leading-relaxed line-clamp-2 mb-4 text-ink-500 dark:text-ink-300">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <time className="text-xs text-ink-400 dark:text-ink-500">{formattedDate}</time>
          {post.externalUrl
            ? <span className={`flex items-center gap-1 text-xs font-medium ${accentText}`}>Read article <ExternalIcon /></span>
            : <span className={`text-xs font-medium group-hover:underline ${accentText}`}>Read more →</span>
          }
        </div>
      </div>
    </>
  );

  return post.externalUrl
    ? <a href={post.externalUrl} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
    : <Link to={`/blog/${post.slug}`} className={cls}>{inner}</Link>;
}
