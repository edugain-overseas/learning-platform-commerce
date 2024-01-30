import React from "react";
import { letterGrade } from "../../../utils/gradingScale";
import styles from "./CardGrade.module.scss";

const CardGrade = ({ grade = 0 }) => {
  return (
    <div className={styles.wrapper}>
      {letterGrade(grade)}
      <div className={styles.infoWrapper}>
        <span>Grade</span>
        <div>
          <span className={styles.userGrade}>{grade} </span>
          <span className={styles.divider}>\</span>
          <span className={styles.maxGrade}>200</span>
        </div>
      </div>
    </div>
  );
};

export default CardGrade;
