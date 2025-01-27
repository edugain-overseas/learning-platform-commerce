import React from "react";
import { ReactComponent as GradeAPlus } from "../../../images/icons/GradeAPlus.svg";
import styles from "./LessonGrade.module.scss";

const LessonGrade = ({ grade = 0, maxGrade = 120 }) => {
  return (
    <div className={styles.container}>
      <GradeAPlus />
      <div className={styles.subContainer}>
        <div className={styles.left}>
          <span className={styles.label}>Grade</span>
          <span className={styles.value}>{grade}</span>
        </div>
        <div className={styles.right}>
          <span className={styles.maxValue}>{maxGrade}</span>
        </div>
      </div>
    </div>
  );
};

export default LessonGrade;
