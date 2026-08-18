import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { USE_MOCKS } from '../services/sourceConfig';
import { isAuthenticated, logout } from '../services/authService';

const navItems = [
  { label: 'Dashboard', to: '/' },
  { label: 'Colaboradores', to: '/colaboradores' },
  { label: 'Workshops', to: '/workshops' },
];

export default function AppLayout() {
  const navigate = useNavigate();
  const modeLabel = USE_MOCKS ? 'Modo mock' : 'API real';

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="container topbar__inner">
          <div className="brand-block">
            <span className="brand-mark" aria-label="FlowUp Workshops logo">F</span>
            <div>
              <p className="brand-name">FlowUp Workshops</p>
              <span className="brand-subtitle">Rastreamento de participação em workshops</span>
            </div>
          </div>

          <div className="topbar__actions">
            <div className="topbar__meta">
              <span className="mode-badge">{modeLabel}</span>
            </div>

            <nav className="main-nav" aria-label="Navegação principal">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) => `nav-link ${isActive ? 'nav-link--active' : ''}`}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {!USE_MOCKS && isAuthenticated() ? (
              <button type="button" className="logout-button" onClick={handleLogout}>
                Sair
              </button>
            ) : null}
          </div>
        </div>
      </header>

      <main className="container main-content">
        <Outlet />
      </main>

      <footer className="app-footer">
        <div className="container">
          <p>Desafio Técnico FlowUp + CIn-UFPE</p>
        </div>
      </footer>
    </div>
  );
}
