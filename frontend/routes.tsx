import { lazy } from "react";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import MainLayout from "Frontend/views/MainLayout.js";
import AutenticatedLayout from "./views/AutenticatedLayout";
import LoginView from "Frontend/views/login/LoginView";
import { protectRoutes } from "@hilla/react-auth";

const HomeView = lazy(async () => import("Frontend/views/home/HomeView.js"));
const GalleryView = lazy(
  async () => import("Frontend/views/gallery/GalleryView.js"),
);
const NewAddressView = lazy(
  async () => import("Frontend/views/new-address/NewAddressView.js"),
);
const ScheduleAppointmentView = lazy(
  async () =>
    import("Frontend/views/schedule-appointment/ScheduleAppointmentView.js"),
);

const RegisterEmployeeView = lazy(
  async () =>
    import("Frontend/views/register-employee/RegisterEmployeeView.js"),
);
const RegisterMedicalRecordView = lazy(
  async () =>
    import(
      "Frontend/views/register-medical-record/RegisterMedicalRecordView.js"
    ),
);
const RegisterPatientView = lazy(
  async () => import("Frontend/views/register-patient/RegisterPatientView.js"),
);
const ListEmployeesView = lazy(
  async () => import("Frontend/views/list-employees/ListEmployeesView.js"),
);
const ListPatientsView = lazy(
  async () => import("Frontend/views/list-patients/ListPatientsView.js"),
);
const ListAddressesView = lazy(
  async () => import("Frontend/views/list-addresses/ListAddressesView.js"),
);
const ListSchedulesView = lazy(
  async () => import("Frontend/views/list-schedules/ListSchedulesView.js"),
);
const ListMySchedulesView = lazy(
  async () => import("Frontend/views/list-my-schedules/ListMySchedulesView.js"),
);

export const routes = protectRoutes([
  { path: "/login", element: <LoginView /> },
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomeView />,
        handle: { title: "Clínica Saúde Integral" },
      },
      {
        path: "/galeria",
        element: <GalleryView />,
        handle: { title: "Galeria" },
      },
      {
        path: "/novo-endereco",
        element: <NewAddressView />,
        handle: { title: "Cadastro de Endereço" },
      },
      {
        path: "/agendar-consulta",
        element: <ScheduleAppointmentView />,
        handle: { title: "Agendar Consulta" },
      },
    ],
  },
  {
    element: <AutenticatedLayout />,
    handle: { requiresLogin: true },
    children: [
      {
        path: "/autenticado",
        element: <HomeView />,
        handle: { title: "Clínica Saúde Integral" },
      },
      {
        path: "autenticado/novo-funcionario",
        element: <RegisterEmployeeView />,
        handle: {
          title: "Clínica Saúde Integral",
        },
      },
      {
        path: "autenticado/novo-prontuario",
        element: <RegisterMedicalRecordView />,
        handle: {
          title: "Cadastro de Prontuário",
        },
      },
      {
        path: "autenticado/novo-paciente",
        element: <RegisterPatientView />,
        handle: {
          title: "Cadastro de Paciente",
        },
      },
      {
        path: "autenticado/listar-funcionarios",
        element: <ListEmployeesView />,
        handle: {
          title: "Listagem de funcionários",
        },
      },
      {
        path: "autenticado/listar-pacientes",
        element: <ListPatientsView />,
        handle: {
          title: "Listagem de pacientes",
        },
      },
      {
        path: "autenticado/listar-enderecos",
        element: <ListAddressesView />,
        handle: {
          title: "Listagem de endereços",
        },
      },
      {
        path: "autenticado/listar-agendamentos",
        element: <ListSchedulesView />,
        handle: {
          title: "Listagem de agendamentos",
        },
      },
      {
        path: "autenticado/meus-agendamentos",
        element: <ListMySchedulesView />,
        handle: {
          title: "Listagem de agendamentos",
        },
      },
    ],
  },
]) as RouteObject[];

export default createBrowserRouter(routes);
