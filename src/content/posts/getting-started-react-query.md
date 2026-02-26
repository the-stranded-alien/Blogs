# Getting Started with React Query: A Practical Guide

Managing server state in React used to mean a mess of `useEffect` hooks, loading booleans, and stale data. React Query (now TanStack Query) changed everything.

## Why React Query?

React Query handles:

- **Caching** — data is cached and reused across components
- **Background refetching** — data stays fresh automatically
- **Loading & error states** — first-class support built in
- **Pagination & infinite scroll** — patterns for common data scenarios
- **Optimistic updates** — update UI before server confirms

## Installation

```bash
npm install @tanstack/react-query
```

## Setup

Wrap your app with `QueryClientProvider`:

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}
```

## Your First Query

```tsx
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
```

## Mutations

For creating, updating, or deleting data:

```tsx
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
```

## Stale Time and Cache Time

Two important config options:

- **staleTime** — how long data is considered fresh (default: 0)
- **gcTime** — how long inactive data stays in cache (default: 5 min)

```tsx
useQuery({
  queryKey: ['user', userId],
  queryFn: () => fetchUser(userId),
  staleTime: 5 * 60 * 1000, // 5 minutes
})
```

## Next Steps

- Explore **parallel queries** with `useQueries`
- Look into **infinite queries** for pagination
- Use **React Query DevTools** for debugging

React Query is one of those libraries that makes you wonder how you ever lived without it.
