import postsJson from '../content/posts.json';

export type Category =
  | 'Technology'
  | 'Engineering'
  | 'Design'
  | 'Career'
  | 'Life'
  | 'Tutorial';

export type PostStatus = 'published' | 'draft' | 'in-progress';

export type AccentColor =
  | 'indigo'
  | 'violet'
  | 'pink'
  | 'amber'
  | 'emerald'
  | 'orange'
  | 'sky';

export interface PostMeta {
  slug: string;
  title: string;
  excerpt: string;
  category: Category;
  tags: string[];
  publishedAt: string;
  updatedAt?: string;
  readingTime: number;
  featured?: boolean;
  status: PostStatus;
  accentColor: AccentColor;
  series?: string;
  part?: number;
  externalUrl?: string;
}

export interface Post extends PostMeta {
  content: string;
}

export const CATEGORIES: Category[] = [
  'Technology',
  'Engineering',
  'Design',
  'Career',
  'Life',
  'Tutorial',
];

export const CATEGORY_COLORS: Record<Category, string> = {
  Technology:
    'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  Engineering:
    'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
  Design:
    'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300',
  Career:
    'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  Life: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  Tutorial:
    'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
};

// Full Tailwind class strings — must be literals so Tailwind detects them at build time
export const ACCENT_BORDER: Record<AccentColor, string> = {
  indigo: 'border-l-indigo-500',
  violet: 'border-l-violet-500',
  pink: 'border-l-pink-500',
  amber: 'border-l-amber-500',
  emerald: 'border-l-emerald-500',
  orange: 'border-l-orange-500',
  sky: 'border-l-sky-500',
};

export const ACCENT_HOVER_TEXT: Record<AccentColor, string> = {
  indigo: 'group-hover:text-indigo-600 dark:group-hover:text-indigo-400',
  violet: 'group-hover:text-violet-600 dark:group-hover:text-violet-400',
  pink: 'group-hover:text-pink-600 dark:group-hover:text-pink-400',
  amber: 'group-hover:text-amber-600 dark:group-hover:text-amber-400',
  emerald: 'group-hover:text-emerald-600 dark:group-hover:text-emerald-400',
  orange: 'group-hover:text-orange-600 dark:group-hover:text-orange-400',
  sky: 'group-hover:text-sky-600 dark:group-hover:text-sky-400',
};

export const ACCENT_TEXT: Record<AccentColor, string> = {
  indigo: 'text-indigo-500 dark:text-indigo-400',
  violet: 'text-violet-500 dark:text-violet-400',
  pink: 'text-pink-500 dark:text-pink-400',
  amber: 'text-amber-500 dark:text-amber-400',
  emerald: 'text-emerald-500 dark:text-emerald-400',
  orange: 'text-orange-500 dark:text-orange-400',
  sky: 'text-sky-500 dark:text-sky-400',
};

export const ACCENT_FEATURED_STYLES: Record<
  AccentColor,
  { bg: string; border: string; hoverBorder: string }
> = {
  indigo: {
    bg: 'bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-950/30 dark:to-violet-950/30',
    border: 'border-indigo-100 dark:border-indigo-900/50',
    hoverBorder: 'hover:border-indigo-300 dark:hover:border-indigo-700',
  },
  violet: {
    bg: 'bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30',
    border: 'border-violet-100 dark:border-violet-900/50',
    hoverBorder: 'hover:border-violet-300 dark:hover:border-violet-700',
  },
  pink: {
    bg: 'bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950/30 dark:to-rose-950/30',
    border: 'border-pink-100 dark:border-pink-900/50',
    hoverBorder: 'hover:border-pink-300 dark:hover:border-pink-700',
  },
  amber: {
    bg: 'bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30',
    border: 'border-amber-100 dark:border-amber-900/50',
    hoverBorder: 'hover:border-amber-300 dark:hover:border-amber-700',
  },
  emerald: {
    bg: 'bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30',
    border: 'border-emerald-100 dark:border-emerald-900/50',
    hoverBorder: 'hover:border-emerald-300 dark:hover:border-emerald-700',
  },
  orange: {
    bg: 'bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30',
    border: 'border-orange-100 dark:border-orange-900/50',
    hoverBorder: 'hover:border-orange-300 dark:hover:border-orange-700',
  },
  sky: {
    bg: 'bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-950/30 dark:to-blue-950/30',
    border: 'border-sky-100 dark:border-sky-900/50',
    hoverBorder: 'hover:border-sky-300 dark:hover:border-sky-700',
  },
};

// Load markdown files eagerly via Vite's import.meta.glob
const markdownFiles = import.meta.glob('../content/posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

// Build Post objects: merge JSON metadata + loaded markdown content
export const posts: Post[] = (postsJson.posts as PostMeta[]).map((meta) => {
  const key = `../content/posts/${meta.slug}.md`;
  const content = markdownFiles[key] ?? '';
  return { ...meta, content };
});

// Only expose non-draft posts publicly
export function getVisiblePosts(): Post[] {
  return posts.filter((p) => p.status !== 'draft');
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug && p.status !== 'draft');
}

export function getPostsByCategory(category: Category): Post[] {
  return getVisiblePosts().filter((p) => p.category === category);
}

export function getFeaturedPosts(): Post[] {
  return posts.filter((p) => p.featured && p.status === 'published');
}

export function getRecentPosts(count = 4): Post[] {
  return getVisiblePosts()
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .slice(0, count);
}

export function getSeriesPosts(series: string): Post[] {
  return getVisiblePosts()
    .filter((p) => p.series === series)
    .sort((a, b) => (a.part ?? 0) - (b.part ?? 0));
}
