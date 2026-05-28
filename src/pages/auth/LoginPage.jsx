import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { getLoginRedirectPath, login } from '../../services/authService';
import { getApiErrorMessage } from '../../utils/apiError';
import { validateLoginForm } from '../../utils/validation';

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setSubmitError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateLoginForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setSubmitError('');

    try {
      const result = await login({
        username: form.username.trim(),
        password: form.password,
      });

      navigate(getLoginRedirectPath(result.role), { replace: true });
    } catch (error) {
      setSubmitError(
        getApiErrorMessage(error, 'Invalid credentials. Please check your username and password.')
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex w-full flex-col justify-center px-4 py-12 sm:px-6 lg:w-1/2 lg:px-16 xl:px-24">
        <div className="mx-auto w-full max-w-md">
          <Link to="/" className="mb-8 inline-flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
              <Shield className="h-5 w-5" />
            </span>
            <span className="text-lg font-bold text-gray-900">InsureHub</span>
          </Link>

          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Welcome back</h1>
          <p className="mt-2 text-sm text-gray-500">Sign in to manage your policies and claims.</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
            <Input
              label="Username"
              name="username"
              type="text"
              autoComplete="username"
              placeholder="huylam6"
              value={form.username}
              onChange={handleChange}
              error={errors.username}
            />
            <Input
              label="Password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              error={errors.password}
            />

            <div className="flex items-center justify-between gap-4">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                Remember me
              </label>
              <a href="#forgot" className="text-sm font-medium text-blue-600 hover:text-blue-700">
                Forgot password?
              </a>
            </div>

            {submitError && (
              <p className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
                {submitError}
              </p>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Signing in...' : 'Login'}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-700">
              Register
            </Link>
          </p>
        </div>
      </div>

      <aside className="relative hidden overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 lg:flex lg:w-1/2 lg:flex-col lg:justify-center lg:px-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.15),_transparent_50%)]" />
        <div className="relative max-w-lg">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-200">
            Insurance made simple
          </p>
          <h2 className="mt-4 text-3xl font-bold text-white xl:text-4xl">
            Protect what matters most with confidence
          </h2>
          <p className="mt-4 text-blue-100">
            Access your contracts, submit claims, and receive real-time updates — all from
            one secure customer portal.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-blue-50">
            <li>• 24/7 claim tracking</li>
            <li>• Encrypted payments</li>
            <li>• Instant policy documents</li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
