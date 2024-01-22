import React from "react";
import styles from "./CoursesList.module.scss";
import CourseCard from "./CourseCard/CourseCard";
import { useListMode } from "../../context/ListModeContext";
import CourseRow from "./CourseRow/CourseRow";

const CoursesList = ({ courses }) => {
  const { selectedListModeIndex } = useListMode();
  console.log(selectedListModeIndex);
  return (
    <ul className={styles.coursesList}>
      {courses.map((course) =>
        selectedListModeIndex ? (
          <CourseRow
            key={course.id}
            course={course}
            purchased={course.purchased}
          />
        ) : (
          <CourseCard
            key={course.id}
            course={course}
            purchased={course.purchased}
          />
        )
      )}
    </ul>
  );
};

export default CoursesList;
