import { Navigate, Route, Routes } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import CustomerLayout from '../layouts/CustomerLayout';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import Dashboard from '../pages/admin/Dashboard';
import PlaceholderPage from '../pages/admin/PlaceholderPage';
import HomePage from '../pages/public/HomePage';
import ProtectedRoute from './ProtectedRoute';

const ADMIN_ROLES = ['ADMIN', 'MANAGER', 'STAFF'];

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<CustomerLayout />}>
        <Route index element={<HomePage />} />
      </Route>

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={ADMIN_ROLES}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route
          path="policies"
          element={
            <PlaceholderPage
              title="Policies"
              description="Manage insurance policies, coverage tiers, and renewals."
            />
          }
        />
        <Route
          path="contracts"
          element={
            <PlaceholderPage
              title="Contracts"
              description="Track active contracts, terms, and binding agreements."
            />
          }
        />
        <Route
          path="claims"
          element={
            <PlaceholderPage
              title="Claims"
              description="Process claims through the full workflow lifecycle."
            />
          }
        />
        <Route
          path="payments"
          element={
            <PlaceholderPage
              title="Payments"
              description="Review approved payouts and payment reconciliation."
            />
          }
        />
        <Route
          path="notifications"
          element={
            <PlaceholderPage
              title="Notifications"
              description="System alerts, user messages, and delivery status."
            />
          }
        />
        <Route
          path="audit-logs"
          element={
            <PlaceholderPage
              title="Audit Logs"
              description="Immutable activity trail for compliance and security."
            />
          }
        />
        <Route
          path="users"
          element={
            <PlaceholderPage
              title="Users"
              description="Administer roles, permissions, and team access."
            />
          }
        />
        <Route
          path="settings"
          element={
            <PlaceholderPage
              title="Settings"
              description="Configure system preferences and integrations."
            />
          }
        />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
