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

export const createInstruction = async (instructionData) => {
  try {
    const { data } = await instance.post(`instruction/create`, instructionData);
    return data;
  } catch (error) {
    throw error;
  }
};

export const editInstruction = async ({ id, ...instructionData }) => {
  try {
    const { data } = await instance.put(
      `instruction/update/${id}`,
      instructionData
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteInstruction = async (id) => {
  try {
    await instance.delete(`instruction/delete/${id}`);
  } catch (error) {
    throw error;
  }
};
