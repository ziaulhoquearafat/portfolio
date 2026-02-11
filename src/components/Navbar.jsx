import { Link, useLocation } from 'react-router';
import { useTheme } from '../context/ThemeContext.jsx';

const NAV_ITEMS = [
  { label: 'Home', hash: '#home' },
  { label: 'About', hash: '#about' },
  { label: 'Skills', hash: '#skills' },
  { label: 'Projects', hash: '#projects' },
  { label: 'Education', hash: '#education' },
  { label: 'Contact', hash: '#contact' },
];

const scrollToSection = (hash) => {
  const id = hash.replace('#', '');
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

const Navbar = () => {
  const { theme, cycleTheme } = useTheme();
  const location = useLocation();

  const toggleTheme = () => {
    cycleTheme();
  };

  const buildHref = (hash) => `/${hash}`;

  const handleNavClick = (e, item) => {
    if (location.pathname === '/') {
      e.preventDefault();
      scrollToSection(item.hash);
      // Close mobile dropdown (DaisyUI: remove focus from trigger)
      document.activeElement?.blur?.();
    }
  };

  const renderNavLink = (item) => (
    <Link
      key={item.label}
      to={buildHref(item.hash)}
      onClick={(e) => handleNavClick(e, item)}
      className="px-3 py-2 text-sm font-medium rounded-btn text-base-content/80 hover:text-primary hover:bg-base-200/80 transition-colors"
    >
      {item.label}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-base-200 bg-base-100/80 backdrop-blur">
      <nav className="navbar mx-auto max-w-6xl px-4">
        {/* Left: Logo */}
        <div className="navbar-start gap-2">
          <Link
            to="/#home"
            className="btn btn-ghost px-0 text-left normal-case text-lg md:text-xl font-semibold tracking-tight text-primary"
          >
            Md Ziaul Haque Arafat
          </Link>

          {/* Mobile: Hamburger */}
          <div className="dropdown md:hidden">
            <button
              type="button"
              tabIndex={0}
              className="btn btn-ghost btn-square"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <ul
              tabIndex={0}
              className="menu dropdown-content menu-sm mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
            >
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>{renderNavLink(item)}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Center: Desktop menu */}
        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal px-1 gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>{renderNavLink(item)}</li>
            ))}
          </ul>
        </div>

        {/* Right: Theme toggle + Hire Me */}
        <div className="navbar-end gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            className="btn btn-circle btn-ghost text-lg"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '🌙' : '☀️'}
          </button>

          <a
            href="https://wa.me/8801766952640"
            target="_blank"
            rel="noreferrer"
            className="btn btn-sm btn-primary"
          >
            Hire Me
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

