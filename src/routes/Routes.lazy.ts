import { lazy } from "react";

export const HomePage = lazy(() => import("@/pages/home/HomePage"));
export const SignupPage = lazy(() => import("@/pages/signup/SignupPage"));
export const LoginPage = lazy(() => import("@/pages/login/LoginPage"));
export const CreateProfilePage = lazy(
  () => import("@/pages/createProfile/CreateProfilePage"),
);
export const DashboardPage = lazy(
  () => import("@/pages/dashboard/DashboardPage"),
);
