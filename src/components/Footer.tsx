import { Link } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-parchment-300 dark:border-ink-800 mt-auto">
      <div className="w-[80%] mx-auto py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm italic font-serif text-ink-400 dark:text-ink-500">
          © {year} Sahil Gupta
        </p>
        <nav className="flex items-center gap-5 text-sm">
          {(['/', '/blog', '/about'] as const).map((href) => {
            const label = href === '/' ? 'Home' : href === '/blog' ? 'Blog' : 'About';
            return (
              <Link key={href} to={href}
                className="text-ink-400 hover:text-ink-800 dark:text-ink-500 dark:hover:text-ink-100 transition-colors">
                {label}
              </Link>
            );
          })}
          <a href="https://github.com/sahilgupta" target="_blank" rel="noopener noreferrer"
            className="text-ink-400 hover:text-ink-800 dark:text-ink-500 dark:hover:text-ink-100 transition-colors">
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  );
}
