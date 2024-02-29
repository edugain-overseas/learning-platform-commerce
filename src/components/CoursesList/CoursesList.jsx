import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getUserCourses } from "../../redux/user/selectors";
import { useListMode } from "../../context/ListModeContext";
import CourseCard from "./CourseCard/CourseCard";
import CourseRow from "./CourseRow/CourseRow";
import styles from "./CoursesList.module.scss";

const CoursesList = ({ courses }) => {
  const { selectedListModeIndex } = useListMode();
  const { pathname } = useLocation();
  const userCourses = useSelector(getUserCourses);

  return (
    <ul
      className={styles.coursesList}
      style={{ gap: selectedListModeIndex ? "8rem" : "16rem" }}
    >
      {courses.map((course) => {
        const purchased = userCourses.find(
          (userCourse) =>
            userCourse.course_id === course.id &&
            userCourse.status === "in_progress"
        );
        const disabled = !purchased && pathname === "/courses/my";
        return selectedListModeIndex ? (
          <CourseRow
            key={course.id}
            course={course}
            purchased={purchased}
            disabled={disabled}
          />
        ) : (
          <CourseCard
            key={course.id}
            course={course}
            purchased={purchased}
            disabled={disabled}
          />
        );
      })}
    </ul>
  );
};

export default CoursesList;
