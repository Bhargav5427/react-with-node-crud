import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let inistialstate = {
  user: [],

  isLoading: false,
  isError: false,
};

// fetch Data
export const fetchData = createAsyncThunk(
  "fetchData",
  async (_, { rejectWithValue }) => {
    try {
      let res = await axios.get("http://localhost:3001/v1/user/get");
      return res.data.result;
    } catch (err) {
      return rejectWithValue(
        err.response ? err.response.data.message : err.message
      );
    }
  }
);

// Post Data

export const postData = createAsyncThunk(
  "postData",
  async ({ data }, { rejectWithValue }) => {
    try {
      let res = await axios.post("http://localhost:3001/v1/user/post", data);
      return res.data.result;
    } catch (err) {
      return rejectWithValue(
        err.response ? err.response.data.message : err.message
      );
    }
  }
);

// delete Data
export const deleteData = createAsyncThunk(
  "deleteData",
  async (id, { rejectWithValue }) => {
    try {
      let res = await axios.delete(
        `http://localhost:3001/v1/user/delete/${id}`
      );
      return res.data.result;
    } catch (err) {
      return rejectWithValue(
        err.response ? err.response.data.message : err.message
      );
    }
  }
);

// Update Data
export const updateData = createAsyncThunk(
  "updateData",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      let res = await axios.put(
        `http://localhost:3001/v1/user/update/${id}`,
        data
      );
      return res.data.body;
    } catch (err) {
      return rejectWithValue(
        err.response ? err.response.data.message : err.message
      );
    }
  }
);

export const UserSlice = createSlice({
  name: "user",
  initialState: inistialstate,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.user = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      .addCase(postData.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(postData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = state.user.concat(action.payload);
      })
      .addCase(postData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      .addCase(deleteData.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(deleteData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = state.user.filter(
          (state) => state._id !== action.payload._id
        );
      })
      .addCase(deleteData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      .addCase(updateData.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(updateData.fulfilled, (state, action) => {
        console.log("🚀 ~ .addCase ~ action:", action);
        state.isLoading = false;
        state.user = state.user.map((user) =>
          user._id == action.payload._id ? action.payload : user
        );
      })
      .addCase(updateData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });
  },
});

export default UserSlice.reducer;
