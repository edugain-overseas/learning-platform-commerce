import React from "react";
import styles from "./LessonGrade.module.scss";

const LessonGrade = ({ grade = 0, maxGrade = 120 }) => {
  return (
    <div className={styles.container}>
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
