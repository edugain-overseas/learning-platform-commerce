import { privateRoutesHandler } from "../privateRoutesHandler";

export const getLessonById = async (lessonId) => {
  try {
    const data = await privateRoutesHandler("get", `/lesson/get/${lessonId}`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const confirmLecture = async (lessonId) => {
  try {
    const data = await privateRoutesHandler(
      "post",
      "/lesson/lecture/confirm",
      null,
      {
        params: {
          lesson_id: lessonId,
        },
      }
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const confirmTest = async (lessonId, studentTest) => {
  try {
    const data = await privateRoutesHandler("post", "/lesson/student-test", {
      lesson_id: lessonId,
      student_answers: studentTest,
    });
    return data;
  } catch (error) {
    throw error;
  }
};
