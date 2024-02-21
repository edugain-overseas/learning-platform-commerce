import { instance } from "../instance";

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

export const login = async (credentials) => {
  try {
    instance.defaults.headers["Content-Type"] =
      "application/x-wwww-form-urlencoded";
    const { data } = await instance.post("/user/login", credentials);
    instance.defaults.headers["Authorization"] = `Bearer ${data.access_token}`;
    return data;
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
    const { data } = await instance.get("/user/info/me");
    return data;
  } catch (error) {
    throw error;
  }
};
