import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createLessonInCourse,
  createNewCourse,
  getCourseDetail,
  getCourses,
  updateCourse,
} from "../../http/services/course";

export const getCoursesThunk = createAsyncThunk(
  "course/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCourses();
      return response;
    } catch (error) {
      return rejectWithValue({
        message: error.response ? error.response.data.detail : error.message,
        status: error.response ? error.response.status : null,
      });
    }
  }
);

export const getCourseDetailThunk = createAsyncThunk(
  "course/getCourseDetail",
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await getCourseDetail(courseId);
      return response;
    } catch (error) {
      return rejectWithValue({
        message: error.response ? error.response.detail : error.message,
        status: error.response ? error.response.status : null,
      });
    }
  }
);

export const createCourseThunk = createAsyncThunk(
  "course/createCourse",
  async (courseData, { rejectWithValue }) => {
    try {
      const response = await createNewCourse(courseData);
      return response;
    } catch (error) {
      return rejectWithValue({
        message: error.response ? error.response.detail : error.message,
        status: error.response ? error.response.status : null,
      });
    }
  }
);

export const updateCourseThunk = createAsyncThunk(
  "course/updateCourse",
  async ({ courseId, courseData }, { rejectWithValue }) => {
    try {
      const response = await updateCourse(courseId, courseData);
      return response;
    } catch (error) {
      // return rejectWithValue({
      //   message: error.response ? error.response.detail : error.message,
      //   status: error.response ? error.response.status : null,
      // });
      return rejectWithValue(error);
    }
  }
);

export const createLessonInCourseThunk = createAsyncThunk(
  "course/createLessonInCourse",
  async (lessonData, { rejectWithValue }) => {
    try {
      const response = await createLessonInCourse(lessonData);
      return response;
    } catch (error) {
      return rejectWithValue({
        message: error.response ? error.response.detail : error.message,
        status: error.response ? error.response.status : null,
      });
    }
  }
);
