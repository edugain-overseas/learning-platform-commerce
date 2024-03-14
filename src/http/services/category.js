import { instance } from "../instance";

export const getCategories = async () => {
  try {
    const { data } = await instance.get("/category/all");
    return data;
  } catch (error) {
    throw error;
  }
};
