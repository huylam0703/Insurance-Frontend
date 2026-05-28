import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import Button from '../ui/Button';
import { logout } from '../../services/authService';
import { getAccessToken, getUserRole } from '../../utils/token';

export default function UserAuthActions({ onNavigate, className = '' }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const token = getAccessToken();
  const role = getUserRole();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      onNavigate?.();
      navigate('/login', { replace: true });
    } catch {
      navigate('/login', { replace: true });
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <Link to="/login" onClick={onNavigate}>
          <Button variant="ghost" size="sm">
            Login
          </Button>
        </Link>
        <Link to="/register" onClick={onNavigate}>
          <Button size="sm">Register</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {role && (
        <span className="hidden rounded-lg bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600 sm:inline">
          {role}
        </span>
      )}
      <Button
        variant="secondary"
        size="sm"
        onClick={handleLogout}
        disabled={loading}
        className="gap-1.5"
      >
        <LogOut className="h-4 w-4" />
        {loading ? 'Logging out...' : 'Logout'}
      </Button>
    </div>
  );
}
