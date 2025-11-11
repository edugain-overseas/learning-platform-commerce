import React from "react";
import styles from "./CircleProgressCard.module.scss";
import CircleProgressBar from "../shared/CircleProgressBar/CircleProgressBar";

const CircleProgressCard = ({
  cardTitle,
  progressTitle,
  strokeBackgroundColor = "#fafafa",
  progress,
  strokeColor,
  outerColor = "#f7f6f5",
}) => {
  return (
    <div className={styles.wrapper}>
      <h4>{cardTitle}</h4>
      <div
        className={styles.progressOuter}
        style={{ backgroundColor: outerColor }}
      >
        <div className={styles.progress}>
          <CircleProgressBar
            strokeColor={strokeColor}
            progress={progress}
            width={138}
            strokeWidth={8}
            backgroundColor={strokeBackgroundColor}
          />
        </div>
        <div className={styles.progressInner}>{progressTitle}</div>
      </div>
    </div>
  );
};

export default CircleProgressCard;
