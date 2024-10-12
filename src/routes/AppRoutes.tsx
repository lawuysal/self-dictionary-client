import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import ROUTES from "./Routes.enum";
import { HomePage, SignupPage, LoginPage } from "@/routes/Routes.lazy";
import Loader from "@/components/Loader";
import { LoginRedirect } from "@/routes/LoginRedirect";

export function AppRoutes() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />} />

        <Route element={<LoginRedirect />}>
          <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
