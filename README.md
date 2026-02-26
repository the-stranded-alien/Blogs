# sahil.blog

A personal blog built with React 19, Vite, Tailwind CSS v4, and React Router v7. Deployed to GitHub Pages.

## Stack

- **React 19** + **TypeScript**
- **Vite 7** — build tool
- **Tailwind CSS v4** — styling
- **React Router v7** — client-side routing
- **react-markdown** — renders blog post content written in Markdown
- **GitHub Pages** — hosting

## Development

```bash
npm install
npm run dev
```

## Adding a new blog post

Open `src/data/posts.ts` and add a new entry to the `posts` array:

```ts
{
  id: '7',
  title: 'Your Post Title',
  slug: 'your-post-slug',            // becomes the URL: /blog/your-post-slug
  excerpt: 'A short summary...',
  category: 'Engineering',           // Technology | Engineering | Design | Career | Life | Tutorial
  tags: ['tag1', 'tag2'],
  publishedAt: '2026-03-01',
  readingTime: 5,                    // estimated minutes
  featured: false,                   // show in the featured section on the homepage
  content: `# Your Post Title

Write your post content here in Markdown.

## Section

Paragraphs, **bold**, *italic*, \`code\`, code blocks, lists, tables — all supported.
`,
}
```

## Deployment

### Automatic (recommended)

Push to the `main` branch — GitHub Actions will build and deploy automatically.

> Enable GitHub Pages in your repo settings:
> **Settings → Pages → Source → GitHub Actions**

### Manual

```bash
npm run deploy
```

This runs `gh-pages -d dist` after building.

## Project structure

```
src/
  components/      # Layout, Navbar, Footer, PostCard
  context/         # ThemeContext (light/dark mode)
  data/            # posts.ts — all blog content lives here
  pages/           # Home, Blog, Post, About, NotFound
```
