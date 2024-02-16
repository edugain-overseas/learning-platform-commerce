import React from "react";
import { ReactComponent as DocQuestionIcon } from "../../images/icons/document-question.svg";
import { ReactComponent as ComplieteIcon } from "../../images/icons/task-check.svg";
import { ReactComponent as ArrowDownIcon } from "../../images/icons/arrow-left.svg";
import CardGrade from "../shared/CardGrade/CardGrade";
import styles from "./TasksHeader.module.scss";

const TestHeader = ({ test, questionsDoneAmount = 0 }) => {
  const { title, type, questionsAmount, grade = 0, maxGrade = 40 } = test;
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
          <button className={styles.prev}>
            <ArrowDownIcon />
            <span>Return</span>
          </button>
          <button className={styles.next}>
            <span>Next</span>
            <ArrowDownIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestHeader;
