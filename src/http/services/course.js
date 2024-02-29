import { privateRoutesHandler } from "../privateRoutesHandler";

export const getCourses = async () => {
  try {
    const data = await privateRoutesHandler("get", "/course/all");
    return data;
  } catch (error) {
    throw error;
  }
};

export const getCourseDetail = async (courseId) => {
  try {
    const data = privateRoutesHandler("get", `/course/get/${courseId}`);
    return data;
  } catch (error) {
    throw error;
  }
};
