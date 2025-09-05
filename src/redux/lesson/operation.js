import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  confirmLecture,
  confirmTest,
  createLectureAttribute,
  createTestAnswer,
  createTestMatchingPair,
  createTestQuestions,
  deleteLectureAttribute,
  deleteLesson,
  deleteTestAnswer,
  deleteTestMatchingPair,
  deleteTestQuestion,
  getExamAttempts,
  getLessonById,
  getTestAttempts,
  submitTestAttempt,
  updateLectureAttribute,
  updateLesson,
  updateTestAnswer,
  updateTestMatchingPair,
  updateTestMetaData,
  updateTestQuestion,
} from "../../http/services/lesson";
import { store } from "../store";
import { getCoursesThunk } from "../course/operations";
import { blocksToLectureAttributes } from "../../utils/lectureAttributesToBlocks";
import { deleteLessonInCourse, updateLessonInCourse } from "../course/slice";

export const getLessonByIdThunk = createAsyncThunk(
  "lesson/getLesson",
  async (lessonId, { rejectWithValue }) => {
    try {
      const response = await getLessonById(lessonId);
      return response;
    } catch (error) {
      return rejectWithValue({
        message: error.response ? error.response.data.detail : error.message,
        status: error.response ? error.response.status : null,
      });
    }
  }
);

export const updateLessonThunk = createAsyncThunk(
  "lesson/updateLesson",
  async ({ courseId, updatedLesson }, { rejectWithValue }) => {
    try {
      const { id, ...updatedLessonData } = updatedLesson;
      const response = await updateLesson(id, updatedLessonData);

      store.dispatch(
        updateLessonInCourse({ courseId, lessonId: id, updatedLessonData })
      );
      return response;
    } catch (error) {
      return rejectWithValue({
        message: error.response ? error.response.data.detail : error.message,
        status: error.response ? error.response.status : null,
      });
    }
  }
);

export const deleteLessonThunk = createAsyncThunk(
  "lesson/deleteLesson",
  async ({ courseId, lessonId }, { rejectWithValue }) => {
    try {
      const response = await deleteLesson(lessonId);

      store.dispatch(deleteLessonInCourse({ courseId, lessonId }));

      return response;
    } catch (error) {
      return rejectWithValue({
        message: error.response ? error.response.data.detail : error.message,
        status: error.response ? error.response.status : null,
      });
    }
  }
);

export const confirmLectureThunk = createAsyncThunk(
  "lesson/confirmLecture",
  async (lessonId, { rejectWithValue }) => {
    try {
      const response = await confirmLecture(lessonId);
      store.dispatch(getCoursesThunk());
      // await getCourses();
      return response;
    } catch (error) {
      return rejectWithValue({
        message: error.response ? error.response.data.detail : error.message,
        status: error.response ? error.response.status : null,
      });
    }
  }
);

export const confirmTestThunk = createAsyncThunk(
  "lesson/confirmTest",
  async (
    { lessonId, studentTest, lessonType = "test", spentMinutes },
    { rejectWithValue }
  ) => {
    try {
      const response = await confirmTest(
        lessonId,
        studentTest,
        lessonType,
        spentMinutes
      );
      return response;
    } catch (error) {
      return rejectWithValue({
        message: error.response ? error.response.data.detail : error.message,
        status: error.response ? error.response.status : null,
      });
    }
  }
);

export const getTestAttemptsThunk = createAsyncThunk(
  "lesson/getTestAttempts",
  async ({ test_id }, { rejectWithValue }) => {
    try {
      const response = await getTestAttempts(test_id);
      return response;
    } catch (error) {
      return rejectWithValue({
        message: error.response ? error.response.data.detail : error.message,
        status: error.response ? error.response.status : null,
      });
    }
  }
);

export const getExamAttemptsThunk = createAsyncThunk(
  "lesson/getExamAttempts",
  async ({ exam_id }, { rejectWithValue }) => {
    try {
      const response = await getExamAttempts(exam_id);
      return response;
    } catch (error) {
      return rejectWithValue({
        message: error.response ? error.response.data.detail : error.message,
        status: error.response ? error.response.status : null,
      });
    }
  }
);

export const submitTestAttemptThunk = createAsyncThunk(
  "lesson/submitTestAttempt",
  async (attemptData, { rejectWithValue }) => {
    try {
      const response = await submitTestAttempt(attemptData);
      store.dispatch(getCoursesThunk());
      return response;
    } catch (error) {
      return rejectWithValue({
        message: error.response ? error.response.data.detail : error.message,
        status: error.response ? error.response.status : null,
      });
    }
  }
);

export const createLectureAttributesThunk = createAsyncThunk(
  "lesson/createLectureAttributes",
  async ({ lectureId, attrsData }, { rejectWithValue }) => {
    try {
      const attrsRequests = attrsData.map((attrData) =>
        createLectureAttribute(lectureId, attrData)
      );
      const response = await Promise.all(attrsRequests);
      return response;
    } catch (error) {
      return rejectWithValue({
        message: error.response ? error.response.data.detail : error.message,
        status: error.response ? error.response.status : null,
      });
    }
  }
);

