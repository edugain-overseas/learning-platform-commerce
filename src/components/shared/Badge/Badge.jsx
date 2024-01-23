import React from "react";
import styles from "./Badge.module.scss";

const orientationClassName = (o) => {
  switch (0) {
    case "bottom-right":
      return styles.b_r;
    case "bottom-left":
      return styles.b_l;
    case "top-right":
      return styles.t_r;
    case "top-left":
      return styles.t_l;
    default:
      return styles.b_r;
  }
};

const Badge = ({
  children,
  value = 0,
  orietation = "bottom-right",
  type = "outline",
  pulsing = false,
  rounded = false,
  width = "15%",
}) => {
  return (
    <div
      className={styles.wrapper}
      style={{ borderRadius: rounded ? "50%" : "0" }}
    >
      {children}
      {value !== 0 && (
        <div
          className={`${pulsing ? styles.pulsing : ""} ${orientationClassName(
            orietation
          )} ${type === "filled" ? styles.filled : ""} ${styles.badge}`}
          style={{width}}
        >
          <span>{value}</span>
        </div>
      )}
    </div>
  );
};

export default Badge;
