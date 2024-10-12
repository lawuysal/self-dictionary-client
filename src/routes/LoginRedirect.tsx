import { Navigate, Outlet } from "react-router-dom";
import { useGetMe } from "@/hooks/useAuth";
import ROUTES from "./Routes.enum";
import Loader from "@/components/Loader";
import { useDispatch } from "react-redux";
import { logout as logoutAction } from "@/slices/auth/authSlice";
import { useEffect } from "react";

export function LoginRedirect() {
  const dispatch = useDispatch();
  const getMeQuery = useGetMe();

  useEffect(() => {
    if (getMeQuery.isError) {
      dispatch(logoutAction());
    }
  }, [getMeQuery.isError, dispatch]);

  if (!localStorage.getItem("token")) {
    return <Outlet />;
  }

  if (getMeQuery.isLoading) {
    return <Loader />;
  }

  return getMeQuery.data ? <Navigate to={ROUTES.HOME} replace /> : <Outlet />;
}
