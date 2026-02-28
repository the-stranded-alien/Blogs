import { Link } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/blog', label: 'Blog' },
    { to: '/about', label: 'About' },
  ];

  return (
    <footer className="mt-auto relative">
      {/* Gold gradient rule — fades in from both edges */}
      <div className="h-px" style={{
        background: 'linear-gradient(to right, transparent 0%, #C4A04A 20%, #D4B460 50%, #C4A04A 80%, transparent 100%)'
      }} />

      {/* Footer body — slightly different bg for depth */}
      <div className="bg-parchment-100/70 dark:bg-ink-900/60 backdrop-blur-sm">
        <div className="w-[80%] mx-auto pt-12 pb-10 space-y-10">

          {/* Editorial tagline */}
          <div className="text-center space-y-4">
            <p className="font-serif italic text-lg sm:text-xl text-ink-500 dark:text-ink-400 leading-relaxed">
              "Thinking out loud, one page at a time."
            </p>
            <div className="flex items-center justify-center gap-4">
              <span className="h-px w-14 bg-parchment-300 dark:bg-ink-700" />
              <span className="text-[#C4A04A] text-sm select-none animate-float">✦</span>
              <span className="h-px w-14 bg-parchment-300 dark:bg-ink-700" />
            </div>
          </div>

          {/* Nav links — centred */}
          <nav className="flex flex-wrap items-center justify-center gap-8">
            {navLinks.map(({ to, label }) => (
              <Link key={to} to={to}
                className="text-xs font-semibold uppercase tracking-[0.18em]
                           text-ink-400 dark:text-ink-500
                           hover:text-ink-900 dark:hover:text-ink-100
                           transition-colors">
                {label}
              </Link>
            ))}
            <a href="https://portfolio.guptasahil.in" target="_blank" rel="noopener noreferrer"
              className="text-xs font-semibold uppercase tracking-[0.18em]
                         text-ink-400 dark:text-ink-500
                         hover:text-ink-900 dark:hover:text-ink-100
                         transition-colors">
              Portfolio
            </a>
            <a href="https://github.com/the-stranded-alien" target="_blank" rel="noopener noreferrer"
              className="text-xs font-semibold uppercase tracking-[0.18em]
                         text-ink-400 dark:text-ink-500
                         hover:text-ink-900 dark:hover:text-ink-100
                         transition-colors">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/sahilgupta1611" target="_blank" rel="noopener noreferrer"
              className="text-xs font-semibold uppercase tracking-[0.18em]
                         text-ink-400 dark:text-ink-500
                         hover:text-ink-900 dark:hover:text-ink-100
                         transition-colors">
              LinkedIn
            </a>
          </nav>

          {/* Bottom rule + copyright */}
          <div className="pt-6 border-t border-parchment-200 dark:border-ink-800
                          flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[0.68rem] font-mono text-ink-400 dark:text-ink-600 tracking-wide">
              © {year} Sahil Gupta · All rights reserved
            </p>
            <p className="text-[0.68rem] font-mono text-ink-400 dark:text-ink-600 tracking-wide">
              Vol. I · Est. {year}
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}
