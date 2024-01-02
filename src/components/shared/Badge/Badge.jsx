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
}) => {
  return (
    <div className={styles.wrapper}>
      {children}
      <div
        className={`${pulsing ? styles.pulsing : ""} ${orientationClassName(
          orietation
        )} ${type === "filled" ? styles.filled : ""} ${styles.badge}`}
      >
        <span>{value}</span>
      </div>
    </div>
  );
};

export default Badge;
