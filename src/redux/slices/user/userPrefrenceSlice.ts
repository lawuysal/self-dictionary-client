import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserPreferenceState {
  theme: string | null;
  language: string | null;
}

const initialState: UserPreferenceState = {
  theme: localStorage.getItem("sd-theme") || null,
  language: localStorage.getItem("sd-language") || null,
};

const userPreferenceSlice = createSlice({
  name: "userPreference",
  initialState,
  reducers: {
    getPreference: (state, action: PayloadAction<UserPreferenceState>) => {
      localStorage.setItem("sd-theme", action.payload.theme!);
      localStorage.setItem("sd-language", action.payload.language!);
      state.theme = action.payload.theme;
      state.language = action.payload.language;
    },
    cleanPreference: (state) => {
      localStorage.removeItem("sd-theme");
      localStorage.removeItem("sd-language");
      state.theme = null;
      state.language = null;
    },
  },
});

export const { getPreference, cleanPreference } = userPreferenceSlice.actions;
export default userPreferenceSlice.reducer;
