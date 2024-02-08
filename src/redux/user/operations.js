import { createAsyncThunk } from "@reduxjs/toolkit";
import { activateUser } from "../../http/services/user";

export const activateUserThunk = createAsyncThunk(
  "user/activate",
  async (credenrials, { rejectWithValue }) => {
    try {
      const response = await activateUser(credenrials);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
