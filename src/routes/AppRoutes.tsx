import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import ROUTES from "./Routes.enum";
import {
  HomePage,
  SignupPage,
  LoginPage,
  CreateProfilePage,
  DashboardPage,
  NotFoundPage,
  MyLanguagesPage,
  AllNotesPage,
  PreferencesPage,
  ProfilePage,
  LanguageByIdPage,
  NoteByIdPage,
} from "@/routes/Routes.lazy";
import Loader from "@/components/Loader";
import { AlreadyAuthedRedirect } from "@/routes/redirects/AlreadyAuthedRedirect";
import { AlreadyHasProfileRedirect } from "./redirects/AlreadyHasProfileRedirect";
import { RequireProfileRedirect } from "./redirects/RequireProfileRedirect";
import { RequireLoginRedirect } from "./redirects/RequireLoginRedirect";
import RouteListener from "./RouteListener";
import JWTChecker from "./JWTChecker";

export function AppRoutes() {
  return (
    <Suspense fallback={<Loader />}>
      <RouteListener />
      <JWTChecker />

      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />} />

        <Route element={<RequireLoginRedirect />}>
          <Route element={<AlreadyHasProfileRedirect />}>
            <Route
              path={ROUTES.CREATE_PROFILE}
              element={<CreateProfilePage />}
            />
          </Route>

          <Route element={<RequireProfileRedirect />}>
            <Route path={ROUTES.DASHBOARD} element={<DashboardPage />}>
              <Route path={ROUTES.MY_LANGUAGES} element={<MyLanguagesPage />} />
              <Route
                path={ROUTES.LANGUAGE_BY_ID}
                element={<LanguageByIdPage />}
              />
              <Route path={ROUTES.NOTE_BY_ID} element={<NoteByIdPage />} />
              <Route path={ROUTES.ALL_NOTES} element={<AllNotesPage />} />
              <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
              <Route path={ROUTES.PREFERENCES} element={<PreferencesPage />} />
            </Route>
          </Route>
        </Route>

        <Route element={<AlreadyAuthedRedirect />}>
          <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
