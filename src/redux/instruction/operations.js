import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCoursesInstuctions,
  getGeneralInstuctions,
  getInstuctionById,
} from "../../http/services/instruction";

export const getGeneralInstuctionsThunk = createAsyncThunk(
  "instruction/getGeneralInstructions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getGeneralInstuctions();
      return response;
    } catch (error) {
      return rejectWithValue({
        message: error.response ? error.response.data.detail : error.message,
        status: error.response ? error.response.status : null,
      });
    }
  }
);

export const getCoursesInstuctionsThunk = createAsyncThunk(
  "instruction/getCoursesInstructions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCoursesInstuctions();
      return response;
    } catch (error) {
      return rejectWithValue({
        message: error.response ? error.response.data.detail : error.message,
        status: error.response ? error.response.status : null,
      });
    }
  }
);

export const getInstuctionByIdThunk = createAsyncThunk(
  "instruction/getInstuctionById",
  async (instructionId, { rejectWithValue }) => {
    try {
      const response = await getInstuctionById(instructionId);
      return response;
    } catch (error) {
      return rejectWithValue({
        message: error.response ? error.response.data.detail : error.message,
        status: error.response ? error.response.status : null,
      });
    }
  }
);
