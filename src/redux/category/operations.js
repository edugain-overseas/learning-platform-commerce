import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCategories } from "../../http/services/category";

export const getCategoriesThunk = createAsyncThunk(
  "category/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCategories();
      return response;
    } catch (error) {
      return rejectWithValue({
        message: error.response ? error.response.data.detail : error.message,
        status: error.response ? error.response.status : null,
      });
    }
  }
);
