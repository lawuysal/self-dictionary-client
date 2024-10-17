import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NavigationState {
  currentPath: string;
}

const initialState: NavigationState = {
  currentPath: "/",
};

const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setPath: (state, action: PayloadAction<string>) => {
      state.currentPath = action.payload;
    },
  },
});

export const { setPath } = navigationSlice.actions;

export default navigationSlice.reducer;
