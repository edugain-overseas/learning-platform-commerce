import { privateRoutesHandler } from "../privateRoutesHandler";

export const getCategories = async () => {
  try {
    const data = await privateRoutesHandler("get", "/category/all");
    return data;
  } catch (error) {
    throw error;
  }
};
