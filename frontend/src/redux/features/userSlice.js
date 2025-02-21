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
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { setUser, updateProfilePicture, setUsers, logout } =
  userSlice.actions;

export default userSlice.reducer;
