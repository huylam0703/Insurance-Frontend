const ACCESS_TOKEN_KEY = 'access_token';
const USER_ROLE_KEY = 'user_role';

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function setAccessToken(token) {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
}

export function removeAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}

export function getUserRole() {
  return localStorage.getItem(USER_ROLE_KEY);
}

export function setUserRole(role) {
  if (role) {
    localStorage.setItem(USER_ROLE_KEY, role);
  }
}

export function removeUserRole() {
  localStorage.removeItem(USER_ROLE_KEY);
}

export function clearAuth() {
  removeAccessToken();
  removeUserRole();
}
