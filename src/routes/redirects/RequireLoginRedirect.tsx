import { Navigate, Outlet } from "react-router-dom";
import ROUTES from "../Routes.enum";

export function RequireLoginRedirect() {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <Outlet />;
}
