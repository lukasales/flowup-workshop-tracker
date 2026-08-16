import { NavLink, Outlet } from 'react-router-dom';

const navItems = [
  { label: 'Dashboard', to: '/' },
  { label: 'Colaboradores', to: '/colaboradores' },
  { label: 'Workshops', to: '/workshops' },
];

export default function AppLayout() {
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
