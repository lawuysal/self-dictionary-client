const ROUTES = {
  HOME: "/",
  SIGNUP: "/signup",
  LOGIN: "/login",
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
  NOTE_BY_ID_GEN: (languageId: string, noteId: string) =>
    `/dashboard/my-languages/${languageId}/notes/${noteId}`,
  ALL_NOTES: "/dashboard/all-notes",
  PROFILE: "/dashboard/profile",
  PREFERENCES: "/dashboard/preferences",
  PRACTICE: "/dashboard/practice",
  QUIZ_PRACTICE: "/dashboard/practice/quiz",
};

export default ROUTES;
