import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="py-12">
      <div className="max-w-[720px] mx-auto space-y-12">

        {/* Profile */}
        <section className="flex flex-col sm:flex-row gap-6 items-start">
          <div className="w-20 h-20 rounded-2xl shrink-0 flex items-center justify-center
                          bg-gradient-to-br from-amber-400 via-orange-500 to-rose-500
                          text-white font-bold text-3xl font-serif">
            S
          </div>
          <div className="space-y-3">
            <div>
              <h1 className="text-2xl font-bold font-serif text-ink-900 dark:text-parchment-100">
                Sahil Gupta
              </h1>
              <p className="text-sm text-ink-400 dark:text-ink-400 italic font-serif">
                Software Engineer · Writer · Builder
              </p>
            </div>
            <p className="leading-relaxed text-ink-600 dark:text-ink-300">
              Hey! I'm a software engineer who loves building things and writing
              about the experience. This blog is where I share what I learn —
              from technical deep dives to lessons from my career to occasional
              musings about life.
            </p>
            <div className="flex items-center gap-4 pt-1">
              <a href="https://github.com/sahilgupta" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-ink-400 hover:text-ink-800 dark:hover:text-ink-100 transition-colors">
                <GitHubIcon /> GitHub
              </a>
              <a href="https://twitter.com/sahilgupta" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-ink-400 hover:text-ink-800 dark:hover:text-ink-100 transition-colors">
                <XIcon /> Twitter/X
              </a>
            </div>
          </div>
        </section>

        {/* Topics */}
        <section className="space-y-4">
          <SectionLabel>What I write about</SectionLabel>
          <div className="grid sm:grid-cols-2 gap-3">
            {aboutTopics.map(({ category, description }) => (
              <Link key={category} to={`/blog?category=${category}`}
                className="group block p-4 rounded-xl transition-all
                           bg-parchment-50 dark:bg-ink-900
                           border border-parchment-300 dark:border-ink-800
                           hover:border-parchment-400 dark:hover:border-ink-700
                           shadow-[0_1px_4px_rgba(44,26,14,0.05)] dark:shadow-none">
                <div className="font-medium font-serif text-sm mb-1
                                text-ink-900 dark:text-parchment-100
                                group-hover:text-amber-700 dark:group-hover:text-amber-400
                                transition-colors">
                  {category}
                </div>
                <div className="text-xs text-ink-500 dark:text-ink-400 leading-relaxed">
                  {description}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Principles */}
        <section className="space-y-4">
          <SectionLabel>How I approach writing</SectionLabel>
          <div className="space-y-3">
            {principles.map(({ title, desc }) => (
              <div key={title} className="flex gap-3">
                <span className="text-amber-500 dark:text-amber-600 mt-0.5 shrink-0">✦</span>
                <div>
                  <span className="font-semibold font-serif text-sm text-ink-900 dark:text-parchment-100">
                    {title}.{' '}
                  </span>
                  <span className="text-sm text-ink-500 dark:text-ink-400">{desc}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-2xl p-7 text-center space-y-3
                            bg-gradient-to-br from-amber-50 to-orange-50/60
                            dark:from-amber-950/25 dark:to-orange-950/20
                            border border-amber-200/70 dark:border-amber-800/30">
          <p className="font-semibold font-serif text-ink-900 dark:text-parchment-100">
            Enjoy reading?
          </p>
          <p className="text-sm text-ink-500 dark:text-ink-400">
            New posts go up every few weeks. Check back or star the repository.
          </p>
          <Link to="/blog"
            className="inline-block px-5 py-2 rounded-full text-sm font-medium transition-colors
                       bg-amber-600 hover:bg-amber-700 text-white">
            Read the blog
          </Link>
        </section>
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-ink-400 dark:text-ink-500">
      {children}
    </h2>
  );
}

const aboutTopics = [
  { category: 'Engineering', description: 'System design, architecture decisions, distributed systems, and software craft.' },
  { category: 'Technology',  description: 'Languages, frameworks, tools, and trends shaping how we build software.' },
  { category: 'Design',      description: 'UI design, design systems, and the intersection of design and engineering.' },
  { category: 'Tutorial',    description: 'Practical, code-first guides on specific tools, libraries, and techniques.' },
  { category: 'Career',      description: 'Growth, leadership, navigating the industry, and lessons from experience.' },
  { category: 'Life',        description: 'Reflections on productivity, focus, wellbeing, and life outside of work.' },
];

const principles = [
  { title: 'Honest',      desc: "I share what actually worked and what didn't — not just polished success stories." },
  { title: 'Practical',   desc: 'Real code, real examples, real trade-offs. Less theory, more application.' },
  { title: 'Concise',     desc: "I try to respect your time. If something can be said in fewer words, I aim to." },
  { title: 'Opinionated', desc: "I share my perspective, not just a survey of options. You can disagree — that's good." },
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
