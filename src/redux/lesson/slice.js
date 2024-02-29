import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  error: null,
  lessons: [],
};

const lessonSlice = createSlice({
  name: "lesson",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // builder
    //   .addCase(activateUserThunk.pending, (state, _) => {
    //     state.isLoading = true;
    //     state.error = null;
    //   })
    //   .addCase(activateUserThunk.fulfilled, (state, { payload }) => {
    //     state.isLoading = false;
    //     state.accessToken = payload.access_token;
    //     state.userId = payload.user_id;
    //     state.username = payload.username;
    //   })
    //   .addCase(activateUserThunk.rejected, (state, { payload }) => {
    //     state.isLoading = false;
    //     state.error = { code: payload.code, message: payload.message };
    //   });
  },
});
