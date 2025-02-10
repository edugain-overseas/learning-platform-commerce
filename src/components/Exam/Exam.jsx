import React, { useEffect, useRef, useState } from "react";
import styles from "./Exam.module.scss";
// import TestHeader from "../TasksHeader/TestHeader";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../redux/user/selectors";
import { getAllCourses } from "../../redux/course/selectors";
// import CourseAsideProgressPanel from "../CourseAsideProgressPanel/CourseAsideProgressPanel";
import TestContent from "../Test/TestContent";
import useLocalStorage from "../../hooks/useLocalStorage";
import {
  confirmTestThunk,
  getExamAttemptsThunk,
  submitTestAttemptThunk,
} from "../../redux/lesson/operation";
import ClosedExamPanel from "./ClosedExamPanel";
import {
  convertMillisecondsToMinutesAndSeconds,
  minutesToMilliseconds,
} from "../../utils/formatTime";
import useMessage from "antd/es/message/useMessage";
import ExamHeader from "./ExamHeader";

const INTERVAL_DELAY = 1000;

const Exam = ({ exam }) => {
  const userInfo = useSelector(getUserInfo);
  // console.log(userInfo);

  const { course_id: courseId, id, exam_data: examData } = exam;
  const [studentAnswersLength, setStudentAnswersLength] = useState(0);

  const [attemptTime, setAttemptTime] = useLocalStorage(
    `exam_${examData.exam_id}_timer`,
    minutesToMilliseconds(exam.exam_data.timer)
  );
  const intervalId = useRef(null);

  const handleUpdateTime = (prevTime) => {
    const newTime = prevTime - INTERVAL_DELAY;
    return newTime <= 0 ? 0 : newTime;
  };

  const [showTestContent, setShowTestContent] = useState(() => {
    const resumeExam = () => {
      const changeExamTime = () => {
        setAttemptTime(handleUpdateTime);
      };
      intervalId.current = setInterval(changeExamTime, INTERVAL_DELAY);
    };

    if (attemptTime !== minutesToMilliseconds(examData.timer)) {
      console.log("should start");
      resumeExam();

      return true;
    }
    return false;
  });

  const [attemptFinished, setAttemptFinished] = useState(false);

  const [answers, setAnswers] = useLocalStorage(
    `exam_${examData.exam_id}_answers`,
    []
  );

  const [messageApi, contextHolder] = useMessage();

  const dispatch = useDispatch();

  const course = useSelector(getAllCourses)?.find(({ id }) => id === +courseId);
  const courseLessons = course?.lessons;
  const status = courseLessons?.find(({ id: examId }) => examId === id)?.status;

  useEffect(() => {
    if (examData.exam_id) {
      dispatch(getExamAttemptsThunk({ exam_id: examData.exam_id }));
    }
    // eslint-disable-next-line
  }, [examData.exam_id]);

  const closeAttempt = () => {
    clearInterval(intervalId.current);
    intervalId.current = null;

    setShowTestContent(false);
    setAnswers([]);
    setAttemptTime(minutesToMilliseconds(exam.exam_data.timer));
  };

  const handleStartExam = () => {
    const changeExamTime = () => {
      setAttemptTime(handleUpdateTime);
    };

    try {
      setShowTestContent(true);
      intervalId.current = setInterval(changeExamTime, INTERVAL_DELAY);
    } catch (error) {}
  };

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

  const submitAttempt = async () => {
    const spentMinutes =
      examData.timer -
      convertMillisecondsToMinutesAndSeconds(attemptTime).minutes;

    try {
      const response = await dispatch(
        confirmTestThunk({
          lessonId: exam.id,
          studentTest: answers,
          lessonType: "exam",
          spentMinutes: spentMinutes,
        })
      ).unwrap();
      setAnswers([]);
      setStudentAnswersLength(0);
      closeAttempt();

      messageApi.success({
        content: response.message,
        duration: 5,
      });
    } catch (error) {
      messageApi?.error({
        content: error?.message ? error.message : "Something went wrong",
        duration: 3,
      });
    }
  };

  return (
    <div className={styles.examWrapper}>
      {contextHolder}
      <ExamHeader
        exam={exam}
        examInProgress={showTestContent}
        studentAnswersLength={studentAnswersLength}
        submitAttempt={submitAttempt}
        examScore={examScore}
        examMaxScore={examMaxScore}
      />
      <div className={styles.bodyWrapper}>
        {showTestContent ? (
          <TestContent
            isExam={true}
            test={{ ...exam, status }}
            setStudentAnswersLength={setStudentAnswersLength}
            attemptTime={attemptTime}
            setAnswersToLocalStorage={setAnswers}
            answers={answers}
            closeAttempt={closeAttempt}
            attemptFinished={attemptFinished}
            setAttemptFinished={setAttemptFinished}
            messageApi={messageApi}
          />
        ) : (
          <ClosedExamPanel
            examData={examData}
            isCompleted={isExamComleted}
            stats={examStatus()}
            handleStartExam={handleStartExam}
            handleCompleteCourse={handleCompleteCourse}
          />
        )}
      </div>
    </div>
  );
};

export default Exam;
