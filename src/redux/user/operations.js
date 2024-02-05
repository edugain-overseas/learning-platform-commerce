import { createAsyncThunk } from "@reduxjs/toolkit";
import { createUser } from "../../http/services/user";

export const createUserThunk = createAsyncThunk(
  "user/create",
  async (credenrials, { rejectWithValue }) => {
    try {
      const response = await createUser(credenrials);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
