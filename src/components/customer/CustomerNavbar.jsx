import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, Shield, X } from 'lucide-react';
import UserAuthActions from './UserAuthActions';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Insurance Plans', to: '/#plans' },
  { label: 'Claims', to: '/#claims' },
  { label: 'About', to: '/#about' },
  { label: 'Contact', to: '/#contact' },
];

export default function CustomerNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200/80 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-600/25">
            <Shield className="h-5 w-5" aria-hidden />
          </span>
          <span className="text-lg font-bold text-gray-900">InsureHub</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive && link.to === '/'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <UserAuthActions className="hidden sm:flex" />

        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-xl border border-gray-200 p-2 text-gray-600 md:hidden"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-gray-100 bg-white px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <UserAuthActions
            className="mt-4 flex-col sm:flex-row"
            onNavigate={() => setMobileOpen(false)}
          />
        </div>
      )}
    </header>
  );
}
