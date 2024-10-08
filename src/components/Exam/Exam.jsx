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
import { getTestAttemptById } from "../../http/services/lesson";

const INTERVAL_DELAY = 1000;

const Exam = ({ exam }) => {
  const { course_id: courseId, id, exam_data: examData } = exam;
  const [studentAnswersLength, setStudentAnswersLength] = useState(0);
  const [submitedAttemptData, setSubmitedAttemptData] = useState(null);

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
  const examScore = courseLessons?.find(({ id }) => id === exam.id)?.score;
  const status = courseLessons?.find(({ id: examId }) => examId === id)?.status;
  const sumbittedAttemptId = examData?.my_attempt_id;

  const handleStartExam = () => {
    const changeExamTime = () => {
      setAttemptTime(handleUpdateTime);
    };

    try {
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

  useEffect(() => {
    const fetchAttemptId = async () => {
      try {
        const data = await getTestAttemptById(sumbittedAttemptId, "exam");
        setSubmitedAttemptData(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (sumbittedAttemptId) {
      fetchAttemptId();
    }
  }, [sumbittedAttemptId]);

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
        {!examData.my_score ? (
          showTestContent ? (
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
          )
        ) : (
          <TestContent
            isExam={true}
            closed={true}
            test={{ ...exam, status }}
            answers={submitedAttemptData}
            // setStudentAnswersLength={setStudentAnswersLength}
            // attemptTime={attemptTime}
            // setAnswersToLocalStorage={setAnswers}
            // closeAttempt={closeAttempt}
            // attemptFinished={attemptFinished}
            // setAttemptFinished={setAttemptFinished}
          />
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
