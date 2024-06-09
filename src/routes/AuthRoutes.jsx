import { lazy } from "react";
import Loadable from "components/Loadable";

const Login = Loadable(lazy(() => import("views/auth/Login")));
const Register = Loadable(lazy(() => import("views/auth/Register")));

const AuthRoutes = {
  path: "/",
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
