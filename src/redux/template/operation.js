import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createTemplateByType,
  deleteTemplateById,
  getAllTemplates,
} from "../../http/services/template";

export const getAllTemplatesThunk = createAsyncThunk(
  "template/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAllTemplates();
      return data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const createTemplateByTypeThunk = createAsyncThunk(
  "template/createByType",
  async ({ type, templateData }, { rejectWithValue }) => {
    try {
      const data = await createTemplateByType(type, templateData);
      return data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const deleteTemplateByIdThunk = createAsyncThunk(
  "template/deleteById",
  async (id, { rejectWithValue }) => {
    try {
      const data = await deleteTemplateById(id);
      return data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
