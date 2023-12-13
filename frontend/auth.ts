import { configureAuth } from "@hilla/react-auth";
import { UserInfoEndpoint } from "Frontend/generated/endpoints";

const auth = configureAuth(UserInfoEndpoint.getAuthenticatedEmployee);

export const useAuth = auth.useAuth;
export const AuthProvider = auth.AuthProvider;
