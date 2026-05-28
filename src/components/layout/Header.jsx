import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, LogOut, Menu, Search } from 'lucide-react';
import { logout } from '../../services/authService';
import { currentUser } from '../../utils/mockData';

export default function Header({ title, onMenuClick }) {
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await logout();
    } finally {
      navigate('/login', { replace: true });
      setLoggingOut(false);
    }
  };

  return (
    <header className="sticky top-0 z-30 border-b border-gray-200/80 bg-white/90 backdrop-blur-md">
      <div className="flex h-16 items-center gap-3 px-4 sm:gap-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={onMenuClick}
          className="inline-flex items-center justify-center rounded-xl border border-gray-200 p-2 text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900 lg:hidden"
          aria-label="Open sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="min-w-0 flex-1">
          <h1 className="truncate text-lg font-semibold text-gray-900 sm:text-xl">
            {title}
          </h1>
        </div>

        <div>
          <label htmlFor="global-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
              aria-hidden
            />
            <input
              id="global-search"
              type="search"
              placeholder="Search policies, claims, users..."
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-400 transition-colors focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            className="relative rounded-xl border border-gray-200 p-2 text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900 md:hidden"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>

          <button
            type="button"
            className="relative rounded-xl border border-gray-200 p-2 text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            {currentUser.notificationCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-semibold text-white">
                {currentUser.notificationCount}
              </span>
            )}
          </button>

          <div className="hidden h-8 w-px bg-gray-200 sm:block" aria-hidden />

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="flex items-center gap-2 rounded-xl border border-gray-200 py-1.5 pl-1.5 pr-3 transition-colors hover:bg-gray-50"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 text-xs font-semibold text-white">
                {currentUser.avatarInitials}
              </span>
              <span className="hidden text-left lg:block">
                <span className="block text-sm font-medium text-gray-900">
                  {currentUser.name}
                </span>
                <span className="block text-xs text-gray-500">{currentUser.role}</span>
              </span>
            </button>

            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-60"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">
                {loggingOut ? 'Logging out...' : 'Logout'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
