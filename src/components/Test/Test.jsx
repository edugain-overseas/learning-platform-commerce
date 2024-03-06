import React from "react";
import { useSelector } from "react-redux";
import { getAllCourses } from "../../redux/course/selectors";
import TestHeader from "../TasksHeader/TestHeader";
import TestContent from "./TestContent";
import CourseAsideProgressPanel from "../CourseAsideProgressPanel/CourseAsideProgressPanel";
import styles from "./Test.module.scss";

const Test = ({ test }) => {
  const { course_id: courseId } = test;

  // const courses = useSelector(getAllCourses);
  const course = useSelector(getAllCourses)?.find(({ id }) => id === +courseId);
  const courseLessons = course?.lessons;
  const testScore = useSelector(getAllCourses)
    ?.find(({ id }) => id === +courseId)
    ?.lessons.find(({ id }) => id === test.id)?.score;

  console.log(testScore);

  return (
    <div className={styles.testWrapper}>
      <TestHeader test={test} testScore={testScore} />
      <div className={styles.bodyWrapper}>
        <TestContent test={test} />
        <div className={styles.progressWrapper}>
          <CourseAsideProgressPanel
            courseLessons={courseLessons ? courseLessons : []}
            courseId={courseId}
            progress={course?.progress}
          />
        </div>
      </div>
    </div>
  );
};

export default Test;
