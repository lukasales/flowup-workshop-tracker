import { beforeEach, describe, expect, it, vi } from 'vitest';
import { login } from './authService';

vi.mock('./sourceConfig', () => ({
  USE_MOCKS: false,
  API_URL: 'http://localhost:5000/api',
}));

describe('authService', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('stores the token in localStorage after a valid login', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      headers: new Headers({ 'content-type': 'application/json' }),
      json: async () => ({ token: 'jwt-teste' }),
    }));

    const response = await login('admin', 'admin123');

    expect(response.token).toBe('jwt-teste');
    expect(window.localStorage.getItem('flowup_token')).toBe('jwt-teste');
  });
});
