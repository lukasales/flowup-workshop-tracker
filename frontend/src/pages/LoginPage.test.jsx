import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import LoginPage from './LoginPage';

vi.mock('../services/sourceConfig', () => ({
  USE_MOCKS: false,
}));

vi.mock('../services/authService', () => ({
  login: vi.fn(),
  isAuthenticated: vi.fn(() => false),
}));

describe('LoginPage', () => {
  it('renders the login form in API mode', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    expect(screen.getByLabelText('Usuário')).toBeInTheDocument();
    expect(screen.getByLabelText('Senha')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Entrar' })).toBeInTheDocument();
  });
});
