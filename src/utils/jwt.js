const KNOWN_ROLES = ['ADMIN', 'MANAGER', 'STAFF', 'CUSTOMER'];

export function parseRoleFromToken(token) {
  if (!token) return null;

  try {
    const payload = token.split('.')[1];
    if (!payload) return null;

    const decoded = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
    const scope = decoded.scope || decoded.authorities || '';

    if (typeof scope === 'string') {
      for (const role of KNOWN_ROLES) {
        if (scope.includes(`ROLE_${role}`) || scope.includes(role)) {
          return role;
        }
      }
    }

    if (Array.isArray(scope)) {
      for (const entry of scope) {
        const normalized = String(entry).replace(/^ROLE_/, '');
        if (KNOWN_ROLES.includes(normalized)) return normalized;
      }
    }
  } catch {
    return null;
  }

  return null;
}
