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
export const NotFoundPage = lazy(() => import("@/pages/notFound/NotFoundPage"));
export const MyLanguagesPage = lazy(
  () => import("@/pages/dashboard/pages/myLanguages/MyLanguagesPage"),
);
export const AllNotesPage = lazy(
  () => import("@/pages/dashboard/pages/allNotes/AllNotesPage"),
);
export const ProfilePage = lazy(
  () => import("@/pages/dashboard/pages/profile/ProfilePage"),
);
export const PreferencesPage = lazy(
  () => import("@/pages/dashboard/pages/preferences/PreferencesPage"),
);
export const LanguageByIdPage = lazy(
  () => import("@/pages/dashboard/pages/languageById/LanguageByIdPage"),
);
export const NoteByIdPage = lazy(
  () => import("@/pages/dashboard/pages/noteById/NoteByIdPage"),
);
