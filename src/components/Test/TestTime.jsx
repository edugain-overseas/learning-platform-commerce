import React from "react";
import { convertMillisecondsToMinutesAndSeconds } from "../../utils/formatTime";
import styles from "./Test.module.scss";

const TestTime = ({ timeLeft }) => {
  return (
    <div className={styles.timerWrapper}>
      <span>
        {`${convertMillisecondsToMinutesAndSeconds(timeLeft).minutes}`.padStart(
          2,
          "0"
        ) +
          ":" +
          `${
            convertMillisecondsToMinutesAndSeconds(timeLeft).seconds
          }`.padStart(2, "0")}
      </span>
    </div>
  );
};

export default TestTime;
