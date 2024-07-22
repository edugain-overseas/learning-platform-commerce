import { instance } from "../instance";
import { privateRoutesHandler } from "../privateRoutesHandler";

export const getCategories = async () => {
  try {
    const { data } = await instance.get("/category/all");
    return data;
  } catch (error) {
    throw error;
  }
};

export const createCategory = async (categoryData) => {
  try {
    const data = await privateRoutesHandler(
      "post",
      "/category/create",
      categoryData
    );
    return data;
  } catch (error) {
    throw error;
  }
};
