import { instance } from "../instance";
import { privateRoutesHandler } from "../privateRoutesHandler";

export const createUser = async (credentials) => {
  try {
    const response = await instance.post("/user/create", credentials);
    return response;
  } catch (error) {
    throw error;
  }
};

export const activateUser = async (credentials) => {
  try {
    const { data } = await instance.post("/user/activate", credentials, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const resendActivationCode = async (username) => {
  try {
    const response = await instance.get("user/resend-activation-code", {
      params: {
        username,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const login = async (credentials) => {
  try {
    instance.defaults.headers["Content-Type"] =
      "application/x-wwww-form-urlencoded";
    const response = await instance.post("/user/login", credentials, {
      withCredentials: true,
    });
    instance.defaults.headers[
      "Authorization"
    ] = `Bearer ${response.data.access_token}`;
    return response.data;
  } catch (error) {
    throw error;
  } finally {
    instance.defaults.headers["Content-Type"] = "application/json";
  }
};

export const resetPassword = async (email) => {
  try {
    const response = await instance.post("/user/reset-pass", { email });
    return response;
  } catch (error) {
    throw error;
  }
};

export const setNewPassword = async (credentials) => {
  try {
    const { data } = await instance.post("/user/set-new-pass", credentials, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const resendPasswordResetCode = async (email) => {
  try {
    const response = await instance.get("/user/resend-password-reset-code", {
      params: { email },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const loginWithGoogle = async (googleToken) => {
  try {
    const { data } = await instance.post(
      "/user/login-with-google",
      {
        google_token: googleToken,
      },
      { withCredentials: true }
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    const data = await privateRoutesHandler("get", "/user/logout", {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const getUserInfo = async () => {
  try {
    const data = await privateRoutesHandler("get", "/user/info/me");
    return data;
  } catch (error) {
    throw error;
  }
};

export const getUserCertificates = async (studentId) => {
  try {
    const data = await privateRoutesHandler("get", "/certificates/my", {
      params: {
        student_id: studentId,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateStudingTime = async (newTime) => {
  try {
    const data = await privateRoutesHandler("put", "user/update/time", null, {
      params: {
        time: newTime,
      },
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const refreshToken = async () => {
  try {
    const { data } = await instance.get("user/refresh", {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateUserInfo = async (credentials) => {
  try {
    const data = await privateRoutesHandler(
      "put",
      "user/update/info",
      credentials
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateUsername = async (newUsername) => {
  try {
    const data = await privateRoutesHandler(
      "put",
      "user/update/username",
      {
        username: newUsername,
      },
      { withCredentials: true }
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateUserImage = async (imageFormData) => {
  try {
    const data = await privateRoutesHandler(
      "put",
      "user/update/image",
      imageFormData,
      { headers: { "Content-Type": "application/x-wwww-form-urlencoded" } }
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const getLastUserImages = async () => {
  try {
    const data = await privateRoutesHandler("get", "user/my-images");
    return data;
  } catch (error) {
    throw error;
  }
};

export const setNewMainImage = async (imageId) => {
  try {
    const data = await privateRoutesHandler(
      "put",
      "/user/set-main-image",
      null,
      {
        params: {
          image_id: imageId,
        },
      }
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const getPaymentLink = async (
  student_id,
  payment_items,
  success_url,
  cancel_url
) => {
  try {
    const data = await privateRoutesHandler("post", "stripe/cart", {
      student_id,
      payment_items,
      success_url,
      cancel_url,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const subscribeCourses = async (sessionId) => {
  try {
    const data = await privateRoutesHandler(
      "post",
      `stripe/course-subscribe/desktop?session_id=${sessionId}`
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const initializationChat = async (chatData) => {
  try {
    const data = await privateRoutesHandler(
      "post",
      "/chat/initial-chat",
      chatData
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const createNotesFolder = async (folderData) => {
  try {
    const data = await privateRoutesHandler(
      "post",
      "/notes/create/folder",
      folderData
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteNotesFolder = async (folderId) => {
  try {
    const data = await privateRoutesHandler(
      "delete",
      `/notes/delete/folder?folder_id=${folderId}`
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const createNewNote = async (noteData) => {
  try {
    const data = await privateRoutesHandler(
      "post",
      "/notes/create/note",
      noteData
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteNote = async (noteId) => {
  try {
    const data = await privateRoutesHandler(
      "delete",
      `/notes/delete/note?note_id=${noteId}`
    );
    return data;
  } catch (error) {
    throw error;
  }
};
