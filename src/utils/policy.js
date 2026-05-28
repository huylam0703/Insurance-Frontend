/**
 * Resolves the policy primary key from API responses.
 * Backend PolicyResponse uses `id`; some payloads may use policyId / policy_id.
 */
export function resolvePolicyId(policy) {
  if (!policy) return null;

  const id = policy.id ?? policy.policyId ?? policy.policy_id ?? null;
  if (id == null || String(id).trim() === '') {
    return null;
  }

  return String(id);
}

export function normalizePolicy(policy) {
  if (!policy) return policy;

  const id = resolvePolicyId(policy);
  if (!id) return policy;

  return { ...policy, id };
}
