import { Navigate, Outlet } from "react-router-dom";
import ROUTES from "../Routes.enum";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export function AlreadyHasProfileRedirect() {
  const { hasProfile } = useSelector((state: RootState) => state.auth);

  if (hasProfile) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return <Outlet />;
}
