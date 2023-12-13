import { AppLayout } from '@hilla/react-components/AppLayout.js';
import { DrawerToggle } from '@hilla/react-components/DrawerToggle.js';
import Placeholder from 'Frontend/components/placeholder/Placeholder.js';
import { useRouteMetadata } from 'Frontend/util/routing.js';
import { Suspense } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Button } from '@hilla/react-components/Button.js';
import { useAuth } from 'Frontend/auth';
import { Notification } from '@hilla/react-components/Notification.js';

const navLinkClasses = ({ isActive }: any) => {
  return `block rounded-m p-s ${
    isActive ? 'bg-primary-10 text-primary' : 'text-body'
  }`;
};

export default function MainLayout() {
  const currentTitle = useRouteMetadata()?.title ?? 'My App';

  const navigate = useNavigate();
  const { state, login, logout } = useAuth();

  function handleLogin() {
    navigate('/login');
  }

  function handleLogout() {
    logout();
    Notification.show('Você saiu do sistema com sucesso!', {
      position: 'bottom-center',
      theme: 'success',
    });
  }

  return (
    <AppLayout primarySection="drawer">
      <div slot="drawer" className="flex flex-col justify-between h-full p-m">
        <header className="flex flex-col gap-m">
          <h1 className="text-l m-0">Clínica Saúde Integral</h1>
          <nav>
            <NavLink className={navLinkClasses} to="/">
              Página inicial
            </NavLink>
            <NavLink className={navLinkClasses} to="/galeria">
              Galeria
            </NavLink>
            <NavLink className={navLinkClasses} to="/novo-endereco">
              Novo Endereço
            </NavLink>
            <NavLink className={navLinkClasses} to="/agendar-consulta">
              Agendar Consulta
            </NavLink>
            {state.user && (
              <NavLink
                className={navLinkClasses}
                to="/autenticado"
                target="_blank"
              >
                Área restrita
              </NavLink>
            )}
          </nav>
        </header>
      </div>

      <DrawerToggle slot="navbar" aria-label="Menu toggle"></DrawerToggle>
      <div
        slot="navbar"
        className="text-l m-0 px-m flex justify-between items-center w-full"
      >
        <span>{currentTitle}</span>
        {state.user ? (
          <Button theme="primary" onClick={handleLogout}>
            Log out
          </Button>
        ) : (
          <Button theme="primary" onClick={handleLogin}>
            Fazer login
          </Button>
        )}
      </div>

      <Suspense fallback={<Placeholder />}>
        <Outlet />
      </Suspense>
    </AppLayout>
  );
}
