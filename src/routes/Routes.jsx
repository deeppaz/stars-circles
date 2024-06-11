import { lazy } from "react";
import Loadable from "components/Loadable";
import ProtectedRoutes from "./ProtectedRoutes";

const Dashboard = Loadable(lazy(() => import("views/dashboard/Dashboard")));
const List = Loadable(lazy(() => import("views/product/List")));

const Routes = {
  path: "/",
  element: <ProtectedRoutes />,
  children: [
    {
      path: "/",
      element: <Dashboard />,
    },
    {
      path: "/list",
      element: <List />,
    },
  ],
};

export default Routes;
