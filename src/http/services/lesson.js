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

export const updateLesson = async (lessonId, updatedLesson) => {
  try {
    const data = await privateRoutesHandler(
      "put",
      `/lesson/update/${lessonId}`,
      updatedLesson
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const confirmLecture = async (lessonId) => {
  try {
    const data = await privateRoutesHandler("post", "/lecture/confirm", null, {
      params: {
        lesson_id: lessonId,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const confirmTest = async (lessonId, studentTest, lessonType) => {
  try {
    const data = await privateRoutesHandler(
      "post",
      `/student-${lessonType}/send`,
      {
        lesson_id: lessonId,
        student_answers: studentTest,
      }
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const getTestAttempts = async (test_id) => {
  try {
    const data = await privateRoutesHandler(
      "get",
      `/student-test/attempts?test_id=${test_id}`
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const getExamAttempts = async (exam_id) => {
  try {
    const data = await privateRoutesHandler(
      "get",
      `/student-exam/attempts?exam_id=${exam_id}`
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const getTestAttemptById = async (attempt_id, lessonType = "test") => {
  try {
    const data = await privateRoutesHandler(
      "get",
      `/student-${lessonType}/attempt/${attempt_id}`
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const submitTestAttempt = async ({
  attempt_id,
  student_id,
  lesson_id,
  lessonType = "test",
}) => {
  try {
    const data = await privateRoutesHandler(
      "post",
      `student-${lessonType}/submit`,
      {
        attempt_id,
        student_id,
        lesson_id,
      }
    );
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

export const updateTestMetaData = async (
  test_id,
  newTestMetaData,
  lessonType = "test"
) => {
  try {
    const data = await privateRoutesHandler(
      "patch",
      `${lessonType}/update`,
      newTestMetaData,
      {
        params: { [`${lessonType}_id`]: test_id },
      }
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const createTestQuestions = async (
  test_id,
  questionsData,
  lessonType = "test"
) => {
  try {
    const data = await privateRoutesHandler(
      "post",
      `${lessonType}/question/add`,
      questionsData,
      {
        params: { [`${lessonType}_id`]: test_id },
      }
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateTestQuestion = async (
  question_id,
  questionData,
  lessonType = "test"
) => {
  try {
    await privateRoutesHandler(
      "patch",
      `${lessonType}/question/update`,
      questionData,
      {
        params: { question_id },
      }
    );
  } catch (error) {
    throw error;
  }
};

export const deleteTestQuestion = async (question_id, lessonType = "test") => {
  try {
    await privateRoutesHandler("delete", `${lessonType}/question/delete`, {
      params: { question_id },
    });
  } catch (error) {
    throw error;
  }
};

export const createTestAnswer = async (answerData, lessonType = "test") => {
  try {
    const data = await privateRoutesHandler(
      "post",
      `${lessonType}/answer/add`,
      answerData
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const createTestMatchingPair = async (pairData, lessonType = "test") => {
  try {
    const data = await privateRoutesHandler(
      "post",
      `${lessonType}/matching/add`,
      pairData
    );
    return data;
  } catch (error) {
    throw error;
  }
};
export const updateTestAnswer = async (
  answer_id,
  answerData,
  lessonType = "test"
) => {
  try {
    const data = await privateRoutesHandler(
      "patch",
      `${lessonType}/answer/update`,
      answerData,
      { params: { answer_id } }
    );
    return data;
  } catch (error) {
    throw error;
  }
};
export const updateTestMatchingPair = async (
  left_option_id,
  pairData,
  lessonType = "test"
) => {
  try {
    const data = await privateRoutesHandler(
      "patch",
      `${lessonType}/matching/update`,
      pairData,
      { params: { left_option_id } }
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteTestAnswer = async (answer_id, lessonType = "test") => {
  try {
    await privateRoutesHandler("delete", `${lessonType}/answer/delete`, {
      params: { answer_id },
    });
  } catch (error) {
    throw error;
  }
};

export const deleteTestMatchingPair = async (
  left_option_id,
  lessonType = "test"
) => {
  try {
    await privateRoutesHandler("delete", `${lessonType}/matching/delete`, {
      params: { left_option_id },
    });
  } catch (error) {
    throw error;
  }
};
