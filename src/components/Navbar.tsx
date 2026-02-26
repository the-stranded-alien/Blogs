import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen]   = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/blog', label: 'Blog' },
    { to: '/about', label: 'About' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/blog?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-50
                       bg-parchment-100/90 dark:bg-ink-950/90
                       backdrop-blur-md
                       border-b border-parchment-300 dark:border-ink-800
                       shadow-[0_1px_12px_rgba(0,0,0,0.06)] dark:shadow-[0_1px_12px_rgba(0,0,0,0.5)]">
      <nav className="w-[80%] mx-auto h-16 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link to="/" className="font-bold text-xl font-serif text-ink-900 dark:text-parchment-100 tracking-tight shrink-0">
          sahil<span className="text-amber-600 dark:text-amber-500">.</span>blog
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-1">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-ink-900 text-parchment-100 dark:bg-parchment-100 dark:text-ink-900'
                    : 'text-ink-600 hover:text-ink-900 hover:bg-parchment-200 dark:text-ink-300 dark:hover:text-ink-50 dark:hover:bg-ink-800'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {searchOpen ? (
            <form onSubmit={handleSearch} className="flex items-center gap-2">
              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search posts…"
                className="w-40 sm:w-52 px-3 py-1.5 text-sm rounded-lg
                           bg-parchment-200 dark:bg-ink-800
                           border border-parchment-300 dark:border-ink-700
                           outline-none focus:ring-2 focus:ring-amber-500/50
                           text-ink-900 dark:text-ink-50
                           placeholder-ink-400 dark:placeholder-ink-500"
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="p-1.5 rounded-lg text-ink-400 hover:text-ink-700 dark:hover:text-ink-200"
                aria-label="Close search"
              >
                <XIcon />
              </button>
            </form>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-lg text-ink-400 hover:text-ink-700 hover:bg-parchment-200 dark:text-ink-400 dark:hover:text-ink-100 dark:hover:bg-ink-800 transition-colors"
              aria-label="Search"
            >
              <SearchIcon />
            </button>
          )}

          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-ink-400 hover:text-ink-700 hover:bg-parchment-200 dark:text-ink-400 dark:hover:text-ink-100 dark:hover:bg-ink-800 transition-colors"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
          </button>

          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="sm:hidden p-2 rounded-lg text-ink-400 hover:text-ink-700 hover:bg-parchment-200 dark:text-ink-400 dark:hover:text-ink-100 dark:hover:bg-ink-800 transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden border-t border-parchment-300 dark:border-ink-800
                        bg-parchment-100 dark:bg-ink-950 px-[10%] py-3 space-y-1">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `block px-3.5 py-2 rounded-full text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-ink-900 text-parchment-100 dark:bg-parchment-100 dark:text-ink-900'
                    : 'text-ink-600 hover:text-ink-900 hover:bg-parchment-200 dark:text-ink-300 dark:hover:text-ink-50 dark:hover:bg-ink-800'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}

function SearchIcon() {
  return (
    <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0Z" />
    </svg>
  );
}
function MoonIcon() {
  return (
    <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
    </svg>
  );
}
function SunIcon() {
  return (
    <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <circle cx={12} cy={12} r={4} />
      <path strokeLinecap="round" d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  );
}
function MenuIcon() {
  return (
    <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}
function XIcon() {
  return (
    <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  );
}
