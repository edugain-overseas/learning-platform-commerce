import React from "react";
import { useStudentTest } from "../../hooks/useStudentTest";
import TestHeader from "../TasksHeader/TestHeader";
import TestContent from "./TestContent";
import CourseAsideProgressPanel from "../CourseAsideProgressPanel/CourseAsideProgressPanel";
import TestLanding from "./TestLanding";
import CompleteBtn from "../shared/CompleteBtn/CompleteBtn";
import LessonNavigateBtn from "../shared/LessonNavigateBtn/LessonNavigateBtn";
import Spinner from "../Spinner/Spinner";
import ExpiredAttemptsMessage from "../shared/ExpiredAttemptsMessage/ExpiredAttemptsMessage";
import styles from "./Test.module.scss";
import TaskLayout from "../shared/TaskLayout/TaskLayout";

const Test = ({ test }) => {
  const {
    contextHolder,
    studentAnswers,
    setStudentAnswers,
    completedQuestionsAmount,
    submitedAttemptData,
    timeLeft,
    showTest,
    isLoading,
    startTestAttempt,
    onSubmitAttemptBtnClick,
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

  const showExpiredAttemptsMessage =
    isTestClosed &&
    test.test_data?.attempts_data?.every((attempt) => !attempt.is_passed);

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
          <TaskLayout.Container>
            <TaskLayout.Content>
              {showTest || isTestClosed ? (
                <>
                  {showExpiredAttemptsMessage && (
                    <ExpiredAttemptsMessage
                      testId={test.test_data?.test_id}
                      wrapperClassname={styles.expiredMessageWrapper}
                    />
                  )}
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
            </TaskLayout.Content>
            <TaskLayout.Tools>
              {/* <div className={styles.progressWrapper}> */}
                <CourseAsideProgressPanel courseId={courseId} />
              {/* </div> */}
            </TaskLayout.Tools>
          </TaskLayout.Container>
        )}
      </div>
    </>
  );
};

export default Test;
