import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCourseDetail, getCourses } from "../../http/services/course";

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
        message: error.response ? error.response.data.detail : error.message,
        status: error.response ? error.response.status : null,
      });
    }
  }
);
