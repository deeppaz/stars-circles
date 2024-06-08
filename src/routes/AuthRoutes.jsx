import { lazy } from "react";
import Loadable from "components/Loadable";

const Login = Loadable(lazy(() => import("views/auth/Login")));

const AuthRoutes = {
  path: "/",
  children: [
    {
      path: "/login",
      element: <Login />,
    },
  ],
};

export default AuthRoutes;
