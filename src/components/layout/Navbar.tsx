import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shell } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/locations', label: 'Locations' },
  { to: '/about', label: 'About' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled || !isHome
          ? 'bg-reef-deep/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-white no-underline"
        >
          <Shell className="h-7 w-7 text-seafoam" />
          <span className="font-display text-xl font-semibold tracking-tight">
            Seaesta Studios
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                'text-sm font-medium transition-colors no-underline',
                location.pathname === link.to
                  ? 'text-coral-sand'
                  : 'text-white/80 hover:text-coral-sand'
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/locations"
            className="rounded-lg bg-baobab-coral px-5 py-2 text-sm font-semibold text-white no-underline transition-all hover:bg-baobab-coral/90 hover:shadow-lg"
          >
            Book Direct
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="text-white md:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          'overflow-hidden transition-all duration-300 md:hidden',
          isOpen ? 'max-h-80' : 'max-h-0'
        )}
      >
        <div className="space-y-1 bg-reef-deep/95 px-6 pb-6 backdrop-blur-md">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                'block rounded-lg px-4 py-3 text-sm font-medium no-underline transition-colors',
                location.pathname === link.to
                  ? 'bg-seafoam/20 text-coral-sand'
                  : 'text-white/80 hover:bg-seafoam/10 hover:text-coral-sand'
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/locations"
            className="mt-2 block rounded-lg bg-baobab-coral px-4 py-3 text-center text-sm font-semibold text-white no-underline"
          >
            Book Direct
          </Link>
        </div>
      </div>
    </header>
  );
}
