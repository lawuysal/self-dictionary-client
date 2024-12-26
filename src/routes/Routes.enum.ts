const ROUTES = {
  HOME: "/",

  SIGNUP: "/signup",
  LOGIN: "/login",

  VERIFY_EMAIL: "/verify-email/:token",
  VERIFY_YOUR_EMAIL: "/verifyYourEmail",

  FORGOT_MY_PASSWORD: "/forgotMyPassword",
  RESET_PASSWORD: "/reset-password/:token",

  CREATE_PROFILE: "/create-profile",

  SOCIAL: "/social",
  LATEST_SOCIAL_POSTS: "/social/latest",
  POSITIVE_ACTIONED_SOCIAL_POSTS: "/social/positive-actioned-posts",
  MY_SOCIAL_POSTS: "/social/my-posts",
  MY_FOLLOWINGS_SOCIAL_POSTS: "/social/my-followings-posts",
  SOCIAL_PROFILE_BY_USERNAME: "/social/:username",
  SOCIAL_PROFILE_BY_USERNAME_GEN: (username: string) => `/social/${username}`,

  DASHBOARD: "/dashboard",

  MY_LANGUAGES: "/dashboard/my-languages",
  LANGUAGE_BY_ID: "/dashboard/my-languages/:id",
  LANGUAGE_BY_ID_GEN: (id: string) => `/dashboard/my-languages/${id}`,

  NOTE_BY_ID: "/dashboard/my-languages/:languageId/notes/:noteId",
  NOTE_BY_ID_GEN: (languageId: string, noteId: string, origin: string) =>
    `/dashboard/my-languages/${languageId}/notes/${noteId}?origin=${origin}`,
  ALL_NOTES: "/dashboard/all-notes",

  PROFILE: "/dashboard/profile",

  PREFERENCES: "/dashboard/preferences",

  PRACTICE: "/dashboard/practice",
  PRACTICE_BY_LANGUAGE_ID: "/dashboard/practice/:languageId",
  PRACTICE_BY_LANGUAGE_ID_GEN: (languageId: string, origin?: string) =>
    `/dashboard/practice/${languageId}?origin=${origin}`,

  QUIZ_PRACTICE: "/dashboard/practice/quiz/:languageId",
  QUIZ_PRACTICE_GEN: (languageId: string) =>
    `/dashboard/practice/quiz/${languageId}`,
};

export default ROUTES;
