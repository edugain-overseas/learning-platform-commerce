import useMessage from "antd/es/message/useMessage";
import { useEffect, useRef, useState } from "react";
import { getTestAttemptById } from "../http/services/lesson";
import { useDispatch } from "react-redux";
import {
  confirmTestThunk,
  getExamAttemptsThunk,
  getTestAttemptsThunk,
} from "../redux/lesson/operation";
import { useTimer } from "./useTimer";
import {
  convertMillisecondsToMinutesAndSeconds,
  minutesToMilliseconds,
} from "../utils/formatTime";
import useLocalStorage from "./useLocalStorage";

export const useStudentTest = (test, lessonType) => {
  const lessonId = test.id;
  const testId = test[`${lessonType}_data`]?.[`${lessonType}_id`];
  const answersStorageKey = `${lessonType}-${lessonId}-answers`;
  const timerStorageKey = `${lessonType}-${lessonId}-timer`;
  const initialTime = minutesToMilliseconds(test.scheduled_time);

  const [submitedAttemptData, setSubmitedAttemptData] = useState(null);
  const [studentAnswers, setStudentAnswers] = useLocalStorage(
    answersStorageKey,
    []
  );
  const [showTestContent, setShowTestContent] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [messageApi, contextHolder] = useMessage();
  const studentAnswersRef = useRef([]);

  useEffect(() => {
    studentAnswersRef.current = studentAnswers;
  }, [studentAnswers]);

  const dispatch = useDispatch();

  const startTestAttempt = () => {
    setShowTestContent(true);
    startTimer();
  };

  const closeTestAttempt = () => {
    setShowTestContent(false);
    clearTimer();
  };

  const handleTimeEnd = async () => {
    messageApi.loading({
      content: "Time is up! Calculating your result...",
      duration: 0,
    });
    try {
      const newAttempt = await dispatch(
        confirmTestThunk({
          lessonId: lessonId,
          studentTest: studentAnswersRef.current,
          lessonType,
          spentMinutes:
            test.scheduled_time -
            convertMillisecondsToMinutesAndSeconds(timeLeft).minutes,
        })
      ).unwrap();

      const score = newAttempt?.attempt_score;

      if (score !== undefined) {
        messageApi.destroy();
        messageApi.success({
          content: `Your result: ${score} point!`,
          duration: 5,
        });
        setStudentAnswers([]);
        localStorage.removeItem(answersStorageKey);
        localStorage.removeItem(timerStorageKey);
      } else {
        throw new Error("Error while calculating score");
      }
    } catch (error) {
      console.log(error);

      messageApi.destroy();
      messageApi.error({
        content: "Something went wrong!",
        duration: 3,
      });
    } finally {
      closeTestAttempt();
      if (lessonType === "test") {
        dispatch(getTestAttemptsThunk({ test_id: testId }));
      }
    }
  };

  const {
    start: startTimer,
    clear: clearTimer,
    timeLeft,
  } = useTimer({
    initialTime,
    onComplete: handleTimeEnd,
    storageKey: timerStorageKey,
  });

  const completedQuestionsAmount = studentAnswers.filter((ans) => {
    if (
      ans.q_type === "test" ||
      ans.q_type === "boolean" ||
      ans.q_type === "answer_with_photo" ||
      ans.q_type === "question_with_photo"
    )
      return ans.a_id !== 0;
    if (ans.q_type === "multiple_choice") return ans.a_ids.length !== 0;
    if (ans.q_type === "matching") return ans.matching?.length !== 0;
    return false;
  }).length;

  const sumbittedAttemptId = test[`${lessonType}_data`]?.my_attempt_id;

  const showTest = showTestContent || sumbittedAttemptId;
  const showTimer = !sumbittedAttemptId;
  const showExam = showTestContent;

  const onSubmitAttemptBtnClick = async () => {
    setIsLoading(true);
    try {
      const response = await dispatch(
        confirmTestThunk({
          lessonId: test.id,
          studentTest: studentAnswers,
          lessonType,
          spentMinutes:
            test.scheduled_time -
            convertMillisecondsToMinutesAndSeconds(timeLeft).minutes,
        })
      ).unwrap();

      setStudentAnswers([]);
      localStorage.removeItem(answersStorageKey);
      localStorage.removeItem(timerStorageKey);

      messageApi.success({
        content: response.message,
        duration: 5,
      });
    } catch (err) {
      messageApi?.error({
        content: err?.message ? err.message : "Something went wrong",
        duration: 3,
      });
    } finally {
      setIsLoading(false);
      closeTestAttempt();
      if (lessonType === "test") {
        dispatch(getTestAttemptsThunk({ test_id: testId }));
      }
    }
  };

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

  useEffect(() => {
    const fetchAttempts = async () => {
      try {
        await dispatch(
          lessonType === "test"
            ? getTestAttemptsThunk({ test_id: testId })
            : getExamAttemptsThunk({ exam_id: testId })
        ).unwrap();
      } catch (error) {
        console.log("UNWRAP THREW ERROR:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (testId) {
      fetchAttempts();
    }
    // eslint-disable-next-line
  }, [testId, lessonType]);

  useEffect(() => {
    if (timeLeft && timeLeft !== initialTime) {
      startTestAttempt();
    }
    // eslint-disable-next-line
  }, [timeLeft, initialTime]);

  return {
    contextHolder,
    studentAnswers,
    setStudentAnswers,
    completedQuestionsAmount,
    submitedAttemptData,
    timeLeft,
    startTestAttempt,
    showTest,
    showExam,
    showTimer,
    onSubmitAttemptBtnClick,
    isLoading,
  };
};
