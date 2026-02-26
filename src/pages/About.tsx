import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="py-12">
      <div className="space-y-12">
        {/* Profile */}
        <section className="flex flex-col sm:flex-row gap-6 items-start">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-400 via-violet-500 to-purple-600 flex items-center justify-center text-white font-bold text-3xl shrink-0">
            S
          </div>
          <div className="space-y-3">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                Sahil Gupta
              </h1>
              <p className="text-slate-500 dark:text-slate-400">
                Software Engineer · Writer · Builder
              </p>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Hey! I'm a software engineer who loves building things and writing
              about the experience. This blog is where I share what I learn —
              from technical deep dives to lessons from my career to occasional
              musings about life.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://github.com/sahilgupta"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <GitHubIcon />
                GitHub
              </a>
              <a
                href="https://twitter.com/sahilgupta"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <XIcon />
                Twitter/X
              </a>
            </div>
          </div>
        </section>

        {/* What I write about */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            What I write about
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {aboutTopics.map(({ category, description }) => (
              <Link
                key={category}
                to={`/blog?category=${category}`}
                className="block p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-indigo-300 dark:hover:border-indigo-700 transition-all group"
              >
                <div className="font-medium text-slate-900 dark:text-white text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-1">
                  {category}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {description}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Values / approach */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            How I approach writing
          </h2>
          <div className="space-y-3">
            {principles.map(({ title, desc }) => (
              <div key={title} className="flex gap-3">
                <span className="text-indigo-500 mt-0.5 shrink-0">✦</span>
                <div>
                  <span className="font-medium text-slate-900 dark:text-white text-sm">
                    {title}.{' '}
                  </span>
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {desc}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-950/30 dark:to-violet-950/30 border border-indigo-100 dark:border-indigo-900/50 rounded-2xl p-6 space-y-3 text-center">
          <p className="font-semibold text-slate-900 dark:text-white">
            Enjoy reading?
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            The best way to follow along is to star the repository or check back
            regularly. New posts go up every few weeks.
          </p>
          <Link
            to="/blog"
            className="inline-block px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium transition-colors"
          >
            Read the blog
          </Link>
        </section>
      </div>
    </div>
  );
}

const aboutTopics: { category: string; description: string }[] = [
  {
    category: 'Engineering',
    description:
      'System design, architecture decisions, distributed systems, and software craft.',
  },
  {
    category: 'Technology',
    description:
      'Languages, frameworks, tools, and trends shaping how we build software.',
  },
  {
    category: 'Design',
    description:
      'UI design, design systems, and the intersection of design and engineering.',
  },
  {
    category: 'Tutorial',
    description:
      'Practical, code-first guides on specific tools, libraries, and techniques.',
  },
  {
    category: 'Career',
    description:
      'Growth, leadership, navigating the industry, and lessons from experience.',
  },
  {
    category: 'Life',
    description:
      'Reflections on productivity, focus, wellbeing, and life outside of work.',
  },
];

const principles = [
  {
    title: 'Honest',
    desc: "I share what actually worked and what didn't — not just polished success stories.",
  },
  {
    title: 'Practical',
    desc: 'Real code, real examples, real trade-offs. Less theory, more application.',
  },
  {
    title: 'Concise',
    desc: "I try to respect your time. If something can be said in fewer words, I aim to.",
  },
  {
    title: 'Opinionated',
    desc: "I share my perspective, not just a survey of options. You can disagree — that's good.",
  },
];

function GitHubIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
