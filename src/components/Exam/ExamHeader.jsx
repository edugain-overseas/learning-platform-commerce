import React, { useState } from "react";
import { ReactComponent as ClockIcon } from "../../images/icons/clock.svg";
import { ReactComponent as AttemptsIcon } from "../../images/icons/warning-circle.svg";
import { ReactComponent as QuestionIcon } from "../../images/icons/document-question.svg";
import { ReactComponent as CheckIcon } from "../../images/icons/checked.svg";
import LessonGrade from "../shared/LessonGrade/LessonGrade";
import styles from "./Exam.module.scss";
import Spinner from "../Spinner/Spinner";
import { convertMillisecondsToMinutesAndSeconds } from "../../utils/formatTime";

const ExamHeader = ({
  exam,
  examInProgress,
  studentAnswersLength,
  submitAttempt,
  examScore,
  examMaxScore,
  timeLeft,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const attemptsLeft =
    exam.exam_data.attempts - exam.exam_data.attempts_data?.length;
  const questionsAmount = exam.exam_data.questions.length;
  const timer = exam.exam_data.timer;

  const handleSubmit = () => {
    setIsLoading(true);
    try {
      submitAttempt();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.header}>
      <div className={styles.titleWrapper}>
        <h2 className={styles.title}>{exam.title}</h2>
        <span className={styles.divider}>|</span>
        <span className={styles.type}>{exam.type}</span>
      </div>
      <div className={styles.tools}>
        <div className={styles.stat}>
          <AttemptsIcon />
          <span>{attemptsLeft} attempts</span>
        </div>
        <div className={styles.stat}>
          <ClockIcon />
          {timeLeft ? (
            <span className={styles.currentTime}>
              {`${
                convertMillisecondsToMinutesAndSeconds(timeLeft).minutes
              }`.padStart(2, "0") +
                ":" +
                `${
                  convertMillisecondsToMinutesAndSeconds(timeLeft).seconds
                }`.padStart(2, "0")}
            </span>
          ) : (
            <span>{timer} minutes</span>
          )}
        </div>
        <div className={styles.stat}>
          <QuestionIcon />
          <span>
            Questions: {studentAnswersLength}/{questionsAmount}
          </span>
        </div>
        <button
          className={styles.sumbitAttemptBtn}
          disabled={!examInProgress || isLoading}
          onClick={handleSubmit}
        >
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              <span>Submit</span>
              <CheckIcon />
            </>
          )}
        </button>
        <LessonGrade grade={examScore} maxGrade={examMaxScore} />
      </div>
    </div>
  );
};

export default ExamHeader;
