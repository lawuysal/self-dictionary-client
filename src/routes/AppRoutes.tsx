import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import ROUTES from "./Routes.enum";
import HomePage from "@/routes/lazy/HomePage.lazy";
import Loader from "@/components/Loader";

export function AppRoutes() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />} />
      </Routes>
    </Suspense>
  );
}
