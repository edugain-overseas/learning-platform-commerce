import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getAllCourses } from "../../redux/course/selectors";
import TestHeader from "../TasksHeader/TestHeader";
import TestContent from "./TestContent";
import CourseAsideProgressPanel from "../CourseAsideProgressPanel/CourseAsideProgressPanel";
import styles from "./Test.module.scss";

const Test = ({ test }) => {
  const { course_id: courseId, id } = test;
  const [studentAnswersLength, setStudentAnswersLength] = useState(0);

  const course = useSelector(getAllCourses)?.find(({ id }) => id === +courseId);
  const courseLessons = course?.lessons;
  const testScore = courseLessons?.find(({ id }) => id === test.id)?.score;
  const status = courseLessons?.find(({ id: testId }) => testId === id)?.status;

  return (
    <div className={styles.testWrapper}>
      <TestHeader
        test={test}
        testScore={testScore}
        questionsDoneAmount={studentAnswersLength}
      />
      <div className={styles.bodyWrapper}>
        <TestContent
          test={{ ...test, status }}
          setStudentAnswersLength={setStudentAnswersLength}
        />
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
