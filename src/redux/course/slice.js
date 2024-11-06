import { createSlice } from "@reduxjs/toolkit";
import {
  createCourseThunk,
  createLessonInCourseThunk,
  getCourseDetailThunk,
  getCoursesThunk,
  updateCourseThunk,
} from "./operations";
import { confirmLectureThunk } from "../lesson/operation";

const initialState = {
  isLoading: false,
  error: null,
  courses: [],
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    publishCourseAction: (state, { payload: id }) => {
      state.courses.find((course) => course.id === id).is_published = true;
    },
  },
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
      })

      .addCase(createCourseThunk.pending, (state, _) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createCourseThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.courses.push({ ...payload, lessons: [], quantity_test: 0 });
      })
      .addCase(createCourseThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = { code: payload.code, message: payload.message };
      })

      .addCase(updateCourseThunk.pending, (state, _) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCourseThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        const { courseId, courseData } = action.meta.arg;
        const courseIndex = state.courses.findIndex(
          (course) => course.id === +courseId
        );

        if (courseIndex !== -1) {
          state.courses[courseIndex] = {
            ...state.courses[courseIndex],
            ...courseData,
          };
        }
      })
      .addCase(updateCourseThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = { code: payload.code, message: payload.message };
      })

      .addCase(createLessonInCourseThunk.pending, (state, _) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createLessonInCourseThunk.fulfilled, (state, action) => {
        state.isLoading = false;

        const courseIndex = state.courses.findIndex(
          ({ id }) => id === action.meta.arg.course_id
        );

        if (courseIndex !== -1) {
          state.courses[courseIndex].lessons.push(action.payload);
        }
      })
      .addCase(createLessonInCourseThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = { code: payload.code, message: payload.message };
      });
  },
});
export const { publishCourseAction } = courseSlice.actions;
export default courseSlice;
