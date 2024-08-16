import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  confirmLecture,
  confirmTest,
  createLectureAttribute,
  createTestAnswer,
  createTestMatchingPair,
  createTestQuestions,
  deleteLectureAttribute,
  deleteTestAnswer,
  deleteTestMatchingPair,
  deleteTestQuestion,
  getLessonById,
  getTestAttempts,
  updateLectureAttribute,
  updateTestAnswer,
  updateTestMatchingPair,
  updateTestMetaData,
  updateTestQuestion,
} from "../../http/services/lesson";
import { store } from "../store";
import { getCoursesThunk } from "../course/operations";
import { blocksToLectureAttributes } from "../../utils/lectureAttributesToBlocks";

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
  async ({ lessonId, studentTest }, { rejectWithValue }) => {
    try {
      const response = await confirmTest(lessonId, studentTest);
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
      console.log(error);
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
      console.log(response);
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
  async ({ testId, newTestMetaData }, { rejectWithValue }) => {
    try {
      await updateTestMetaData(testId, newTestMetaData);
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
  async ({ testId, questionsData }, { rejectWithValue }) => {
    try {
      const data = await createTestQuestions(testId, questionsData);
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
  async ({ question_id }, { rejectWithValue }) => {
    try {
      await deleteTestQuestion(question_id);
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
  async ({ answerData, question_id }, { rejectWithValue }) => {
    try {
      const response = await createTestAnswer({ ...answerData, question_id });
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
  async ({ pairData, question_id }, { rejectWithValue }) => {
    try {
      const response = await createTestMatchingPair({
        ...pairData,
        question_id,
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
  async ({ answer_id, answerData }, { rejectWithValue }) => {
    try {
      await updateTestAnswer(answer_id, answerData);
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
  async ({ left_option_id, pairData }, { rejectWithValue }) => {
    try {
      await updateTestMatchingPair(left_option_id, pairData);
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
  async ({ answer_id }, { rejectWithValue }) => {
    try {
      await deleteTestAnswer(answer_id);
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
  async ({ question_id, questionData }, { rejectWithValue }) => {
    try {
      await updateTestQuestion(question_id, questionData);
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
  async ({ left_option_id }, { rejectWithValue }) => {
    try {
      await deleteTestMatchingPair(left_option_id);
    } catch (error) {
      return rejectWithValue({
        message: error.response ? error.response.data.detail : error.message,
        status: error.response ? error.response.status : null,
      });
    }
  }
);
