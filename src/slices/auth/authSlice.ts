import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  userId: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem("token") || null,
  userId: localStorage.getItem("userId") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ token: string; userId: string }>,
    ) => {
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userId", action.payload.userId);
      state.token = action.payload.token;
      state.userId = action.payload.userId;
    },
    signup: (
      state,
      action: PayloadAction<{ token: string; userId: string }>,
    ) => {
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userId", action.payload.userId);
      state.token = action.payload.token;
      state.userId = action.payload.userId;
    },
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      state.token = null;
      state.userId = null;
    },
  },
});

export const { login, signup, logout } = authSlice.actions;
export default authSlice.reducer;
