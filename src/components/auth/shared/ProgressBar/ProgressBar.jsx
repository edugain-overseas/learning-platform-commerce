import React from "react";
import styles from "./ProgressBar.module.scss";

const ProgressBar = ({ width, height, value }) => {
  console.log(width, height, value);
  return <div className={styles.outerWrapper}>ProgressBar</div>;
};

export default ProgressBar;
