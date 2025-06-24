import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../redux/user/selectors";
import { getAllCourses } from "../../redux/course/selectors";
import { submitTestAttemptThunk } from "../../redux/lesson/operation";
import { useStudentTest } from "../../hooks/useStudentTest";
import ExamHeader from "./ExamHeader";
import ClosedExamPanel from "./ClosedExamPanel";
import TestContent from "../Test/TestContent";
import styles from "./Exam.module.scss";

const Exam = ({ exam }) => {
  const userInfo = useSelector(getUserInfo);

  const {
    contextHolder,
    studentAnswers,
    setStudentAnswers,
    completedQuestionsAmount,
    timeLeft,
    startTestAttempt,
    showExam,
    onSubmitAttemptBtnClick,
  } = useStudentTest(exam, "exam");

  const { course_id: courseId, id, exam_data: examData } = exam;

  const dispatch = useDispatch();

  const course = useSelector(getAllCourses)?.find(({ id }) => id === +courseId);
  const courseLessons = course?.lessons;
  const status = courseLessons?.find(({ id: examId }) => examId === id)?.status;

  const isExamComleted = status === "completed";

  const bestAttempt = examData?.attempts_data
    ? [...examData?.attempts_data].sort(
        (attemptA, attemptB) => attemptB.attempt_score - attemptA.attempt_score
      )[0]
    : null;

  console.log(userInfo);

  const examScore = bestAttempt?.attempt_score;
  const examMaxScore = examData.score;

  const examStatus = () => {
    const isFirstAttempt = examData.attempts_data?.length === 0;
    const examTime = bestAttempt ? bestAttempt.spent_minutes : null;

    const testsScore = courseLessons
      .filter((lesson) => lesson.type === "test")
      .reduce((score, test) => score + test.score, 0);

    const examMaxTime = examData.timer;
    const attemptsAmount = examData.attempts;

    const stats = {
      testsScore,
      examMaxScore,
      examScore,
      examMaxTime,
      examTime,
      attemptsAmount,
    };

    if (isFirstAttempt) {
      return { status: "firstAttempt", stats };
    } else if (examScore === examMaxScore) {
      return { status: "maxScored", stats };
    } else if (testsScore + examScore > 100) {
      return { status: "passed", stats };
    } else return { status: "failed", stats };
  };

  const handleCompleteCourse = async () => {
    const attempt_id = bestAttempt.id;
    const lesson_id = exam.id;
    const student_id = userInfo.studentId;
    const lessonType = "exam";

    await dispatch(
      submitTestAttemptThunk({
        attempt_id,
        lesson_id,
        student_id,
        lessonType,
      })
    ).unwrap();
  };

  return (
    <div className={styles.examWrapper}>
      {contextHolder}
      <ExamHeader
        exam={exam}
        examInProgress={showExam}
        studentAnswersLength={completedQuestionsAmount}
        submitAttempt={onSubmitAttemptBtnClick}
        examScore={examScore}
        examMaxScore={examMaxScore}
      />
      <div className={styles.bodyWrapper}>
        {showExam ? (
          <TestContent
            test={{ ...exam, status }}
            studentAnswers={studentAnswers}
            setStudentAnswers={setStudentAnswers}
            timeLeft={timeLeft}
          />
        ) : (
          <ClosedExamPanel
            examData={examData}
            isCompleted={isExamComleted}
            stats={examStatus()}
            handleStartExam={startTestAttempt}
            handleCompleteCourse={handleCompleteCourse}
          />
        )}
      </div>
    </div>
  );
};

export default Exam;
