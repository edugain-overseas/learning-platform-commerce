import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getUserCourses, getUserType } from "../../redux/user/selectors";
import { useListMode } from "../../context/ListModeContext";
import CourseCard from "./CourseCard/CourseCard";
import CourseRow from "./CourseRow/CourseRow";
import styles from "./CoursesList.module.scss";
import CreateNewCourseItem from "./CreateNewCourseItem/CreateNewCourseItem";

const CoursesList = ({ courses }) => {
  const { selectedListModeIndex } = useListMode();
  const { pathname } = useLocation();
  const userCourses = useSelector(getUserCourses) ?? [];
  const isModer = useSelector(getUserType) === "moder";
  const coursesToDisplay = isModer
    ? courses
    : courses.filter(({ is_published }) => is_published);

  return (
    <ul
      className={styles.coursesList}
      style={{ gap: selectedListModeIndex ? "8rem" : "16rem" }}
    >
      {coursesToDisplay.map((course) => {
        const purchased = userCourses.find(
          (userCourse) =>
            userCourse.course_id === course.id &&
            (userCourse.status === "in_progress" ||
              userCourse.status === "completed")
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
      {isModer && <CreateNewCourseItem />}
    </ul>
  );
};

export default CoursesList;
