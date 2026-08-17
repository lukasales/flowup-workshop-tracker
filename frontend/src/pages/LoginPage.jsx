import { useMemo, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { login, isAuthenticated } from '../services/authService';
import { USE_MOCKS } from '../services/sourceConfig';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [usuario, setUsuario] = useState('admin');
  const [senha, setSenha] = useState('admin123');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const reason = useMemo(() => new URLSearchParams(location.search).get('reason'), [location.search]);

  if (USE_MOCKS) {
    return <Navigate to="/" replace />;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(usuario, senha);
      const nextPath = location.state?.from?.pathname || '/';
      navigate(nextPath, { replace: true });
    } catch (err) {
      const message = err && err.status === 401
        ? 'Usuário ou senha inválidos.'
        : err && err.message === 'Failed to fetch'
          ? 'Não foi possível conectar com o servidor. Verifique se a API está disponível.'
          : err && err.message
            ? err.message
            : 'Não foi possível entrar no sistema.';

      setError(message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <span className="brand-mark brand-mark--large" aria-label="FlowUp Workshops logo">F</span>
          <h1>FlowUp Workshops</h1>
          <p>Entre com suas credenciais para acessar o painel.</p>
        </div>

        {reason === 'session-expired' ? (
          <div className="login-alert" role="alert">
            Sua sessão expirou. Entre novamente.
          </div>
        ) : null}

        <form className="login-form" onSubmit={handleSubmit}>
          <label>
            <span>Usuário</span>
            <input
              type="text"
              value={usuario}
              onChange={(event) => setUsuario(event.target.value)}
              placeholder="admin"
              autoComplete="username"
            />
          </label>

          <label>
            <span>Senha</span>
            <input
              type="password"
              value={senha}
              onChange={(event) => setSenha(event.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </label>

          {error ? <div className="login-error" role="alert">{error}</div> : null}

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}
