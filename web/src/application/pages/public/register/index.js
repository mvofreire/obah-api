import RegisterComponent from "./Register";

export const RegisterPage = {
  key: "register-page",
  isAnonymousPage: true,
  path: "/register",
  auth: "*",
  component: RegisterComponent,
};
