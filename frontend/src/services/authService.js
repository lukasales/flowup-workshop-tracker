import { USE_MOCKS } from './sourceConfig';
import { apiRequest } from './api';
import { getToken, removeToken, setToken } from '../utils/tokenStorage';

export async function login(usuario, senha) {
  if (USE_MOCKS) {
    return { token: 'mock-token' };
  }

  const response = await apiRequest('/Auth/login', {
    method: 'POST',
    body: JSON.stringify({ usuario, senha }),
  });

  if (!response || !response.token) {
    throw new Error('Usuário ou senha inválidos.');
  }

  setToken(response.token);
  return response;
}

export function logout() {
  removeToken();
}

export function isAuthenticated() {
  return Boolean(getToken());
}
