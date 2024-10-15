import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/slices/auth/authSlice";
import userProfileReducer from "@/redux/slices/user/userProfileSlice";
import userPreferenceReducer from "@/redux/slices/user/userPrefrenceSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    userProfile: userProfileReducer,
    userPreference: userPreferenceReducer,
  },
  devTools: process.env.NODE_ENV !== "production", // Enable Redux DevTools
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
