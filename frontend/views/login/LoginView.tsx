import { Navigate } from "react-router-dom";
import { useAuth } from "Frontend/auth";
import { useState } from "react";
import { LoginForm } from "@hilla/react-components/LoginForm";

import style from "./LoginView.module.css";
import {
  EmployeeService,
  UserInfoEndpoint,
} from "Frontend/generated/endpoints";

const i18n = {
  form: {
    title: "Clínica Integral",
    username: "E-mail",
    password: "Senha",
    submit: "Login",
    forgotPassword: "Esqueceu a senha?",
  },
  errorMessage: {
    title: "Erro ao fazer login",
    message:
      "Usuário ou senha incorretos. Verifique se você digitou corretamente e tente novamente.",
    username: "Preencha o seu nome de usuário",
    password: "Preencha a sua senha",
  },
  additionalInformation:
    "Envie um email para integral@gmail.com se estiver com erros",
};

export default function LoginView() {
  const { state, login } = useAuth();
  const [hasError, setError] = useState<boolean>();
  const [url, setUrl] = useState<string>("/");

  if (state.user && url) {
    const path = new URL(url, document.baseURI).pathname;
    return <Navigate to={path} replace />;
  }

  return (
    <main className={style.main}>
      <LoginForm
        i18n={i18n}
        error={hasError}
        noForgotPassword
        onLogin={async ({ detail: { username, password } }) => {
          const { defaultUrl, error, redirectUrl, errorMessage } = await login(
            username,
            password,
          );

          if (error) {
            setError(true);
          } else {
            setUrl("/autenticado");
          }
        }}
      />
    </main>
  );
}
