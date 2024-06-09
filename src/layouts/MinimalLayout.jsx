import { Navigate, Outlet } from "react-router-dom";

const MinimalLayout = () => {
  const isAuthenticated = localStorage.getItem("token");
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return (
    <>
      <Outlet />
    </>
  );
};

export default MinimalLayout;
