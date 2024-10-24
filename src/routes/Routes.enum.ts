const ROUTES = {
  HOME: "/",
  SIGNUP: "/signup",
  LOGIN: "/login",
  CREATE_PROFILE: "/create-profile",
  DASHBOARD: "/dashboard",
  MY_LANGUAGES: "/dashboard/my-languages",
  LANGUAGE_BY_ID: "/dashboard/my-languages/:id",
  LANGUAGE_BY_ID_GEN: (id: string) => `/dashboard/my-languages/${id}`,
  ALL_NOTES: "/dashboard/all-notes",
  PROFILE: "/dashboard/profile",
  PREFERENCES: "/dashboard/preferences",
};

export default ROUTES;
