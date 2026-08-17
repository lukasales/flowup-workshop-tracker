import { API_URL } from './sourceConfig';
import { getToken } from '../utils/tokenStorage';

export async function apiRequest(path, options = {}) {
  const { auth = false, headers = {}, ...rest } = options;

  const finalHeaders = { ...headers };

  if (auth) {
    const token = getToken();
    if (token) {
      finalHeaders.Authorization = `Bearer ${token}`;
    }
  }

  if (rest.body !== undefined && rest.body !== null && !(rest.body instanceof FormData)) {
    if (!finalHeaders['Content-Type'] && !finalHeaders['content-type']) {
      finalHeaders['Content-Type'] = 'application/json';
    }
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...rest,
    headers: finalHeaders,
  });

  let payload = null;
  const contentType = response.headers.get('content-type') || '';

  if (contentType.includes('application/json')) {
    payload = await response.json();
  } else if (response.status !== 204) {
    const text = await response.text();
    payload = text ? text : null;
  }

  if (!response.ok) {
    const error = new Error(
      typeof payload === 'string' && payload ? payload : `Request falhou com status ${response.status}`
    );
    error.status = response.status;
    error.payload = payload;
    throw error;
  }

  return payload;
}
