import { createSlice } from "@reduxjs/toolkit";
import { createCategoryThunk, getCategoriesThunk } from "./operations";

const initialState = {
  isLoading: false,
  error: null,
  categories: [],
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategoriesThunk.pending, (state, _) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCategoriesThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.categories = payload;
      })
      .addCase(getCategoriesThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = { code: payload.code, message: payload.message };
      })

      .addCase(createCategoryThunk.pending, (state, _) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createCategoryThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.categories.push(payload);
      })
      .addCase(createCategoryThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = { code: payload.code, message: payload.message };
      });
  },
});

export default categorySlice;
