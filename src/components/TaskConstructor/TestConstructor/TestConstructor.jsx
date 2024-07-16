import React from "react";
import styles from "./TestConstructor.module.scss";

const TestConstructor = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.blocks}></div>
      <div className={styles.tools}></div>
    </div>
  );
};

export default TestConstructor;
