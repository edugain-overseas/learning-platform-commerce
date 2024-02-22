import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  activateUser,
  getUserInfo,
  login,
  logout,
  setNewPassword,
} from "../../http/services/user";

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

export const loginThunk = createAsyncThunk(
  "user/login",
  async (args, { rejectWithValue }) => {
    const { credentials, messageApi, setErrorField } = args;

    try {
      const response = await login(credentials);
      return response;
    } catch (error) {
      const status = error.response ? error.response.status : null;
      const message = error.response
        ? error.response.data.detail
        : error.message;

      if (status === 401) {
        if (message.includes("username")) setErrorField("username");

        if (message.includes("password")) setErrorField("password");

        messageApi.open({
          type: "error",
          content: message,
        });
      }

      return rejectWithValue({
        message: message,
        status: status,
      });
    }
  }
);

export const setNewPasswordThunk = createAsyncThunk(
  "user/setNewPassword",
  async (args, { rejectWithValue }) => {
    const { credentials, messageApi, setErrorField } = args;

    try {
      const response = await setNewPassword(credentials);
      return response;
    } catch (error) {
      const status = error.response ? error.response.status : null;
      const message = error.response
        ? error.response.data.detail
        : error.message;

      // if (status === 404 && message.includes("code")) {
      setErrorField("Recovery code");
      messageApi.open({
        type: "error",
        content: `${message}`,
      });
      // }

      return rejectWithValue({
        message: message,
        status: status,
      });
    }
  }
);

export const logoutThunk = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await logout();
      return response;
    } catch (error) {
      return rejectWithValue({
        message: error.response ? error.response.data.detail : error.message,
        status: error.response ? error.response.status : null,
      });
    }
  }
);

export const getUserInfoThunk = createAsyncThunk(
  "user/getInfo",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUserInfo();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
