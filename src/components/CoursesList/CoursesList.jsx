import React from "react";
import styles from "./CoursesList.module.scss";
import CourseCard from "./CourseCard/CourseCard";
import { useListMode } from "../../context/ListModeContext";
import CourseRow from "./CourseRow/CourseRow";
import { useLocation } from "react-router-dom";

const CoursesList = ({ courses }) => {
  const { selectedListModeIndex } = useListMode();
  const { pathname } = useLocation();

  return (
    <ul
      className={styles.coursesList}
      style={{ gap: selectedListModeIndex ? "8rem" : "16rem" }}
    >
      {courses.map((course) =>
        selectedListModeIndex ? (
          <CourseRow
            key={course.id}
            course={course}
            purchased={course.purchased}
            disabled={!course.purchased && pathname === "/courses/my"}
          />
        ) : (
          <CourseCard
            key={course.id}
            course={course}
            purchased={course.purchased}
            disabled={!course.purchased && pathname === "/courses/my"}
          />
        )
      )}
    </ul>
  );
};

export default CoursesList;
