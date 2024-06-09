import { lazy } from "react";
import Loadable from "components/Loadable";
import MinimalLayout from "layouts/MinimalLayout";

const Login = Loadable(lazy(() => import("views/auth/Login")));
const Register = Loadable(lazy(() => import("views/auth/Register")));

const AuthRoutes = {
  path: "/",
  element: <MinimalLayout />,
  children: [
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ],
};

export default AuthRoutes;
