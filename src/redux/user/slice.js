import { createSlice } from "@reduxjs/toolkit";
import {
  activateUserThunk,
  buyCourseThunk,
  getLastUserImagesThunk,
  getUserInfoThunk,
  initializationChatThunk,
  loginThunk,
  loginWithGoogleThunk,
  logoutThunk,
  setNewMainImageThunk,
  setNewPasswordThunk,
  updateStudingTimeThunk,
  updateUserImageThunk,
  updateUserInfoThunk,
  updateUsernameThunk,
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
  previousAvatars: [],
  activeTime: null,
  accessToken: null,
  courses: [],
  balance: 0,
  changedName: false,
  changedSurname: false,
  chats: [],
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    refreshTokenAction(state, { payload }) {
      state.accessToken = payload.access_token;
      state.error = null;
    },
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

      .addCase(loginWithGoogleThunk.pending, (state, _) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginWithGoogleThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.accessToken = payload.access_token;
        state.userId = payload.user_id;
        state.username = payload.username;
      })
      .addCase(loginWithGoogleThunk.rejected, (state, { payload }) => {
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
        state.balance = 0;
        state.changedName = false;
        state.changedSurname = false;
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
        state.avatarURL = payload.image ? payload.image : "";
        state.email = payload.email;
        state.phone = payload.phone ? payload.phone : "";
        state.country = payload.country ? payload.country : "";
        state.userType = payload.user_type;
        state.userId = payload.user_id;
        state.activeTime = payload.studying_time;
        state.courses = payload.courses;
        state.balance = payload.balance;
        state.changedName = payload.changed_name;
        state.changedSurname = payload.changed_surname;
        state.chats = payload.chats;
      })
      .addCase(getUserInfoThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = { code: payload.code, message: payload.message };
      })

      .addCase(updateStudingTimeThunk.pending, (state, _) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateStudingTimeThunk.fulfilled, (state, _) => {
        state.isLoading = false;
      })
      .addCase(updateStudingTimeThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })

      .addCase(updateUserInfoThunk.pending, (state, _) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserInfoThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.name = payload.name;
        state.surname = payload.surname;
        state.email = payload.email;
        state.phone = payload.phone ? payload.phone : "";
        state.country = payload.country ? payload.country : "";
      })
      .addCase(updateUserInfoThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })

      .addCase(updateUsernameThunk.pending, (state, _) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUsernameThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.username = payload.username;
        state.accessToken = payload.access_token;
      })
      .addCase(updateUsernameThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })

      .addCase(getLastUserImagesThunk.pending, (state, _) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getLastUserImagesThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.previousAvatars = payload.reverse();
      })
      .addCase(getLastUserImagesThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })

      .addCase(updateUserImageThunk.pending, (state, _) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserImageThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.avatarURL = payload.path;
        if (state.previousAvatars.length === 6) state.previousAvatars.shift();
        state.previousAvatars.push(payload);
      })
      .addCase(updateUserImageThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })

      .addCase(setNewMainImageThunk.pending, (state, _) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(setNewMainImageThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        const imageId = action.meta.arg;
        state.avatarURL = state.previousAvatars.find(
          ({ id }) => id === imageId
        ).path;
      })
      .addCase(setNewMainImageThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })

      .addCase(buyCourseThunk.pending, (state, _) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(buyCourseThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        console.log(payload);
      })
      .addCase(buyCourseThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })

      .addCase(initializationChatThunk.pending, (state, _) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(initializationChatThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.chats.push(payload)
      })
      .addCase(initializationChatThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export const { refreshTokenAction } = userSlice.actions;
export default userSlice;
