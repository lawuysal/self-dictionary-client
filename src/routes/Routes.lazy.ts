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

export const PracticePage = lazy(
  () => import("@/pages/dashboard/pages/practice/PracticePage"),
);

export const PracticeByLanguageIdPage = lazy(
  () =>
    import(
      "@/pages/dashboard/pages/practice/pages/practiceByLanguage/PracticeByLanguageIdPage"
    ),
);

export const QuizPracticePage = lazy(
  () => import("@/pages/dashboard/pages/practice/pages/quiz/QuizPracticePage"),
);

export const SocialPage = lazy(() => import("@/pages/social/SocialPage"));

export const SocialProfilePage = lazy(
  () => import("@/pages/social/pages/socialProfile/SocialProfilePage"),
);

// export const SocialPostByIdPage = lazy(
//   () => import("@/pages/social/pages/latestSocialPosts/LatestSocialPostsPage"),
// );

export const LatestSocialPostsPage = lazy(
  () => import("@/pages/social/pages/latestSocialPosts/LatestSocialPostsPage"),
);

export const PositiveActionedSocialPostsPage = lazy(
  () =>
    import(
      "@/pages/social/pages/positiveActionedSocialPosts/PositiveActionedSocialPostsPage"
    ),
);

export const MySocialPostsPage = lazy(
  () => import("@/pages/social/pages/mySocialPosts/MySocialPostsPage"),
);

export const MyFollowingsSocialPostsPage = lazy(
  () =>
    import(
      "@/pages/social/pages/myFollowingsSocialPosts/MyFollowingsSocialPostsPage"
    ),
);

export const VerifyYourEmailPage = lazy(
  () => import("@/pages/verifyYourEmail/VerifyYourEmailPage"),
);

export const VerifyEmailPage = lazy(
  () => import("@/pages/verifyEmail/VerifyEmailPage"),
);
