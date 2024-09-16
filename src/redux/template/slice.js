import { createSlice } from "@reduxjs/toolkit";
import {
  createTemplateByTypeThunk,
  deleteTemplateByIdThunk,
  getAllTemplatesThunk,
} from "./operation";

const initialState = {
  isLoading: false,
  templates: [],
  error: null,
};

const templateSlice = createSlice({
  name: "template",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTemplatesThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllTemplatesThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.templates = payload;
      })
      .addCase(getAllTemplatesThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })

      .addCase(createTemplateByTypeThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createTemplateByTypeThunk.fulfilled, (state, action) => {
        const title = action.meta.arg.templateData.title;
        const type = action.meta.arg.type;
        const id = action.payload.template_id;
        state.templates.push({ title, type, id });
        state.isLoading = false;
      })
      .addCase(createTemplateByTypeThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })

      .addCase(deleteTemplateByIdThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteTemplateByIdThunk.fulfilled, (state, action) => {
        const id = action.meta.arg;
        state.isLoading = false;
        state.templates = state.templates.filter(
          (template) => template.id !== id
        );
      })
      .addCase(deleteTemplateByIdThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export default templateSlice;
