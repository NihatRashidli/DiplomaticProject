import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
        ? {
            id: action.payload.id,
            name: action.payload.name,
            surname: action.payload.surname,
            email: action.payload.email,
            isVerified: action.payload.isVerified,
          }
        : null;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
