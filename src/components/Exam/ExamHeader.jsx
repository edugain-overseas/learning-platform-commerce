import React from "react";
import { ReactComponent as ClockIcon } from "../../images/icons/clock.svg";
import { ReactComponent as QuestionIcon } from "../../images/icons/document-question.svg";
import { ReactComponent as CheckIcon } from "../../images/icons/checked.svg";
import styles from "./Exam.module.scss";
import LessonGrade from "../shared/LessonGrade/LessonGrade";

const ExamHeader = ({ exam, examInProgress }) => {
  return (
    <div className={styles.header}>
      <div className={styles.titleWrapper}>
        <h2 className={styles.title}>{exam.title}</h2>
        <span className={styles.divider}>|</span>
        <span className={styles.type}>{exam.type}</span>
      </div>
      <div className={styles.tools}>
        <div className={styles.stat}>
          <ClockIcon />
          <span>3 attempts</span>
        </div>
        <div className={styles.stat}>
          <ClockIcon />
          <span>40 minutes</span>
        </div>
        <div className={styles.stat}>
          <QuestionIcon />
          <span>Questions: 2/16</span>
        </div>
        <button className={styles.sumbitAttemptBtn} disabled={!examInProgress}>
          <span>Submit</span>
          <CheckIcon />
        </button>
        <LessonGrade />
      </div>
    </div>
  );
};

export default ExamHeader;
