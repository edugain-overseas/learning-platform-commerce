import { createAsyncThunk } from "@reduxjs/toolkit";
import { createCategory, getCategories, updateCategory } from "../../http/services/category";

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

export const createCategoryThunk = createAsyncThunk(
  "category/create",
  async (categoryData, { rejectWithValue }) => {
    try {
      const response = await createCategory(categoryData);
      return response;
    } catch (error) {
      return rejectWithValue({
        message: error.response ? error.response.data.detail : error.message,
        status: error.response ? error.response.status : null,
      });
    }
  }
);

export const updateCategoryThunk = createAsyncThunk(
  "category/update",
  async (categoryData, { rejectWithValue }) => {
    const {categoryId, updatedCategoryData} = categoryData;
    try {
      const response = await updateCategory(categoryId, updatedCategoryData);
      return response;
    } catch (error) {
      return rejectWithValue({
        message: error.response ? error.response.data.detail : error.message,
        status: error.response ? error.response.status : null,
      });
    }
  }
);
