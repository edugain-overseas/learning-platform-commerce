import { createSlice } from "@reduxjs/toolkit";
import {
  createLectureAttributesThunk,
  createTestQuestionsThunk,
  deleteLectureAttributeThunk,
  deleteTestAnswerThunk,
  deleteTestQuestionThunk,
  getLessonByIdThunk,
  updateLectureAttributesThunk,
  updateTestMetaDataThunk,
  updateTestQuestionThunk,
} from "./operation";

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
      // lecture reducers
      .addCase(createLectureAttributesThunk.pending, (state, _) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createLectureAttributesThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        const { lectureId } = action.meta.arg;
        const lessonIndex = state.lessons.findIndex(
          (lesson) => lesson.lecture_info?.lecture_id === lectureId
        );
        if (lessonIndex !== -1) {
          state.lessons[lessonIndex].lecture_info.attributes.push(
            ...action.payload
          );
        }
      })
      .addCase(createLectureAttributesThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = { code: payload.code, message: payload.message };
      })

      .addCase(updateLectureAttributesThunk.pending, (state, _) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateLectureAttributesThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        const { lectureId } = action.meta.arg;

        const lessonIndex = state.lessons.findIndex(
          (lesson) => lesson.lecture_info?.lecture_id === lectureId
        );

        action.payload.forEach((payloadItem) => {
          const attrIndex = state.lessons[
            lessonIndex
          ].lecture_info.attributes.findIndex(
            (attr) => attr.a_id === payloadItem.a_id
          );
          if (attrIndex !== -1) {
            state.lessons[lessonIndex].lecture_info.attributes[attrIndex] =
              payloadItem;
          }
        });
      })
      .addCase(updateLectureAttributesThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = { code: payload.code, message: payload.message };
      })

      .addCase(deleteLectureAttributeThunk.pending, (state, _) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteLectureAttributeThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        const { lectureId, attrId } = action.meta.arg;

        const lessonIndex = state.lessons.findIndex(
          (lesson) => lesson.lecture_info?.lecture_id === lectureId
        );
        if (lessonIndex !== -1) {
          const attrIndex = state.lessons[
            lessonIndex
          ].lecture_info.attributes.findIndex((attr) => attr.a_id === attrId);
          if (attrIndex !== -1) {
            state.lessons[lessonIndex].lecture_info.attributes.splice(
              attrIndex,
              1
            );
          }
        }
      })
      .addCase(deleteLectureAttributeThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = { code: payload.code, message: payload.message };
      })
      // Test reducers
      .addCase(updateTestMetaDataThunk.pending, (state, _) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateTestMetaDataThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        const { testId, newTestMetaData } = action.meta.arg;

        const lessonIndex = state.lessons.findIndex(
          (lesson) => lesson.test_data?.test_id === testId
        );
        if (lessonIndex !== -1) {
          state.lessons[lessonIndex].test_data = {
            ...state.lessons[lessonIndex].test_data,
            ...newTestMetaData,
          };
        }
      })
      .addCase(updateTestMetaDataThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = { code: payload.code, message: payload.message };
      })

      .addCase(createTestQuestionsThunk.pending, (state, _) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createTestQuestionsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        const { testId } = action.meta.arg;

        const lessonIndex = state.lessons.findIndex(
          (lesson) => lesson.test_data?.test_id === testId
        );
        if (lessonIndex !== -1) {
          action.payload.forEach((question) =>
            state.lessons[lessonIndex].test_data?.questions?.push(question)
          );
        }
      })
      .addCase(createTestQuestionsThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = { code: payload.code, message: payload.message };
      })

      .addCase(updateTestQuestionThunk.pending, (state, _) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateTestQuestionThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        const { testId, question_id, questionData } = action.meta.arg;

        const lessonIndex = state.lessons.findIndex(
          (lesson) => lesson.test_data?.test_id === testId
        );
        if (lessonIndex !== -1) {
          const questionIndex = state.lessons[
            lessonIndex
          ].test_data.questions.findIndex(
            (question) => question.q_id === question_id
          );

          if (questionIndex !== -1) {
            state.lessons[lessonIndex].test_data.questions[questionIndex] = {
              ...state.lessons[lessonIndex].test_data.questions[questionIndex],
              ...questionData,
            };
          }
        }
      })
      .addCase(updateTestQuestionThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = { code: payload.code, message: payload.message };
      })

      .addCase(deleteTestQuestionThunk.pending, (state, _) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteTestQuestionThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        const { testId, question_id } = action.meta.arg;

        const lessonIndex = state.lessons.findIndex(
          (lesson) => lesson.test_data?.test_id === testId
        );
        if (lessonIndex !== -1) {
          state.lessons[lessonIndex].test_data.questions = state.lessons[
            lessonIndex
          ].test_data.questions.filter(
            (question) => question.q_id !== question_id
          );
        }
      })
      .addCase(deleteTestQuestionThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = { code: payload.code, message: payload.message };
      })

      .addCase(deleteTestAnswerThunk.pending, (state, _) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteTestAnswerThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        const { testId, answer_id } = action.meta.arg;

        const lessonIndex = state.lessons.findIndex(
          (lesson) => lesson.test_data?.test_id === testId
        );
        if (lessonIndex !== -1) {
          state.lessons[lessonIndex].test_data.questions = state.lessons[
            lessonIndex
          ].test_data.questions.map((question) => ({
            ...question,
            answers: question.answers.filter(
              (answer) => answer.a_id !== answer_id
            ),
          }));
        }
      })
      .addCase(deleteTestAnswerThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = { code: payload.code, message: payload.message };
      });
  },
});

export default lessonSlice;
