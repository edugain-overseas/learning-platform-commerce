import { createSlice } from "@reduxjs/toolkit";
import { createLectureAttributesThunk, getLessonByIdThunk } from "./operation";

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
      })

      .addCase(createLectureAttributesThunk.pending, (state, _) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createLectureAttributesThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        const { lectureId } = action.meta.arg;
        const lessonIndex = state.lessons.findIndex(
          (lesson) => lesson.lecture_info.lecture_id === lectureId
        );
        console.log(action.payload);
        if (lessonIndex !== -1) {
          state.lessons[lessonIndex].lecture_info.attributes.push(
            ...action.payload
          );
        }
      })
      .addCase(createLectureAttributesThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = { code: payload.code, message: payload.message };
      });
  },
});

export default lessonSlice;
