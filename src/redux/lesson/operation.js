import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  confirmLecture,
  confirmTest,
  createLectureAttribute,
  getLessonById,
} from "../../http/services/lesson";
import { store } from "../store";
import { getCoursesThunk } from "../course/operations";

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
      console.log(response);
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
      console.log(attrsData);
      // const attrsRequests = attrsData.map((attrData) =>
      //   createLectureAttribute(attrData)
      // );
      // const response = await Promise.all(attrsRequests);
      // console.log(response);
      // return response;
    } catch (error) {
      return rejectWithValue({
        message: error.response ? error.response.data.detail : error.message,
        status: error.response ? error.response.status : null,
      });
    }
  }
);