export const updateLectureAttributesThunk = createAsyncThunk(
  "lesson/updateLectureAttributes",
  async ({ attrsData }, { rejectWithValue }) => {
    try {
      const attrsRequests = attrsData.map(({ a_id, ...rest }) => {
        return updateLectureAttribute(a_id, rest);
      });
      const response = await Promise.all(attrsRequests);
      return blocksToLectureAttributes(response);
    } catch (error) {
      return rejectWithValue({
        message: error.response ? error.response.data.detail : error.message,
        status: error.response ? error.response.status : null,
      });
    }
  }
);

export const deleteLectureAttributeThunk = createAsyncThunk(
  "lesson/deleteLectureAttribute",
  async ({ attrId }, { rejectWithValue }) => {
    try {
      await deleteLectureAttribute(attrId);
    } catch (error) {
      return rejectWithValue({
        message: error.response ? error.response.data.detail : error.message,
        status: error.response ? error.response.status : null,
      });
    }
  }
);

export const updateTestMetaDataThunk = createAsyncThunk(
  "lesson/updateTestMetaData",
  async ({ testId, newTestMetaData, lessonType }, { rejectWithValue }) => {
    try {
      await updateTestMetaData(testId, newTestMetaData, lessonType);
    } catch (error) {
      return rejectWithValue({
        message: error.response ? error.response.data.detail : error.message,
        status: error.response ? error.response.status : null,
      });
    }
  }
);

export const createTestQuestionsThunk = createAsyncThunk(
  "lesson/createTestQuestions",
  async ({ testId, questionsData, lessonType }, { rejectWithValue }) => {
    try {
      const data = await createTestQuestions(testId, questionsData, lessonType);
      return data.questions;
    } catch (error) {
      return rejectWithValue({
        message: error.response ? error.response.data.detail : error.message,
        status: error.response ? error.response.status : null,
      });
    }
  }
);

export const deleteTestQuestionThunk = createAsyncThunk(
  "lesson/deleteTestQuestion",
  async ({ question_id, lessonType }, { rejectWithValue }) => {
    try {
      await deleteTestQuestion(question_id, lessonType);
    } catch (error) {
      return rejectWithValue({
        message: error.response ? error.response.data.detail : error.message,
        status: error.response ? error.response.status : null,
      });
    }
  }
);

export const createTestAnswerThunk = createAsyncThunk(
  "lesson/createTestAnswer",
  async ({ answerData, question_id, lessonType }, { rejectWithValue }) => {
    try {
      const response = await createTestAnswer({
        ...answerData,
        question_id,
        lessonType,
      });
      return response;
    } catch (error) {
      return rejectWithValue({
        message: error.response ? error.response.data.detail : error.message,
        status: error.response ? error.response.status : null,
      });
    }
  }
);

export const createTestMatchingPairThunk = createAsyncThunk(
  "lesson/createTestMatchingPair",
  async ({ pairData, question_id, lessonType }, { rejectWithValue }) => {
    try {
      const response = await createTestMatchingPair({
        ...pairData,
        question_id,
        lessonType,
      });
      return response;
    } catch (error) {
      return rejectWithValue({
        message: error.response ? error.response.data.detail : error.message,
        status: error.response ? error.response.status : null,
      });
    }
  }
);

export const updateTestAnswerThunk = createAsyncThunk(
  "lesson/updateTestAnswer",
  async ({ answer_id, answerData, lessonType }, { rejectWithValue }) => {
    try {
      await updateTestAnswer(answer_id, answerData, lessonType);
    } catch (error) {
      return rejectWithValue({
        message: error.response ? error.response.data.detail : error.message,
        status: error.response ? error.response.status : null,
      });
    }
  }
);

export const updateTestMatchingPairThunk = createAsyncThunk(
  "lesson/updateTestMatchingPair",
  async ({ left_option_id, pairData, lessonType }, { rejectWithValue }) => {
    try {
      await updateTestMatchingPair(left_option_id, pairData, lessonType);
    } catch (error) {
      return rejectWithValue({
        message: error.response ? error.response.data.detail : error.message,
        status: error.response ? error.response.status : null,
      });
    }
  }
);

export const deleteTestAnswerThunk = createAsyncThunk(
  "lesson/deleteTestAnswer",
  async ({ answer_id, lessonType }, { rejectWithValue }) => {
    try {
      await deleteTestAnswer(answer_id, lessonType);
    } catch (error) {
      return rejectWithValue({
        message: error.response ? error.response.data.detail : error.message,
        status: error.response ? error.response.status : null,
      });
    }
  }
);

export const updateTestQuestionThunk = createAsyncThunk(
  "lesson/updateTestQuestion",
  async ({ question_id, questionData, lessonType }, { rejectWithValue }) => {
    try {
      await updateTestQuestion(question_id, questionData, lessonType);
    } catch (error) {
      return rejectWithValue({
        message: error.response ? error.response.data.detail : error.message,
        status: error.response ? error.response.status : null,
      });
    }
  }
);

export const deleteTestMatchingPairThunk = createAsyncThunk(
  "lesson/deleteTestMatchingPair",
  async ({ left_option_id, lessonType }, { rejectWithValue }) => {
    try {
      await deleteTestMatchingPair(left_option_id, lessonType);
    } catch (error) {
      return rejectWithValue({
        message: error.response ? error.response.data.detail : error.message,
        status: error.response ? error.response.status : null,
      });
    }
  }
);
