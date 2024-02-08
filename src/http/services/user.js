import { instance } from "../instance";

export const createUser = async (credentials) => {
  try {
    const { data } = await instance.post("/auth/create", credentials);
    return data;
  } catch (error) {
    throw error;
  }
};

export const activateUser = async (credentials) => {
  try {
    const { data } = await instance.post("/auth/activate", credentials);
    return data;
  } catch (error) {
    throw error;
  }
};

export const login = async (credentials) => {
  try {
    instance.defaults.headers["Content-Type"] =
      "application/x-wwww-form-urlencoded";
    const { data } = await instance.post("/auth/login", credentials);
    instance.defaults.headers[
      "Authorization"
    ] = `Bearer ${data.access_token}`;
    return data;
  } catch (error) {
    throw error;
  } finally {
    instance.defaults.headers["Content-Type"] = "application/json";
  }
};
