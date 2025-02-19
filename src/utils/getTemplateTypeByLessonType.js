export const getTemplateTypeByLessonType = (lessonType) => {
  switch (lessonType) {
    case "lecture":
      return "lecture";
    case "test":
    case "exam":
      return "practical";
    default:
      return null;
  }
};
