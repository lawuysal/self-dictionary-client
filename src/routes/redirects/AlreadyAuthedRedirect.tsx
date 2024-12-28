import { Navigate, Outlet } from "react-router-dom";
import { useGetMe } from "@/hooks/useGetMe";
import ROUTES from "../Routes.enum";
import Loader from "@/components/Loader";
import { useDispatch } from "react-redux";
import { logout as logoutAction } from "@/redux/slices/auth/authSlice";
import { useEffect } from "react";

//This component will redirect the user to the dashboard page if they are already logged in
export function AlreadyAuthedRedirect() {
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

  return getMeQuery.data ? (
    <Navigate to={ROUTES.DASHBOARD} replace />
  ) : (
    <Outlet />
  );
}
