import React from "react";
import { ReactComponent as DocQuestionIcon } from "../../images/icons/document-question.svg";
import { ReactComponent as ComplieteIcon } from "../../images/icons/task-check.svg";
import CardGrade from "../shared/CardGrade/CardGrade";
import styles from "./TasksHeader.module.scss";
import LessonNavigateBtn from "../shared/LessonNavigateBtn/LessonNavigateBtn";

const TestHeader = ({ test, questionsDoneAmount = 0 }) => {
  const {
    title,
    type,
    number,
    questionsAmount,
    grade = 0,
    maxGrade = 40,
  } = test;
  return (
    <div className={styles.wrapper}>
      <div className={styles.titleWrapper}>
        <h2 className={styles.title}>{title}</h2>
        <span className={styles.divider}>|</span>
        <span className={styles.type}>{type}</span>
      </div>
      <div className={styles.toolsWrapper}>
        <div className={styles.questionsDoneWrapper}>
          <DocQuestionIcon />
          <span>{`Questions: ${questionsDoneAmount}/${questionsAmount}`}</span>
        </div>
        <button className={styles.complieteBtn}>
          <span>Compliete</span>
          <ComplieteIcon />
        </button>
        <CardGrade grade={grade} maxGrade={maxGrade} />
        <div className={styles.navBtnsWrapper}>
          <LessonNavigateBtn forward={false} currentNumber={number} />
          <LessonNavigateBtn forward={true} currentNumber={number} />
        </div>
      </div>
    </div>
  );
};

export default TestHeader;
