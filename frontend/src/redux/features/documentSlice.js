import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchDocuments = createAsyncThunk("documents/fetch", async () => {
  const response = await axios.get("http://localhost:5000/documents", {
    withCredentials: true,
  });
  return response.data;
});

export const uploadDocument = createAsyncThunk(
  "documents/upload",
  async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(
      "http://localhost:5000/documents",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      }
    );

    return response.data;
  }
);

export const deleteDocument = createAsyncThunk(
  "documents/delete",
  async (documentId, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:5000/documents/${documentId}`, {
        withCredentials: true,
      });
      return documentId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const documentSlice = createSlice({
  name: "documents",
  initialState: { documents: [], loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDocuments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDocuments.fulfilled, (state, action) => {
        state.loading = false;
        state.documents = action.payload;
      })
      .addCase(fetchDocuments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(uploadDocument.fulfilled, (state, action) => {
        state.documents.push(action.payload);
      })
      .addCase(deleteDocument.fulfilled, (state, action) => {
        state.documents = state.documents.filter(
          (doc) => doc._id !== action.payload
        );
      })
      .addCase(deleteDocument.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default documentSlice.reducer;
