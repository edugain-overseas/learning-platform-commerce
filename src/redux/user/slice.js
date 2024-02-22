import { createSlice } from "@reduxjs/toolkit";
import {
  activateUserThunk,
  getUserInfoThunk,
  loginThunk,
  logoutThunk,
  setNewPasswordThunk,
} from "./operations";

const initialState = {
  userId: null,
  userType: null,
  name: "",
  surname: "",
  username: "",
  email: "",
  phone: "",
  country: "",
  avatarURL: "",
  activeTime: null,
  accessToken: null,
  courses: [],
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserFromGoogleAPI(state, { payload }) {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(activateUserThunk.pending, (state, _) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(activateUserThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.accessToken = payload.access_token;
        state.userId = payload.user_id;
        state.username = payload.username;
      })
      .addCase(activateUserThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = { code: payload.code, message: payload.message };
      })

      .addCase(loginThunk.pending, (state, _) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.accessToken = payload.access_token;
        state.userId = payload.user_id;
        state.username = payload.username;
      })
      .addCase(loginThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })

      .addCase(setNewPasswordThunk.pending, (state, _) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(setNewPasswordThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.accessToken = payload.access_token;
        state.userId = payload.user_id;
        state.username = payload.username;
      })
      .addCase(setNewPasswordThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })

      .addCase(logoutThunk.pending, (state, _) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutThunk.fulfilled, (state, _) => {
        state.userId = null;
        state.userType = null;
        state.name = "";
        state.username = "";
        state.surname = "";
        state.email = "";
        state.phone = "";
        state.country = "";
        state.avatarURL = "";
        state.activeTime = null;
        state.accessToken = null;
        state.courses = [];
        state.isLoading = false;
        state.error = null;
      })
      .addCase(logoutThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })

      .addCase(getUserInfoThunk.pending, (state, _) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserInfoThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.name = payload.name;
        state.username = payload.username;
        state.surname = payload.surname;
        state.avatarURL = payload.image;
        state.country = payload.country;
        state.email = payload.email;
        state.phone = payload.phone;
        state.userType = payload.user_type;
        state.userId = payload.user_id;
        state.activeTime = payload.studying_time;
        state.courses = payload.courses;

        // balance: 0;
      })
      .addCase(getUserInfoThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = { code: payload.code, message: payload.message };
      });
  },
});

export default userSlice;
