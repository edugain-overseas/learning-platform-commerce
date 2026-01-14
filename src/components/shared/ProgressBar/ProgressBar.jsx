import React from "react";
import styles from "./ProgressBar.module.scss";

const colors = {
  full: "#2DE000",
  high: "#ABFC00",
  medium: "#F7FC00",
  low: "#FCC400",
};

const handleProgressColor = (value) => {
  if (!value) {
    return "transparent";
  }
  if (value <= 33) {
    return colors.low;
  }
  if (33 < value && value <= 66) {
    return colors.medium;
  }
  if (66 < value && value < 100) {
    return colors.high;
  }
  if (value >= 100) {
    return colors.full;
  }
};

const ProgressBar = ({ width = 171, height = 24, value, className = "" }) => {
  const disabled = value == null ? true : false;

  return (
    <div
      className={`${styles.outerWrapper} ${className}`}
      style={{
        width: `${width}rem`,
        height: `${height}rem`,
        borderRadius: `${width * 0.03}rem`,
        padding: `${width * 0.0175}rem`,
      }}
    >
      <div
        className={styles.innerWrapper}
        style={{ borderRadius: `${width * 0.023}rem` }}
      >
        <div
          className={`${styles.progress} ${disabled ? styles.disabled : ""}`}
          style={{
            width: value <= 100 ? `${value}%` : "100%",
            borderRadius: `${width * 0.023}rem`,
            backgroundColor: `${handleProgressColor(value)}`,
          }}
        ></div>
        <span
          style={{ fontSize: `${(10 / 24) * height}rem` }}
          id={`progress-value-${value}`}
        >
          {disabled ? (
            "Not purchased"
          ) : value >= 100 ? (
            <>
              <span>Completed</span>
              <span id="numeric-value">100</span>
            </>
          ) : (
            <>
              {`${value ? value : 0}`}{" "}
              <span style={{ fontSize: "inherit" }} id="prosgress-max-value">
                {" "}
                / 100 %
              </span>
            </>
          )}
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;
