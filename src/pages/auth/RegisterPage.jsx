import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { register } from '../../services/authService';
import { getApiErrorMessage } from '../../utils/apiError';
import { validateRegisterForm } from '../../utils/validation';

const initialForm = {
  firstName: '',
  lastName: '',
  dob: '',
  username: '',
  password: '',
  confirmPassword: '',
  email: '',
  identityNumber: '',
};

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setSubmitError('');
    setSuccessMessage('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateRegisterForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setSubmitError('');
    setSuccessMessage('');

    try {
      await register({
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        dob: form.dob,
        username: form.username.trim(),
        password: form.password,
        email: form.email.trim(),
        identityNumber: form.identityNumber.trim(),
      });

      setSuccessMessage('Account created successfully. Redirecting to login...');
      setTimeout(() => navigate('/login', { replace: true }), 1500);
    } catch (error) {
      setSubmitError(getApiErrorMessage(error, 'Registration failed. Please check your details.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto w-full max-w-lg px-4 py-12 sm:px-6">
        <Link to="/" className="mb-8 inline-flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
            <Shield className="h-5 w-5" />
          </span>
          <span className="text-lg font-bold text-gray-900">InsureHub</span>
        </Link>

        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Create your account</h1>
        <p className="mt-2 text-sm text-gray-500">
          Register to buy insurance, manage contracts, and track claims online.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4" noValidate>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              label="First name"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              error={errors.firstName}
              placeholder=""
            />
            <Input
              label="Last name"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              error={errors.lastName}
              placeholder=""
            />
          </div>

          <Input
            label="Date of birth"
            name="dob"
            type="date"
            value={form.dob}
            onChange={handleChange}
            error={errors.dob}
          />

          <Input
            label="Username"
            name="username"
            value={form.username}
            onChange={handleChange}
            error={errors.username}
            placeholder=""
            autoComplete="username"
          />

          <Input
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="you@example.com"
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              label="Password"
              name="password"
              type="password"
              autoComplete="new-password"
              value={form.password}
              onChange={handleChange}
              error={errors.password}
            />
            <Input
              label="Confirm password"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              value={form.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
            />
          </div>

          <Input
            label="Identity number"
            name="identityNumber"
            value={form.identityNumber}
            onChange={handleChange}
            error={errors.identityNumber}
            placeholder=""
          />

          {successMessage && (
            <p className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              {successMessage}
            </p>
          )}

          {submitError && (
            <p className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
              {submitError}
            </p>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Creating account...' : 'Register'}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-700">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
