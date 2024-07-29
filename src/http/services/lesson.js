import { privateRoutesHandler } from "../privateRoutesHandler";

const createLectureAttributeUrlOption = {
  text: "text",
  present: "file",
  audio: "file",
  video: "file",
  picture: "images",
  file: "files",
  link: "link",
};

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

export const createLectureAttribute = async (lectureId, attrData) => {
  try {
    const data = await privateRoutesHandler(
      "post",
      `lecture/create/${createLectureAttributeUrlOption[attrData.a_type]}`,
      attrData,
      {
        params: {
          lecture_id: lectureId,
        },
      }
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateLectureAttribute = async (attr_id, attrData) => {
  try {
    await privateRoutesHandler(
      "patch",
      `lecture/update/${createLectureAttributeUrlOption[attrData.a_type]}`,
      attrData,
      {
        params: { attr_id },
      }
    );
    return { a_id: attr_id, ...attrData };
  } catch (error) {
    throw error;
  }
};

export const deleteLectureAttribute = async (attr_id) => {
  try {
    const data = await privateRoutesHandler("delete", `lecture/delete/attr`, {
      params: { attr_id },
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateTestMetaData = async (test_id, newTestMetaData) => {
  try {
    const data = await privateRoutesHandler(
      "patch",
      "test/update",
      newTestMetaData,
      {
        params: { test_id },
      }
    );
    return data;
  } catch (error) {
    throw error;
  }
};
