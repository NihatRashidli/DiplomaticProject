import { createSlice } from "@reduxjs/toolkit";

const storedUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialState = {
  user: storedUser,
  users: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    updateProfilePicture: (state, action) => {
      if (state.user) {
        state.user.profilePicture = action.payload;
      }
    },
  },
});

export const { setUser, updateProfilePicture } = userSlice.actions;

export default userSlice.reducer;
