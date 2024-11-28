import { Navigate, Outlet } from "react-router-dom";
import ROUTES from "../Routes.enum";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export function RequireProfileRedirect() {
  const { hasProfile } = useSelector((state: RootState) => state.auth);
  const { token } = useSelector((state: RootState) => state.auth);

  if (!token) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (!hasProfile) {
    return <Navigate to={ROUTES.CREATE_PROFILE} replace />;
  }

  return <Outlet />;
}
