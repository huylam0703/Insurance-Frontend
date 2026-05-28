import axiosClient from '../api/axiosClient';
import { parseRoleFromToken } from '../utils/jwt';
import { clearAuth, getAccessToken, setAccessToken, setUserRole } from '../utils/token';

const ADMIN_ROLES = ['ADMIN', 'MANAGER', 'STAFF'];

function extractToken(payload) {
  if (!payload) return null;

  return (
    payload.token ||
    payload.accessToken ||
    payload.access_token ||
    null
  );
}

function extractRoleFromResult(result) {
  if (!result) return null;

  if (result.role) {
    return String(result.role).replace(/^ROLE_/, '').toUpperCase();
  }

  if (Array.isArray(result.roles) && result.roles.length > 0) {
    const first = result.roles[0];
    const name = typeof first === 'string' ? first : first?.name;
    return name ? String(name).replace(/^ROLE_/, '').toUpperCase() : null;
  }

  return null;
}

function extractRoleFromUser(user) {
  if (!user?.roles || user.roles.length === 0) return null;

  const first = [...user.roles][0];
  const name = typeof first === 'string' ? first : first?.name;
  return name ? String(name).replace(/^ROLE_/, '').toUpperCase() : null;
}

export function resolveRoleFromLogin(result, token) {
  return (
    extractRoleFromResult(result) ||
    parseRoleFromToken(token) ||
    null
  );
}

export function getLoginRedirectPath(role) {
  if (role && ADMIN_ROLES.includes(role)) {
    return '/admin';
  }
  return '/';
}

/**
 * POST /auth/token
 * Body: { username, password }
 * Response: ApiResponse { code, result: { token, authenticated } }
 */
export async function login({ username, password }) {
  const response = await axiosClient.post('/auth/token', { username, password });
  const body = response.data;
  const result = body?.result ?? body;

  const token =
    extractToken(result) ||
    extractToken(body) ||
    body?.token ||
    body?.accessToken;

  if (!token) {
    throw new Error('Login succeeded but no token was returned.');
  }

  setAccessToken(token);

  let role = resolveRoleFromLogin(result, token);

  if (!role) {
    try {
      const user = await getCurrentUser();
      role = extractRoleFromUser(user);
    } catch {
      // Role may still be resolved from JWT scope.
    }
  }

  if (role) {
    setUserRole(role);
  }

  return {
    token,
    role,
    authenticated: result?.authenticated ?? true,
  };
}

/**
 * POST /users
 */
export async function register(data) {
  const response = await axiosClient.post('/users', {
    firstName: data.firstName,
    lastName: data.lastName,
    dob: data.dob,
    username: data.username,
    password: data.password,
    email: data.email,
    identityNumber: data.identityNumber,
  });

  return response.data?.result ?? response.data;
}

/**
 * POST /auth/logout
 */
export async function logout() {
  const token = getAccessToken();

  try {
    if (token) {
      await axiosClient.post('/auth/logout', { token });
    }
  } finally {
    clearAuth();
  }
}

/**
 * GET /users/myInfo
 */
export async function getCurrentUser() {
  const response = await axiosClient.get('/users/myInfo');
  return response.data?.result ?? response.data;
}
