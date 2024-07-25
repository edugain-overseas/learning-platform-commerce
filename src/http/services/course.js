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

export const createNewCourse = async (course) => {
  try {
    const data = privateRoutesHandler("post", `/course/create`, course);
    return data;
  } catch (error) {
    throw error;
  }
};

export const createLessonInCourse = async (lessonData) => {
  try {
    const data = privateRoutesHandler("post", "/lesson/create", lessonData);
    return data
  } catch (error) {
    throw error;
  }
};
