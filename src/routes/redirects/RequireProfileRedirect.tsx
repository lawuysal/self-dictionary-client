import { Navigate, Outlet } from "react-router-dom";
import ROUTES from "../Routes.enum";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export function RequireProfileRedirect() {
  const { token } = useSelector((state: RootState) => state.auth);
  const { firstName, username } = useSelector(
    (state: RootState) => state.userProfile,
  );

  if (!token) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (!firstName || !username) {
    return <Navigate to={ROUTES.CREATE_PROFILE} replace />;
  }

  return <Outlet />;
}
