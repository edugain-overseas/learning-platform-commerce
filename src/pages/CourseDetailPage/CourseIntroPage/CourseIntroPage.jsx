import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAllCourses } from "../../../redux/course/selectors";

import IntroContent from "./IntroContent";
import styles from "./CourseIntroPage.module.scss";

const CourseIntroPage = () => {
  const { courseId } = useParams();
  const courses = useSelector(getAllCourses);
  const course = courses.find(({ id }) => id === +courseId);

  return (
    <div className={styles.introContainer}>
      {course ? (
        <IntroContent course={course} courses={courses} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CourseIntroPage;
