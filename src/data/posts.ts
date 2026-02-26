export type Category =
  | 'Technology'
  | 'Engineering'
  | 'Design'
  | 'Career'
  | 'Life'
  | 'Tutorial';

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: Category;
  tags: string[];
  publishedAt: string;
  readingTime: number; // minutes
  coverImage?: string;
  featured?: boolean;
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

export const posts: Post[] = [
  {
    id: '1',
    title: 'Building Scalable Systems: Lessons from the Trenches',
    slug: 'building-scalable-systems',
    excerpt:
      'After years of building systems that serve millions of users, here are the most important lessons I\'ve learned about scalability, reliability, and making the right trade-offs.',
    category: 'Engineering',
    tags: ['architecture', 'scalability', 'distributed systems'],
    publishedAt: '2026-02-20',
    readingTime: 8,
    featured: true,
    content: `# Building Scalable Systems: Lessons from the Trenches

After years of building systems that serve millions of users, I've accumulated a set of hard-won lessons about what actually matters when it comes to scalability.

## Start with the Problem, Not the Solution

One of the biggest mistakes engineers make is jumping straight to a microservices architecture or a distributed database before they even understand the actual scale requirements.

> Premature optimization is the root of all evil — Donald Knuth

Before you split a monolith into 47 microservices, ask yourself: **what problem are you actually solving?**

## The CAP Theorem Is Not Just Theory

Every distributed system engineer needs to internalize the CAP theorem:

- **Consistency** — every read receives the most recent write
- **Availability** — every request receives a response
- **Partition tolerance** — the system works despite network failures

You can only have two. In practice, since network partitions *will* happen, you're really choosing between consistency and availability.

## Database Design Matters More Than You Think

Most performance problems I've encountered trace back to the database layer:

1. Missing indexes on commonly queried columns
2. N+1 query problems hidden behind ORMs
3. Storing everything in a single table and calling it a database
4. Not understanding read vs. write patterns

\`\`\`sql
-- A query that kills databases at scale
SELECT * FROM orders
JOIN users ON orders.user_id = users.id
WHERE users.signup_date > '2024-01-01';

-- Add an index!
CREATE INDEX idx_users_signup_date ON users(signup_date);
\`\`\`

## Cache Strategically, Not Lazily

Caching is powerful but introduces complexity. Here's a simple mental model:

- Cache things that are **read often** and **change rarely**
- Don't cache things that need to be **strongly consistent**
- Always plan for **cache invalidation** before you cache anything

## Observability Is Non-Negotiable

You cannot improve what you cannot measure. Invest in:

- **Metrics** (Prometheus, Datadog)
- **Distributed tracing** (Jaeger, Tempo)
- **Structured logging** (centralized, searchable)

When production goes down at 3 AM, you'll thank yourself for the observability investment.

## Final Thoughts

Scalability is mostly about making the right trade-offs at the right time. Don't over-engineer early, but don't leave yourself painted into a corner either. The best architecture is the simplest one that solves your current needs while leaving room to grow.`,
  },
  {
    id: '2',
    title: 'Why I Switched to TypeScript and Never Looked Back',
    slug: 'switching-to-typescript',
    excerpt:
      'TypeScript has fundamentally changed how I write JavaScript. Here\'s an honest look at the migration experience and why the trade-offs are worth it.',
    category: 'Technology',
    tags: ['typescript', 'javascript', 'developer experience'],
    publishedAt: '2026-02-10',
    readingTime: 6,
    featured: true,
    content: `# Why I Switched to TypeScript and Never Looked Back

I resisted TypeScript for years. "Just adds boilerplate," I'd say. "JavaScript is fine." Reader, I was wrong.

## The Breaking Point

It was a Friday afternoon production incident. A function was receiving \`null\` when it expected a string, and the error was deep in a call chain with no obvious origin. Three hours of debugging later, I had the fix — and I had a newfound appreciation for type safety.

## What TypeScript Actually Gives You

### Catch Errors Before Runtime

\`\`\`typescript
// JavaScript — this crashes at runtime
function greet(user) {
  return \`Hello, \${user.name.toUpperCase()}\`;
}

greet(null); // TypeError: Cannot read properties of null

// TypeScript — caught at compile time
function greet(user: { name: string }) {
  return \`Hello, \${user.name.toUpperCase()}\`;
}

greet(null); // Error: Argument of type 'null' is not assignable
\`\`\`

### Incredible IDE Support

With TypeScript, your IDE knows the shape of every object. Autocomplete becomes actually useful. Refactoring is safer. You spend less time reading documentation because the types *are* documentation.

### Self-Documenting Code

\`\`\`typescript
// What does this function do?
function processOrder(id, opts) { ... }

// Now you know exactly what to pass
function processOrder(
  id: string,
  opts: {
    priority: 'low' | 'normal' | 'high';
    notifyUser?: boolean;
  }
): Promise<Order> { ... }
\`\`\`

## The Migration Path

You don't have to migrate everything at once. TypeScript's \`allowJs\` option lets you add it incrementally:

1. Add TypeScript to your project
2. Rename files one at a time from \`.js\` to \`.ts\`
3. Fix type errors as you go
4. Enable stricter settings over time

## Addressing the "Boilerplate" Concern

Yes, TypeScript has more ceremony. But:

- The time saved in debugging pays it back 10x
- Type inference means you write fewer type annotations than you think
- \`strict\` mode catches real bugs, not imaginary ones

## Conclusion

If you're still on the fence, start with one small module. You'll notice the difference immediately.`,
  },
  {
    id: '3',
    title: 'Design Systems: The Investment That Keeps Paying Off',
    slug: 'design-systems-investment',
    excerpt:
      'Building a design system feels like a big upfront cost. Here\'s why it\'s one of the highest ROI investments a product team can make.',
    category: 'Design',
    tags: ['design system', 'ui', 'component library', 'product'],
    publishedAt: '2026-01-28',
    readingTime: 5,
    content: `# Design Systems: The Investment That Keeps Paying Off

Every fast-moving product team eventually hits the same wall: inconsistency. Buttons look different on every page. The color palette has twelve shades of blue. Every developer builds their own modal from scratch.

A design system is the solution — and it's one of the best investments a product team can make.

## What Is a Design System?

A design system is more than a component library. It's a shared language between design and engineering that includes:

- **Design tokens** — colors, spacing, typography, shadows
- **Components** — buttons, inputs, cards, modals
- **Patterns** — how components compose into larger UIs
- **Documentation** — why things are built the way they are

## The ROI Calculation

Think about what happens without a design system:

- Every new feature starts from scratch
- Inconsistencies multiply as the team grows
- Design reviews become "make this match that"
- Accessibility is an afterthought

With a design system:

- New features ship faster (components already exist)
- Consistency is the default, not the exception
- Accessibility is baked in
- Design and engineering speak the same language

## Starting Small Is Fine

You don't need to build Figma's entire design system on day one. Start with:

1. **Tokens first** — define your colors, spacing, and type scale
2. **High-frequency components** — button, input, link, card
3. **Document as you go** — a component without docs might as well not exist

## The Human Side

The technical side is the easy part. The hard part is adoption. Some things that help:

- Get buy-in from both design and engineering leadership
- Make it easy to contribute back
- Celebrate when teams use the system
- Deprecate old patterns (don't just add new ones)

## Conclusion

A design system is infrastructure for your UI. Like any good infrastructure, it feels invisible when it's working well — and everyone notices when it's not.`,
  },
  {
    id: '4',
    title: 'Getting Started with React Query: A Practical Guide',
    slug: 'getting-started-react-query',
    excerpt:
      'React Query transforms how you manage server state in React apps. This practical guide walks through the core concepts with real examples.',
    category: 'Tutorial',
    tags: ['react', 'react-query', 'state management', 'typescript'],
    publishedAt: '2026-01-15',
    readingTime: 10,
    content: `# Getting Started with React Query: A Practical Guide

Managing server state in React used to mean a mess of \`useEffect\` hooks, loading booleans, and stale data. React Query (now TanStack Query) changed everything.

## Why React Query?

React Query handles:

- **Caching** — data is cached and reused across components
- **Background refetching** — data stays fresh automatically
- **Loading & error states** — first-class support built in
- **Pagination & infinite scroll** — patterns for common data scenarios
- **Optimistic updates** — update UI before server confirms

## Installation

\`\`\`bash
npm install @tanstack/react-query
\`\`\`

## Setup

Wrap your app with \`QueryClientProvider\`:

\`\`\`tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}
\`\`\`

## Your First Query

\`\`\`tsx
import { useQuery } from '@tanstack/react-query';

interface Post {
  id: number;
  title: string;
  body: string;
}

async function fetchPosts(): Promise<Post[]> {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}

function PostList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {data?.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
\`\`\`

## Mutations

For creating, updating, or deleting data:

\`\`\`tsx
import { useMutation, useQueryClient } from '@tanstack/react-query';

function CreatePost() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newPost: { title: string; body: string }) =>
      fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify(newPost),
      }).then((r) => r.json()),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  return (
    <button onClick={() => mutation.mutate({ title: 'Hello', body: 'World' })}>
      {mutation.isPending ? 'Creating...' : 'Create Post'}
    </button>
  );
}
\`\`\`

## Stale Time and Cache Time

Two important config options:

- **staleTime** — how long data is considered fresh (default: 0)
- **gcTime** — how long inactive data stays in cache (default: 5 min)

\`\`\`tsx
useQuery({
  queryKey: ['user', userId],
  queryFn: () => fetchUser(userId),
  staleTime: 5 * 60 * 1000, // 5 minutes
})
\`\`\`

## Next Steps

- Explore **parallel queries** with \`useQueries\`
- Look into **infinite queries** for pagination
- Use **React Query DevTools** for debugging

React Query is one of those libraries that makes you wonder how you ever lived without it.`,
  },
  {
    id: '5',
    title: 'Five Career Lessons I Wish I Had Learned Earlier',
    slug: 'career-lessons',
    excerpt:
      'A decade into my software engineering career, here are the five lessons that would have accelerated my growth if I\'d understood them on day one.',
    category: 'Career',
    tags: ['career', 'growth', 'engineering', 'soft skills'],
    publishedAt: '2025-12-20',
    readingTime: 7,
    content: `# Five Career Lessons I Wish I Had Learned Earlier

Ten years in, I look back at my career and see a few pivotal insights that would have accelerated my trajectory if I'd understood them from the start.

## 1. Technical Skills Get You In the Room; Soft Skills Keep You There

Early in my career, I obsessed over technical depth. But the engineers I saw advancing fastest weren't just technically excellent — they were excellent communicators who could make complex ideas simple, build consensus, and lead without authority.

The ability to explain a technical decision to a non-technical stakeholder is worth as much as the technical decision itself.

## 2. Visibility Matters (Unfairly, But Truly)

If your best work happens in a vacuum, it might as well not exist. I spent years doing excellent work that nobody knew about, then wondering why I wasn't being recognized.

Some ways to build visibility:
- Write internal documentation that helps your team
- Volunteer to present at team meetings
- Proactively share updates on projects you own
- Write blog posts (like this one!)

## 3. Your Manager Is a Multiplier

A great manager amplifies your impact. A poor manager limits it. I spent too long at jobs with ineffective managers hoping things would change.

The relationship with your manager is a professional one that requires active investment. Have explicit conversations about what success looks like, what feedback you want, and where you want to grow.

## 4. Optimize for Learning Over Compensation (Early On)

In the first five years of your career, the most valuable thing is compounding experience. A role that pays 15% less but teaches you 3x more will pay dividends for decades.

After you've built strong foundations, compensation matters a lot more and your leverage to negotiate increases significantly.

## 5. Compound Interest Applies to Careers

Small, consistent improvements compound dramatically over time. Writing for 30 minutes per day. Reading one technical book per month. Doing one side project per quarter.

The engineers who are 10x more effective in year 10 than year 1 aren't naturally gifted — they compounded small investments over a long time.

## A Note on Patience

None of this is fast. Careers are long. The best investment you can make is in your own growth, your professional relationships, and your reputation for doing excellent work.`,
  },
  {
    id: '6',
    title: 'Finding Stillness in a World That Rewards Busyness',
    slug: 'finding-stillness',
    excerpt:
      'We live in a culture that celebrates busyness. Here\'s what I\'ve learned about the counterintuitive practice of doing less to achieve more.',
    category: 'Life',
    tags: ['mindfulness', 'productivity', 'wellbeing', 'focus'],
    publishedAt: '2025-12-05',
    readingTime: 4,
    content: `# Finding Stillness in a World That Rewards Busyness

We wear our busyness like a badge of honor. "I'm slammed," we say with a mixture of stress and pride. Full calendars feel productive. Empty time feels wasted.

But I've come to believe this is exactly backwards.

## The Myth of Busyness

Busyness is easy. Anyone can fill a day with meetings, messages, and minor tasks. The hard thing — the thing that actually requires discipline — is protecting time for deep, meaningful work.

Cal Newport calls this "deep work": the ability to focus without distraction on cognitively demanding tasks. It's increasingly rare, and increasingly valuable.

## What I Actually Do

A few practices that have helped me:

**Morning pages** — 20 minutes of unfiltered writing before checking any screens. It empties the mental inbox and surfaces what actually matters.

**Single-tasking** — one window, one task, one hour. Notifications off. No music with lyrics. The quality of focus is different from what I thought was focus.

**Walking without podcasts** — just walking. Thoughts arrive that don't arrive anywhere else.

**Weekly review** — every Sunday, a 30-minute review of what happened and what matters next week. Prevents drift.

## On Saying No

The most powerful career and life skill I've developed is saying no to things that don't align with my priorities. Every yes is a no to something else — usually the thing you actually wanted to do.

## The Paradox

The deepest irony is that I get more done — meaningful things, not just tasks — when I'm less busy. The work I'm most proud of came from periods of protected, focused time, not from my busiest stretches.

Stillness isn't the absence of productivity. It's the foundation of it.`,
  },
];

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getPostsByCategory(category: Category): Post[] {
  return posts.filter((p) => p.category === category);
}

export function getFeaturedPosts(): Post[] {
  return posts.filter((p) => p.featured);
}

export function getRecentPosts(count = 4): Post[] {
  return [...posts]
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .slice(0, count);
}
