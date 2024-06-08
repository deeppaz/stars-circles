import { createBrowserRouter } from "react-router-dom";

import Routes from "./Routes";
import AuthRoutes from "./AuthRoutes";

const router = createBrowserRouter([Routes, AuthRoutes], {
  basename: "/",
});

export default router;
