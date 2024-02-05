import { instance } from "../instance";

export const createUser = async (credentials) => {
  try {
    const { data } = await instance.post("/auth/create", credentials);
    return data;
  } catch (error) {
    console.error("Axios Error:", error);
    throw error;
  }
};
