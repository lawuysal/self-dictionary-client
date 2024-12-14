import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserProfileState {
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  bio: string | null;
  photoUrl: string | null;
}

const initialState: UserProfileState = {
  username: localStorage.getItem("sd-username") || null,
  firstName: localStorage.getItem("sd-firstName") || null,
  lastName: localStorage.getItem("sd-lastName") || null,
  bio: localStorage.getItem("sd-bio") || null,
  photoUrl: localStorage.getItem("sd-photoUrl") || null,
};

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    getProfile: (state, action: PayloadAction<UserProfileState>) => {
      localStorage.setItem("sd-username", action.payload.username!);
      localStorage.setItem("sd-firstName", action.payload.firstName!);
      localStorage.setItem("sd-lastName", action.payload.lastName!);
      localStorage.setItem("sd-bio", action.payload.bio!);
      localStorage.setItem("sd-photoUrl", action.payload.photoUrl!);
      state.username = action.payload.username;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.bio = action.payload.bio;
      state.photoUrl = action.payload.photoUrl;
    },
    cleanProfile: (state) => {
      localStorage.removeItem("sd-username");
      localStorage.removeItem("sd-firstName");
      localStorage.removeItem("sd-lastName");
      localStorage.removeItem("sd-bio");
      localStorage.removeItem("sd-photoUrl");
      state.username = null;
      state.firstName = null;
      state.lastName = null;
      state.bio = null;
      state.photoUrl = null;
    },
    updateProfile: (state, action: PayloadAction<UserProfileState>) => {
      localStorage.setItem("sd-username", action.payload.username!);
      localStorage.setItem("sd-firstName", action.payload.firstName!);
      localStorage.setItem("sd-lastName", action.payload.lastName!);
      localStorage.setItem("sd-bio", action.payload.bio!);
      localStorage.setItem("sd-photoUrl", action.payload.photoUrl!);
      state.username = action.payload.username;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.bio = action.payload.bio;
      state.photoUrl = action.payload.photoUrl;
    },
  },
});

export const { getProfile, cleanProfile, updateProfile } =
  userProfileSlice.actions;
export default userProfileSlice.reducer;
