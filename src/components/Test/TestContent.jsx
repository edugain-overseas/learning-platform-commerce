import React from "react";
import styles from "./Test.module.scss";

const TestContent = ({ test }) => {
  console.log(test);
  return <div className={styles.contentWrapper}>TestContent</div>;
};

export default TestContent;
