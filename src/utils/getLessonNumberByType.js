export const getLessonNumberByType = (courseLessons, lessonType, lessonId) => {
  const sortedCourseLessons = [
    ...courseLessons.filter(({ type }) => type === lessonType),
  ].sort((a, b) => a.number - b.number);
  return sortedCourseLessons?.findIndex(({ id }) => id === lessonId) + 1;
};
