import { createSlice } from "@reduxjs/toolkit";
import {
  activateUserThunk,
  createNewNoteThunk,
  createNotesFolderThunk,
  deleteNoteThunk,
  deleteNotesFolderThunk,
  getLastUserImagesThunk,
  getUserCertificatesThunk,
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
import { instance } from "../../http/instance";

const initialState = {
  userId: null,
  studentId: null,
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
  certificates: [],
  balance: 0,
  changedName: false,
  changedSurname: false,
  chats: [],
  notes: [],
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
    refreshTonkenExpiredAction(state, _) {
      Object.keys(initialState).forEach(
        (key) => (state[key] = initialState[key])
      );
      instance.defaults.headers["Authorization"] = null;
      window.location.href =
        "http://localhost:3000/learning-platform-commerce/login";
    },
    moderJoinChat(state, { payload }) {
      const chatId = payload;
      const chatIndex = state.chats.findIndex((chat) => chat.id === chatId);
      if (chatIndex !== -1) {
        state.chats[chatIndex].status = "active";
      }
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
        state.certificates = [];
        state.balance = 0;
        state.changedName = false;
        state.changedSurname = false;
        state.notes = [];
        state.isLoading = false;
        state.error = null;
        state.studentId = null;
      })
      .addCase(logoutThunk.rejected, (state, { payload }) => {
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
        state.certificates = [];
        state.balance = 0;
        state.changedName = false;
        state.changedSurname = false;
        state.notes = [];
        state.isLoading = false;
        state.error = payload;
      })

      .addCase(getUserInfoThunk.pending, (state, _) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserInfoThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.userId = payload.user_id;
        state.studentId = payload.student_id;
        state.userType = payload.user_type;
        state.name = payload.name;
        state.username = payload.username;
        state.surname = payload.surname;
        state.avatarURL = payload.image ? payload.image : "";
        state.email = payload.email;
        state.phone = payload.phone ? payload.phone : "";
        state.country = payload.country ? payload.country : "";
        state.activeTime = payload.studying_time;
        state.courses = payload.courses;
        state.certificates = payload.certificates;
        state.balance = payload.balance;
        state.changedName = payload.changed_name;
        state.changedSurname = payload.changed_surname;
        state.chats = payload.chats;
        state.notes = payload.my_notes;
      })
      .addCase(getUserInfoThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = { code: payload.code, message: payload.message };
      })

      .addCase(getUserCertificatesThunk.pending, (state, _) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserCertificatesThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.certificates = payload.certificates;
      })
      .addCase(getUserCertificatesThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
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
        state.changedName = payload.changed_name;
        state.changedSurname = payload.changed_surname;
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

      .addCase(initializationChatThunk.pending, (state, _) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(initializationChatThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.chats.push(payload);
      })
      .addCase(initializationChatThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })

      .addCase(createNotesFolderThunk.pending, (state, _) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createNotesFolderThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        console.log(payload);

        const newNode = {
          folder_name: payload.name,
          folder_id: payload.id,
          parent_id: payload.parent_id,
          folder_notes: null,
          children_folders: null,
        };

        const addNodeRecursively = (node) => {
          if (node.folder_id === newNode.parent_id) {
            return {
              ...node,
              children_folders:
                node.children_folders === null
                  ? [newNode]
                  : [...node.children_folders, newNode],
            };
          }

          if (node.children_folders === null) {
            return node;
          }

          return {
            ...node,
            children_folders: node.children_folders.map(addNodeRecursively),
          };
        };

        if (newNode.parent_id === null) {
          state.notes = [...state.notes, newNode];
          return;
        }
        state.notes = state.notes.map(addNodeRecursively);
      })
      .addCase(createNotesFolderThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })

      .addCase(deleteNotesFolderThunk.pending, (state, _) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteNotesFolderThunk.fulfilled, (state, action) => {
        state.isLoading = false;

        const folderId = action.meta.arg;

        const deleteNodeRecursively = (node) => {
          const filteredChildren = node.children_folders
            ? node.children_folders.filter(
                (child) => child.folder_id !== folderId
              )
            : [];

          return {
            ...node,
            children_folders: filteredChildren.map(deleteNodeRecursively),
          };
        };

        state.notes = state.notes
          .filter((node) => node.folder_id !== folderId)
          .map(deleteNodeRecursively);
      })
      .addCase(deleteNotesFolderThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })

      .addCase(createNewNoteThunk.pending, (state, _) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createNewNoteThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;

        console.log(payload);

        const newNote = {
          title: payload.title,
          text: payload.text,
          folder_id: payload.folder_id,
          lecture_id: payload.lecture_id,
          note_id: payload.id,
        };

        const addNoteRecursevely = (node) => {
          if (node.folder_id === newNote.folder_id) {
            return {
              ...node,
              folder_notes:
                node.folder_notes === null
                  ? [newNote]
                  : [...node.folder_notes, newNote],
            };
          }

          return {
            ...node,
            children_folders: node.children_folders
              ? node.children_folders.map(addNoteRecursevely)
              : node.children_folders,
          };
        };

        state.notes = state.notes.map(addNoteRecursevely);
      })
      .addCase(createNewNoteThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })

      .addCase(deleteNoteThunk.pending, (state, _) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteNoteThunk.fulfilled, (state, action) => {
        state.isLoading = false;

        const noteId = action.meta.arg;

        const deleteNoteRecursively = (node) => {
          const filtredNotes = node.folder_notes
            ? node.folder_notes.filter((note) => note.note_id !== noteId)
            : node.folder_notes;

          return {
            ...node,
            folder_notes: filtredNotes,
            children_folders: node.children_folders
              ? node.children_folders.map(deleteNoteRecursively)
              : node.children_folders,
          };
        };

        state.notes = state.notes.map(deleteNoteRecursively);
      })
      .addCase(deleteNoteThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export const { refreshTokenAction, refreshTonkenExpiredAction, moderJoinChat } =
  userSlice.actions;
export default userSlice;
