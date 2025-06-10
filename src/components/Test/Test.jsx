import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useMessage from "antd/es/message/useMessage";
import { getAllCourses } from "../../redux/course/selectors";
import { getTestAttemptsThunk } from "../../redux/lesson/operation";
import { getTestAttemptById } from "../../http/services/lesson";
import TestHeader from "../TasksHeader/TestHeader";
import TestContent from "./TestContent";
import CourseAsideProgressPanel from "../CourseAsideProgressPanel/CourseAsideProgressPanel";
import TestLanding from "./TestLanding";
import styles from "./Test.module.scss";

const Test = ({ test }) => {
  const { course_id: courseId, id } = test;
  const [studentAnswersLength, setStudentAnswersLength] = useState(0);
  const [submitedAttemptData, setSubmitedAttemptData] = useState(null);
  const [showTestContent, setShowTestContent] = useState(false);
  const [messageApi, contextHolder] = useMessage();
  const dispatch = useDispatch();

  const course = useSelector(getAllCourses)?.find(({ id }) => id === +courseId);
  const courseLessons = course?.lessons;
  const testScore = courseLessons?.find(({ id }) => id === test.id)?.score;
  const status = courseLessons?.find(({ id: testId }) => testId === id)?.status;

  const testId = test.test_data.test_id;

  const isTestClosed =
    test.test_data.attempts <= test.test_data.attempts_data?.length;

  const sumbittedAttemptId = test.test_data.my_attempt_id;

  console.log(test.test_data);

  useEffect(() => {
    if (testId) {
      dispatch(getTestAttemptsThunk({ test_id: testId }));
    }
    // eslint-disable-next-line
  }, [testId]);

  useEffect(() => {
    const fetchAttemptId = async () => {
      try {
        const data = await getTestAttemptById(sumbittedAttemptId);
        setSubmitedAttemptData(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (sumbittedAttemptId) {
      fetchAttemptId();
    } else {
      setSubmitedAttemptData(null);
    }
  }, [sumbittedAttemptId]);

  const startTestAttmpt = () => {
    setShowTestContent(true)
  }

  return (
    <div className={styles.testWrapper}>
      {contextHolder}
      <TestHeader
        test={test}
        testScore={testScore}
        questionsDoneAmount={studentAnswersLength}
      />
      <div className={styles.bodyWrapper}>
        {showTestContent ? (
          <TestContent
            test={{ ...test, status }}
            setStudentAnswersLength={setStudentAnswersLength}
            closed={isTestClosed}
            answers={submitedAttemptData}
            messageApi={messageApi}
          />
        ) : (
          <TestLanding onStartTest={startTestAttmpt}/>
        )}
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
