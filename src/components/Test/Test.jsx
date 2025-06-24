import React from "react";
import { useStudentTest } from "../../hooks/useStudentTest";
import TestHeader from "../TasksHeader/TestHeader";
import TestContent from "./TestContent";
import CourseAsideProgressPanel from "../CourseAsideProgressPanel/CourseAsideProgressPanel";
import TestLanding from "./TestLanding";
import CompleteBtn from "../shared/CompleteBtn/CompleteBtn";
import LessonNavigateBtn from "../shared/LessonNavigateBtn/LessonNavigateBtn";
import Spinner from "../Spinner/Spinner";
import styles from "./Test.module.scss";

const Test = ({ test }) => {
  const {
    contextHolder,
    studentAnswers,
    setStudentAnswers,
    completedQuestionsAmount,
    submitedAttemptData,
    timeLeft,
    startTestAttempt,
    showTest,
    onSubmitAttemptBtnClick,
    isLoading,
  } = useStudentTest(test, "test");

  const { course_id: courseId } = test;
  const isTestClosed =
    test?.test_data?.attempts <= test.test_data?.attempts_data?.length ||
    submitedAttemptData;

  const completeAttemptBtnState = submitedAttemptData ? "fulfilled" : "default";

  const bottomTools = (
    <div className={styles.bottomNavBtnsWrapper}>
      <LessonNavigateBtn
        forward={false}
        currentNumber={test.number}
        courseId={courseId}
        label="Return to previous"
        width="200rem"
        height="38rem"
      />
      <CompleteBtn
        onClick={onSubmitAttemptBtnClick}
        state={isLoading ? "pending" : completeAttemptBtnState}
      />
      <LessonNavigateBtn
        forward={true}
        currentNumber={test.number}
        courseId={courseId}
        label="Move on to next"
        width="200rem"
        height="38rem"
      />
    </div>
  );

  return (
    <>
      <div className={styles.testWrapper}>
        {contextHolder}
        <TestHeader
          test={test}
          testScore={0}
          questionsDoneAmount={completedQuestionsAmount}
        />
        {isLoading ? (
          <Spinner />
        ) : (
          <div className={styles.bodyWrapper}>
            {showTest || isTestClosed ? (
              <>
                <TestContent
                  studentAnswers={submitedAttemptData || studentAnswers}
                  setStudentAnswers={setStudentAnswers}
                  test={{ ...test }}
                  closed={isTestClosed}
                  answers={submitedAttemptData}
                  timeLeft={timeLeft}
                  bottomTools={bottomTools}
                />
              </>
            ) : (
              <TestLanding
                onStartTest={startTestAttempt}
                testData={{ ...test.test_data, timer: test.scheduled_time }}
              />
            )}
            <div className={styles.progressWrapper}>
              <CourseAsideProgressPanel courseId={courseId} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Test;
