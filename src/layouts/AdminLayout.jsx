import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';

const PAGE_TITLES = {
  '/admin': 'Dashboard',
  '/admin/policies': 'Policies',
  '/admin/contracts': 'Contracts',
  '/admin/claims': 'Claims',
  '/admin/payments': 'Payments',
  '/admin/notifications': 'Notifications',
  '/admin/audit-logs': 'Audit Logs',
  '/admin/users': 'Users',
  '/admin/settings': 'Settings',
};

function getPageTitle(pathname) {
  return PAGE_TITLES[pathname] || 'Dashboard';
}

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { pathname } = useLocation();
  const pageTitle = getPageTitle(pathname);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:pl-72">
        <Header title={pageTitle} onMenuClick={() => setSidebarOpen(true)} />

        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
