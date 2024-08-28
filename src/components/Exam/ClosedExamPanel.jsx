import React from "react";
import styles from "./Exam.module.scss";

const ClosedExamPanel = ({ examData, handleStartExam }) => {
    console.log(examData);
  return (
    <div className={styles.closedExamPanel}>
      <p>
        The exam is <b>limited in time</b>.
        <br />
        Amount of time: <b>{examData.timer} minutes</b>.
        <br />
        You have{" "}
        <b>
          {examData.attempts - examData.attempts_data.length} more
          attempts
        </b>
        .
      </p>
      <button className={styles.startBtn} onClick={handleStartExam}>
        <span>Start</span>
      </button>
    </div>
  );
};

export default ClosedExamPanel;
