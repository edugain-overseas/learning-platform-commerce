import { createSlice } from "@reduxjs/toolkit";
import { getLessonByIdThunk } from "./operation";

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
    builder
      .addCase(getLessonByIdThunk.pending, (state, _) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getLessonByIdThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.lessons = [
          ...state.lessons.filter((lesson) => lesson.id !== payload.id),
          payload,
        ];
      })
      .addCase(getLessonByIdThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = { code: payload.code, message: payload.message };
      });
  },
});

export default lessonSlice;
