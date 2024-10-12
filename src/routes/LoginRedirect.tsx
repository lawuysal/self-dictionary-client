import { Navigate, Outlet } from "react-router-dom";
import { useGetMe } from "@/hooks/useAuth";
import ROUTES from "./Routes.enum";
import Loader from "@/components/Loader";

export function LoginRedirect() {
  const getMeQuery = useGetMe();

  if (!localStorage.getItem("token")) {
    return <Outlet />;
  }

  if (getMeQuery.isLoading) {
    return <Loader />;
  }

  return getMeQuery.data ? <Navigate to={ROUTES.HOME} replace /> : <Outlet />;
}
