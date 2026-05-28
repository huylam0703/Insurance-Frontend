import { NavLink } from 'react-router-dom';
import {
  Bell,
  ClipboardList,
  CreditCard,
  FileSignature,
  FileText,
  LayoutDashboard,
  ScrollText,
  Settings,
  Shield,
  Users,
  X,
} from 'lucide-react';
import { APP_NAME, APP_TAGLINE, NAV_ITEMS } from '../../utils/constants';

const iconMap = {
  LayoutDashboard,
  FileText,
  FileSignature,
  ClipboardList,
  CreditCard,
  Bell,
  ScrollText,
  Users,
  Settings,
};

function NavItem({ item, onNavigate }) {
  const Icon = iconMap[item.icon] || LayoutDashboard;

  return (
    <NavLink
      to={item.path}
      end={item.end}
      onClick={onNavigate}
      className={({ isActive }) =>
        `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
          isActive
            ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/25'
            : 'text-slate-300 hover:bg-slate-800 hover:text-white'
        }`
      }
    >
      <Icon className="h-5 w-5 shrink-0 opacity-90" aria-hidden />
      <span className="truncate">{item.label}</span>
    </NavLink>
  );
}

export default function Sidebar({ isOpen, onClose }) {
  const handleNavigate = () => {
    if (window.innerWidth < 1024) onClose?.();
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-gray-900/60 backdrop-blur-sm transition-opacity lg:hidden ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-slate-900 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between gap-3 border-b border-slate-800 px-5">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/30">
              <Shield className="h-5 w-5" aria-hidden />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">{APP_NAME}</p>
              <p className="truncate text-xs text-slate-400">{APP_TAGLINE}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {NAV_ITEMS.map((item) => (
            <NavItem key={item.path} item={item} onNavigate={handleNavigate} />
          ))}
        </nav>

        <div className="border-t border-slate-800 px-5 py-4">
          <p className="text-xs font-medium text-slate-400">Enterprise Admin</p>
          <p className="mt-0.5 text-xs text-slate-500">v1.0.0 · Secure Session</p>
        </div>
      </aside>
    </>
  );
}
