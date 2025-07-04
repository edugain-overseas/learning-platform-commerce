import { createSlice } from "@reduxjs/toolkit";
import {
  confirmTestThunk,
  createLectureAttributesThunk,
  createTestAnswerThunk,
  createTestMatchingPairThunk,
  createTestQuestionsThunk,
  deleteLectureAttributeThunk,
  deleteTestAnswerThunk,
  deleteTestMatchingPairThunk,
  deleteTestQuestionThunk,
  getExamAttemptsThunk,
  getLessonByIdThunk,
  getTestAttemptsThunk,
  submitTestAttemptThunk,
  updateLectureAttributesThunk,
  updateLessonThunk,
  updateTestAnswerThunk,
  updateTestMatchingPairThunk,
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
  reducers: {
    setDefaultState(state) {
      state.lessons = [];
    },
  },
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

      .addCase(updateLessonThunk.pending, (state, _) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateLessonThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        const { updatedLesson } = action.meta.arg;
        const lessonIndex = state.lessons.findIndex(
          ({ id }) => id === updatedLesson.id
        );
        if (lessonIndex !== -1) {
          state.lessons[lessonIndex] = {
            ...state.lessons[lessonIndex],
            ...action.payload,
          };
        }
      })
      .addCase(updateLessonThunk.rejected, (state, { payload }) => {
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
      // test reducers
      .addCase(confirmTestThunk.pending, (state, _) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(confirmTestThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        const { lessonId, lessonType } = action.meta.arg;

        const { message, ...newAttempt } = action.payload;

        const lessonIndex = state.lessons.findIndex(
          (lesson) => lesson.id === lessonId
        );
        if (lessonIndex !== -1) {
          state.lessons[lessonIndex][`${lessonType}_data`].attempts_data.push(
            newAttempt
          );
        }
      })
      .addCase(confirmTestThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = { code: payload.code, message: payload.message };
      })

      .addCase(getTestAttemptsThunk.pending, (state, _) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTestAttemptsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        const { test_id } = action.meta.arg;        

        const lessonIndex = state.lessons.findIndex(
          (lesson) => lesson.test_data?.test_id === test_id
        );
        if (lessonIndex !== -1) {
          state.lessons[lessonIndex].test_data = {
            ...state.lessons[lessonIndex].test_data,
            attempts_data: action.payload ? action.payload : [],
          };
        }
      })
      .addCase(getTestAttemptsThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = { code: payload.code, message: payload.message };
      })

      .addCase(getExamAttemptsThunk.pending, (state, _) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getExamAttemptsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        const { exam_id } = action.meta.arg;

        const lessonIndex = state.lessons.findIndex(
          (lesson) => lesson.exam_data?.exam_id === exam_id
        );
        if (lessonIndex !== -1) {
          state.lessons[lessonIndex].exam_data = {
            ...state.lessons[lessonIndex].exam_data,
            attempts_data: action.payload ? action.payload : [],
          };
        }
      })
      .addCase(getExamAttemptsThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = { code: payload.code, message: payload.message };
      })

      .addCase(submitTestAttemptThunk.pending, (state, _) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(submitTestAttemptThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        const { lesson_id, attempt_id, lessonType } = action.meta.arg;

        const lessonIndex = state.lessons.findIndex(
          (lesson) => lesson.id === lesson_id
        );
        if (lessonIndex !== -1) {
          state.lessons[lessonIndex][`${lessonType}_data`].my_attempt_id =
            attempt_id;
        }
      })
      .addCase(submitTestAttemptThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = { code: payload.code, message: payload.message };
      })

      .addCase(updateTestMetaDataThunk.pending, (state, _) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateTestMetaDataThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        const { testId, newTestMetaData, lessonType } = action.meta.arg;

        const lessonIndex = state.lessons.findIndex(
          (lesson) =>
            lesson[`${lessonType}_data`]?.[`${lessonType}_id`] === testId
        );
        if (lessonIndex !== -1) {
          state.lessons[lessonIndex][`${lessonType}_data`] = {
            ...state.lessons[lessonIndex][`${lessonType}_data`],
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
        const { testId, lessonType } = action.meta.arg;

        const lessonIndex = state.lessons.findIndex(
          (lesson) =>
            lesson[`${lessonType}_data`]?.[`${lessonType}_id`] === testId
        );
        if (lessonIndex !== -1) {
          action.payload.forEach((question) =>
            state.lessons[lessonIndex][`${lessonType}_data`]?.questions?.push(
              question
            )
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
        const { testId, question_id, questionData, lessonType } =
          action.meta.arg;

        const lessonIndex = state.lessons.findIndex(
          (lesson) =>
            lesson[`${lessonType}_data`]?.[`${lessonType}_id`] === testId
        );
        if (lessonIndex !== -1) {
          const questionIndex = state.lessons[lessonIndex][
            `${lessonType}_data`
          ].questions.findIndex((question) => question.q_id === question_id);

          if (questionIndex !== -1) {
            state.lessons[lessonIndex][`${lessonType}_data`].questions[
              questionIndex
            ] = {
              ...state.lessons[lessonIndex][`${lessonType}_data`].questions[
                questionIndex
              ],
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
        const { testId, question_id, lessonType } = action.meta.arg;

        const lessonIndex = state.lessons.findIndex(
          (lesson) =>
            lesson[`${lessonType}_data`]?.[`${lessonType}_id`] === testId
        );
        if (lessonIndex !== -1) {
          state.lessons[lessonIndex][`${lessonType}_data`].questions =
            state.lessons[lessonIndex][`${lessonType}_data`].questions.filter(
              (question) => question.q_id !== question_id
            );
        }
      })
      .addCase(deleteTestQuestionThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = { code: payload.code, message: payload.message };
      })

      .addCase(createTestAnswerThunk.pending, (state, _) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createTestAnswerThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        const { testId, question_id, lessonType } = action.meta.arg;

        const lessonIndex = state.lessons.findIndex(
          (lesson) =>
            lesson[`${lessonType}_data`]?.[`${lessonType}_id`] === testId
        );
        if (lessonIndex !== -1) {
          const questionIndex = state.lessons[lessonIndex][
            `${lessonType}_data`
          ].questions.findIndex((question) => question.q_id === question_id);

          if (questionIndex !== -1) {
            state.lessons[lessonIndex][`${lessonType}_data`].questions[
              questionIndex
            ].answers.push(action.payload);
          }
        }
      })
      .addCase(createTestAnswerThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = { code: payload.code, message: payload.message };
      })

      .addCase(createTestMatchingPairThunk.pending, (state, _) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createTestMatchingPairThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        const { testId, question_id, lessonType } = action.meta.arg;

        const lessonIndex = state.lessons.findIndex(
          (lesson) =>
            lesson[`${lessonType}_data`]?.[`${lessonType}_id`] === testId
        );
        if (lessonIndex !== -1) {
          const questionIndex = state.lessons[lessonIndex][
            `${lessonType}_data`
          ].questions.findIndex((question) => question.q_id === question_id);

          if (questionIndex !== -1) {
            state.lessons[lessonIndex][`${lessonType}_data`].questions[
              questionIndex
            ].answers.left.push({
              value: action.payload.left_text,
              id: action.payload.left_id,
            });
            state.lessons[lessonIndex][`${lessonType}_data`].questions[
              questionIndex
            ].answers.right.push({
              value: action.payload.right_text,
              id: action.payload.right_id,
            });
          }
        }
      })
      .addCase(createTestMatchingPairThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = { code: payload.code, message: payload.message };
      })

      .addCase(updateTestAnswerThunk.pending, (state, _) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateTestAnswerThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        const { testId, question_id, answer_id, answerData, lessonType } =
          action.meta.arg;

        const lessonIndex = state.lessons.findIndex(
          (lesson) =>
            lesson[`${lessonType}_data`]?.[`${lessonType}_id`] === testId
        );

        if (lessonIndex !== -1) {
          const questionIndex = state.lessons[lessonIndex][
            `${lessonType}_data`
          ]?.questions.findIndex((question) => question.q_id === question_id);

          if (questionIndex !== -1) {
            const answerIndex = state.lessons[lessonIndex][
              `${lessonType}_data`
            ].questions[questionIndex].answers.findIndex(
              (answer) => answer.a_id === answer_id
            );

            if (answerIndex !== -1) {
              state.lessons[lessonIndex][`${lessonType}_data`].questions[
                questionIndex
              ].answers[answerIndex] = { a_id: answer_id, ...answerData };
            }
          }
        }
      })
      .addCase(updateTestAnswerThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = { code: payload.code, message: payload.message };
      })

      .addCase(updateTestMatchingPairThunk.pending, (state, _) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateTestMatchingPairThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        const { testId, question_id, left_option_id, pairData, lessonType } =
          action.meta.arg;

        const lessonIndex = state.lessons.findIndex(
          (lesson) =>
            lesson[`${lessonType}_data`]?.[`${lessonType}_id`] === testId
        );
        if (lessonIndex !== -1) {
          const questionIndex = state.lessons[lessonIndex][
            `${lessonType}_data`
          ].questions.findIndex((question) => question.q_id === question_id);

          if (questionIndex !== -1) {
            const leftOptionIndex = state.lessons[lessonIndex][
              `${lessonType}_data`
            ].questions[questionIndex].answers.left.find(
              ({ id }) => id === left_option_id
            );
            const rightOptionIndex = state.lessons[lessonIndex][
              `${lessonType}_data`
            ].questions[questionIndex].answers.right.find(
              ({ id }) => id === left_option_id
            );
            if (leftOptionIndex) {
              state.lessons[lessonIndex][`${lessonType}_data`].questions[
                questionIndex
              ].answers.left[leftOptionIndex].value = pairData.left_text;
            }
            if (rightOptionIndex) {
              state.lessons[lessonIndex][`${lessonType}_data`].questions[
                questionIndex
              ].answers.right[rightOptionIndex].value = pairData.right_text;
            }
          }
        }
      })
      .addCase(updateTestMatchingPairThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = { code: payload.code, message: payload.message };
      })

      .addCase(deleteTestAnswerThunk.pending, (state, _) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteTestAnswerThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        const { testId, answer_id, lessonType } = action.meta.arg;

        const lessonIndex = state.lessons.findIndex(
          (lesson) =>
            lesson[`${lessonType}_data`]?.[`${lessonType}_id`] === testId
        );
        if (lessonIndex !== -1) {
          state.lessons[lessonIndex][`${lessonType}_data`].questions =
            state.lessons[lessonIndex][`${lessonType}_data`].questions.map(
              (question) => {
                if (question.q_type !== "matching") {
                  return {
                    ...question,
                    answers: question.answers.filter(
                      (answer) => answer.a_id !== answer_id
                    ),
                  };
                }
                return question;
              }
            );
        }
      })
      .addCase(deleteTestAnswerThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = { code: payload.code, message: payload.message };
      })

      .addCase(deleteTestMatchingPairThunk.pending, (state, _) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteTestMatchingPairThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        const { testId, left_option_id, lessonType } = action.meta.arg;

        const lessonIndex = state.lessons.findIndex(
          (lesson) =>
            lesson[`${lessonType}_data`]?.[`${lessonType}_id`] === testId
        );
        if (lessonIndex !== -1) {
          state.lessons[lessonIndex][`${lessonType}_data`].questions =
            state.lessons[lessonIndex][`${lessonType}_data`].questions.map(
              (question) => {
                if (question.q_type === "matching") {
                  return {
                    ...question,
                    answers: {
                      left: question.answers.left.filter(
                        ({ id }) => id !== left_option_id
                      ),
                      right: question.answers.right.filter(
                        ({ id }) => id !== left_option_id
                      ),
                    },
                  };
                }
                return question;
              }
            );
        }
      })
      .addCase(deleteTestMatchingPairThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = { code: payload.code, message: payload.message };
      });
  },
});
export const { setDefaultState } = lessonSlice.actions;
export default lessonSlice;
