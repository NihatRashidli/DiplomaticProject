import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk("admin/fetchUsers", async () => {
  const response = await axios.get("http://localhost:5000/admin/users", {
    withCredentials: true,
  });
  return response.data;
});

export const updateUser = createAsyncThunk(
  "admin/updateUser",
  async ({ userId, updatedData }) => {
    const response = await axios.put(
      `http://localhost:5000/admin/users/${userId}`,
      updatedData,
      {
        withCredentials: true,
      }
    );
    return response.data;
  }
);

export const deleteUser = createAsyncThunk(
  "admin/deleteUser",
  async (userId) => {
    await axios.delete(`http://localhost:5000/admin/users/${userId}`, {
      withCredentials: true,
    });
    return userId;
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: { users: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const updatedUserIndex = state.users.findIndex(
          (user) => user._id === action.payload._id
        );
        if (updatedUserIndex !== -1) {
          state.users[updatedUserIndex] = action.payload;
        }
      })

      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user._id !== action.payload);
      });
  },
});

export default adminSlice.reducer;
