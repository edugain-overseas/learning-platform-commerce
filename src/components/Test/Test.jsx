import React from "react";
import { lessons } from "../../assets/courses";
import TestHeader from "../TasksHeader/TestHeader";
import TestContent from "./TestContent";
import CourseAsideProgressPanel from "../CourseAsideProgressPanel/CourseAsideProgressPanel";
import styles from "./Test.module.scss";


const Test = ({ test }) => {
  const { courseId } = test;

  const courseLessons = lessons.filter(
    ({ courseId: course_id }) => course_id === +courseId
  );
  return (
    <div className={styles.testWrapper}>
      <TestHeader test={test} />
      <div className={styles.bodyWrapper}>
        <TestContent test={test} />
        <div className={styles.progressWrapper}>
          <CourseAsideProgressPanel
            courseLessons={courseLessons}
            courseId={courseId}
          />
        </div>
      </div>
    </div>
  );
};

export default Test;
