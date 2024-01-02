import React from "react";
import styles from "./CoursesList.module.scss";
import CourseItem from "./CourseItem/CourseItem";

const CoursesList = ({ courses }) => {
  return (
    <ul className={styles.coursesList}>
      {courses.map((course) => (
        <CourseItem key={course.id} course={course} />
      ))}
    </ul>
  );
};

export default CoursesList;
