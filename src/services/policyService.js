import axiosClient from '../api/axiosClient';
import { normalizePolicy } from '../utils/policy';

function unwrap(data) {
  if (data == null) return data;
  if (Object.prototype.hasOwnProperty.call(data, 'result')) {
    return data.result;
  }
  return data;
}

function unwrapList(data) {
  const inner = unwrap(data);
  if (Array.isArray(inner)) return inner;
  if (Array.isArray(inner?.content)) return inner.content;
  if (Array.isArray(inner?.items)) return inner.items;
  return [];
}

export async function getPolicies() {
  const response = await axiosClient.get('/policies');
  return unwrapList(response.data).map(normalizePolicy);
}

export async function createPolicy(data) {
  const response = await axiosClient.post('/policies', data);
  return unwrap(response.data);
}

export async function updatePolicy(policyId, data) {
  const response = await axiosClient.put(`/policies/${policyId}`, data);
  return unwrap(response.data);
}

export async function deletePolicy(policyId) {
  const response = await axiosClient.delete(`/policies/${policyId}`);
  return unwrap(response.data);
}
