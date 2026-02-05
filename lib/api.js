import { supabase } from './supabase';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

async function apiRequest(path, options = {}) {
  const { data: { session } } = await supabase.auth.getSession();
  const token = session?.access_token;

  const res = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Request failed');
  }
  return res.json();
}

export const api = {
  get: (path) => apiRequest(path),
  post: (path, body) => apiRequest(path, {
    method: 'POST', body: JSON.stringify(body)
  }),
  put: (path, body) => apiRequest(path, {
    method: 'PUT', body: JSON.stringify(body)
  }),
  delete: (path) => apiRequest(path, { method: 'DELETE' }),
};