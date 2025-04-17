import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  activateUser,
  createNewNote,
  createNotesFolder,
  deleteNote,
  deleteNotesFolder,
  getLastUserImages,
  getUserCertificates,
  getUserInfo,
  initializationChat,
  login,
  loginWithApple,
  loginWithGoogle,
  logout,
  setNewMainImage,
  setNewPassword,
  updateStudingTime,
  updateUserImage,
  updateUserInfo,
  updateUsername,
} from "../../http/services/user";
import { store } from "../store";
import { setDefaultState } from "../lesson/slice";

export const activateUserThunk = createAsyncThunk(
  "user/activate",
  async (credenrials, { rejectWithValue }) => {
    try {
      const response = await activateUser(credenrials);
      return response;
    } catch (error) {
      return rejectWithValue({
        message: error.response ? error.response.data.detail : error.message,
        status: error.response ? error.response.status : null,
      });
    }
  }
);

export const loginThunk = createAsyncThunk(
  "user/login",
  async (args, { rejectWithValue }) => {
    const { credentials, messageApi, setErrorField, navigate } = args;

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

      if (status === 409) {
        messageApi.open({
          type: "info",
          content: message,
        });
        navigate(
          `/registration?verification=true&username=${credentials.get(
            "username"
          )}`
        );
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

export const loginWithGoogleThunk = createAsyncThunk(
  "user/loginWithGoogle",
  async (token, { rejectWithValue }) => {
    try {
      const response = await loginWithGoogle(token);
      return response;
    } catch (error) {
      return rejectWithValue({
        message: error.response ? error.response.data.detail : error.message,
        status: error.response ? error.response.status : null,
      });
    }
  }
);

export const loginWithAppleThunk = createAsyncThunk(
  "user/loginWithApple",
  async (data, { rejectWithValue }) => {
    try {
      const response = await loginWithApple(data);
      return response;
    } catch (error) {
      return rejectWithValue({
        message: error.response ? error.response.data.detail : error.message,
        status: error.response ? error.response.status : null,
      });
    }
  }
);

export const logoutThunk = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await logout();
      store.dispatch(setDefaultState());
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
      return rejectWithValue({
        message: error.response ? error.response.data.detail : error.message,
        status: error.response ? error.response.status : null,
      });
    }
  }
);

export const getUserCertificatesThunk = createAsyncThunk(
  "user/getUserCertificates",
  async (studentId, { rejectWithValue }) => {
    try {
      const response = await getUserCertificates(studentId);
      return response;
    } catch (error) {
      return rejectWithValue({
        message: error.response ? error.response.data.detail : error.message,
        status: error.response ? error.response.status : null,
      });
    }
  }
);

export const updateStudingTimeThunk = createAsyncThunk(
  "user/updateStudingTime",
  async (newTime, { rejectWithValue }) => {
    try {
      const response = await updateStudingTime(newTime);
      return response;
    } catch (error) {
      return rejectWithValue({
        message: error.response ? error.response.data.detail : error.message,
        status: error.response ? error.response.status : null,
      });
    }
  }
);

export const updateUserInfoThunk = createAsyncThunk(
  "user/updateUserInfo",
  async (credenrials, { rejectWithValue }) => {
    try {
      const response = await updateUserInfo(credenrials);
      return response;
    } catch (error) {
      return rejectWithValue({
        message: error.response ? error.response.data.detail : error.message,
        status: error.response ? error.response.status : null,
      });
    }
  }
);

export const updateUsernameThunk = createAsyncThunk(
  "user/updateUsername",
  async (newUsername, { rejectWithValue }) => {
    try {
      const response = await updateUsername(newUsername);
      return response;
    } catch (error) {
      return rejectWithValue({
        message: error.response ? error.response.data.detail : error.message,
        status: error.response ? error.response.status : null,
      });
    }
  }
);

export const getLastUserImagesThunk = createAsyncThunk(
  "user/getLastUserImages",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getLastUserImages();
      return response;
    } catch (error) {
      return rejectWithValue({
        message: error.response ? error.response.data.detail : error.message,
        status: error.response ? error.response.status : null,
      });
    }
  }
);

export const updateUserImageThunk = createAsyncThunk(
  "user/updateUserImage",
  async (imageFile, { rejectWithValue }) => {
    try {
      const response = await updateUserImage(imageFile);
      return response;
    } catch (error) {
      return rejectWithValue({
        message: error.response ? error.response.data.detail : error.message,
        status: error.response ? error.response.status : null,
      });
    }
  }
);

export const setNewMainImageThunk = createAsyncThunk(
  "user/setNewMainImage",
  async (imageId, { rejectWithValue }) => {
    try {
      const response = await setNewMainImage(imageId);
      return response;
    } catch (error) {
      return rejectWithValue({
        message: error.response ? error.response.data.detail : error.message,
        status: error.response ? error.response.status : null,
      });
    }
  }
);

export const initializationChatThunk = createAsyncThunk(
  "user/initChat",
  async (chatData, { rejectWithValue }) => {
    try {
      const response = await initializationChat(chatData);
      return response;
    } catch (error) {
      return rejectWithValue({
        message: error.response ? error.response.data.detail : error.message,
        status: error.response ? error.response.status : null,
      });
    }
  }
);

export const createNotesFolderThunk = createAsyncThunk(
  "user/createNotesFolder",
  async (folderData, { rejectWithValue }) => {
    try {
      const response = await createNotesFolder(folderData);
      return response;
    } catch (error) {
      return rejectWithValue({
        message: error.response ? error.response.data.detail : error.message,
        status: error.response ? error.response.status : null,
      });
    }
  }
);

export const deleteNotesFolderThunk = createAsyncThunk(
  "user/deleteNotesFolder",
  async (folderId, { rejectWithValue }) => {
    try {
      const response = await deleteNotesFolder(folderId);
      return response;
    } catch (error) {
      return rejectWithValue({
        message: error.response ? error.response.data.detail : error.message,
        status: error.response ? error.response.status : null,
      });
    }
  }
);

export const createNewNoteThunk = createAsyncThunk(
  "user/createNewNote",
  async (noteData, { rejectWithValue }) => {
    try {
      const response = await createNewNote(noteData);
      return response;
    } catch (error) {
      return rejectWithValue({
        message: error.response ? error.response.data.detail : error.message,
        status: error.response ? error.response.status : null,
      });
    }
  }
);

export const deleteNoteThunk = createAsyncThunk(
  "user/deleteNote",
  async (noteId, { rejectWithValue }) => {
    try {
      const response = await deleteNote(noteId);
      return response;
    } catch (error) {
      return rejectWithValue({
        message: error.response ? error.response.data.detail : error.message,
        status: error.response ? error.response.status : null,
      });
    }
  }
);
