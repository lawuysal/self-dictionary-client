// const BASE_URL = "http://192.168.219.223:3005/api";
// const BASE_URL = "http://192.168.111.223:3005/api";
// const BASE_URL = "http://192.168.1.30:3005/api";
const BASE_URL = "http://localhost:3005/api";
const STATIC_URL = "http://localhost:3005";

export const Endpoints = {
  BASE_URL,
  STATIC_URL,

  // Auth endpoints
  LOGIN: `${BASE_URL}/auth/login`,
  SIGNUP: `${BASE_URL}/auth/signup`,
  ME: `${BASE_URL}/auth/me`,

  // User endpoints
  PROFILES: `${BASE_URL}/profiles`,
  GET_PROFILE_BY_USERNAME: (username: string) =>
    `${BASE_URL}/profiles/username/${username}`,
  PREFERENCES: `${BASE_URL}/preferences`,

  // Language endpoints
  LANGUAGES: `${BASE_URL}/languages`,
  LANGUAGE_BY_ID: (id: string) => `${BASE_URL}/languages/${id}`,
  LANGUAGES_BY_USER_ID: (id: string) => `${BASE_URL}/languages/user/${id}`,

  // Note endpoints
  NOTES: `${BASE_URL}/notes`,
  NOTE_BY_ID: (id: string) => `${BASE_URL}/notes/${id}`,
  NOTES_BY_LANGUAGE_ID: (
    id: string,
    limit: number = 10,
    page: number = 1,
    sortBy: string = "createdAt",
    order: string = "asc",
    search: string = "",
  ) =>
    `${BASE_URL}/notes/language/${id}?limit=${limit}&page=${page}&sortBy=${sortBy}&order=${order}&search=${search}`,
  NOTES_BY_USER_ID: (
    id: string,
    limit: number = 10,
    page: number = 1,
    sortBy: string = "createdAt",
    order: string = "asc",
    search: string = "",
  ) =>
    `${BASE_URL}/notes/user/${id}?limit=${limit}&page=${page}&sortBy=${sortBy}&order=${order}&search=${search}`,
  GET_RANDOM_QUIZ_QUESTIONS: (languageId: string) =>
    `${BASE_URL}/notes/quiz/language/${languageId}`,
  GET_QUIZ_QUESTION_ANSWER: (noteId: string) =>
    `${BASE_URL}/notes/quiz/question/answer/${noteId}`,

  // Social endpoints
  SOCIAL_POSTS: `${BASE_URL}/social-posts`,
  SOCIAL_POST_ADD_POSITIVE_ACTION: `${BASE_URL}/social-posts/add-positive-action`,
  SOCIAL_POST_REMOVE_POSITIVE_ACTION: `${BASE_URL}/social-posts/remove-positive-action`,
};
