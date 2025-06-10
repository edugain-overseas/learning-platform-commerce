import React from "react";
import styles from "./Test.module.scss";

const TestLanding = ({ onStartTest }) => {
  return (
    <div className={styles.landingWrapper}>
      <button onClick={onStartTest}>start test</button>
    </div>
  );
};

export default TestLanding;
