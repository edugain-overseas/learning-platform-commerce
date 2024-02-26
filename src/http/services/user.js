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
    const { data } = await instance.post("/user/activate", credentials);
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
    const response = await instance.post("/user/login", credentials);
    instance.defaults.headers[
      "Authorization"
    ] = `Bearer ${response.data.access_token}`;
    console.log(response);
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
    const { data } = await instance.post("/user/set-new-pass", credentials);
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
    const { data } = await instance.post("/user/login-with-google", {
      google_token: googleToken,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    const { data } = await instance.get("/user/logout");
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

export const updateStudingTime = async (newTime) => {
  try {
    const { data } = await instance.put("user/update/time", null, {
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
    console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
};
