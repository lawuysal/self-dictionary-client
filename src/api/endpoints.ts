const BASE_URL = "http://192.168.219.223:3005/api";
// const BASE_URL = "http://localhost:3005/api";

export const Endpoints = {
  // Auth endpoints
  LOGIN: `${BASE_URL}/auth/login`,
  SIGNUP: `${BASE_URL}/auth/signup`,
  ME: `${BASE_URL}/auth/me`,

  // User endpoints
  PROFILES: `${BASE_URL}/profiles`,
  PREFERENCES: `${BASE_URL}/preferences`,

  // Language endpoints
  LANGUAGES: `${BASE_URL}/languages`,
  LANGUAGES_BY_ID: (id: string) => `${BASE_URL}/languages/user/${id}`,
};
