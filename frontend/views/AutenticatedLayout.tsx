import { AppLayout } from "@hilla/react-components/AppLayout.js";
import { DrawerToggle } from "@hilla/react-components/DrawerToggle.js";
import Placeholder from "Frontend/components/placeholder/Placeholder.js";
import { useRouteMetadata } from "Frontend/util/routing.js";
import { Suspense } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "Frontend/auth";
import Role from "Frontend/generated/com/example/application/model/Role";

const navLinkClasses = ({ isActive }: any) => {
  return `block rounded-m p-s ${
    isActive ? "bg-primary-10 text-primary" : "text-body"
  }`;
};

export default function AutenticatedLayout() {
  const { state, login, logout } = useAuth();
  const currentTitle = useRouteMetadata()?.title ?? "My App";

  const isDoctor = state.user?.roles?.includes(Role.DOCTOR);

  return (
    <AppLayout primarySection="drawer">
      <div slot="drawer" className="flex flex-col justify-between h-full p-m">
        <header className="flex flex-col gap-m">
          <h1 className="text-l m-0">Clínica Saúde Integral</h1>
          <nav>
            <NavLink
              className={navLinkClasses}
              to="/autenticado/novo-funcionario"
            >
              Novo funcionário
            </NavLink>
            <NavLink
              className={navLinkClasses}
              to="/autenticado/novo-prontuario"
            >
              Cadastrar prontuário médico
            </NavLink>
            <NavLink className={navLinkClasses} to="/autenticado/novo-paciente">
              Cadastrar paciente
            </NavLink>
            <NavLink
              className={navLinkClasses}
              to="/autenticado/listar-funcionarios"
            >
              Listar funcionários
            </NavLink>
            <NavLink
              className={navLinkClasses}
              to="/autenticado/listar-pacientes"
            >
              Listar pacientes
            </NavLink>
            <NavLink
              className={navLinkClasses}
              to="/autenticado/listar-enderecos"
            >
              Listar endereços
            </NavLink>
            <NavLink
              className={navLinkClasses}
              to="/autenticado/listar-agendamentos"
            >
              Listar agendamentos
            </NavLink>
            {isDoctor && (
              <NavLink
                className={navLinkClasses}
                to="/autenticado/meus-agendamentos"
              >
                Listar meus agendamentos
              </NavLink>
            )}
          </nav>
        </header>
      </div>

      <DrawerToggle slot="navbar" aria-label="Menu toggle"></DrawerToggle>
      <h2 slot="navbar" className="text-l m-0">
        {currentTitle}
      </h2>

      <Suspense fallback={<Placeholder />}>
        <Outlet />
      </Suspense>
    </AppLayout>
  );
}
