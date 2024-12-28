import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ROUTES from "./Routes.enum";
import {
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
  PracticeByLanguageIdPage,
  QuizPracticePage,
  SocialPage,
  SocialProfilePage,
  PositiveActionedSocialPostsPage,
  MySocialPostsPage,
  MyFollowingsSocialPostsPage,
  PracticePage,
  VerifyYourEmailPage,
  VerifyEmailPage,
  ForgotMyPasswordPage,
  ResetPasswordPage,
} from "@/routes/Routes.lazy";
import Loader from "@/components/Loader";
import { AlreadyAuthedRedirect } from "@/routes/redirects/AlreadyAuthedRedirect";
import { AlreadyHasProfileRedirect } from "./redirects/AlreadyHasProfileRedirect";
import { RequireProfileRedirect } from "./redirects/RequireProfileRedirect";
import { RequireLoginRedirect } from "./redirects/RequireLoginRedirect";
import RouteListener from "./listeners/RouteListener";
import JWTChecker from "./listeners/JWTChecker";
import LatestSocialPostsPage from "@/pages/social/pages/latestSocialPosts/LatestSocialPostsPage";
import PracticeResetter from "./listeners/PracticeResetter";

export function AppRoutes() {
  return (
    <Suspense fallback={<Loader />}>
      {/* Listeners */}
      <RouteListener />
      <JWTChecker />
      <PracticeResetter />

      <Routes>
        {/* <Route path={ROUTES.HOME} element={<HomePage />} /> */}
        <Route path="/" element={<Navigate to={ROUTES.DASHBOARD} replace />} />

        {/* Create Profile Page */}
        <Route element={<RequireLoginRedirect />}>
          <Route element={<AlreadyHasProfileRedirect />}>
            <Route
              path={ROUTES.CREATE_PROFILE}
              element={<CreateProfilePage />}
            />
          </Route>

          {/* Social Page */}
          <Route element={<RequireProfileRedirect />}>
            <Route path={ROUTES.SOCIAL} element={<SocialPage />}>
              <Route
                index
                element={<Navigate to={ROUTES.LATEST_SOCIAL_POSTS} replace />}
              />
              <Route
                path={ROUTES.LATEST_SOCIAL_POSTS}
                element={<LatestSocialPostsPage />}
              />
              <Route
                path={ROUTES.POSITIVE_ACTIONED_SOCIAL_POSTS}
                element={<PositiveActionedSocialPostsPage />}
              />
              <Route
                path={ROUTES.MY_SOCIAL_POSTS}
                element={<MySocialPostsPage />}
              />
              <Route
                path={ROUTES.MY_FOLLOWINGS_SOCIAL_POSTS}
                element={<MyFollowingsSocialPostsPage />}
              />
              <Route
                path={ROUTES.SOCIAL_PROFILE_BY_USERNAME}
                element={<SocialProfilePage />}
              />
            </Route>

            {/* Dashboard Page */}
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
              <Route path={ROUTES.PRACTICE} element={<PracticePage />} />
              <Route
                path={ROUTES.PRACTICE_BY_LANGUAGE_ID}
                element={<PracticeByLanguageIdPage />}
              />
              <Route
                path={ROUTES.QUIZ_PRACTICE}
                element={<QuizPracticePage />}
              />
            </Route>
          </Route>
        </Route>

        {/* Authentication Pages */}
        <Route element={<AlreadyAuthedRedirect />}>
          <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route
            path={ROUTES.VERIFY_YOUR_EMAIL}
            element={<VerifyYourEmailPage />}
          />
          <Route path={ROUTES.VERIFY_EMAIL} element={<VerifyEmailPage />} />
          <Route
            path={ROUTES.FORGOT_MY_PASSWORD}
            element={<ForgotMyPasswordPage />}
          />
          <Route path={ROUTES.RESET_PASSWORD} element={<ResetPasswordPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
