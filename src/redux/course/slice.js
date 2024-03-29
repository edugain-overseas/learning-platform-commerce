import { createSlice } from "@reduxjs/toolkit";
import { getCourseDetailThunk, getCoursesThunk } from "./operations";
import { confirmLectureThunk } from "../lesson/operation";

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
        console.log(payload);
        state.courses = state.courses.map((course) =>
          course.id === payload.id ? { ...course, ...payload } : course
        );
      })
      .addCase(getCourseDetailThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = { code: payload.code, message: payload.message };
      })

      .addCase(confirmLectureThunk.fulfilled, (state, action) => {
        const lessonId = action.meta.arg;
        const courseToUpdate = state.courses.find(({ lessons }) =>
          lessons.find(({ id }) => {
            return id === lessonId;
          })
        );
        if (courseToUpdate) {
          courseToUpdate.lessons.forEach((lesson) => {
            if (lesson.id === lessonId) {
              lesson.status = "completed";
            }
          });
        }
      })
      .addCase(confirmLectureThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = { code: payload.code, message: payload.message };
      });
  },
});

export default courseSlice;
