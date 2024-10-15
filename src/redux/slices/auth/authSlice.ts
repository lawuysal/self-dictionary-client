import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  userId: string | null;
  userEmail: string | null;
  hasProfile: boolean | null;
}

const initialState: AuthState = {
  token: localStorage.getItem("token") || null,
  userId: localStorage.getItem("userId") || null,
  userEmail: localStorage.getItem("userEmail") || null,
  hasProfile: Boolean(localStorage.getItem("hasProfile")) || false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        token: string;
        userId: string;
        userEmail: string;
        hasProfile: string;
      }>,
    ) => {
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userId", action.payload.userId);
      localStorage.setItem("userEmail", action.payload.userEmail);
      localStorage.setItem("hasProfile", action.payload.hasProfile);
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.userEmail = action.payload.userEmail;
      state.hasProfile = Boolean(action.payload.hasProfile);
    },
    signup: (
      state,
      action: PayloadAction<{
        token: string;
        userId: string;
        userEmail: string;
      }>,
    ) => {
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userId", action.payload.userId);
      localStorage.setItem("userEmail", action.payload.userEmail);
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.userEmail = action.payload.userEmail;
    },
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("hasProfile");
      state.token = null;
      state.userId = null;
      state.userEmail = null;
      state.hasProfile = null;
    },
    profileCreated: (state) => {
      localStorage.setItem("hasProfile", "true");
      state.hasProfile = true;
    },
  },
});

export const { login, signup, logout, profileCreated } = authSlice.actions;
export default authSlice.reducer;
