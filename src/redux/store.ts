import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/slices/auth/authSlice";
import userProfileReducer from "@/redux/slices/user/userProfileSlice";
import userPreferenceReducer from "@/redux/slices/user/userPrefrenceSlice";
import navigationReducer from "@/redux/slices/navigation/navigationSlice";
import quizPracticeReducer from "@/redux/slices/quizPractice/quizPracticeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    userProfile: userProfileReducer,
    userPreference: userPreferenceReducer,
    navigation: navigationReducer,
    quizPractice: quizPracticeReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
