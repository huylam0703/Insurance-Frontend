import { Navigate } from 'react-router-dom';
import { getAccessToken, getUserRole } from '../utils/token';

export default function ProtectedRoute({ children, allowedRoles }) {
  const token = getAccessToken();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles?.length) {
    const role = getUserRole();

    if (!role || !allowedRoles.includes(role)) {
      return <Navigate to="/" replace />;
    }
  }

  return children;
}
