import { createSlice } from "@reduxjs/toolkit";
import { getCourseDetailThunk, getCoursesThunk } from "./operations";

const initialState = {
  isLoading: false,
  error: null,
  courses: [],
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCoursesThunk.pending, (state, _) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCoursesThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.courses = payload;
      })
      .addCase(getCoursesThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = { code: payload.code, message: payload.message };
      })

      .addCase(getCourseDetailThunk.pending, (state, _) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCourseDetailThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.courses = state.courses.map((course) =>
          course.id === payload.id ? payload : course
        );
      })
      .addCase(getCourseDetailThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = { code: payload.code, message: payload.message };
      });
  },
});

export default courseSlice;
