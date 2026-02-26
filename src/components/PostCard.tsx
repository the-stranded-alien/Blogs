import { Link } from 'react-router-dom';
import {
  type Post,
  CATEGORY_COLORS,
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
  const date = new Date(post.publishedAt);
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  });
  const shortDate = date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });

  const accentHoverText = ACCENT_HOVER_TEXT[post.accentColor];
  const accentText      = ACCENT_TEXT[post.accentColor];
  const isWip = post.status === 'in-progress';

  /* ── Featured card ──────────────────────────────────────────── */
  if (featured) {
    const { bg, border, hoverBorder } = ACCENT_FEATURED_STYLES[post.accentColor];

    const inner = (
      <>
        {/* Top accent stripe */}
        <div className={`h-[5px] w-full ${accentText} bg-current`} />

        <div className="px-7 sm:px-9 pt-7 pb-8">
          {/* Meta row */}
          <div className="flex items-center gap-2 flex-wrap mb-5">
            <span className={`text-[0.62rem] font-bold uppercase tracking-[0.2em] ${accentText}`}>
              ◆ Featured
            </span>
            <span className="text-parchment-300 dark:text-ink-700 text-xs">|</span>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${CATEGORY_COLORS[post.category]}`}>
              {post.category}
            </span>
            {isWip && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
                In Progress
              </span>
            )}
          </div>

          {post.series && (
            <p className="mb-3 text-xs italic font-serif text-ink-400 dark:text-ink-500">
              {post.series}{post.part !== undefined ? ` · Part ${post.part}` : ''}
            </p>
          )}

          <h2 className={`text-2xl sm:text-3xl font-bold font-serif leading-tight mb-4
                          text-ink-900 dark:text-parchment-100 ${accentHoverText}
                          transition-colors`}>
            {post.title}
          </h2>

          {/* Decorative rule */}
          <div className={`w-10 h-0.5 mb-5 ${accentText} bg-current opacity-50`} />

          <p className="text-base leading-relaxed line-clamp-3 text-ink-500 dark:text-ink-300 mb-6">
            {post.excerpt}
          </p>

          <div className="flex items-center gap-3 text-xs text-ink-400 dark:text-ink-500">
            <time>{formattedDate}</time>
            <span>·</span>
            <span className="inline-flex items-center gap-1">
              <ClockIcon />{post.readingTime} min read
            </span>
            <span className={`ml-auto text-sm font-medium ${accentText} flex items-center gap-1`}>
              {post.externalUrl ? <>Read article <ExternalIcon /></> : 'Read more →'}
            </span>
          </div>
        </div>
      </>
    );

    const cls = `group relative block border ${border} ${hoverBorder} ${bg}
                 rounded-2xl overflow-hidden transition-all duration-300
                 shadow-[0_4px_20px_rgba(0,0,0,0.07)]
                 hover:shadow-[0_12px_40px_rgba(0,0,0,0.14)] hover:-translate-y-1
                 dark:shadow-none dark:hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)]`;

    return post.externalUrl
      ? <a href={post.externalUrl} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
      : <Link to={`/blog/${post.slug}`} className={cls}>{inner}</Link>;
  }

  /* ── Regular card ───────────────────────────────────────────── */
  const cls = `group relative block overflow-hidden rounded-xl transition-all duration-300
               bg-parchment-50 dark:bg-ink-900
               border border-parchment-300 dark:border-ink-800
               hover:border-parchment-400 dark:hover:border-ink-700/80
               shadow-[0_2px_8px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.12)]
               hover:-translate-y-1
               dark:shadow-none dark:hover:shadow-[0_10px_30px_rgba(0,0,0,0.5),inset_0_0_0_1px_rgba(255,255,255,0.04)]`;

  const inner = (
    <>
      {/* Top accent stripe */}
      <div className={`h-[3px] w-full ${accentText} bg-current`} />

      <div className="p-5 pt-4">
        {/* Top row: category + date */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 flex-wrap min-w-0">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium shrink-0 ${CATEGORY_COLORS[post.category]}`}>
              {post.category}
            </span>
            {isWip && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 shrink-0">
                In Progress
              </span>
            )}
          </div>
          <time className="text-[0.68rem] font-mono text-ink-400 dark:text-ink-600 shrink-0 tabular-nums">
            {shortDate}
          </time>
        </div>

        {post.series && (
          <p className="text-xs italic font-serif text-ink-400 dark:text-ink-500 mb-1.5">
            {post.series}{post.part !== undefined ? ` · Part ${post.part}` : ''}
          </p>
        )}

        <h3 className={`font-bold font-serif text-[1.05rem] mb-2.5 leading-snug line-clamp-2
                        transition-colors text-ink-900 dark:text-parchment-100 ${accentHoverText}`}>
          {post.title}
        </h3>

        <p className="text-sm leading-relaxed line-clamp-3 text-ink-500 dark:text-ink-400 mb-5">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between border-t border-parchment-200 dark:border-ink-800 pt-3.5">
          <span className="inline-flex items-center gap-1 text-xs text-ink-400 dark:text-ink-500">
            <ClockIcon />{post.readingTime} min read
          </span>
          {post.externalUrl
            ? <span className={`flex items-center gap-1 text-xs font-semibold ${accentText}`}>
                Read article <ExternalIcon />
              </span>
            : <span className={`text-xs font-semibold ${accentText} group-hover:underline underline-offset-2`}>
                Read more →
              </span>
          }
        </div>
      </div>
    </>
  );

  return post.externalUrl
    ? <a href={post.externalUrl} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
    : <Link to={`/blog/${post.slug}`} className={cls}>{inner}</Link>;
}
