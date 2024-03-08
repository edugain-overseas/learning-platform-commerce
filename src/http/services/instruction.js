import { instance } from "../instance";
import { privateRoutesHandler } from "../privateRoutesHandler";

export const getGeneralInstuctions = async () => {
  try {
    const { data } = await instance.get("instruction/general");
    return data;
  } catch (error) {
    throw error;
  }
};

export const getCoursesInstuctions = async () => {
  try {
    const data = await privateRoutesHandler("get", "instruction/courses");
    return data;
  } catch (error) {
    throw error;
  }
};

export const getInstuctionById = async (id) => {
  try {
    const { data } = await instance.get(`instruction/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
};
