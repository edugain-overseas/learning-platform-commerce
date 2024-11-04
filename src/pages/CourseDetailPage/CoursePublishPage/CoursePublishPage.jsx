import React from "react";
import LessonsTable from "./LessonTable";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAllCourses } from "../../../redux/course/selectors";

const CoursePublishPage = () => {
  const { courseId } = useParams();
  const course = useSelector(getAllCourses).find(({ id }) => id === +courseId);
  const courseLessons = course?.lessons;
  const lessonsTableData = courseLessons
    ? courseLessons.map((lesson, index) => ({ ...lesson, key: `${index}` }))
    : [];

  return (
    <>
      {courseLessons && (
        <LessonsTable
          lessonsTableData={[...lessonsTableData].sort(
            (a, b) => a.number - b.number
          )}
          courseTitle={course.title}
        />
      )}
    </>
  );
};

export default CoursePublishPage;
