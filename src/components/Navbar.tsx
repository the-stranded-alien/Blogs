import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useTheme, type Theme } from '../context/ThemeContext';

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen]     = useState(false);
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
                       bg-parchment-50/95 dark:bg-ink-950/95
                       backdrop-blur-md
                       shadow-[0_1px_0_rgba(0,0,0,0.08),0_4px_16px_rgba(0,0,0,0.04)]
                       dark:shadow-[0_1px_0_rgba(255,255,255,0.04),0_4px_20px_rgba(0,0,0,0.6)]">
      {/* Gold hairline at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px]"
           style={{ background: 'linear-gradient(to right, transparent, rgba(196,160,74,0.5) 20%, rgba(196,160,74,0.5) 80%, transparent)' }} />

      <nav className="w-[80%] mx-auto h-16 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-xl font-serif text-ink-900 dark:text-parchment-100 tracking-tight shrink-0 group">
          <svg width="34" height="34" viewBox="0 0 32 32" aria-hidden="true" className="shrink-0 transition-colors">
            <rect width="32" height="32" rx="6" className="fill-ink-800 dark:fill-ink-600"/>
            <rect x="1" y="1" width="30" height="30" rx="5.5" fill="none" stroke="#C4A04A" strokeWidth="1.4" opacity="0.85"/>
            <text
              x="16" y="16"
              textAnchor="middle"
              dominantBaseline="central"
              fill="#C4A04A"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 700, fontSize: '13px', letterSpacing: '-0.5px' }}
            >SG</text>
          </svg>
          <span>sahil<span className="text-[#C4A04A] group-hover:text-amber-500 transition-colors">.</span>blog</span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden sm:flex items-center gap-0.5">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `relative px-4 py-1.5 text-sm font-medium transition-colors rounded-lg ${
                  isActive
                    ? 'text-ink-900 dark:text-parchment-100 bg-parchment-200/80 dark:bg-ink-800'
                    : 'text-ink-500 dark:text-ink-400 hover:text-ink-900 dark:hover:text-ink-100 hover:bg-parchment-100 dark:hover:bg-ink-900'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-[#C4A04A]" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">

          {/* Search */}
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
                           outline-none focus:ring-2 focus:ring-amber-500/40
                           text-ink-900 dark:text-ink-50
                           placeholder-ink-400 dark:placeholder-ink-500"
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="p-1.5 rounded-lg text-ink-400 hover:text-ink-700 dark:hover:text-ink-200 transition-colors"
                aria-label="Close search"
              >
                <XIcon />
              </button>
            </form>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-lg text-ink-400 hover:text-ink-700 hover:bg-parchment-200
                         dark:text-ink-400 dark:hover:text-ink-100 dark:hover:bg-ink-800
                         transition-colors"
              aria-label="Search"
            >
              <SearchIcon />
            </button>
          )}

          {/* Three-way theme switch */}
          <ThemeSwitch theme={theme} setTheme={setTheme} />

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="sm:hidden p-2 rounded-lg text-ink-400 hover:text-ink-700 hover:bg-parchment-200
                       dark:text-ink-400 dark:hover:text-ink-100 dark:hover:bg-ink-800
                       transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden bg-parchment-50 dark:bg-ink-950 px-[10%] py-3 space-y-0.5
                        border-t border-parchment-200 dark:border-ink-800">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-ink-900 dark:text-parchment-100 bg-parchment-200 dark:bg-ink-800'
                    : 'text-ink-500 dark:text-ink-400 hover:text-ink-900 dark:hover:text-ink-100 hover:bg-parchment-100 dark:hover:bg-ink-900'
                }`
              }
            >
              {label}
            </NavLink>
          ))}

          {/* Mobile theme switch */}
          <div className="pt-3 pb-1 flex items-center gap-2">
            <span className="text-[0.62rem] font-bold uppercase tracking-widest text-ink-400 dark:text-ink-600">
              Theme
            </span>
            <ThemeSwitch theme={theme} setTheme={setTheme} />
          </div>
        </div>
      )}
    </header>
  );
}

/* ── Three-way segmented theme switch ────────────────────────────── */
function ThemeSwitch({ theme, setTheme }: { theme: Theme; setTheme: (t: Theme) => void }) {
  const options: { mode: Theme; icon: React.ReactNode; label: string }[] = [
    { mode: 'light', icon: <SunIcon />,  label: 'Light' },
    { mode: 'sepia', icon: <BookIcon />, label: 'Sepia' },
    { mode: 'dark',  icon: <MoonIcon />, label: 'Dark'  },
  ];

  return (
    <div className="flex items-center rounded-lg overflow-hidden
                    border border-parchment-300 dark:border-ink-700
                    bg-parchment-100 dark:bg-ink-900"
         role="group"
         aria-label="Theme">
      {options.map(({ mode, icon, label }, i) => {
        const isActive = theme === mode;
        return (
          <button
            key={mode}
            onClick={() => setTheme(mode)}
            title={`${label} mode`}
            aria-pressed={isActive}
            className={[
              'p-2 transition-all duration-200',
              i > 0 && 'border-l border-parchment-300 dark:border-ink-700',
              isActive
                ? 'bg-ink-900 dark:bg-parchment-100 text-parchment-50 dark:text-ink-900'
                : 'text-ink-400 dark:text-ink-500 hover:text-ink-700 dark:hover:text-ink-200 hover:bg-parchment-200 dark:hover:bg-ink-800',
            ].filter(Boolean).join(' ')}
          >
            {icon}
          </button>
        );
      })}
    </div>
  );
}

/* ── Icons ──────────────────────────────────────────────────────── */
function SearchIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0Z" />
    </svg>
  );
}
function SunIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <circle cx={12} cy={12} r={4} />
      <path strokeLinecap="round" d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  );
}
function BookIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
    </svg>
  );
}
function MoonIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
    </svg>
  );
}
function MenuIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}
function XIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  );
}
