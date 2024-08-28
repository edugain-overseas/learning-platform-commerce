import React, { useEffect, useRef, useState } from "react";
import styles from "./Exam.module.scss";
import TestHeader from "../TasksHeader/TestHeader";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../../redux/course/selectors";
import CourseAsideProgressPanel from "../CourseAsideProgressPanel/CourseAsideProgressPanel";
import TestContent from "../Test/TestContent";
import useLocalStorage from "../../hooks/useLocalStorage";
import { getExamAttemptsThunk } from "../../redux/lesson/operation";
import ClosedExamPanel from "./ClosedExamPanel";
import { minutesToMilliseconds } from "../../utils/formatTime";
import useMessage from "antd/es/message/useMessage";

const INTERVAL_DELAY = 1000;

const Exam = ({ exam }) => {
  const { course_id: courseId, id, exam_data: examData } = exam;
  const [studentAnswersLength, setStudentAnswersLength] = useState(0);

  const [attemptTime, setAttemptTime] = useLocalStorage(
    `exam_${examData.exam_id}_timer`,
    minutesToMilliseconds(exam.exam_data.timer)
    // 30000
  );
  const intervalId = useRef(null);

  const [showTestContent, setShowTestContent] = useState(() => {
    const resumeExam = () => {
      const changeExamTime = () => {
        setAttemptTime((prevTime) => {
          const newTime = prevTime - INTERVAL_DELAY;

          // if (newTime <= 0) {
          //   // send results to server.
          //   // Show modal with message "time is over. Your score: score from server".
          //   // setShowTestContent(false);
          //   clearInterval(intervalId.current);
          //   return 0;
          // }

          return newTime;
        });
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
  const examScore = courseLessons?.find(({ id }) => id === exam.id)?.score;
  const status = courseLessons?.find(({ id: examId }) => examId === id)?.status;

  const handleStartExam = () => {
    const changeExamTime = () => {
      setAttemptTime((prevTime) => {
        const newTime = prevTime - INTERVAL_DELAY;

        if (newTime <= 0) {
          // send results to server.
          // Show modal with message "time is over. Your score: score from server".
          // setShowTestContent(false);
          // clearInterval(intervalId.current);
          return 0;
        }

        return newTime;
      });
    };

    try {
      // send start attempt request on server
      setShowTestContent(true);
      intervalId.current = setInterval(changeExamTime, INTERVAL_DELAY);
    } catch (error) {}
  };

  const closeAttempt = () => {
    clearInterval(intervalId.current);
    intervalId.current = null;

    setShowTestContent(false);
    setAnswers([]);
    setAttemptTime(minutesToMilliseconds(exam.exam_data.timer));
  };

  useEffect(() => {
    if (examData.exam_id) {
      dispatch(getExamAttemptsThunk({ exam_id: examData.exam_id }));
    }
    // eslint-disable-next-line
  }, [examData.exam_id]);

  return (
    <div className={styles.examWrapper}>
      {contextHolder}
      <TestHeader
        test={exam}
        testScore={examScore}
        questionsDoneAmount={studentAnswersLength}
        isExam={true}
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
          examData.attempts &&
          examData.attempts_data && (
            <ClosedExamPanel
              examData={examData}
              handleStartExam={handleStartExam}
            />
          )
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

export default Exam;
