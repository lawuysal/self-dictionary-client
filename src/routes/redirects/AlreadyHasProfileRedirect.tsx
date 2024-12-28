import { Navigate, Outlet } from "react-router-dom";
import ROUTES from "../Routes.enum";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export function AlreadyHasProfileRedirect() {
  const { firstName, username } = useSelector(
    (state: RootState) => state.userProfile,
  );

  if (firstName && username) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return <Outlet />;
}
